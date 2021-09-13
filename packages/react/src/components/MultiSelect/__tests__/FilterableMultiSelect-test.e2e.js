/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/components/multi-select/_multi-select.scss';

import React from 'react';
import { mount } from '@cypress/react';
import { generateItems, generateGenericItem } from '../../ListBox/test-helpers';
import FilterableMultiSelect from '../../MultiSelect/FilterableMultiSelect';

describe('FilterableMultiSelect', () => {
  beforeEach(() => {
    const items = generateItems(5, generateGenericItem);
    const placeholder = 'Placeholder...';

    // eslint-disable-next-line react/prop-types
    function WrappedFilterableMultiSelect({ marginBottom = '1rem', ...props }) {
      return (
        <div style={{ marginBottom: marginBottom }}>
          <FilterableMultiSelect {...props} />
        </div>
      );
    }

    mount(
      <>
        <WrappedFilterableMultiSelect
          marginBottom="14rem"
          items={items}
          placeholder={placeholder}
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          size="sm"
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          size="md"
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          size="lg"
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          size="xl"
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          disabled
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          helperText="This is helper text"
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          warn
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          warn
          warnText="This is warn text"
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          invalid
          invalidText="This is invalid text"
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          light
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          light
          invalid
          invalidText="This is invalid text"
        />
        <WrappedFilterableMultiSelect
          items={items}
          placeholder={placeholder}
          type="inline"
        />
      </>
    );
  });

  it('should render', () => {
    cy.findAllByPlaceholderText(/Placeholder.../)
      .should('have.length', 13)
      .last()
      .should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });

  it('should render listbox when clicked', () => {
    cy.findAllByPlaceholderText(/Placeholder.../)
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
