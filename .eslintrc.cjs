/* eslint-disable vue/max-len */
/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
    // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
    // This option interrupts the configuration hierarchy at this file
    // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
    root: true,

    // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
    // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
    parser: 'vue-eslint-parser', // is already included with any 'plugin:vue/**' config and should be omitted
    parserOptions: {
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser',
        project: [
            './tsconfig.json',
            './tsconfig.app.json',
            './tsconfig.tests.json',
            './tsconfig.node.json',
        ],
        tsconfigRootDir: __dirname,
    },

    env: {
        browser: true,
        es2022: true,
        node: true,
        'vue/setup-compiler-macros': true,
    },

    // Rules order is important, please avoid shuffling them
    extends: [
        // Base ESLint recommended rules
        // 'eslint:recommended',

        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
        // ESLint typescript rules
        // 'plugin:@typescript-eslint/recommended',

        'airbnb-base',
        'airbnb-typescript/base',

        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:@typescript-eslint/strict-type-checked',

        // Uncomment any of the lines below to choose desired strictness,
        // but leave only one uncommented!
        // See https://eslint.vuejs.org/rules/#available-rules
        // 'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
        // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
        'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

        // 'plugin:@intlify/vue-i18n/recommended',
    ],

    plugins: [
        // required to apply rules which need type information
        '@typescript-eslint',

        // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
        // required to lint *.vue files
        'vue',

    ],

    overrides: [
        {
            files: [
                'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
            ],
            extends: [
                'plugin:cypress/recommended',
            ],
        },
        {
            files: ['*.js'],
            extends: ['plugin:@typescript-eslint/disable-type-checked'],
        },
    ],

    globals: {
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        __statics: 'readonly',
        __QUASAR_SSR__: 'readonly',
        __QUASAR_SSR_SERVER__: 'readonly',
        __QUASAR_SSR_CLIENT__: 'readonly',
        __QUASAR_SSR_PWA__: 'readonly',
        process: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly',
    },

    // add your custom rules here
    rules: {
        'no-param-reassign': 'off',
        'no-void': 'off',
        'no-nested-ternary': 'off',
        'max-classes-per-file': 'off',

        'no-shadow': 'off',
        // '@typescript-eslint/no-shadow': 'error',

        'import/first': 'off',
        'import/named': 'error',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/export': 'error',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',

        'prefer-promise-reject-errors': 'off',

        quotes: ['warn', 'single', { avoidEscape: true }],

        // this rule, if on, would require explicit return type on the `render` function
        '@typescript-eslint/explicit-function-return-type': 'off',

        // in plain CommonJS modules, you can't use `import foo = require('foo')`
        // to pass this rule, so it has to be disabled
        '@typescript-eslint/no-var-requires': 'off',

        // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
        // does not work with type definitions
        'no-unused-vars': 'off',

        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

        // allow debugger during development only
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'ignore',
        }],
        'no-use-before-define': 'off', // Disabled because Typescript version is used
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/naming-convention': 'off',
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-unused-vars': 'off',
        'vue/html-indent': ['error', 4],

        // Allow line breaks after an implicit return to shorten lines
        'implicit-arrow-linebreak': 'off',

        // Modifying parameters is sometimes necessary

        'vue/block-lang': ['error', {
            script: {
                allowNoLang: true,
                lang: 'ts',
            },
        }],
        'max-len': 'off',
        // 'vue/max-len': ['error', {
        //     code: 120,
        //     ignorePattern: '^\\s*d="[\\s\\w\\.\\-]*"', // ignore length of svg d attributes
        // }],
        'vue/multi-word-component-names': 'off',

        // Disabled for compatibility with old code
        'no-underscore-dangle': 'off',
    },

    settings: {
        'vue-i18n': {
            localeDir: './src/i18n/**/*.yaml',
            messageSyntaxVersion: '^9.0.0',
        },
    },
};
