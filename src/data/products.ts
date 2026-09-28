export type ProductCategory = 'fundas' | 'straps' | 'box' | 'llaveros' | 'giftcard'

export interface Product {
  id: string
  name: string
  description: string
  category: ProductCategory
  style: string[]
  compatibleModels: string[]
  images: string[]
  featured: boolean
  whatsappOnly?: boolean
  whatsappMessage?: string
  price?: string
}

export const products: Product[] = [
  // Fundas del catálogo
  {
    id: 'floral-blush-01',
    name: 'Floral Blush',
    description: 'Acuarela floral en tonos blush y sage sobre fondo crema. Delicada y atemporal.',
    category: 'fundas',
    style: ['Con flores y foto'],
    compatibleModels: ['iphone-15', 'iphone-15-pro', 'iphone-13-14', 'samsung-s24'],
    images: ['/mock/floral-blush-01.jpg', '/mock/floral-blush-02.jpg'],
    featured: true,
  },
  {
    id: 'dark-marble-01',
    name: 'Dark Marble',
    description: 'Mármol negro con vetas doradas. Elegancia en cada detalle.',
    category: 'fundas',
    style: ['Con dijes y deco'],
    compatibleModels: ['iphone-15-pro-max', 'iphone-14-pro', 'samsung-s24-ultra'],
    images: ['/mock/dark-marble-01.jpg'],
    featured: true,
  },
  {
    id: 'luna-gradient',
    name: 'Luna Gradient',
    description: 'Degradé lavanda a rosa. Suave, onírico, perfecto como regalo.',
    category: 'fundas',
    style: ['Con stickers y deco'],
    compatibleModels: ['iphone-13-14', 'iphone-15', 'samsung-a54'],
    images: ['/mock/luna-gradient-01.jpg'],
    featured: false,
  },
  {
    id: 'sage-minimal',
    name: 'Sage Minimal',
    description: 'Verde sage con líneas abstractas en dorado. Sofisticado y moderno.',
    category: 'fundas',
    style: ['Con dijes'],
    compatibleModels: ['iphone-15-pro', 'iphone-14-pro', 'samsung-s24-plus'],
    images: ['/mock/sage-minimal-01.jpg'],
    featured: true,
  },
  {
    id: 'retro-sunset',
    name: 'Retro Sunset',
    description: 'Paleta retro años 70: terracota, mostaza y marrón tostado.',
    category: 'fundas',
    style: ['Funda con stickers / fotos'],
    compatibleModels: ['iphone-15', 'iphone-13-14', 'samsung-s24', 'moto-edge-50-fusion'],
    images: ['/mock/retro-sunset-01.jpg'],
    featured: false,
  },
  {
    id: 'white-daisy',
    name: 'White Daisy',
    description: 'Margaritas blancas sobre fondo negro profundo. Contraste máximo, estilo editorial.',
    category: 'fundas',
    style: ['Con flores y deco'],
    compatibleModels: ['iphone-15-pro-max', 'iphone-15-pro', 'iphone-14-pro-max', 'samsung-s24-ultra'],
    images: ['/mock/white-daisy-01.jpg'],
    featured: true,
  },
  {
    id: 'pastel-cloud',
    name: 'Pastel Cloud',
    description: 'Nubes suaves en degradé pastel. Para las que aman lo dreamy.',
    category: 'fundas',
    style: ['Con stickers, dijes y deco'],
    compatibleModels: ['iphone-13-14', 'iphone-15', 'samsung-a55', 'samsung-a54'],
    images: ['/mock/pastel-cloud-01.jpg'],
    featured: false,
  },
  {
    id: 'mono-lines',
    name: 'Mono Lines',
    description: 'Líneas geométricas en blanco y negro. Minimalismo llevado al límite.',
    category: 'fundas',
    style: ['Series'],
    compatibleModels: ['iphone-15-pro', 'iphone-14-pro', 'samsung-s24', 'moto-edge-40'],
    images: ['/mock/mono-lines-01.jpg'],
    featured: false,
  },
  {
    id: 'kpop-vibes',
    name: 'K-Pop Vibes',
    description: 'Inspirada en tus artistas favoritos. Photocards y deco personalizada.',
    category: 'fundas',
    style: ['Artistas'],
    compatibleModels: ['iphone-15', 'iphone-16', 'samsung-a54', 'samsung-a55'],
    images: ['/mock/kpop-vibes-01.jpg'],
    featured: true,
  },
  {
    id: 'botanical-bloom',
    name: 'Botanical Bloom',
    description: 'Flores secas prensadas con dijes dorados. Naturaleza y elegancia.',
    category: 'fundas',
    style: ['Con flores, dijes y deco'],
    compatibleModels: ['iphone-15-pro', 'iphone-16-pro', 'samsung-s24'],
    images: ['/mock/botanical-bloom-01.jpg'],
    featured: false,
  },

  // Straps del catálogo
  {
    id: 'strap-pearls',
    name: 'Strap Perlas',
    description: 'Correa elegante con perlas y cuentas doradas. Ideal para eventos.',
    category: 'straps',
    style: [],
    compatibleModels: [],
    images: ['/mock/strap-pearls-01.jpg'],
    featured: true,
  },
  {
    id: 'strap-colorful',
    name: 'Strap Multicolor',
    description: 'Correa tejida con cuentas de colores vibrantes. Alegre y divertida.',
    category: 'straps',
    style: [],
    compatibleModels: [],
    images: ['/mock/strap-colorful-01.jpg'],
    featured: false,
  },
  {
    id: 'strap-custom',
    name: 'Strap Personalizado',
    description: 'Diseñá tu strap con los colores y charms que más te gusten. Único como vos.',
    category: 'straps',
    style: [],
    compatibleModels: [],
    images: ['/mock/strap-custom-01.jpg'],
    featured: true,
    whatsappOnly: true,
    whatsappMessage: 'Hola! Quiero consultar sobre un strap personalizado 🎨',
    price: 'A consultar',
  },

  // Box personalizada
  {
    id: 'box-custom',
    name: 'Box Personalizada',
    description: 'Cajas decoradas a mano para regalo. Perfectas para cumpleaños, aniversarios o fechas especiales.',
    category: 'box',
    style: [],
    compatibleModels: [],
    images: ['/mock/box-custom-01.jpg'],
    featured: true,
    whatsappOnly: true,
    whatsappMessage: 'Hola! Quiero consultar sobre una box personalizada 🎁',
    price: 'A consultar',
  },

  // Llaveros personalizados
  {
    id: 'keychain-custom',
    name: 'Llavero Personalizado',
    description: 'Llaveros únicos con tus fotos, iniciales o diseños favoritos. El complemento ideal.',
    category: 'llaveros',
    style: [],
    compatibleModels: [],
    images: ['/mock/keychain-custom-01.jpg'],
    featured: true,
    whatsappOnly: true,
    whatsappMessage: 'Hola! Quiero consultar sobre un llavero personalizado 🔑',
    price: 'A consultar',
  },

  // Gift Card
  {
    id: 'gift-card',
    name: 'Gift Card',
    description: 'Regalá la experiencia de elegir. La persona elige el monto y el diseño que más le guste.',
    category: 'giftcard',
    style: [],
    compatibleModels: [],
    images: ['/mock/gift-card-01.jpg'],
    featured: true,
    whatsappOnly: true,
    whatsappMessage: 'Hola! Quiero consultar sobre una Gift Card 🎀',
    price: 'A consultar',
  },
]

export const caseStyleOptions = [
  'Funda con stickers / fotos',
  'Con stickers y deco',
  'Con stickers, dijes y deco',
  'Con dijes',
  'Con dijes y deco',
  'Con flores y foto',
  'Con flores, foto y deco',
  'Con flores y deco',
  'Con flores y dijes',
  'Con flores, dijes y deco',
  'Series',
  'Artistas',
]

export const categoryLabels: Record<ProductCategory, string> = {
  fundas: 'Fundas',
  straps: 'Straps',
  box: 'Box',
  llaveros: 'Llaveros',
  giftcard: 'Gift Card',
}

export const allCategories: ProductCategory[] = ['fundas', 'straps', 'box', 'llaveros', 'giftcard']
