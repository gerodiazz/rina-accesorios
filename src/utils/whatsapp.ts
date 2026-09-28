import type { CartItem } from '../store/cart'

export function generateWhatsAppMessage(items: CartItem[], note: string): string {
  let message = '¡Hola! Te hago un pedido desde la web 🛍️\n\n📱 *Pedido:*\n\n'

  items.forEach((item, index) => {
    message += `*${index + 1}. ${item.name}*\n`
    message += `   Modelo: ${item.phoneModel}\n`
    message += `   Cantidad: ${item.quantity}\n`

    if (item.customization) {
      message += `   Tipo: Personalización propia\n`
      if (item.customization.instructions) {
        message += `   Descripción: ${item.customization.instructions}\n`
      }
      if (item.customization.style) {
        message += `   Estilo: ${item.customization.style}\n`
      }
      if (item.customization.references) {
        message += `   Referencias: ${item.customization.references}\n`
      }
      if (item.customization.text) {
        message += `   Texto en funda: "${item.customization.text}"\n`
      }
      if (item.customization.imageFile) {
        message += `   ⚠️ Tengo una imagen para enviar (te la mando por acá)\n`
      }
    } else {
      message += `   Tipo: Diseño del catálogo\n`
    }
    message += '\n'
  })

  if (note.trim()) {
    message += `💬 *Nota adicional:*\n   ${note}\n\n`
  }

  message += '¡Gracias! Quedo esperando para coordinar 🙏'
  return message
}

export function buildWhatsAppUrl(items: CartItem[], note: string): string {
  const message = generateWhatsAppMessage(items, note)
  const encoded = encodeURIComponent(message)
  const number = import.meta.env.VITE_WHATSAPP_NUMBER ?? ''
  return `https://wa.me/${number}?text=${encoded}`
}

export function buildWhatsAppConsultUrl(text?: string): string {
  const message = text ?? '¡Hola! Quiero consultar sobre fundas personalizadas.'
  const encoded = encodeURIComponent(message)
  const number = import.meta.env.VITE_WHATSAPP_NUMBER ?? ''
  return `https://wa.me/${number}?text=${encoded}`
}
