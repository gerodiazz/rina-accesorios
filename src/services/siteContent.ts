import { supabase, supabaseConfigured } from '../lib/supabase'
import type { SiteContent } from '../types/database'

export async function getSiteContent(): Promise<Record<string, string>> {
  if (!supabaseConfigured) return {}

  const { data, error } = await supabase
    .from('site_content')
    .select('key, value')

  if (error) {
    console.error('Error fetching site content:', error)
    return {}
  }

  const content: Record<string, string> = {}
  data?.forEach(item => {
    content[item.key] = item.value
  })

  return content
}

export async function getSiteContentBySection(section: string): Promise<SiteContent[]> {
  if (!supabaseConfigured) return []

  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .eq('section', section)

  if (error) {
    console.error('Error fetching site content:', error)
    return []
  }

  return data ?? []
}

export async function updateSiteContent(key: string, value: string): Promise<boolean> {
  if (!supabaseConfigured) return false

  const section = key.split('.').slice(0, 2).join('.')

  const { error } = await supabase
    .from('site_content')
    .upsert({ key, value, section }, { onConflict: 'key' })

  if (error) {
    console.error('Error updating site content:', error)
    return false
  }

  return true
}

export async function updateSiteContentBatch(updates: { key: string; value: string }[]): Promise<boolean> {
  if (!supabaseConfigured) return false

  const records = updates.map(({ key, value }) => ({
    key,
    value,
    section: key.split('.').slice(0, 2).join('.')
  }))

  const { error } = await supabase
    .from('site_content')
    .upsert(records, { onConflict: 'key' })

  if (error) {
    console.error('Error updating site content batch:', error)
    return false
  }

  return true
}

export async function createSiteContent(content: Omit<SiteContent, 'id'>): Promise<SiteContent | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('site_content')
    .insert(content)
    .select()
    .single()

  if (error) {
    console.error('Error creating site content:', error)
    return null
  }

  return data
}
