import { useState } from 'react'
import { useFaq } from '../../hooks/useFaq'
import { createFaqItem, updateFaqItem, deleteFaqItem, toggleFaqItemActive } from '../../services/faq'
import { Accordion } from '../../components/ui/Accordion'

export default function AdminFaq() {
  const { faqItems, refetch } = useFaq()
  const [editing, setEditing] = useState<string | null>(null)
  const [editQuestion, setEditQuestion] = useState('')
  const [editAnswer, setEditAnswer] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEdit = (item: typeof faqItems[0]) => {
    setEditing(item.id)
    setEditQuestion(item.question)
    setEditAnswer(item.answer)
  }

  const handleSaveEdit = async () => {
    if (!editing) return
    setSaving(true)
    setError(null)
    const updated = await updateFaqItem(editing, { question: editQuestion, answer: editAnswer })
    if (!updated) {
      setError('No se pudo guardar la pregunta. Revisá tu conexión y volvé a intentar.')
      setSaving(false)
      return
    }
    setEditing(null)
    setSaving(false)
    refetch()
  }

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    setError(null)
    const updated = await toggleFaqItemActive(id, !currentActive)
    if (!updated) {
      setError('No se pudo cambiar el estado de la pregunta.')
      return
    }
    refetch()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta pregunta?')) return
    setError(null)
    const ok = await deleteFaqItem(id)
    if (!ok) {
      setError('No se pudo eliminar la pregunta.')
      return
    }
    refetch()
  }

  const handleCreateNew = async () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return
    setSaving(true)
    setError(null)
    const created = await createFaqItem({
      question: newQuestion,
      answer: newAnswer,
      order_index: faqItems.length,
      active: true
    })
    if (!created) {
      setError('No se pudo crear la pregunta.')
      setSaving(false)
      return
    }
    setShowNew(false)
    setNewQuestion('')
    setNewAnswer('')
    setSaving(false)
    refetch()
  }

  const previewItems = faqItems
    .filter(i => i.active)
    .map(i => ({ question: i.question, answer: i.answer }))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light text-[#1A1A1A] mb-2">
            FAQ
          </h1>
          <p className="font-sans text-[#6B6B6B]">
            Preguntas frecuentes del sitio
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="px-4 py-2.5 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm font-medium hover:bg-[#333] transition-colors"
        >
          + Nueva pregunta
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg font-sans text-sm mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-4">
          {showNew && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-sans font-medium text-[#1A1A1A] mb-4">Nueva pregunta</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newQuestion}
                  onChange={e => setNewQuestion(e.target.value)}
                  placeholder="Pregunta"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans"
                />
                <textarea
                  value={newAnswer}
                  onChange={e => setNewAnswer(e.target.value)}
                  placeholder="Respuesta"
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] font-sans resize-none"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleCreateNew}
                    disabled={saving || !newQuestion.trim() || !newAnswer.trim()}
                    className="px-4 py-2 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm disabled:opacity-50"
                  >
                    {saving ? 'Guardando...' : 'Crear'}
                  </button>
                  <button
                    onClick={() => { setShowNew(false); setNewQuestion(''); setNewAnswer('') }}
                    className="px-4 py-2 rounded-lg bg-[#F5F5F5] text-[#1A1A1A] font-sans text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {faqItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-4">
              {editing === item.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editQuestion}
                    onChange={e => setEditQuestion(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#E5E2DC] font-sans text-sm"
                  />
                  <textarea
                    value={editAnswer}
                    onChange={e => setEditAnswer(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 rounded border border-[#E5E2DC] font-sans text-sm resize-none"
                  />
                  <div className="flex gap-2">
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
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-[#1A1A1A] mb-1">
                      {item.question}
                    </p>
                    <p className="font-sans text-xs text-[#6B6B6B] line-clamp-2">
                      {item.answer}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleActive(item.id, item.active)}
                      className={`w-8 h-5 rounded-full relative transition-colors ${
                        item.active ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          item.active ? 'left-3.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 rounded hover:bg-[#F5F5F5]"
                    >
                      <svg className="w-4 h-4 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded hover:bg-red-50 text-red-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preview */}
        <div>
          <div className="sticky top-8">
            <h3 className="font-sans font-medium text-[#1A1A1A] mb-4">Vista previa</h3>
            <div className="bg-[#FAFAF8] rounded-xl p-6">
              <div className="bg-white rounded-xl px-6 py-4" style={{ boxShadow: 'var(--shadow-card)' }}>
                <Accordion items={previewItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
