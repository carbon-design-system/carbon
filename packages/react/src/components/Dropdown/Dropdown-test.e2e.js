/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/components/dropdown/_dropdown.scss';

import React from 'react';
import { mount } from '@cypress/react';
import { generateItems, generateGenericItem } from '../ListBox/test-helpers';
import Dropdown from '../Dropdown';
import DropdownSkeleton from '../Dropdown/Dropdown.Skeleton';

describe('Dropdown', () => {
  beforeEach(() => {
    const items = generateItems(5, generateGenericItem);
    const label = 'Dropdown menu options';
    const style = { marginBottom: '1rem' };
    mount(
      <>
        <Dropdown
          style={{ marginBottom: '14rem' }}
          items={items}
          label={label}
        />
        <Dropdown style={style} items={items} label={label} size="sm" />
        <Dropdown style={style} items={items} label={label} size="md" />
        <Dropdown style={style} items={items} label={label} size="lg" />
        <Dropdown style={style} items={items} label={label} size="xl" />
        <Dropdown style={style} items={items} label={label} disabled />
        <Dropdown
          style={style}
          items={items}
          label={label}
          helperText="This is helper text"
        />
        <Dropdown style={style} items={items} label={label} warn />
        <Dropdown
          style={style}
          items={items}
          label={label}
          warn
          warnText="This is warn text"
        />
        <Dropdown
          style={style}
          items={items}
          label={label}
          invalid
          invalidText="This is invalid text"
        />
        <Dropdown style={style} items={items} label={label} light />
        <Dropdown
          style={style}
          items={items}
          label={label}
          light
          invalid
          invalidText="This is invalid text"
        />
        <Dropdown style={style} items={items} label={label} type="inline" />
        <DropdownSkeleton style={style} size="sm" />
        <DropdownSkeleton style={style} size="md" />
        <DropdownSkeleton style={style} size="lg" />
        <DropdownSkeleton style={style} size="xl" />
      </>
    );
  });

  it('should render', () => {
    cy.findAllByText(/Dropdown menu options/)
      .should('have.length', 13)
      .last()
      .should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });

  it('should render listbox when clicked', () => {
    cy.findAllByText(/Dropdown menu options/)
      .first()
      .click();

    cy.findAllByText(/Item 0/)
      .first()
      .should('be.visible');
    cy.findAllByText(/Item 4/)
      .first()
      .should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });
});
