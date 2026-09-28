import { useState, useEffect } from 'react'
import { useSiteContent } from '../../hooks/useSiteContent'

const settingsKeys = [
  { key: 'config.brand_name', label: 'Nombre de la marca', placeholder: 'Rina Accesorios' },
  { key: 'config.whatsapp_number', label: 'Número de WhatsApp', placeholder: '5491112345678 (sin +)' },
  { key: 'config.instagram_url', label: 'URL de Instagram', placeholder: 'https://instagram.com/...' },
  { key: 'config.tiktok_url', label: 'URL de TikTok', placeholder: 'https://tiktok.com/@...' },
  { key: 'config.email', label: 'Email de contacto', placeholder: 'contacto@ejemplo.com' },
]

export default function AdminSettings() {
  const { content, loading, updateBatch, refetch } = useSiteContent()
  const [localSettings, setLocalSettings] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const settings: Record<string, string> = {}
    settingsKeys.forEach(({ key }) => {
      settings[key] = content[key] ?? ''
    })
    setLocalSettings(settings)
  }, [content])

  const handleChange = (key: string, value: string) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const updates = Object.entries(localSettings)
      .filter(([key, value]) => content[key] !== value)
      .map(([key, value]) => ({ key, value }))

    if (updates.length > 0) {
      await updateBatch(updates)
      await refetch()
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
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
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-[#1A1A1A] mb-2">
          Configuración
        </h1>
        <p className="font-sans text-[#6B6B6B]">
          Datos de contacto y configuración general del sitio
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {settingsKeys.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block font-sans text-sm font-medium text-[#1A1A1A] mb-1.5">
                {label}
              </label>
              <input
                type="text"
                value={localSettings[key] ?? ''}
                onChange={e => handleChange(key, e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
              />
            </div>
          ))}

          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
            {saved && (
              <span className="font-sans text-sm text-green-600">
                ✓ Guardado correctamente
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg">
          <p className="font-sans text-sm text-amber-800">
            <strong>Nota:</strong> El número de WhatsApp debe incluir el código de país sin el signo +.
            Ejemplo: 5491123456789 para Argentina.
          </p>
        </div>
      </div>
    </div>
  )
}
