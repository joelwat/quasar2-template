/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="vue-i18n" />
/// <reference types="@intlify/unplugin-vue-i18n/messages" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
    readonly NODE_ENV: string;
    readonly VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    readonly VUE_ROUTER_BASE: string | undefined;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
