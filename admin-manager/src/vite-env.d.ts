/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Passphrase that unlocks the dashboard. Set in `.env.local`. */
  readonly VITE_ADMIN_PASSCODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
