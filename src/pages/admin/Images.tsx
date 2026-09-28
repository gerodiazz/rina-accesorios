import { useState, useRef } from 'react'
import { uploadImage } from '../../services/storage'

export default function AdminImages() {
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const url = await uploadImage('site-images', file)
    setUploading(false)

    if (url) {
      setUploadedUrl(url)
    } else {
      alert('Error al subir la imagen')
    }
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

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="font-sans font-medium text-[#1A1A1A] mb-4">Subir nueva imagen</h3>
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
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
            <div className="flex items-center gap-3">
              <img src={uploadedUrl} alt="Uploaded" className="w-12 h-12 object-cover rounded" />
              <input
                type="text"
                value={uploadedUrl}
                readOnly
                className="flex-1 px-3 py-2 rounded-lg border border-[#E5E2DC] font-mono text-xs text-[#6B6B6B]"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-sans font-medium text-[#1A1A1A] mb-4">Imágenes del sitio</h3>
        <p className="font-sans text-sm text-[#6B6B6B] mb-6">
          Las imágenes se suben a Supabase Storage y pueden usarse en cualquier parte del sitio.
          Copiá la URL de la imagen después de subirla.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Placeholder items */}
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-[#F5F5F5] flex items-center justify-center text-[#6B6B6B]"
            >
              <span className="text-4xl">🖼️</span>
            </div>
          ))}
        </div>

        <p className="font-sans text-xs text-[#6B6B6B] mt-4">
          Nota: Para ver las imágenes existentes, ejecutá el seed en Supabase primero.
        </p>
      </div>
    </div>
  )
}
