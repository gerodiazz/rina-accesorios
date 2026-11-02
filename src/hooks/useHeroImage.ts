import { useState, useEffect, useCallback } from 'react'
import { DEFAULT_HERO_IMAGE, getHeroImageUrl } from '../services/heroImage'
import { supabaseConfigured } from '../lib/supabase'

const CACHE_KEY = 'rina-hero-image'

function readCache(): string | null {
  try {
    return localStorage.getItem(CACHE_KEY)
  } catch {
    return null
  }
}

function writeCache(url: string) {
  try {
    localStorage.setItem(CACHE_KEY, url)
  } catch {
    // sin almacenamiento local: no pasa nada, solo no se cachea
  }
}

// URL de la imagen de portada. La fuente de verdad es Supabase; el valor en
// localStorage solo sirve para que quien vuelve a entrar vea la foto al instante.
export function useHeroImage() {
  const [url, setUrl] = useState<string | null>(() =>
    supabaseConfigured ? readCache() : DEFAULT_HERO_IMAGE
  )
  const [loading, setLoading] = useState(supabaseConfigured)

  const refetch = useCallback(async () => {
    if (!supabaseConfigured) {
      setUrl(DEFAULT_HERO_IMAGE)
      setLoading(false)
      return
    }
    const remote = await getHeroImageUrl()
    if (!remote.ok) {
      // Sin conexión con Supabase: se queda con lo cacheado, o la original
      setUrl(prev => prev ?? DEFAULT_HERO_IMAGE)
      setLoading(false)
      return
    }
    const next = remote.url ?? DEFAULT_HERO_IMAGE
    setUrl(next)
    writeCache(next)
    setLoading(false)
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { url, loading, refetch, isDefault: url === DEFAULT_HERO_IMAGE }
}
