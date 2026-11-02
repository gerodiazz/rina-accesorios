import { useState, useRef, useEffect } from 'react'
import {
  saveHeroImage,
  restoreDefaultHeroImage,
  validateHeroFile,
  checkIsAdmin,
  HERO_ACCEPTED_TYPES,
  HERO_MAX_SIZE_MB,
} from '../../services/heroImage'
import { useHeroImage } from '../../hooks/useHeroImage'

type Message = { type: 'success' | 'error'; text: string } | null

// Misma forma que el banner del inicio (3:4, foto recortada al centro)
function HeroFrame({ src, label }: { src: string; label: string }) {
  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-wide text-[#6B6B6B] mb-2">{label}</p>
      <div className="w-full max-w-[240px] aspect-[3/4] rounded-2xl overflow-hidden bg-[#F5F5F5] shadow-sm">
        <img src={src} alt={label} className="w-full h-full object-cover object-center" />
      </div>
    </div>
  )
}

export default function AdminHeroImage() {
  const { url: currentUrl, loading, refetch, isDefault } = useHeroImage()
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [message, setMessage] = useState<Message>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [adminError, setAdminError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    checkIsAdmin().then(({ isAdmin, error }) => {
      setIsAdmin(isAdmin)
      setAdminError(error)
    })
  }, [])

  // Libera la vista previa local cuando se reemplaza o se sale de la página
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const pickFile = (selected: File | undefined) => {
    if (!selected) return
    setMessage(null)
    const invalid = validateHeroFile(selected)
    if (invalid) {
      setMessage({ type: 'error', text: invalid })
      return
    }
    setFile(selected)
    setPreviewUrl(URL.createObjectURL(selected))
  }

  const cancel = () => {
    setFile(null)
    setPreviewUrl(null)
    setMessage(null)
  }

  const handleSave = async () => {
    if (!file) return
    setSaving(true)
    setMessage(null)
    const { error } = await saveHeroImage(file)
    setSaving(false)
    if (error) {
      setMessage({ type: 'error', text: error })
      return
    }
    setFile(null)
    setPreviewUrl(null)
    await refetch()
    setMessage({ type: 'success', text: '¡Listo! La nueva imagen de portada ya se ve en la página de inicio.' })
  }

  const handleRestore = async () => {
    if (!window.confirm('¿Volver a la imagen original de la web? La foto que subiste se va a borrar.')) return
    setRestoring(true)
    setMessage(null)
    const { error } = await restoreDefaultHeroImage()
    setRestoring(false)
    if (error) {
      setMessage({ type: 'error', text: error })
      return
    }
    await refetch()
    setMessage({ type: 'success', text: 'Se restauró la imagen original de la portada.' })
  }

  const busy = saving || restoring
  const canEdit = isAdmin === true

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-[#1A1A1A] mb-2">
          Imagen de portada
        </h1>
        <p className="font-sans text-[#6B6B6B]">
          Es la foto grande que aparece al entrar a la página de inicio.
        </p>
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded-lg font-sans text-sm mb-6 ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
          }`}
          role={message.type === 'error' ? 'alert' : 'status'}
        >
          {message.text}
        </div>
      )}

      {isAdmin === false && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg font-sans text-sm mb-6">
          {adminError ?? 'Tu usuario no tiene permiso de administrador para cambiar la portada.'}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-8 mb-6">
          {loading || !currentUrl ? (
            <div className="w-[240px] aspect-[3/4] rounded-2xl bg-[#F5F5F5] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <HeroFrame
              src={currentUrl}
              label={isDefault ? 'Publicada ahora (original)' : 'Publicada ahora'}
            />
          )}
          {previewUrl && <HeroFrame src={previewUrl} label="Vista previa de la nueva" />}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={HERO_ACCEPTED_TYPES.join(',')}
          onChange={e => { pickFile(e.target.files?.[0]); e.target.value = '' }}
          className="hidden"
        />

        {!file ? (
          <div
            role="button"
            tabIndex={0}
            aria-disabled={!canEdit || busy}
            onClick={() => canEdit && !busy && inputRef.current?.click()}
            onKeyDown={e => { if (canEdit && (e.key === 'Enter' || e.key === ' ')) inputRef.current?.click() }}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); if (canEdit && !busy) pickFile(e.dataTransfer.files?.[0]) }}
            className={`w-full px-4 py-8 rounded-lg border-2 border-dashed text-center transition-colors ${
              dragOver ? 'border-[#C9A96E] bg-[#FAF6EE]' : 'border-[#E5E2DC] hover:border-[#C9A96E]'
            } ${canEdit && !busy ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
          >
            <p className="font-sans text-sm text-[#1A1A1A]">
              Tocá acá para elegir una foto nueva (o arrastrala desde tu compu)
            </p>
            <p className="font-sans text-xs text-[#6B6B6B] mt-1">
              JPG, PNG o WEBP · hasta {HERO_MAX_SIZE_MB} MB · se ve mejor una foto vertical
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={busy || !canEdit}
              className="px-4 py-2.5 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="px-4 py-2.5 rounded-lg border border-[#E5E2DC] text-[#1A1A1A] font-sans text-sm hover:border-[#C9A96E] transition-colors disabled:opacity-50"
            >
              Elegir otra
            </button>
            <button
              type="button"
              onClick={cancel}
              disabled={busy}
              className="px-4 py-2.5 rounded-lg font-sans text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {!isDefault && !loading && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-sans font-medium text-[#1A1A1A] mb-2">Volver a la imagen original</h3>
          <p className="font-sans text-sm text-[#6B6B6B] mb-4">
            Saca la foto que subiste y vuelve a mostrar la imagen que tenía la web al principio.
          </p>
          <button
            type="button"
            onClick={handleRestore}
            disabled={busy || !canEdit}
            className="px-4 py-2.5 rounded-lg border border-red-200 text-red-600 font-sans text-sm hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {restoring ? 'Restaurando...' : 'Restaurar imagen original'}
          </button>
        </div>
      )}
    </div>
  )
}
