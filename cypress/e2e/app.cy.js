beforeEach(() => {
  cy.visit('/');
});

describe('React App', () => {
  it("should contain 'Learn React' link", () => {
    cy.contains(/learn react/i);
  });
});
