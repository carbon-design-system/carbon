/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/components/checkbox/_checkbox.scss';

import React from 'react';
import { mount } from '@cypress/react';
import Checkbox from '../Checkbox';
import CheckboxSkeleton from '../Checkbox/Checkbox.Skeleton';

describe('Checkbox', () => {
  beforeEach(() => {
    mount(
      <fieldset className={`fieldset`}>
        <legend className={`label`}>Checkbox heading</legend>
        <Checkbox labelText={`Checkbox label 1`} id="checkbox-label-1" />
        <Checkbox labelText={`Checkbox label 2`} id="checkbox-label-2" />
        <CheckboxSkeleton />
      </fieldset>
    );
  });

  it('should render unselected', () => {
    cy.findByText(/Checkbox label 1/).should('be.visible');
    cy.findByText(/Checkbox label 2/).should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });

  it('should be selected and focused on click', () => {
    // must force the interaction because cypress detects the original
    // input hidden due to how we style the checkbox
    cy.findByLabelText('Checkbox label 1').click({ force: true });
    cy.findByLabelText(/Checkbox label 1/)
      .should('be.visible')
      .and('have.focus')
      .and('be.checked');

    cy.findByLabelText('Checkbox label 2').click({ force: true });
    cy.findByLabelText(/Checkbox label 2/)
      .should('be.visible')
      .and('have.focus')
      .and('be.checked');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });
});
