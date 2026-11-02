import { supabase, supabaseConfigured } from '../lib/supabase'

// Imagen original del sitio (la que estaba definida en el código)
export const DEFAULT_HERO_IMAGE = 'https://picsum.photos/seed/rina-hero/480/640'

export const HERO_IMAGE_KEY = 'home.hero'
const HERO_BUCKET = 'hero-images'

export const HERO_ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
// Mismo límite que el bucket hero-images en Supabase (sql/hero_image.sql)
export const HERO_MAX_SIZE_MB = 8

// Lado más largo con el que se guarda la foto: el banner se muestra a ~400px de
// ancho, así que 1600px alcanza para pantallas de alta densidad sin pesar de más.
const MAX_DIMENSION = 1600

export function validateHeroFile(file: File): string | null {
  if (!HERO_ACCEPTED_TYPES.includes(file.type)) {
    return 'Ese formato no está permitido. Elegí una foto JPG, PNG o WEBP (las fotos HEIC de iPhone hay que convertirlas a JPG).'
  }
  if (file.size > HERO_MAX_SIZE_MB * 1024 * 1024) {
    return `La foto pesa más de ${HERO_MAX_SIZE_MB} MB. Elegí una más liviana.`
  }
  return null
}

// url: null = no hay portada personalizada (se usa la original). ok: false = no se pudo consultar
export async function getHeroImageUrl(): Promise<{ url: string | null; ok: boolean }> {
  if (!supabaseConfigured) return { url: null, ok: true }

  const { data, error } = await supabase
    .from('site_images')
    .select('url')
    .eq('key', HERO_IMAGE_KEY)
    .maybeSingle()

  if (error) {
    console.error('Error fetching hero image:', error)
    return { url: null, ok: false }
  }
  return { url: data?.url ?? null, ok: true }
}

// true si el usuario logueado figura en admin_users
export async function checkIsAdmin(): Promise<{ isAdmin: boolean; error: string | null }> {
  if (!supabaseConfigured) return { isAdmin: false, error: 'Supabase no está configurado.' }

  const { data, error } = await supabase.rpc('is_admin')
  if (error) {
    console.error('Error checking admin:', error)
    return {
      isAdmin: false,
      error: 'No se pudo verificar el permiso de administrador. Ejecutá sql/hero_image.sql en el SQL Editor de Supabase.',
    }
  }
  return { isAdmin: data === true, error: null }
}

// Achica y comprime la foto en el navegador para que el inicio cargue rápido.
// Si algo falla, o el resultado no es más liviano, se sube el archivo original.
async function optimizeImage(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return file
    ctx.drawImage(bitmap, 0, 0, width, height)
    bitmap.close()

    const toBlob = (type: string) =>
      new Promise<Blob | null>(resolve => canvas.toBlob(resolve, type, 0.85))

    // WEBP si el navegador lo sabe generar; si no, JPG (PNG se mantiene si trae transparencia)
    let blob = await toBlob('image/webp')
    if (!blob || blob.type !== 'image/webp') blob = await toBlob(file.type === 'image/png' ? 'image/png' : 'image/jpeg')
    if (!blob || !HERO_ACCEPTED_TYPES.includes(blob.type)) return file

    return blob.size < file.size ? blob : file
  } catch {
    return file
  }
}

const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

async function removeHeroFilesExcept(keepPath: string | null) {
  const { data, error } = await supabase.storage.from(HERO_BUCKET).list('', { limit: 100 })
  if (error || !data) return
  const toRemove = data.map(f => f.name).filter(name => name !== keepPath)
  if (toRemove.length > 0) await supabase.storage.from(HERO_BUCKET).remove(toRemove)
}

export async function saveHeroImage(file: File): Promise<{ url: string | null; error: string | null }> {
  if (!supabaseConfigured) return { url: null, error: 'Supabase no está configurado.' }

  const invalid = validateHeroFile(file)
  if (invalid) return { url: null, error: invalid }

  const blob = await optimizeImage(file)
  const path = `portada-${Date.now()}.${EXTENSIONS[blob.type] ?? 'jpg'}`

  const { error: uploadError } = await supabase.storage.from(HERO_BUCKET).upload(path, blob, {
    // Cada foto tiene un nombre nuevo, así que se puede cachear mucho tiempo
    cacheControl: '31536000',
    contentType: blob.type,
    upsert: false,
  })

  if (uploadError) {
    console.error('Error uploading hero image:', uploadError)
    if (/bucket not found/i.test(uploadError.message)) {
      return { url: null, error: 'Falta crear el espacio de almacenamiento. Ejecutá sql/hero_image.sql en el SQL Editor de Supabase.' }
    }
    if (/row-level security|unauthorized|403/i.test(uploadError.message)) {
      return { url: null, error: 'Tu usuario no tiene permiso para cambiar la portada.' }
    }
    if (/mime|type/i.test(uploadError.message)) {
      return { url: null, error: 'El servidor rechazó el formato de la foto. Usá JPG, PNG o WEBP.' }
    }
    if (/size|large/i.test(uploadError.message)) {
      return { url: null, error: `El servidor rechazó la foto por su tamaño (máximo ${HERO_MAX_SIZE_MB} MB).` }
    }
    return { url: null, error: `No se pudo subir la foto: ${uploadError.message}` }
  }

  const { data: { publicUrl } } = supabase.storage.from(HERO_BUCKET).getPublicUrl(path)

  const { error: dbError } = await supabase
    .from('site_images')
    .upsert(
      { key: HERO_IMAGE_KEY, url: publicUrl, alt: 'Funda personalizada de celular', section: 'hero', description: 'Imagen de portada del inicio' },
      { onConflict: 'key' }
    )

  if (dbError) {
    console.error('Error saving hero image:', dbError)
    await supabase.storage.from(HERO_BUCKET).remove([path])
    return { url: null, error: 'La foto se subió pero no se pudo publicar. Probá de nuevo.' }
  }

  // Borra la portada anterior (y cualquier archivo que haya quedado de intentos fallidos)
  await removeHeroFilesExcept(path)

  return { url: publicUrl, error: null }
}

export async function restoreDefaultHeroImage(): Promise<{ error: string | null }> {
  if (!supabaseConfigured) return { error: 'Supabase no está configurado.' }

  const { error } = await supabase.from('site_images').delete().eq('key', HERO_IMAGE_KEY)
  if (error) {
    console.error('Error restoring hero image:', error)
    return { error: 'No se pudo restaurar la imagen original. Probá de nuevo.' }
  }

  // Si las políticas impidieron el borrado, la fila sigue ahí (Supabase no da error)
  const after = await getHeroImageUrl()
  if (!after.ok || after.url) {
    return { error: 'Tu usuario no tiene permiso para cambiar la portada.' }
  }

  await removeHeroFilesExcept(null)
  return { error: null }
}

