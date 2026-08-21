// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// DO NOT REMOVE
// Imports Quasar Cypress AE predefined commands
import { registerCommands } from '@quasar/quasar-app-extension-testing-e2e-cypress';
registerCommands();

// Quasar >= 2.25 moved `role="listbox"` off the QMenu root and onto an inner
// wrapper around the options, so the AE's `.q-menu[role=listbox]` portal selector
// no longer matches and `cy.withinSelectMenu()` (and the `select` override built on
// it) time out. Re-target the QMenu that *contains* the listbox instead.
type WithinPortalCallback = (currentSubject: JQuery) => void;

interface WithinSelectMenuOptions {
    fn: WithinPortalCallback;
    selector?: string;
    dataCy?: string;
    persistent?: boolean;
}

Cypress.Commands.overwrite(
    'withinSelectMenu',
    (
        _originalFn: unknown,
        fnOrOptions: WithinPortalCallback | WithinSelectMenuOptions,
    ) => {
        const options: WithinSelectMenuOptions = typeof fnOrOptions === 'function'
            ? { fn: fnOrOptions }
            : fnOrOptions;
        const {
            fn, persistent = false, dataCy, selector = '.q-menu',
        } = options;
        const portalSelector = dataCy === undefined
            ? `${selector}:has([role=listbox])`
            : `[data-cy=${dataCy}]`;

        return cy.withinPortal(portalSelector, fn).then(($el) => {
            if (!persistent) {
                cy.wrap($el).should('not.exist');
            }
        });
    },
);
