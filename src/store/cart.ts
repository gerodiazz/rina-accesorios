import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItemCustomization {
  style: string
  instructions: string
  imageFile?: string
  references?: string
  text?: string
  textFont?: string
  textColor?: string
}

export interface CartItem {
  id: string
  productId: string
  name: string
  phoneModel: string
  quantity: number
  customization?: CartItemCustomization
  thumbnail: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'rina-cart' }
  )
)
