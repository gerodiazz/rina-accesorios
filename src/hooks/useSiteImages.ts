import { useState, useEffect, useCallback } from 'react'
import type { SiteImage } from '../types/database'
import { getSiteImages, getSiteImagesBySection } from '../services/siteImages'
import { supabaseConfigured } from '../lib/supabase'

export function useSiteImages(section?: string) {
  const [images, setImages] = useState<SiteImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchImages = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!supabaseConfigured) {
      setImages([])
      setLoading(false)
      return
    }

    const data = section
      ? await getSiteImagesBySection(section)
      : await getSiteImages()

    setImages(data)
    setLoading(false)
  }, [section])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  return { images, loading, error, refetch: fetchImages }
}
