/// <reference types="cypress" />
declare module '@quasar/quasar-app-extension-testing-e2e-cypress/cct-dev-server' {
    function injectQuasarDevServerConfig(): Cypress.DevServerConfigOptions;
}
