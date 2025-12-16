import InputField from './InputField.jsx';

describe('<InputField />', () => {
  it('працює як контрольований інпут', () => {
    const handleChange = cy.spy().as('onChange');

    cy.mount(
      <InputField
        placeholder="Enter text"
        onChange={handleChange}
        name="test-input"
      />,
    );

    cy.get('input').should('have.attr', 'placeholder', 'Enter text');

    cy.get('input').type('Hello');

    cy.get('@onChange').should('have.been.called');
  });
});
