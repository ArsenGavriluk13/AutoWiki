import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import ModelCard from './ModelCard.jsx';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-cy="loc">{location.pathname}</div>;
};

describe('<ModelCard />', () => {
  const props = {
    brandId: '1',
    modelId: '101',
    brandName: 'BMW',
    modelName: 'X5',
  };

  it('відображає дані та навігує', () => {
    cy.mount(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ModelCard {...props} />} />
          <Route
            path="/brands/:bid/models/:mid"
            element={<LocationDisplay />}
          />
        </Routes>
      </MemoryRouter>,
    );

    cy.contains('BMW').should('be.visible');
    cy.get('div[class*="modelCard"]').click();
    cy.get('[data-cy="loc"]').should('have.text', '/brands/1/models/101');
  });
});
