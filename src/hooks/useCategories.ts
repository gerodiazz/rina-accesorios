import { useState, useEffect, useCallback } from 'react'
import type { Category } from '../types/database'
import { getCategories } from '../services/categories'
import { supabaseConfigured } from '../lib/supabase'
import { caseStyleOptions, categoryLabels, allCategories, type ProductCategory } from '../data/products'

function getLocalCategories(): Category[] {
  const fundaCategories = caseStyleOptions.map((name, i) => ({
    id: `local-funda-${i}`,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: null,
    active: true,
    order_index: i,
    created_at: new Date().toISOString()
  }))

  const otherCategories = allCategories
    .filter(cat => cat !== 'fundas')
    .map((cat, i) => ({
      id: `local-${cat}`,
      name: categoryLabels[cat as ProductCategory],
      slug: cat,
      description: null,
      active: true,
      order_index: caseStyleOptions.length + i,
      created_at: new Date().toISOString()
    }))

  return [...fundaCategories, ...otherCategories]
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!supabaseConfigured) {
      setCategories(getLocalCategories())
      setLoading(false)
      return
    }

    const data = await getCategories()
    if (data.length === 0) {
      setCategories(getLocalCategories())
    } else {
      setCategories(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return { categories, loading, error, refetch: fetchCategories }
}
