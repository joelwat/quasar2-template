import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import pluginQuasar from '@quasar/app-vite/eslint';
import tseslint from 'typescript-eslint';
import vueTsEslintConfig from '@vue/eslint-config-typescript';

export default tseslint.config(
    {
        /**
         * Ignore the following files.
         * Please note that pluginQuasar.configs.recommended() already ignores
         * the "node_modules" folder for you (and all other Quasar project
         * relevant folders and files).
         *
         * ESLint requires "ignores" key to be the only one in this object
         */
        ignores: [
            'coverage/**/*',
        ],
    },

    ...pluginQuasar.configs.recommended(),
    js.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,

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
    ...pluginVue.configs['flat/recommended'],

    // https://github.com/vuejs/eslint-config-typescript
    ...vueTsEslintConfig({
        // Optional: extend additional configurations from typescript-eslint'.
        // Supports all the configurations in
        // https://typescript-eslint.io/users/configs#recommended-configurations
        // extends: [
        //     // By default, only the recommended rules are enabled.
        //     // 'recommended',
        //     'strictTypeChecked',
        //     // You can also manually enable the stylistic rules.
        //     'stylisticTypeChecked',

        //     // Other utility configurations, such as 'eslintRecommended', (note that it's in camelCase)
        //     // are also extendable here. But we don't recommend using them directly.
        // ],
    }),

    {
        languageOptions: {
            ecmaVersion: 'latest',
            parserOptions: {
                projectService: true,
                parser: '@typescript-eslint/parser',
                tsconfigRootDir: import.meta.dirname,
            },
            sourceType: 'module',

            globals: {
                //             ...globals.browser,
                ...globals.node, // SSR, Electron, config files
                process: 'readonly', // process.env.*
                ga: 'readonly', // Google Analytics
                cordova: 'readonly',
                Capacitor: 'readonly',
                chrome: 'readonly', // BEX related
                browser: 'readonly', // BEX related
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
);
