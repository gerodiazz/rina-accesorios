import { useState, useEffect, useCallback } from 'react'
import type { ProductWithRelations } from '../types/database'
import { getProducts, getProductBySlug, getFeaturedProducts } from '../services/products'
import { supabaseConfigured } from '../lib/supabase'
import { products as localProducts, type Product as LocalProduct } from '../data/products'

function mapLocalToDb(product: LocalProduct): ProductWithRelations {
  return {
    id: product.id,
    name: product.name,
    slug: product.id,
    description: product.description,
    category_id: null,
    price_display: product.price ?? null,
    whatsapp_only: product.whatsappOnly ?? false,
    whatsapp_message: product.whatsappMessage ?? null,
    active: true,
    featured: product.featured,
    order_index: 0,
    created_at: new Date().toISOString(),
    category: null,
    images: product.images.map((url, i) => ({
      id: `${product.id}-img-${i}`,
      product_id: product.id,
      url,
      alt: product.name,
      order_index: i,
      is_primary: i === 0
    })),
    phone_models: []
  }
}

export function useProducts() {
  const [products, setProducts] = useState<ProductWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!supabaseConfigured) {
      setProducts(localProducts.map(mapLocalToDb))
      setLoading(false)
      return
    }

    const data = await getProducts()
    if (data.length === 0) {
      setProducts(localProducts.map(mapLocalToDb))
    } else {
      setProducts(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<ProductWithRelations | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      setError(null)

      if (!supabaseConfigured) {
        const local = localProducts.find(p => p.id === slug)
        setProduct(local ? mapLocalToDb(local) : null)
        setLoading(false)
        return
      }

      const data = await getProductBySlug(slug)
      if (!data) {
        const local = localProducts.find(p => p.id === slug)
        setProduct(local ? mapLocalToDb(local) : null)
      } else {
        setProduct(data)
      }
      setLoading(false)
    }

    fetch()
  }, [slug])

  return { product, loading, error }
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<ProductWithRelations[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      setLoading(true)

      if (!supabaseConfigured) {
        setProducts(localProducts.filter(p => p.featured).map(mapLocalToDb))
        setLoading(false)
        return
      }

      const data = await getFeaturedProducts()
      if (data.length === 0) {
        setProducts(localProducts.filter(p => p.featured).map(mapLocalToDb))
      } else {
        setProducts(data)
      }
      setLoading(false)
    }

    fetch()
  }, [])

  return { products, loading }
}
