import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import BrandCard from './BrandCard.jsx';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-cy="location">{location.pathname}</div>;
};

describe('<BrandCard />', () => {
  const mockProps = {
    id: 1,
    name: 'Audi',
    country: 'Germany',
    logoUrl: 'audi.png',
  };

  it('відображає дані та переходить за посиланням', () => {
    cy.mount(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<BrandCard {...mockProps} />} />
          <Route path="/brands/:id" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>,
    );
    cy.contains('Audi').should('be.visible');
    cy.get('div[class*="brandCard"]').click();
    cy.get('[data-cy="location"]').should('have.text', '/brands/1');
  });

  it('показує плейсхолдер при помилці картинки', () => {
    cy.on('uncaught:exception', () => false);

    cy.mount(
      <MemoryRouter>
        <BrandCard {...mockProps} />
      </MemoryRouter>,
    );

    cy.get('img').trigger('error', { force: true });

    cy.contains('div', 'A').should('have.css', 'display', 'flex');
  });
});
