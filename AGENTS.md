# Repository Guidelines

## Project Structure & Module Organization

This is a Quasar 2, Vue 3, TypeScript project. Application code lives in `src/`: pages in `src/pages`, layouts in `src/layouts`, reusable Vue components in `src/components`, Pinia stores in `src/stores`, boot files in `src/boot`, and i18n content in `src/i18n`. Global styles are in `src/css`, and static public assets are in `public`. Vitest tests are under `test/vitest/__tests__` or colocated as `src/**/*.vitest.test.ts`. Cypress e2e tests live in `test/cypress/e2e`; Cypress component tests are colocated in `src/components/__tests__`.

## Build, Test, and Development Commands

Use Yarn 4, as declared by `packageManager`.

- `yarn dev`: start the Quasar dev server with hot reload.
- `yarn build`: create a production build with `quasar build`.
- `yarn lint`: run ESLint across the project.
- `yarn lint:fix`: apply automatic ESLint fixes.
- `yarn typecheck`: run `vue-tsc --noEmit`.
- `yarn test:unit`: run Vitest in watch mode.
- `yarn test:unit:ci`: run Vitest once for CI.
- `yarn test:component:ci`: run Cypress component tests headlessly.
- `yarn test:e2e:ci`: start Quasar and run Cypress e2e tests headlessly.

## Coding Style & Naming Conventions

Write Vue single-file components with `<script setup lang="ts">` where possible. Use type-only imports for TypeScript types, for example `import type { Todo } from './models';`. ESLint enforces strict TypeScript rules and 4-space indentation in script/config files; existing Vue templates use Quasar/Vue multiline formatting for readable props and events. Name Vue components in PascalCase, stores with descriptive `*-store.ts` names, and Cypress specs as `*.cy.ts`.

## Testing Guidelines

Use Vitest for unit tests and Cypress for browser-facing behavior. Keep unit specs focused on component logic and rendering, and use Cypress component tests for Quasar UI interactions. Place e2e specs in `test/cypress/e2e/**/*.cy.ts`. Before opening a PR, run `yarn lint`, `yarn typecheck`, `yarn test:unit:ci`, and the relevant Cypress CI command.

## Commit & Pull Request Guidelines

Recent history uses concise, imperative commit messages such as `Fix some type errors`, `Update dependency cypress to v15.14.2`, and `Re-add @quasar/testing-vitest`. Keep commits focused and mention dependency updates explicitly. Pull requests should include a short description, linked issue or Renovate context when relevant, test results, and screenshots or videos for visible UI changes.

## Security & Configuration Tips

Do not commit local secrets or generated test artifacts. Cypress screenshots and videos are configured under `test/cypress/screenshots` and `test/cypress/videos`; keep only intentional debugging evidence. Prefer changes in `quasar.config.ts`, `vitest.config.mts`, and `cypress.config.ts` over ad hoc command-line overrides when behavior should be shared.
