import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import pluginQuasar from '@quasar/app-vite/eslint';
import tsEslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import {
    defineConfigWithVueTs,
    vueTsConfigs,
} from '@vue/eslint-config-typescript';
import vueParser from "vue-eslint-parser";

interface PluginQuasar {
    configs: {
        recommended(): [{ ignores: string[] }];
    },
}

export default defineConfigWithVueTs([
    {
        /**
         * Ignore the following files.
         * Please note that pluginQuasar.configs.recommended() already ignores
         * the "node_modules" folder for you (and all other Quasar project
         * relevant folders and files).
         *
         * ESLint requires "ignores" key to be the only one in this object
         */
        ignores: [] // <<<---- here!
    },

    globalIgnores([
        'coverage/**/*',
        'node_modules/',
    ]),

    (pluginQuasar as PluginQuasar).configs.recommended(),
    js.configs.recommended,
    tsEslint.configs.strictTypeChecked,
    tsEslint.configs.stylisticTypeChecked,

    /**
     * https://eslint.vuejs.org
     *
     * pluginVue.configs.base
     *   -> Settings and rules to enable correct ESLint parsing.
     * pluginVue.configs[ 'flat/essential']
     *   -> base, plus rules to prevent errors or unintended behavior.
     * pluginVue.configs["flat/strongly-recommended"]
     *   -> Above, plus rules to considerably improve code readability and/or dev experience.
     * pluginVue.configs["flat/recommended"]
     *   -> Above, plus rules to enforce subjective community defaults to ensure consistency.
     */
    pluginVue.configs['flat/recommended'],

    {
        files: ['**/*.ts', '**/*.vue'],
        rules: {
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports' }
            ],
        },
    },

    vueTsConfigs.recommendedTypeChecked,

    {
        ignores: [
            'node_modules/',
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: vueParser,
            parserOptions: {
                extraFileExtensions: ['.vue'],
                parser: '@typescript-eslint/parser',
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ga: 'readonly',
                cordova: 'readonly',
                process: 'readonly',
                Capacitor: 'readonly',
                chrome: 'readonly',
                browser: 'readonly',
            },
        },

        // add your custom rules here
        rules: {
            'prefer-promise-reject-errors': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports' },
            ],

            // allow debugger during development only
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

            'indent': ['error', 4],
        },
        settings: {
            alias: {
                map: ['@/', './src'],
            },
        },
    },

    // {
    //     files: ['*.vue', '**/*.vue'],
    //     languageOptions: {
    //         parserOptions: {
    //             parser: '@typescript-eslint/parser',
    //         },
    //     },
    // },

    {
        files: ['src-pwa/custom-service-worker.ts'],
        languageOptions: {
            globals: {
                ...globals.serviceworker,
            },
        },
    },
]);
