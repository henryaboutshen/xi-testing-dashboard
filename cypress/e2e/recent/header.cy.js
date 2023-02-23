/// <reference types="cypress" />

describe('navigation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('page header should be dashboard', () => {
        cy.get('header .MuiTypography-root').should('have.length', 1);
        cy.get('header .MuiTypography-root').should('have.text', 'Xi Testing Dashboard');
    });
});
