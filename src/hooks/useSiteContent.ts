import { useState, useEffect, useCallback } from 'react'
import { getSiteContent, updateSiteContent as updateContent, updateSiteContentBatch } from '../services/siteContent'
import { supabaseConfigured } from '../lib/supabase'

const defaultContent: Record<string, string> = {
  'home.hero.eyebrow': 'Fundas personalizadas · Hecho en Argentina',
  'home.hero.title_line1': 'Fundas que',
  'home.hero.title_line2': 'te definen.',
  'home.hero.subtitle': 'Tu celular, tu estilo, tu historia. Cada pieza es única como vos.',
  'home.hero.cta_primary': 'Ver catálogo',
  'home.hero.cta_secondary': 'Personalizar la mía',
  'home.hero.social_proof': '+200 clientes satisfechas',
  'home.benefits.eyebrow': 'Por qué elegirnos',
  'home.benefits.title': 'Lo que nos hace diferentes',
  'home.benefits.item1_title': 'Diseños únicos',
  'home.benefits.item1_desc': 'Cada funda es un diseño exclusivo, no hay dos iguales.',
  'home.benefits.item2_title': 'Personalización completa',
  'home.benefits.item2_desc': 'Subí tu foto, pedí tu diseño o elegí del catálogo.',
  'home.benefits.item3_title': 'Gran variedad de modelos',
  'home.benefits.item3_desc': '+100 modelos disponibles. Siempre actualizamos.',
  'home.benefits.item4_title': 'Atención personalizada',
  'home.benefits.item4_desc': 'Hablás directo con la creadora. Sin intermediarios.',
  'home.how.eyebrow': 'El proceso',
  'home.how.title': 'Pedido en 4 pasos',
  'home.how.step1_title': 'Elegís tu modelo',
  'home.how.step1_desc': 'Buscá tu celular entre más de 100 modelos disponibles.',
  'home.how.step2_title': 'Elegís tu diseño',
  'home.how.step2_desc': 'Del catálogo o personalizás desde cero con tu idea.',
  'home.how.step3_title': 'Enviás el pedido',
  'home.how.step3_desc': 'Todo queda registrado en tu carrito con todos los detalles.',
  'home.how.step4_title': 'Coordinamos por WhatsApp',
  'home.how.step4_desc': 'Te contactamos para confirmar, pagar y coordinar la entrega.',
  'home.testimonials.eyebrow': 'Lo que dicen',
  'home.testimonials.title': 'Clientes que nos eligen de nuevo',
  'home.cta.eyebrow': 'Empezá ahora',
  'home.cta.title_line1': '¿Lista para tu',
  'home.cta.title_line2': 'funda perfecta?',
  'home.cta.subtitle': 'Diseñada para vos, entregada con amor.',
  'home.cta.button_primary': 'Empezar mi diseño',
  'home.cta.button_secondary': 'Ver el catálogo',
  'config.brand_name': 'Rina Accesorios',
}

export function useSiteContent() {
  const [content, setContent] = useState<Record<string, string>>(defaultContent)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!supabaseConfigured) {
      setContent(defaultContent)
      setLoading(false)
      return
    }

    const data = await getSiteContent()
    if (Object.keys(data).length === 0) {
      setContent(defaultContent)
    } else {
      setContent({ ...defaultContent, ...data })
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const updateSiteContent = useCallback(async (key: string, value: string) => {
    const success = await updateContent(key, value)
    if (success) {
      setContent(prev => ({ ...prev, [key]: value }))
    }
    return success
  }, [])

  const updateBatch = useCallback(async (updates: { key: string; value: string }[]) => {
    const success = await updateSiteContentBatch(updates)
    if (success) {
      setContent(prev => {
        const newContent = { ...prev }
        updates.forEach(({ key, value }) => {
          newContent[key] = value
        })
        return newContent
      })
    }
    return success
  }, [])

  const get = useCallback((key: string) => content[key] ?? '', [content])

  return { content, loading, error, refetch: fetchContent, updateSiteContent, updateBatch, get }
}
