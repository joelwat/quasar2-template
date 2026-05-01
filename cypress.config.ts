import registerCodeCoverageTasks from '@cypress/code-coverage/task';
import { injectQuasarDevServerConfig } from '@quasar/quasar-app-extension-testing-e2e-cypress/cct-dev-server';
import { defineConfig } from 'cypress';
import type { Plugin, UserConfig } from 'vite';

const cypressCompatibleSassApiPlugin: Plugin = {
    name: 'cypress-compatible-sass-api',
    enforce: 'post',
    config() {
        return {
            css: {
                preprocessorOptions: {
                    sass: {
                        api: 'modern',
                    },
                    scss: {
                        api: 'modern',
                    },
                },
            },
        };
    },
};

function useCompatibleSassApi(viteConfig: UserConfig): UserConfig {
    viteConfig.plugins = [
        ...viteConfig.plugins ?? [],
        cypressCompatibleSassApiPlugin,
    ];

    return viteConfig;
}

function getComponentDevServerConfig(): Cypress.DevServerConfigOptions {
    const devServerConfig = injectQuasarDevServerConfig();

    if (devServerConfig.bundler !== 'vite') {
        return devServerConfig;
    }

    const { viteConfig } = devServerConfig;

    return {
        ...devServerConfig,
        viteConfig: async () => useCompatibleSassApi(
            typeof viteConfig === 'function'
                ? await viteConfig()
                : viteConfig ?? {},
        ),
    };
}

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
        devServer: getComponentDevServerConfig(),
    },
});
