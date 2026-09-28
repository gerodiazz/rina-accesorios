import { supabase, supabaseConfigured } from '../lib/supabase'
import type { Product, ProductImage, ProductWithRelations, Category, PhoneModel } from '../types/database'

export async function getProducts(): Promise<ProductWithRelations[]> {
  if (!supabaseConfigured) return []

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('order_index')

  if (error || !products) {
    console.error('Error fetching products:', error)
    return []
  }

  const { data: categories } = await supabase.from('categories').select('*')
  const { data: images } = await supabase.from('product_images').select('*')

  return products.map(p => ({
    ...p,
    category: categories?.find(c => c.id === p.category_id) ?? null,
    images: images?.filter(img => img.product_id === p.id) ?? [],
    phone_models: []
  }))
}

export async function getProductBySlug(slug: string): Promise<ProductWithRelations | null> {
  if (!supabaseConfigured) return null

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !product) {
    console.error('Error fetching product:', error)
    return null
  }

  const { data: category } = product.category_id
    ? await supabase.from('categories').select('*').eq('id', product.category_id).single()
    : { data: null }

  const { data: images } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', product.id)
    .order('order_index')

  return {
    ...product,
    category: category ?? null,
    images: images ?? [],
    phone_models: []
  }
}

export async function getProductById(id: string): Promise<ProductWithRelations | null> {
  if (!supabaseConfigured) return null

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !product) {
    if (error) console.error('Error fetching product:', error)
    return null
  }

  const { data: images } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', product.id)
    .order('order_index')

  return {
    ...product,
    category: null,
    images: images ?? [],
    phone_models: []
  }
}

export async function getProductsByCategory(categoryId: string): Promise<ProductWithRelations[]> {
  if (!supabaseConfigured) return []

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .order('order_index')

  if (error || !products) {
    console.error('Error fetching products:', error)
    return []
  }

  const { data: categories } = await supabase.from('categories').select('*')
  const { data: images } = await supabase.from('product_images').select('*')

  return products.map(p => ({
    ...p,
    category: categories?.find(c => c.id === p.category_id) ?? null,
    images: images?.filter(img => img.product_id === p.id) ?? [],
    phone_models: []
  }))
}

export async function getFeaturedProducts(): Promise<ProductWithRelations[]> {
  if (!supabaseConfigured) return []

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .eq('active', true)
    .order('order_index')
    .limit(8)

  if (error || !products) {
    console.error('Error fetching featured products:', error)
    return []
  }

  const { data: categories } = await supabase.from('categories').select('*')
  const { data: images } = await supabase.from('product_images').select('*')

  return products.map(p => ({
    ...p,
    category: categories?.find(c => c.id === p.category_id) ?? null,
    images: images?.filter(img => img.product_id === p.id) ?? [],
    phone_models: []
  }))
}

interface CreateProductInput {
  name: string
  slug: string
  description?: string
  category_id?: string
  price_display?: string
  whatsapp_only?: boolean
  whatsapp_message?: string
  active?: boolean
  featured?: boolean
}

export async function createProduct(product: CreateProductInput): Promise<Product | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) {
    console.error('Error creating product:', error)
    return null
  }

  return data
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  if (!supabaseConfigured) return null

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating product:', error)
    return null
  }

  return data
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!supabaseConfigured) return false

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    return false
  }

  return true
}

export async function addProductImage(productId: string, url: string, alt?: string, isPrimary = false): Promise<ProductImage | null> {
  if (!supabaseConfigured) return null

  const { data: existing } = await supabase
    .from('product_images')
    .select('order_index')
    .eq('product_id', productId)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle()

  const nextOrder = (existing?.order_index ?? -1) + 1

  const { data, error } = await supabase
    .from('product_images')
    .insert({
      product_id: productId,
      url,
      alt: alt ?? null,
      order_index: nextOrder,
      is_primary: isPrimary
    })
    .select()
    .single()

  if (error) {
    console.error('Error adding product image:', error)
    return null
  }

  return data
}

export async function deleteProductImage(imageId: string): Promise<boolean> {
  if (!supabaseConfigured) return false

  const { error } = await supabase
    .from('product_images')
    .delete()
    .eq('id', imageId)

  if (error) {
    console.error('Error deleting product image:', error)
    return false
  }

  return true
}

export async function setProductPhoneModels(productId: string, phoneModelIds: string[]): Promise<boolean> {
  if (!supabaseConfigured) return false

  const { error: deleteError } = await supabase
    .from('product_phone_models')
    .delete()
    .eq('product_id', productId)

  if (deleteError) {
    console.error('Error clearing product phone models:', deleteError)
    return false
  }

  if (phoneModelIds.length === 0) return true

  const { error: insertError } = await supabase
    .from('product_phone_models')
    .insert(phoneModelIds.map(pmId => ({
      product_id: productId,
      phone_model_id: pmId
    })))

  if (insertError) {
    console.error('Error setting product phone models:', insertError)
    return false
  }

  return true
}
