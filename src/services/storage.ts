import { supabase, supabaseConfigured } from '../lib/supabase'

type BucketName = 'product-images' | 'site-images'

export const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/gif'
const MAX_IMAGE_SIZE_MB = 10

export interface UploadResult {
  url: string | null
  error: string | null
}

// Devuelve un mensaje en castellano si el archivo no se puede subir, o null si es válido
export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.split(',').includes(file.type)) {
    return `"${file.name}" no es un formato soportado. Usá JPG, PNG, WEBP o GIF (las fotos HEIC de iPhone hay que convertirlas a JPG).`
  }
  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    return `"${file.name}" pesa más de ${MAX_IMAGE_SIZE_MB} MB.`
  }
  return null
}

export async function uploadImage(bucket: BucketName, file: File, path?: string): Promise<UploadResult> {
  if (!supabaseConfigured) {
    return { url: null, error: 'Supabase no está configurado (faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).' }
  }

  const invalid = validateImageFile(file)
  if (invalid) return { url: null, error: invalid }

  const fileExt = (file.name.split('.').pop() ?? 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const fileName = path ?? `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false
    })

  if (error) {
    console.error('Error uploading image:', error)
    const permissionDenied = /row-level security|unauthorized|403/i.test(error.message)
    return {
      url: null,
      error: permissionDenied
        ? 'Supabase rechazó la subida por permisos. Ejecutá sql/storage_policies.sql en el SQL Editor de Supabase.'
        : `No se pudo subir "${file.name}": ${error.message}`
    }
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return { url: publicUrl, error: null }
}

export async function deleteImage(bucket: BucketName, path: string): Promise<boolean> {
  if (!supabaseConfigured) return false

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    console.error('Error deleting image:', error)
    return false
  }

  return true
}

export async function replaceImage(bucket: BucketName, oldPath: string, file: File): Promise<UploadResult> {
  if (!supabaseConfigured) return uploadImage(bucket, file)

  await deleteImage(bucket, oldPath)

  return uploadImage(bucket, file)
}

export function getImagePathFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    const pathMatch = urlObj.pathname.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/)
    return pathMatch ? pathMatch[1] : null
  } catch {
    return null
  }
}
