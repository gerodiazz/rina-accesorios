import { supabase, supabaseConfigured } from '../lib/supabase'
import type { Category } from '../types/database'

export async function getCategories(): Promise<Category[]> {
  if (!supabaseConfigured) return []

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('order_index')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data ?? []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return data
}

export async function createCategory(category: Omit<Category, 'id' | 'created_at'>): Promise<Category | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single()

  if (error) {
    console.error('Error creating category:', error)
    return null
  }

  return data
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating category:', error)
    return null
  }

  return data
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (!supabaseConfigured) return false

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting category:', error)
    return false
  }

  return true
}

export async function reorderCategories(orderedIds: string[]): Promise<boolean> {
  if (!supabaseConfigured) return false

  const updates = orderedIds.map((id, index) =>
    supabase.from('categories').update({ order_index: index }).eq('id', id)
  )

  const results = await Promise.all(updates)
  return results.every(r => !r.error)
}
