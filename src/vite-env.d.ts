/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_INSTAGRAM_URL: string
  readonly VITE_TIKTOK_URL: string
  readonly VITE_BRAND_NAME: string
  readonly VITE_BRAND_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
