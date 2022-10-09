/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */

before(() => {
  cy.intercept('**/graphql').as('notesApi');

  cy.signIn();
  cy.visit('/');

  cy.wait('@notesApi');
  cy.get('div').then(() => {
    cy.wait('@notesApi');
    Cypress.$('[data-testid^="test-delete-button-').each(() => {
      cy.get('[data-testid="test-delete-button-0"]').click();
    });
  });
});

after(() => {
  cy.clearLocalStorageSnapshot();
  cy.clearLocalStorage();
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.visit('/');
});

afterEach(() => {
  cy.saveLocalStorage();
});

describe('Note Capture', () => {
  it('should have header', () => {
    cy.get('h1').should('have.text', 'My Notes Appz');
  });

  it('should create a note when name and description provided', () => {
    cy.get('[data-testid=test-name-0]').should('not.exist');
    cy.get('[data-testid=test-description-0]').should('not.exist');

    cy.get('[data-testid=note-name-field]').type('test note');
    cy.get('[data-testid=note-description-field]').type('test note description');
    cy.get('[data-testid=note-form-submit]').click();

    cy.get('[data-testid=note-name-field]').should('have.value', '');
    cy.get('[data-testid=note-description-field]').should('have.value', '');

    cy.get('[data-testid=test-name-0]').should('have.text', 'test note');
    cy.get('[data-testid=test-description-0]').should('have.text', 'test note description');
  });

  it('should load previously saved notes on browser refresh', () => {
    cy.reload();

    cy.get('[data-testid=test-name-0]').should('have.text', 'test note');
    cy.get('[data-testid=test-description-0]').should('have.text', 'test note description');
  });

  it('should delete note', () => {
    cy.get('[data-testid=test-delete-button-0]').click();

    cy.get('[data-testid=test-name-0]').should('not.exist');
    cy.get('[data-testid=test-description-0]').should('not.exist');
  });

  it('should have an option to sign out', () => {
    cy.get('[data-testid=sign-out]').click();
    cy.get('[data-amplify-authenticator]').should('exist');
  });
});
