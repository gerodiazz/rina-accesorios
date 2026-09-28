import { useState } from 'react'
import { usePhoneModels } from '../../hooks/usePhoneModels'
import { togglePhoneModelActive, createPhoneModel, deletePhoneModel } from '../../services/phoneModels'

export default function AdminPhoneModels() {
  const { modelsByBrand, refetch } = usePhoneModels()
  const [showNew, setShowNew] = useState(false)
  const [newBrand, setNewBrand] = useState<'Apple' | 'Samsung' | 'Motorola' | 'Xiaomi'>('Apple')
  const [newName, setNewName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedBrand, setExpandedBrand] = useState<string | null>('Apple')

  const brands = ['Apple', 'Samsung', 'Motorola', 'Xiaomi'] as const

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    setError(null)
    const ok = await togglePhoneModelActive(id, !currentActive)
    if (!ok) {
      setError('No se pudo cambiar el estado del modelo.')
      return
    }
    refetch()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este modelo?')) return
    setError(null)
    const ok = await deletePhoneModel(id)
    if (!ok) {
      setError('No se pudo eliminar el modelo. Puede estar asociado a productos.')
      return
    }
    refetch()
  }

  const handleCreateNew = async () => {
    if (!newName.trim()) return
    setSaving(true)
    setError(null)
    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const created = await createPhoneModel({
      brand: newBrand,
      name: newName,
      slug,
      active: true,
      order_index: (modelsByBrand[newBrand]?.length ?? 0)
    })
    if (!created) {
      setError('No se pudo crear el modelo. Puede que ya exista.')
      setSaving(false)
      return
    }
    setShowNew(false)
    setNewName('')
    setSaving(false)
    refetch()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light text-[#1A1A1A] mb-2">
            Modelos de celular
          </h1>
          <p className="font-sans text-[#6B6B6B]">
            Gestión de modelos compatibles
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="px-4 py-2.5 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm font-medium hover:bg-[#333] transition-colors"
        >
          + Nuevo modelo
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg font-sans text-sm mb-6">
          {error}
        </div>
      )}

      {showNew && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-sans font-medium text-[#1A1A1A] mb-4">Nuevo modelo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={newBrand}
              onChange={e => setNewBrand(e.target.value as typeof newBrand)}
              className="px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans"
            >
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Nombre del modelo"
              className="px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans"
            />
            <div className="flex gap-3">
              <button
                onClick={handleCreateNew}
                disabled={saving || !newName.trim()}
                className="px-4 py-2 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm disabled:opacity-50"
              >
                {saving ? 'Guardando...' : 'Crear'}
              </button>
              <button
                onClick={() => { setShowNew(false); setNewName('') }}
                className="px-4 py-2 rounded-lg bg-[#F5F5F5] text-[#1A1A1A] font-sans text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {brands.map(brand => {
          const models = modelsByBrand[brand] ?? []
          const isExpanded = expandedBrand === brand

          return (
            <div key={brand} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedBrand(isExpanded ? null : brand)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#FAFAF8] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {brand === 'Apple' && '🍎'}
                    {brand === 'Samsung' && '📱'}
                    {brand === 'Motorola' && '📲'}
                    {brand === 'Xiaomi' && '🎯'}
                  </span>
                  <span className="font-sans font-medium text-[#1A1A1A]">{brand}</span>
                  <span className="font-mono text-xs text-[#6B6B6B]">({models.length} modelos)</span>
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

              {isExpanded && models.length > 0 && (
                <div className="border-t border-[#E5E2DC]">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E2DC]">
                    {models.map(model => (
                      <div key={model.id} className="bg-white px-4 py-3 flex items-center justify-between">
                        <span className="font-sans text-sm text-[#1A1A1A]">{model.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleActive(model.id, model.active)}
                            className={`w-8 h-5 rounded-full relative transition-colors ${
                              model.active ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                                model.active ? 'left-3.5' : 'left-0.5'
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => handleDelete(model.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
