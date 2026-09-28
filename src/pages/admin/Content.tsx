import { useState, useEffect } from 'react'
import { useSiteContent } from '../../hooks/useSiteContent'

interface ContentGroup {
  title: string
  icon: string
  keys: { key: string; label: string }[]
}

const contentGroups: ContentGroup[] = [
  {
    title: 'Hero',
    icon: '🎯',
    keys: [
      { key: 'home.hero.eyebrow', label: 'Texto superior' },
      { key: 'home.hero.title_line1', label: 'Título línea 1' },
      { key: 'home.hero.title_line2', label: 'Título línea 2' },
      { key: 'home.hero.subtitle', label: 'Subtítulo' },
      { key: 'home.hero.cta_primary', label: 'Botón primario' },
      { key: 'home.hero.cta_secondary', label: 'Botón secundario' },
      { key: 'home.hero.social_proof', label: 'Prueba social' },
    ]
  },
  {
    title: 'Beneficios',
    icon: '✨',
    keys: [
      { key: 'home.benefits.eyebrow', label: 'Texto superior' },
      { key: 'home.benefits.title', label: 'Título' },
      { key: 'home.benefits.item1_title', label: 'Beneficio 1 - Título' },
      { key: 'home.benefits.item1_desc', label: 'Beneficio 1 - Descripción' },
      { key: 'home.benefits.item2_title', label: 'Beneficio 2 - Título' },
      { key: 'home.benefits.item2_desc', label: 'Beneficio 2 - Descripción' },
      { key: 'home.benefits.item3_title', label: 'Beneficio 3 - Título' },
      { key: 'home.benefits.item3_desc', label: 'Beneficio 3 - Descripción' },
      { key: 'home.benefits.item4_title', label: 'Beneficio 4 - Título' },
      { key: 'home.benefits.item4_desc', label: 'Beneficio 4 - Descripción' },
    ]
  },
  {
    title: 'Cómo funciona',
    icon: '📋',
    keys: [
      { key: 'home.how.eyebrow', label: 'Texto superior' },
      { key: 'home.how.title', label: 'Título' },
      { key: 'home.how.step1_title', label: 'Paso 1 - Título' },
      { key: 'home.how.step1_desc', label: 'Paso 1 - Descripción' },
      { key: 'home.how.step2_title', label: 'Paso 2 - Título' },
      { key: 'home.how.step2_desc', label: 'Paso 2 - Descripción' },
      { key: 'home.how.step3_title', label: 'Paso 3 - Título' },
      { key: 'home.how.step3_desc', label: 'Paso 3 - Descripción' },
      { key: 'home.how.step4_title', label: 'Paso 4 - Título' },
      { key: 'home.how.step4_desc', label: 'Paso 4 - Descripción' },
    ]
  },
  {
    title: 'Testimonios',
    icon: '💬',
    keys: [
      { key: 'home.testimonials.eyebrow', label: 'Texto superior' },
      { key: 'home.testimonials.title', label: 'Título' },
    ]
  },
  {
    title: 'CTA Final',
    icon: '🚀',
    keys: [
      { key: 'home.cta.eyebrow', label: 'Texto superior' },
      { key: 'home.cta.title_line1', label: 'Título línea 1' },
      { key: 'home.cta.title_line2', label: 'Título línea 2' },
      { key: 'home.cta.subtitle', label: 'Subtítulo' },
      { key: 'home.cta.button_primary', label: 'Botón primario' },
      { key: 'home.cta.button_secondary', label: 'Link secundario' },
    ]
  },
]

export default function AdminContent() {
  const { content, loading, updateBatch, refetch } = useSiteContent()
  const [localContent, setLocalContent] = useState<Record<string, string>>({})
  const [expandedGroup, setExpandedGroup] = useState<string | null>('Hero')
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setLocalContent(content)
  }, [content])

  const handleChange = (key: string, value: string) => {
    setLocalContent(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const updates = Object.entries(localContent)
      .filter(([key, value]) => content[key] !== value)
      .map(([key, value]) => ({ key, value }))

    if (updates.length > 0) {
      await updateBatch(updates)
      await refetch()
    }
    setSaving(false)
    setHasChanges(false)
  }

  const handleReset = () => {
    setLocalContent(content)
    setHasChanges(false)
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light text-[#1A1A1A] mb-2">
            Contenido del Home
          </h1>
          <p className="font-sans text-[#6B6B6B]">
            Editá los textos de la página principal
          </p>
        </div>
        {hasChanges && (
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-lg bg-[#F5F5F5] text-[#1A1A1A] font-sans text-sm font-medium hover:bg-[#E5E2DC] transition-colors"
            >
              Descartar cambios
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2.5 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {contentGroups.map(group => {
          const isExpanded = expandedGroup === group.title

          return (
            <div key={group.title} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedGroup(isExpanded ? null : group.title)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#FAFAF8] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{group.icon}</span>
                  <span className="font-sans font-medium text-[#1A1A1A]">{group.title}</span>
                </div>
                <svg
                  className={`w-5 h-5 text-[#6B6B6B] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-[#E5E2DC] space-y-4">
                  {group.keys.map(({ key, label }) => (
                    <div key={key}>
                      <label className="block font-sans text-sm font-medium text-[#1A1A1A] mb-1.5">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={localContent[key] ?? ''}
                        onChange={e => handleChange(key, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
                      />
                      <p className="mt-1 font-mono text-xs text-[#6B6B6B]">{key}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
