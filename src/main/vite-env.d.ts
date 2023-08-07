/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_APP_ID: string
  readonly MAIN_VITE_AUTHORITY: string
  readonly MAIN_VITE_GRAPH_ENDPOINT: string
  readonly MAIN_VITE_API_ENDPOINT: string
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
