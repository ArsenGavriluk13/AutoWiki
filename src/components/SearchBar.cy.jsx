import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  it('рендерить інпут і селект та обробляє зміни', () => {
    const onSearchSpy = cy.spy().as('onSearch');
    const onFilterSpy = cy.spy().as('onFilter');

    cy.mount(
      <SearchBar
        searchPlaceholder="Search..."
        filterOptions={['Option A', 'Option B']}
        showFilter={true}
        filterValue="Option A"
        onSearchChange={onSearchSpy}
        onFilterChange={onFilterSpy}
      />,
    );

    cy.get('input[placeholder="Search..."]').type('test');
    cy.get('@onSearch').should('have.been.called');

    cy.get('select').select('Option B');

    cy.get('@onFilter').should('have.been.called');
  });

  it('ховає фільтр, якщо showFilter=false', () => {
    cy.mount(<SearchBar showFilter={false} filterOptions={['A', 'B']} />);
    cy.get('select').should('not.exist');
  });
});
