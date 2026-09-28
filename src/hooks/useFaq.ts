import { useState, useEffect, useCallback } from 'react'
import type { FaqItem } from '../types/database'
import { getFaqItems } from '../services/faq'
import { supabaseConfigured } from '../lib/supabase'
import { faqItems as localFaqItems } from '../data/faq'

function mapLocalToDb(item: typeof localFaqItems[0], index: number): FaqItem {
  return {
    id: `local-faq-${index}`,
    question: item.question,
    answer: item.answer,
    order_index: index,
    active: true
  }
}

export function useFaq() {
  const [faqItems, setFaqItems] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFaqItems = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!supabaseConfigured) {
      setFaqItems(localFaqItems.map(mapLocalToDb))
      setLoading(false)
      return
    }

    const data = await getFaqItems()
    if (data.length === 0) {
      setFaqItems(localFaqItems.map(mapLocalToDb))
    } else {
      setFaqItems(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchFaqItems()
  }, [fetchFaqItems])

  return { faqItems, loading, error, refetch: fetchFaqItems }
}
