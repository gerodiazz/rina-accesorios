import { useState } from 'react'
import { useCategories } from '../../hooks/useCategories'
import { updateCategory, deleteCategory, createCategory } from '../../services/categories'

export default function AdminCategories() {
  const { categories, refetch } = useCategories()
  const [editing, setEditing] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [saving, setSaving] = useState(false)

  const handleEdit = (cat: typeof categories[0]) => {
    setEditing(cat.id)
    setEditName(cat.name)
    setEditDesc(cat.description ?? '')
  }

  const handleSaveEdit = async () => {
    if (!editing) return
    setSaving(true)
    await updateCategory(editing, { name: editName, description: editDesc })
    setEditing(null)
    setSaving(false)
    refetch()
  }

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    await updateCategory(id, { active: !currentActive })
    refetch()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta categoría?')) return
    await deleteCategory(id)
    refetch()
  }

  const handleCreateNew = async () => {
    if (!newName.trim()) return
    setSaving(true)
    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    await createCategory({
      name: newName,
      slug,
      description: newDesc || null,
      active: true,
      order_index: categories.length
    })
    setShowNew(false)
    setNewName('')
    setNewDesc('')
    setSaving(false)
    refetch()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light text-[#1A1A1A] mb-2">
            Categorías
          </h1>
          <p className="font-sans text-[#6B6B6B]">
            Gestión de categorías de productos
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="px-4 py-2.5 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm font-medium hover:bg-[#333] transition-colors"
        >
          + Nueva categoría
        </button>
      </div>

      {showNew && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-sans font-medium text-[#1A1A1A] mb-4">Nueva categoría</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Nombre de la categoría"
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans"
            />
            <input
              type="text"
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              placeholder="Descripción (opcional)"
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans"
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
                onClick={() => { setShowNew(false); setNewName(''); setNewDesc('') }}
                className="px-4 py-2 rounded-lg bg-[#F5F5F5] text-[#1A1A1A] font-sans text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F5F5]">
            <tr>
              <th className="px-4 py-3 text-left font-sans text-xs font-medium text-[#6B6B6B] uppercase">
                Nombre
              </th>
              <th className="px-4 py-3 text-left font-sans text-xs font-medium text-[#6B6B6B] uppercase">
                Descripción
              </th>
              <th className="px-4 py-3 text-center font-sans text-xs font-medium text-[#6B6B6B] uppercase">
                Activo
              </th>
              <th className="px-4 py-3 text-right font-sans text-xs font-medium text-[#6B6B6B] uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E2DC]">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-[#FAFAF8]">
                <td className="px-4 py-3">
                  {editing === cat.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded border border-[#E5E2DC] font-sans text-sm"
                    />
                  ) : (
                    <span className="font-sans text-sm text-[#1A1A1A]">{cat.name}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing === cat.id ? (
                    <input
                      type="text"
                      value={editDesc}
                      onChange={e => setEditDesc(e.target.value)}
                      className="w-full px-3 py-1.5 rounded border border-[#E5E2DC] font-sans text-sm"
                    />
                  ) : (
                    <span className="font-sans text-sm text-[#6B6B6B]">{cat.description || '—'}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleToggleActive(cat.id, cat.active)}
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      cat.active ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        cat.active ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {editing === cat.id ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          disabled={saving}
                          className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] font-sans text-sm"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(cat)}
                          className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] hover:bg-[#E5E2DC] font-sans text-sm transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 font-sans text-sm text-red-600 transition-colors"
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
