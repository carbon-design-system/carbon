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
import MultiSelect from '../';

describe('MultiSelect', () => {
  beforeEach(() => {
    const items = generateItems(5, generateGenericItem);
    const label = 'MultiSelect menu options';

    // eslint-disable-next-line react/prop-types
    function WrappedMultiSelect({ marginBottom = '1rem', ...props }) {
      return (
        <div style={{ marginBottom: marginBottom }}>
          <MultiSelect {...props} />
        </div>
      );
    }

    mount(
      <>
        <WrappedMultiSelect marginBottom="14rem" items={items} label={label} />
        <WrappedMultiSelect items={items} label={label} size="sm" />
        <WrappedMultiSelect items={items} label={label} size="md" />
        <WrappedMultiSelect items={items} label={label} size="lg" />
        <WrappedMultiSelect items={items} label={label} size="xl" />
        <WrappedMultiSelect items={items} label={label} disabled />
        <WrappedMultiSelect
          items={items}
          label={label}
          helperText="This is helper text"
        />
        <WrappedMultiSelect items={items} label={label} warn />
        <WrappedMultiSelect
          items={items}
          label={label}
          warn
          warnText="This is warn text"
        />
        <WrappedMultiSelect
          items={items}
          label={label}
          invalid
          invalidText="This is invalid text"
        />
        <WrappedMultiSelect items={items} label={label} light />
        <WrappedMultiSelect
          items={items}
          label={label}
          light
          invalid
          invalidText="This is invalid text"
        />
        <WrappedMultiSelect items={items} label={label} type="inline" />
      </>
    );
  });

  it('should render', () => {
    cy.findAllByText(/MultiSelect menu options/)
      .should('have.length', 13)
      .last()
      .should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });

  it('should render listbox when clicked', () => {
    cy.findAllByText(/MultiSelect menu options/)
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
