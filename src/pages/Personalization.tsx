import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { usePhoneModels } from '../hooks/usePhoneModels'
import { useCategories } from '../hooks/useCategories'
import { useCartStore } from '../store/cart'

const textColors = [
  { id: 'Blanco', hex: '#FFFFFF' },
  { id: 'Negro', hex: '#1A1A1A' },
  { id: 'Dorado', hex: '#C9A96E' },
  { id: 'Blush', hex: '#E8C4B4' },
]

const schema = z.object({
  phoneModel: z.string().min(1, 'Elegí tu modelo de celular'),
  style: z.string().min(1, 'Elegí un estilo para tu funda'),
  instructions: z.string().min(10, 'Contanos un poco más sobre tu idea (mínimo 10 caracteres)'),
  text: z.string().optional(),
  textColor: z.string().optional(),
  references: z.string().optional(),
  quantity: z.number().min(1).max(20),
})

type FormValues = z.infer<typeof schema>

export default function Personalization() {
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const { phoneModels, modelsByBrand, loading: loadingModels } = usePhoneModels()
  const { categories, loading: loadingCategories } = useCategories()

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { phoneModel: '', style: '', instructions: '', text: '', textColor: '', references: '', quantity: 1 },
  })

  const styleValue = watch('style')
  const phoneModelValue = watch('phoneModel')
  const textColorValue = watch('textColor')

  // Filtrar categorías activas que son estilos de fundas
  const styleOptions = useMemo(() =>
    categories
      .filter(c => c.active)
      .filter(c =>
        c.slug.includes('stickers') ||
        c.slug.includes('dijes') ||
        c.slug.includes('flores') ||
        c.slug === 'series' ||
        c.slug === 'artistas'
      )
      .map(c => c.name),
    [categories]
  )

  // Modelos activos
  const activeModels = useMemo(() =>
    phoneModels.filter(m => m.active),
    [phoneModels]
  )

  const activeModelsByBrand = useMemo(() => {
    const groups: Record<string, typeof phoneModels> = {}
    activeModels.forEach((m) => {
      groups[m.brand] = groups[m.brand] ?? []
      groups[m.brand].push(m)
    })
    return groups
  }, [activeModels])

  // Modelos populares (primeros 4 de cada marca principal)
  const popularOptions = useMemo(() => {
    const popular: typeof phoneModels = []
    const brands = ['Apple', 'Samsung', 'Motorola', 'Xiaomi']
    brands.forEach(brand => {
      const brandModels = activeModelsByBrand[brand] ?? []
      if (brandModels.length > 0) {
        popular.push(brandModels[0])
      }
    })
    return popular.slice(0, 4)
  }, [activeModelsByBrand])

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null)
      return
    }
    const url = URL.createObjectURL(imageFile)
    setImagePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [imageFile])

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const modelLabel = activeModels.find((m) => m.id === data.phoneModel)?.name ?? data.phoneModel
    addItem({
      id: `custom-${Date.now()}`,
      productId: 'custom',
      name: `Personalizada — ${data.style}`,
      phoneModel: modelLabel,
      quantity: data.quantity,
      customization: {
        style: data.style,
        instructions: data.instructions,
        imageFile: imageFile?.name,
        references: data.references || undefined,
        text: data.text || undefined,
        textColor: data.textColor || undefined,
      },
      thumbnail: imagePreview ?? `https://picsum.photos/seed/custom-${data.style}/200/260`,
    })
    setSubmitted(true)
  }

  const handleAddAnother = () => {
    reset({ phoneModel: '', style: '', instructions: '', text: '', textColor: '', references: '', quantity: 1 })
    setImageFile(null)
    setSubmitted(false)
  }

  const loading = loadingModels || loadingCategories

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="pt-32 pb-20 px-5" style={{ background: 'var(--color-bg)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-lg mx-auto text-center card p-10"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl"
            style={{ background: 'var(--color-blush)' }}
          >
            ✓
          </div>
          <h1 className="font-display font-light text-3xl mb-3" style={{ color: 'var(--color-ink)' }}>
            ¡Agregado al carrito!
          </h1>
          <p className="font-sans font-light text-base mb-8" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
            Tu idea quedó guardada. Cuando termines de elegir todo, cerramos el pedido y coordinamos precio y envío por WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('/carrito')} className="btn-primary">
              Ir al carrito
            </button>
            <button onClick={handleAddAnother} className="btn-secondary">
              Personalizar otra funda
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="section-eyebrow block mb-3">Personalizar</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)' }}>
            Contanos tu idea,{' '}
            <em className="font-display font-light italic">la hacemos realidad</em>
          </h1>
          <p className="font-sans font-light text-base mt-4 max-w-lg mx-auto" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
            Completá el formulario y lo sumamos a tu carrito. El precio final y la
            coordinación de pago y envío se cierran por WhatsApp con nosotras — esto
            no es una compra online.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="card p-6 md:p-10 flex flex-col gap-8">
          {/* Phone model */}
          <div>
            <label className="block font-sans text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
              Modelo de celular
            </label>
            {popularOptions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {popularOptions.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setValue('phoneModel', m.id, { shouldValidate: true })}
                    className="font-sans text-sm px-3.5 py-1.5 rounded-full border transition-all duration-200"
                    style={
                      phoneModelValue === m.id
                        ? { background: 'var(--color-ink)', color: 'white', borderColor: 'var(--color-ink)' }
                        : { background: 'transparent', color: 'var(--color-ink)', borderColor: 'var(--color-border)' }
                    }
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            )}
            <select
              {...register('phoneModel')}
              className="w-full font-sans text-base px-4 py-3 rounded-md border bg-white"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
            >
              <option value="">Elegí tu modelo</option>
              {Object.entries(activeModelsByBrand).map(([brand, models]) => (
                <optgroup key={brand} label={brand}>
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {errors.phoneModel && (
              <p className="font-sans text-xs mt-1.5" style={{ color: '#C0392B' }}>
                {errors.phoneModel.message}
              </p>
            )}
          </div>

          {/* Style */}
          <div>
            <label className="block font-sans text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
              Estilo deseado
            </label>
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setValue('style', style, { shouldValidate: true })}
                  className="font-sans text-sm px-4 py-2 rounded-full border transition-all duration-200"
                  style={
                    styleValue === style
                      ? { background: 'var(--color-ink)', color: 'white', borderColor: 'var(--color-ink)' }
                      : { background: 'transparent', color: 'var(--color-ink)', borderColor: 'var(--color-border)' }
                  }
                >
                  {style}
                </button>
              ))}
            </div>
            {errors.style && (
              <p className="font-sans text-xs mt-1.5" style={{ color: '#C0392B' }}>
                {errors.style.message}
              </p>
            )}
          </div>

          {/* Image upload */}
          <div>
            <label className="block font-sans text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
              Subí una foto o referencia (opcional)
            </label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <img src={imagePreview} alt="Vista previa" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImageFile(null)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                    aria-label="Quitar imagen"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label
                  className="flex items-center justify-center w-20 h-20 rounded-md border-2 border-dashed cursor-pointer flex-shrink-0 transition-colors hover:border-accent"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}
                >
                  <span className="text-2xl font-light">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              )}
              <p className="font-sans text-xs" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                Esta imagen es solo de referencia, no se envía sola: te la vamos a pedir
                de nuevo por WhatsApp al coordinar tu pedido.
              </p>
            </div>
          </div>

          {/* Text on case */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-sans text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
                Texto en la funda (opcional)
              </label>
              <input
                type="text"
                {...register('text')}
                placeholder='Ej: "Vale" o una frase corta'
                className="w-full font-sans text-base px-4 py-3 rounded-md border bg-white"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
              />
            </div>
            <div>
              <label className="block font-sans text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
                Color del texto
              </label>
              <div className="flex gap-2.5 pt-1">
                {textColors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setValue('textColor', c.id, { shouldValidate: true })}
                    className="w-9 h-9 rounded-full transition-transform duration-150"
                    style={{
                      background: c.hex,
                      border: c.hex === '#FFFFFF' ? '1px solid var(--color-border)' : 'none',
                      outline: textColorValue === c.id ? '2px solid var(--color-accent)' : 'none',
                      outlineOffset: '2px',
                      transform: textColorValue === c.id ? 'scale(1.1)' : 'scale(1)',
                    }}
                    aria-label={c.id}
                    title={c.id}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="block font-sans text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
              Contanos tu idea
            </label>
            <textarea
              {...register('instructions')}
              rows={4}
              placeholder="Describí cómo te imaginás tu funda: colores, elementos, inspiración..."
              className="w-full font-sans text-base px-4 py-3 rounded-md border bg-white resize-none"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
            />
            {errors.instructions && (
              <p className="font-sans text-xs mt-1.5" style={{ color: '#C0392B' }}>
                {errors.instructions.message}
              </p>
            )}
          </div>

          {/* References */}
          <div>
            <label className="block font-sans text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
              Referencias (opcional)
            </label>
            <input
              type="text"
              {...register('references')}
              placeholder="Link de Pinterest, Instagram o cualquier inspiración"
              className="w-full font-sans text-base px-4 py-3 rounded-md border bg-white"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-sans text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
              Cantidad
            </label>
            <input
              type="number"
              min={1}
              max={20}
              {...register('quantity', { valueAsNumber: true })}
              className="w-24 font-sans text-base px-4 py-3 rounded-md border bg-white"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
            />
          </div>

          <div>
            <button type="submit" className="btn-primary w-full md:w-auto">
              Agregar al carrito
            </button>
            <p className="font-sans text-xs mt-3" style={{ color: 'var(--color-ink-muted)' }}>
              Precio a coordinar por WhatsApp según diseño y modelo. Este formulario no
              procesa pagos.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
