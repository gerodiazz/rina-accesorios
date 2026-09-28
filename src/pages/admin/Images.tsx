import { useState, useRef } from 'react'
import { uploadImage, deleteImage, getImagePathFromUrl, validateImageFile, ACCEPTED_IMAGE_TYPES } from '../../services/storage'
import { createSiteImage, deleteSiteImage } from '../../services/siteImages'
import { useSiteImages } from '../../hooks/useSiteImages'
import type { SiteImage } from '../../types/database'

export default function AdminImages() {
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [galleryUploading, setGalleryUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const { images: galleryImages, loading: loadingGallery, refetch } = useSiteImages('gallery')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setError(null)
    setUploading(true)
    const { url, error: uploadError } = await uploadImage('site-images', file)
    setUploading(false)

    if (url) {
      setUploadedUrl(url)
    } else {
      setError(uploadError ?? 'Error al subir la imagen')
    }
  }

  const handleGalleryFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    setError(null)
    setGalleryUploading(true)

    const errors: string[] = []
    for (const file of Array.from(fileList)) {
      const invalid = validateImageFile(file)
      if (invalid) {
        errors.push(invalid)
        continue
      }
      const { url, error: uploadError } = await uploadImage('site-images', file)
      if (!url) {
        errors.push(uploadError ?? `No se pudo subir "${file.name}"`)
        continue
      }
      const created = await createSiteImage({
        key: `gallery-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        url,
        alt: file.name.replace(/\.[^.]+$/, ''),
        section: 'gallery',
        description: null,
      })
      if (!created) errors.push(`"${file.name}" se subió pero no se pudo agregar a la galería.`)
    }

    setGalleryUploading(false)
    if (galleryInputRef.current) galleryInputRef.current.value = ''
    if (errors.length > 0) setError(errors.join('\n'))
    refetch()
  }

  const handleDelete = async (image: SiteImage) => {
    setError(null)
    const ok = await deleteSiteImage(image.id)
    if (!ok) {
      setError('No se pudo eliminar la imagen de la galería.')
      return
    }
    const path = getImagePathFromUrl(image.url)
    if (path && image.url.includes('/site-images/')) await deleteImage('site-images', path)
    refetch()
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-[#1A1A1A] mb-2">
          Imágenes del sitio
        </h1>
        <p className="font-sans text-[#6B6B6B]">
          Gestión de imágenes del sitio (hero, galería, etc.)
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg font-sans text-sm whitespace-pre-line mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="font-sans font-medium text-[#1A1A1A] mb-2">Galería</h3>
        <p className="font-sans text-sm text-[#6B6B6B] mb-4">
          Estas fotos se muestran en la galería del inicio y en /personalizar. Mientras no haya
          ninguna, el sitio muestra las fotos de ejemplo.
        </p>

        <input
          ref={galleryInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES}
          multiple
          onChange={e => handleGalleryFiles(e.target.files)}
          className="hidden"
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => !galleryUploading && galleryInputRef.current?.click()}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') galleryInputRef.current?.click() }}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); if (!galleryUploading) handleGalleryFiles(e.dataTransfer.files) }}
          className={`w-full px-4 py-8 rounded-lg border-2 border-dashed text-center cursor-pointer transition-colors mb-6 ${
            dragOver ? 'border-[#C9A96E] bg-[#FAF6EE]' : 'border-[#E5E2DC] hover:border-[#C9A96E]'
          } ${galleryUploading ? 'opacity-50 cursor-wait' : ''}`}
        >
          <p className="font-sans text-sm text-[#1A1A1A]">
            {galleryUploading ? 'Subiendo fotos...' : 'Hacé click o arrastrá fotos desde tu compu'}
          </p>
          <p className="font-sans text-xs text-[#6B6B6B] mt-1">JPG, PNG, WEBP o GIF · hasta 10 MB</p>
        </div>

        {loadingGallery ? (
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : galleryImages.length === 0 ? (
          <p className="font-sans text-sm text-[#6B6B6B]">Todavía no subiste fotos a la galería.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map(img => (
              <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden bg-[#F5F5F5]">
                <img src={img.url} alt={img.alt ?? ''} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleDelete(img)}
                  aria-label="Eliminar imagen"
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-red-600 leading-none shadow"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-sans font-medium text-[#1A1A1A] mb-2">Subir imagen suelta</h3>
        <p className="font-sans text-sm text-[#6B6B6B] mb-4">
          Sube la imagen a Supabase Storage y te da la URL para usarla en cualquier parte del sitio.
        </p>
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES}
            onChange={handleUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2.5 rounded-lg bg-[#1A1A1A] text-white font-sans text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50"
          >
            {uploading ? 'Subiendo...' : 'Seleccionar imagen'}
          </button>
          {uploadedUrl && (
            <div className="flex items-center gap-3 flex-1">
              <img src={uploadedUrl} alt="Uploaded" className="w-12 h-12 object-cover rounded" />
              <input
                type="text"
                value={uploadedUrl}
                readOnly
                onFocus={e => e.target.select()}
                className="flex-1 px-3 py-2 rounded-lg border border-[#E5E2DC] font-mono text-xs text-[#6B6B6B]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
