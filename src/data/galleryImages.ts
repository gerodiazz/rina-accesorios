export interface GalleryImage {
  id: string
  url: string
  alt: string
  height: number
}

/** Fallback usado cuando todavía no hay imágenes cargadas en Supabase. */
export const defaultGalleryImages: GalleryImage[] = [
  { id: 'rina-g1', url: 'https://picsum.photos/seed/rina-g1/400/280', alt: 'iPhone 15 Pro', height: 280 },
  { id: 'rina-g2', url: 'https://picsum.photos/seed/rina-g2/400/370', alt: 'Samsung S24', height: 370 },
  { id: 'rina-g3', url: 'https://picsum.photos/seed/rina-g3/400/310', alt: 'iPhone 14', height: 310 },
  { id: 'rina-g4', url: 'https://picsum.photos/seed/rina-g4/400/430', alt: 'Motorola Edge 50', height: 430 },
  { id: 'rina-g5', url: 'https://picsum.photos/seed/rina-g5/400/260', alt: 'iPhone 15 Pro Max', height: 260 },
  { id: 'rina-g6', url: 'https://picsum.photos/seed/rina-g6/400/390', alt: 'Samsung A55', height: 390 },
  { id: 'rina-g7', url: 'https://picsum.photos/seed/rina-g7/400/320', alt: 'iPhone 13', height: 320 },
  { id: 'rina-g8', url: 'https://picsum.photos/seed/rina-g8/400/350', alt: 'Xiaomi 14', height: 350 },
  { id: 'rina-g9', url: 'https://picsum.photos/seed/rina-g9/400/410', alt: 'iPhone 15', height: 410 },
  { id: 'rina-g10', url: 'https://picsum.photos/seed/rina-g10/400/275', alt: 'Samsung S24 Ultra', height: 275 },
  { id: 'rina-g11', url: 'https://picsum.photos/seed/rina-g11/400/445', alt: 'iPhone 14 Pro', height: 445 },
  { id: 'rina-g12', url: 'https://picsum.photos/seed/rina-g12/400/300', alt: 'Motorola G84', height: 300 },
]
