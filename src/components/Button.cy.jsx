import Button from './Button.jsx';

describe('<Button />', () => {
  it('рендеріть дітей та обробляє клік', () => {
    const handleClick = cy.spy().as('clickHandler');

    cy.mount(
      <Button onClick={handleClick} className="custom-class">
        Натисни мене
      </Button>,
    );

    cy.get('button').should('have.text', 'Натисни мене');

    cy.get('button').should('have.class', 'custom-class');

    cy.get('button').click();
    cy.get('@clickHandler').should('have.been.calledOnce');
  });
});
