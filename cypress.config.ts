import registerCodeCoverageTasks from '@cypress/code-coverage/task';
import { injectQuasarDevServerConfig } from '@quasar/quasar-app-extension-testing-e2e-cypress/cct-dev-server';
import { defineConfig } from 'cypress';

export default defineConfig({
    fixturesFolder: 'test/cypress/fixtures',
    projectId: 'bkmavm',
    screenshotsFolder: 'test/cypress/screenshots',
    videosFolder: 'test/cypress/videos',
    e2e: {
        setupNodeEvents(on, config) {
            registerCodeCoverageTasks(on, config);
            return config;
        },
        baseUrl: 'http://127.0.0.1:3000/',
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
        devServer: injectQuasarDevServerConfig(),
    },
});
