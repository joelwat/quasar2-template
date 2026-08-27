import registerCodeCoverageTasks from '@cypress/code-coverage/task';
import { getTestingConfig } from '@quasar/app-vite/testing';
import { defineConfig } from 'cypress';

export default defineConfig({
    fixturesFolder: 'test/cypress/fixtures',
    projectId: 'bkmavm',
    screenshotsFolder: 'test/cypress/screenshots',
    videosFolder: 'test/cypress/videos',
    video: true,
    e2e: {
        setupNodeEvents(on, config) {
            registerCodeCoverageTasks(on, config);
            return config;
        },
        baseUrl: 'http://localhost:3000/',
        supportFile: 'test/cypress/support/e2e.ts',
        specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    },
    component: {
        setupNodeEvents(on, config) {
            registerCodeCoverageTasks(on, config);
            return config;
        },
        supportFile: 'test/cypress/support/component.ts',
        specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
        indexHtmlFile: 'test/cypress/support/component-index.html',
        devServer: {
            framework: 'vue',
            bundler: 'vite',
            // @quasar/app-vite@3 exposes the SPA vite config for testing here.
            // The e2e-cypress AE's injectQuasarDevServerConfig() still targets
            // the pre-v3 internal path and throws ERR_PACKAGE_PATH_NOT_EXPORTED.
            viteConfig: async () => {
                const config = await getTestingConfig();
                // Let Cypress set `base` itself (matches what the AE used to do),
                // otherwise components that load public assets break.
                delete config.base;
                return config;
            },
        },
        // @ts-expect-error -- If not set it will break tests related to components that load public assets. See https://github.com/quasarframework/quasar-testing/issues/379
        devServerPublicPathRoute: ''
    },
});
