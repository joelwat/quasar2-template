# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies (uses Yarn 4 / Berry)
yarn

# Development server (runs on port 3000)
quasar dev

# Production build
quasar build

# Lint
yarn lint
yarn lint:fix

# Type checking
yarn typecheck

# Unit tests (Vitest)
yarn test:unit           # watch mode
yarn test:unit:ci        # single run
yarn test:unit:ui        # Vitest UI

# Cypress component tests
yarn test:component      # opens Cypress UI
yarn test:component:ci   # headless

# Cypress E2E tests (starts dev server automatically)
yarn test:e2e            # opens Cypress UI
yarn test:e2e:ci         # headless
```

To run a single Vitest test file: `yarn test:unit <path-to-file>`  
To run a single Cypress spec: open Cypress UI and select the spec, or use `--spec` flag.

## Architecture

This is a **Quasar v2 + Vite** application using Vue 3 Composition API with TypeScript strict mode.

### Key architectural decisions

**File-based routing**: Routes are auto-generated from `src/pages/` via `unplugin-vue-router`. The `[...path].vue` file is a catch-all 404 route. Route blocks use YAML (`routeBlockLang: 'yaml'` in quasar.config.ts).

**Layouts**: `vite-plugin-vue-layouts` wraps pages in layout components from `src/layouts/`. The default layout is `MainLayout`. Pages opt into different layouts via route blocks.

**State management**: Pinia, initialized in `src/stores/index.ts` via Quasar's `defineStore` wrapper. Individual stores go in `src/stores/` (see `example-store.ts`).

**Boot files**: App initialization logic lives in `src/boot/` and is registered in `quasar.config.ts → boot`. Currently: `i18n` (vue-i18n with YAML message files in `src/i18n/`) and `axios` (exports `api` instance pointing to `https://api.example.com`).

**CSS**: UnoCSS (Tailwind-compatible via `presetWind3`) is imported globally in `App.vue` as `uno.css`. Quasar's own Sass is loaded via `src/css/app.scss`. Both systems coexist.

**Path alias**: `@` maps to `./src`.

### Testing setup

- **Unit tests** (Vitest): Files in `test/vitest/__tests__/`. Uses `@quasar/quasar-app-extension-testing-unit-vitest` for `installQuasarPlugin()`. Setup file at `test/vitest/setup-file.ts`.
- **Component tests** (Cypress): Spec files co-located in `src/components/__tests__/*.cy.ts`. Uses Quasar's CCT dev server (`injectQuasarDevServerConfig()`). Custom commands include `cy.dataCy()` (selects by `data-cy` attribute) and `cy.colorAssertions()` (CSS color checks).
- **E2E tests** (Cypress): Specs in `test/cypress/e2e/`. Requires dev server running on port 3000 (handled automatically by `start-server-and-test`).
- **Code coverage**: Enabled for both component and E2E via `@cypress/code-coverage`.

### ESLint

Flat config (`eslint.config.ts`). Uses airbnb-base style, `typescript-eslint` strict+stylistic type-checked, `eslint-plugin-vue` recommended, and Quasar's recommended config. Key rule: **4-space indentation**. Type imports must use `import type`.
