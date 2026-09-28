import { supabase, supabaseConfigured } from '../lib/supabase'
import type { SiteImage } from '../types/database'

export async function getSiteImages(): Promise<SiteImage[]> {
  if (!supabaseConfigured) return []

  const { data, error } = await supabase
    .from('site_images')
    .select('*')

  if (error) {
    console.error('Error fetching site images:', error)
    return []
  }

  return data ?? []
}

export async function getSiteImagesBySection(section: string): Promise<SiteImage[]> {
  if (!supabaseConfigured) return []

  const { data, error } = await supabase
    .from('site_images')
    .select('*')
    .eq('section', section)

  if (error) {
    console.error('Error fetching site images:', error)
    return []
  }

  return data ?? []
}

export async function getSiteImageByKey(key: string): Promise<SiteImage | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('site_images')
    .select('*')
    .eq('key', key)
    .single()

  if (error) {
    console.error('Error fetching site image:', error)
    return null
  }

  return data
}

export async function updateSiteImage(key: string, url: string, alt?: string): Promise<boolean> {
  if (!supabaseConfigured) return false

  const { error } = await supabase
    .from('site_images')
    .update({ url, alt })
    .eq('key', key)

  if (error) {
    console.error('Error updating site image:', error)
    return false
  }

  return true
}

export async function createSiteImage(image: Omit<SiteImage, 'id'>): Promise<SiteImage | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('site_images')
    .insert(image)
    .select()
    .single()

  if (error) {
    console.error('Error creating site image:', error)
    return null
  }

  return data
}

export async function deleteSiteImage(id: string): Promise<boolean> {
  if (!supabaseConfigured) return false

  const { error } = await supabase
    .from('site_images')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting site image:', error)
    return false
  }

  return true
}
