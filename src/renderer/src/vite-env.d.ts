/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly RENDERER_VITE_APP_ID: string
  readonly RENDERER_VITE_AUTHORITY: string
  readonly RENDERER_VITE_REDIRECT_URI: string
  readonly RENDERER_VITE_GRAPH_ENDPOINT: string
  readonly RENDERER_VITE_API_ENDPOINT: string
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
