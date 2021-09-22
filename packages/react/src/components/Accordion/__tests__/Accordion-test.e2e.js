/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/components/accordion/_accordion.scss';

import React from 'react';
import { mount } from '@cypress/react';
import { default as Accordion, AccordionItem } from '..';
import AccordionSkeleton from '../Accordion.Skeleton';

describe('Accordion', () => {
  beforeEach(() => {
    mount(
      <>
        <Accordion>
          <AccordionItem title="Section 1">Panel 1</AccordionItem>
          <AccordionItem title="Section 2">Panel 2</AccordionItem>
          <AccordionItem title="Section 3">Panel 3</AccordionItem>
        </Accordion>
        <AccordionSkeleton count={3} />
      </>
    );
  });

  it('should render', () => {
    cy.findByText(/Section 1/).should('be.visible');
    cy.findByText(/Section 2/).should('be.visible');
    cy.findByText(/Section 3/).should('be.visible');

    cy.findByText(/Panel 1/).should('not.be.visible');
    cy.findByText(/Panel 2/).should('not.be.visible');
    cy.findByText(/Panel 3/).should('not.be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });

  it('should tab between items and open on space', () => {
    // in order for realPress('Tab') to work, something must be focused first.
    // cy.get('body').focus() does not work
    // cy.get('body').realClick() does not work because the click seems to be happen at the center of the element, which opens an accordion item
    cy.findByRole('button', { name: /Section 1/i }).focus();

    cy.realPress('Tab');
    cy.findByRole('button', { name: /Section 2/i }).should('be.focused');

    cy.realPress('Tab');
    cy.findByRole('button', { name: /Section 3/i })
      .should('be.focused')
      .realPress('Space');
    cy.findByText(/Panel 1/).should('not.be.visible');
    cy.findByText(/Panel 2/).should('not.be.visible');
    cy.findByText(/Panel 3/).should('be.visible');
    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();

    cy.realPress(['Shift', 'Tab']);
    cy.realPress('Space');
    cy.realPress(['Shift', 'Tab']);
    cy.realPress('Space');

    cy.findByText(/Panel 1/).should('be.visible');
    cy.findByText(/Panel 2/).should('be.visible');
    cy.findByText(/Panel 3/).should('be.visible');
  });
});
