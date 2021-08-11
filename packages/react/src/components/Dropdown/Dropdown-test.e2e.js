/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/components/dropdown/_dropdown.scss';

import React from 'react';
import { mount } from '@cypress/react';
import {
  assertMenuOpen,
  assertMenuClosed,
  openMenu,
  generateItems,
  generateGenericItem,
} from '../ListBox/test-helpers';
import Dropdown from '../Dropdown';
import DropdownSkeleton from '../Dropdown/Dropdown.Skeleton';

describe('Dropdown', () => {
  beforeEach(() => {
    const items = generateItems(5, generateGenericItem);
    const label = 'Dropdown menu options';
    console.log('items:');
    console.log(items);
    mount(
      <>
        <Dropdown items={items} label={label} />
        <Dropdown items={items} label={label} size="sm" />
        <Dropdown items={items} label={label} size="md" />
        <Dropdown items={items} label={label} size="lg" />
        <Dropdown items={items} label={label} size="xl" />
        <Dropdown items={items} label={label} disabled />
        <Dropdown
          items={items}
          label={label}
          helperText="This is helper text"
        />
        <Dropdown items={items} label={label} warn />
        <Dropdown
          items={items}
          label={label}
          warn
          warnText="This is warn text"
        />
        <Dropdown
          items={items}
          label={label}
          invalid
          invalidText="This is invalid text"
        />
        <Dropdown items={items} label={label} light />
        <Dropdown
          items={items}
          label={label}
          light
          invalid
          invalidText="This is invalid text"
        />
        <Dropdown items={items} label={label} type="inline" />
        <DropdownSkeleton size="sm" />
        <DropdownSkeleton size="md" />
        <DropdownSkeleton size="lg" />
        <DropdownSkeleton size="xl" />
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

    // todo ensure listbox is open and visible

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });
});
