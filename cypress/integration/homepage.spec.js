describe('The homepage', () => {
  it('renders a page full of ships', () => {
    cy.visit('/');
    cy.contains('CR90 corvette');
    cy.contains('Sentinel-class landing craft');

    cy.findAllByText('Add to Cart').should('have.length', 10);
  });

  it('navigates to new pages', () => {
    cy.visit('/');

    cy.findByText('Next').click();
    cy.contains('Slave 1');

    cy.findByText('Next').click();
    cy.contains('Scimitar');

    cy.findByText('Go to first').click();
    cy.contains('CR90 corvette');
  });
});

describe('The theme switcher button', () => {
  beforeEach(() => {
    cy.setTheme('light');
  });

  it('toggles from light to dark appropriately', () => {
    cy.visit('/');

    cy.get('html').should('have.class', 'light');

    cy.get('button[name="dark-theme"]').click();

    cy.get('html').should('have.class', 'dark');
  });
});

describe('The notification system', () => {
  it('reacts appropriately to a ship being added to cart', () => {
    cy.visit('/');

    cy.get('button[name="add-cr90-corvette"]').click();
    cy.contains('Added CR90 corvette to cart');
  });

  it('reacts appropriately to a ship being removed from cart', () => {
    cy.visit('/');

    cy.get('button[name="add-cr90-corvette"]').click();
    cy.contains('Added CR90 corvette to cart');

    cy.get('button[name="remove-1-cr90-corvette"]').click();
    cy.contains('Removed CR90 corvette from cart');
  });

  it('reacts appropriately to all ships of one kind being removed from cart', () => {
    cy.visit('/');

    cy.get('button[name="add-cr90-corvette"]').click();
    cy.contains('Added CR90 corvette to cart');

    cy.get('button[name="remove-all-cr90-corvette"]').click();
    cy.contains('Removed all CR90 corvettes from cart');
  });
});
