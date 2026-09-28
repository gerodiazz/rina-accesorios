import { supabase, supabaseConfigured } from '../lib/supabase'

type BucketName = 'product-images' | 'site-images'

export async function uploadImage(bucket: BucketName, file: File, path?: string): Promise<string | null> {
  if (!supabaseConfigured) return null

  const fileExt = file.name.split('.').pop()
  const fileName = path ?? `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return publicUrl
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

export async function replaceImage(bucket: BucketName, oldPath: string, file: File): Promise<string | null> {
  if (!supabaseConfigured) return null

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
