import './commands';
import { mount } from 'cypress/react';
import '@cypress/code-coverage/support';

Cypress.Commands.add('mount', (component, options = {}) => {
  return mount(component, options);
});
