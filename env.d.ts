/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_PROJECT_ID: string
  readonly VITE_STORAGE_BUCKET: string
  readonly VITE_MESSAGING_SENDER_ID: string
  readonly VITE_APP_ID: string

  readonly VITE_FIREBASE_API_KEY_TEST: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN_TEST: string;
  readonly VITE_PROJECT_ID_TEST: string
  readonly VITE_STORAGE_BUCKET_TEST: string
  readonly VITE_MESSAGING_SENDER_ID_TEST: string
  readonly VITE_APP_ID_TEST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}