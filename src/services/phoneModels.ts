import { supabase, supabaseConfigured } from '../lib/supabase'
import type { PhoneModel } from '../types/database'

export async function getPhoneModels(): Promise<PhoneModel[]> {
  if (!supabaseConfigured) return []

  const { data, error } = await supabase
    .from('phone_models')
    .select('*')
    .order('order_index')

  if (error) {
    console.error('Error fetching phone models:', error)
    return []
  }

  return data ?? []
}

export async function getPhoneModelsByBrand(brand: string): Promise<PhoneModel[]> {
  if (!supabaseConfigured) return []

  const { data, error } = await supabase
    .from('phone_models')
    .select('*')
    .eq('brand', brand)
    .order('order_index')

  if (error) {
    console.error('Error fetching phone models:', error)
    return []
  }

  return data ?? []
}

export async function createPhoneModel(model: Omit<PhoneModel, 'id'>): Promise<PhoneModel | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('phone_models')
    .insert(model)
    .select()
    .single()

  if (error) {
    console.error('Error creating phone model:', error)
    return null
  }

  return data
}

export async function updatePhoneModel(id: string, updates: Partial<PhoneModel>): Promise<PhoneModel | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('phone_models')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating phone model:', error)
    return null
  }

  return data
}

export async function deletePhoneModel(id: string): Promise<boolean> {
  if (!supabaseConfigured) return false

  const { error } = await supabase
    .from('phone_models')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting phone model:', error)
    return false
  }

  return true
}

export async function togglePhoneModelActive(id: string, active: boolean): Promise<boolean> {
  if (!supabaseConfigured) return false

  const { error } = await supabase
    .from('phone_models')
    .update({ active })
    .eq('id', id)

  if (error) {
    console.error('Error toggling phone model:', error)
    return false
  }

  return true
}
