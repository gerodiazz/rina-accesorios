import { supabase, supabaseConfigured } from '../lib/supabase'
import type { FaqItem } from '../types/database'

export async function getFaqItems(): Promise<FaqItem[]> {
  if (!supabaseConfigured) return []

  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .order('order_index')

  if (error) {
    console.error('Error fetching FAQ items:', error)
    return []
  }

  return data ?? []
}

export async function createFaqItem(item: Omit<FaqItem, 'id'>): Promise<FaqItem | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('faq_items')
    .insert(item)
    .select()
    .single()

  if (error) {
    console.error('Error creating FAQ item:', error)
    return null
  }

  return data
}

export async function updateFaqItem(id: string, updates: Partial<FaqItem>): Promise<FaqItem | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('faq_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating FAQ item:', error)
    return null
  }

  return data
}

export async function deleteFaqItem(id: string): Promise<boolean> {
  if (!supabaseConfigured) return false

  const { error } = await supabase
    .from('faq_items')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting FAQ item:', error)
    return false
  }

  return true
}

export async function reorderFaqItems(orderedIds: string[]): Promise<boolean> {
  if (!supabaseConfigured) return false

  const updates = orderedIds.map((id, index) =>
    supabase.from('faq_items').update({ order_index: index }).eq('id', id)
  )

  const results = await Promise.all(updates)
  return results.every(r => !r.error)
}

export async function toggleFaqItemActive(id: string, active: boolean): Promise<boolean> {
  if (!supabaseConfigured) return false

  const { error } = await supabase
    .from('faq_items')
    .update({ active })
    .eq('id', id)

  if (error) {
    console.error('Error toggling FAQ item:', error)
    return false
  }

  return true
}
