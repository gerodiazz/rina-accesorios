import { createContext, useContext, type ReactNode } from 'react'
import { useSiteContent } from '../hooks/useSiteContent'

interface SiteContentContextValue {
  get: (key: string) => string
  loading: boolean
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null)

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const { get, loading } = useSiteContent()

  return (
    <SiteContentContext.Provider value={{ get, loading }}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(SiteContentContext)
  if (!ctx) {
    throw new Error('useContent must be used within SiteContentProvider')
  }
  return ctx
}
