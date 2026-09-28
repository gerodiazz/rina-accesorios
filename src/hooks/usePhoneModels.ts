import { useState, useEffect, useCallback, useMemo } from 'react'
import type { PhoneModel as DbPhoneModel } from '../types/database'
import { getPhoneModels } from '../services/phoneModels'
import { supabaseConfigured } from '../lib/supabase'
import { phoneModels as localPhoneModels, type PhoneModel as LocalPhoneModel } from '../data/phoneModels'

function mapLocalToDb(model: LocalPhoneModel, index: number): DbPhoneModel {
  return {
    id: model.id,
    brand: model.brand,
    name: model.name,
    slug: model.id,
    active: true,
    order_index: index
  }
}

export function usePhoneModels() {
  const [phoneModels, setPhoneModels] = useState<DbPhoneModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPhoneModels = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!supabaseConfigured) {
      setPhoneModels(localPhoneModels.map(mapLocalToDb))
      setLoading(false)
      return
    }

    const data = await getPhoneModels()
    if (data.length === 0) {
      setPhoneModels(localPhoneModels.map(mapLocalToDb))
    } else {
      setPhoneModels(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPhoneModels()
  }, [fetchPhoneModels])

  const modelsByBrand = useMemo(() => {
    const groups: Record<string, DbPhoneModel[]> = {}
    phoneModels.forEach(m => {
      groups[m.brand] = groups[m.brand] ?? []
      groups[m.brand].push(m)
    })
    return groups
  }, [phoneModels])

  return { phoneModels, modelsByBrand, loading, error, refetch: fetchPhoneModels }
}
