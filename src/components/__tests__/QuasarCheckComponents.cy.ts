import QuasarCheckComponents from '../QuasarCheckComponents.vue';

describe('QuasarCheckbox', () => {
    it('can be used with normal Cypress commands', () => {
        cy.mount(QuasarCheckComponents);

        cy.dataCy('checkbox').click();
        cy.dataCy('checkbox').should('have.attr', 'aria-checked', 'true');

        cy.dataCy('checkbox').click();
        cy.dataCy('checkbox').should('have.attr', 'aria-checked', 'false');
    });
});

describe('QuasarToggle', () => {
    it('can be used with normal Cypress commands', () => {
        cy.mount(QuasarCheckComponents);

        cy.dataCy('toggle').click();
        cy.dataCy('toggle').should('have.attr', 'aria-checked', 'true');

        cy.dataCy('toggle').click();
        cy.dataCy('toggle').should('have.attr', 'aria-checked', 'false');
    });
});

describe('QuasarToggle', () => {
    it('can be used with normal Cypress commands', () => {
        cy.mount(QuasarCheckComponents);

        cy.dataCy('radio-1').click();
        cy.dataCy('radio-1').should('have.attr', 'aria-checked', 'true');

        cy.dataCy('radio-2').click();
        cy.dataCy('radio-2').should('have.attr', 'aria-checked', 'true');
        cy.dataCy('radio-1').should('have.attr', 'aria-checked', 'false');
    });
});
