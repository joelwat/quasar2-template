// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

/* eslint func-names: 0 */
/* eslint global-require: 0 */

import { fileURLToPath } from 'node:url';
import { configure } from 'quasar/wrappers';
import checker from 'vite-plugin-checker';
import Unocss from 'unocss/vite';
import Inspect from 'vite-plugin-inspect';
import tsconfigPaths from 'vite-tsconfig-paths';
import Layouts from 'vite-plugin-vue-layouts';
import VueRouter from 'unplugin-vue-router/vite';
import Yaml from '@rollup/plugin-yaml';

import unoConfig from './uno.config.mjs';

export default configure((ctx) => ({
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: [
        'axios',
        'i18n',
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: [
        'app.scss',
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
        // 'ionicons-v4',
        // 'mdi-v5',
        'fontawesome-v6',
        // 'eva-icons',
        // 'themify',
        // 'line-awesome',
        // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

        // 'roboto-font', // optional, you are not bound to it
        'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
        target: {
            browser: ['es2022', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
            node: 'node18',
        },

        vueRouterMode: 'history', // available values: 'hash', 'history'
        // vueRouterBase,
        // vueDevtools,
        vueOptionsAPI: true,

        sourcemap: ctx.prod
            ? false
            : 'inline',

        // publicPath: '/',
        // analyze: true,
        // envFolder: '',
        // envFiles: [],
        // rawDefine: {}
        // ignorePublicFolder: true,
        // minify: false,
        // polyfillModulePreload: true,
        // distDir
        vueDevtools: true,

        // extendViteConf (viteConf) {},
        // viteVuePluginOptions: {},

        vitePlugins: [
            [
                Inspect(),
            ],
            [
                checker({
                    eslint: {
                        lintCommand: 'eslint "./**/*.{js,ts,mjs,cjs,vue}"',
                    },
                    // stylelint: {
                    //     lintCommand: 'stylelint "./**/*.{css,scss,vue}"',
                    //     importMeta: import.meta,
                    // },
                    typescript: true,
                    vueTsc: {
                        tsconfigPath: 'tsconfig.vue-tsc.json',
                    },
                }), { server: false },
            ],
            [
                VueRouter({
                    routeBlockLang: 'yaml',
                }),
            ],
            [
                Layouts({
                    defaultLayout: 'MainLayout',
                }),
            ],
            [
                tsconfigPaths(),
            ],
            [
                '@intlify/unplugin-vue-i18n/vite', {
                    // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
                    // compositionOnly: false,

                    // if you want to use named tokens in your Vue I18n messages, such as 'Hello {name}',
                    // you need to set `runtimeOnly: false`
                    // runtimeOnly: false,

                    // you need to set i18n resource including paths !
                    include: [
                        fileURLToPath(new URL('./src/i18n', import.meta.url)),
                    ],
                    ssr: ctx.modeName === 'ssr',
                    strictMessage: false, // FIXME: Remove HTML from translations
                },
            ],
            [
                Unocss(unoConfig),
            ],
            [
                Yaml(),
            ],
        ],
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
        https: true,
        open: false, // opens browser window automatically
        port: 5173,
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
        autoImportComponentCase: 'pascal',
        config: {
            ripple: false,
        },

        // iconSet: 'material-icons', // Quasar icon set
        // lang: 'en-US', // Quasar language pack

        // For special cases outside of where the auto-import strategy can have an impact
        // (like functional components as one of the examples),
        // you can manually specify Quasar components/directives to be available everywhere:
        //
        // components: [],
        // directives: [],

        // Quasar plugins
        plugins: [],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   registerServiceWorker: 'src-pwa/register-service-worker',
    //   serviceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    // },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
        // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
        // will mess up SSR

        // extendSSRWebserverConf (esbuildConf) {},
        // extendPackageJson (json) {},

        pwa: false,

        // manualStoreHydration: true,
        // manualPostHydrationTrigger: true,

        prodPort: 3000, // The default port that the production server should use
        // (gets superseded if process.env.PORT is specified at runtime)

        middlewares: [
            'render', // keep this as last one
        ],
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
        workboxMode: 'generateSW', // or 'injectManifest'
        injectPwaMetaTags: true,
        swFilename: 'sw.js',
        manifestFilename: 'manifest.json',
        useCredentialsForManifestTag: false,
        // useFilenameHashes: true,
        // extendGenerateSWOptions (cfg) {}
        // extendInjectManifestOptions (cfg) {},
        // extendManifestJson (json) {}
        // extendPWACustomSWConf (esbuildConf) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
        // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
        hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
        // extendElectronMainConf (esbuildConf)
        // extendElectronPreloadConf (esbuildConf)

        inspectPort: 5858,

        bundler: 'packager', // 'packager' or 'builder'

        packager: {
            // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

            // OS X / Mac App Store
            // appBundleId: '',
            // appCategoryType: '',
            // osxSign: '',
            // protocol: 'myapp://path',

            // Windows only
            // win32metadata: { ... }
        },

        builder: {
            // https://www.electron.build/configuration/configuration

            appId: 'trex-hmt-ui',
        },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
        contentScripts: [
            'my-content-script',
        ],

        // extendBexScriptsConf (esbuildConf) {}
        // extendBexManifestJson (json) {}
    },
}));
