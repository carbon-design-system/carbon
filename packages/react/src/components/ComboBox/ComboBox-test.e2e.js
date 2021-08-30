/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/components/combo-box/_combo-box.scss';
import 'carbon-components/scss/components/list-box/_list-box.scss';
import 'carbon-components/scss/components/text-input/_text-input.scss';

import React from 'react';
import { mount } from '@cypress/react';
import ComboBox from './ComboBox';

describe('ComboBox', () => {
  beforeEach(() => {
    const items = [
      {
        id: 'option-0',
        text:
          'An example option that is really long to show what should be done to handle long text',
      },
      {
        id: 'option-1',
        text: 'Option 1',
      },
      {
        id: 'option-2',
        text: 'Option 2',
      },
      {
        id: 'option-3',
        text: 'Option 3',
      },
      {
        id: 'option-4',
        text: 'Option 4',
      },
      {
        id: 'option-5',
        text: 'Option 5',
      },
    ];

    mount(
      <>
        <div style={{ marginBottom: '2rem' }}>
          <ComboBox
            onChange={() => {}}
            id="carbon-combobox"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            placeholder="Filter..."
            titleText="Default combobox"
            helperText="Optional combobox helper text"
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <ComboBox
            onChange={() => {}}
            id="carbon-combobox"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            placeholder="Filter..."
            titleText="Small combobox"
            helperText="Combobox helper text"
            size="sm"
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <ComboBox
            onChange={() => {}}
            id="carbon-combobox"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            placeholder="Filter..."
            titleText="Large combobox"
            helperText="Combobox helper text"
            size="lg"
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <ComboBox
            onChange={() => {}}
            id="carbon-combobox"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            placeholder="Filter..."
            titleText="Disabled combobox"
            helperText="Combobox helper text"
            disabled
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <ComboBox
            onChange={() => {}}
            id="carbon-combobox"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            placeholder="Filter..."
            titleText="Light combobox"
            helperText="Combobox helper text"
            light
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <ComboBox
            onChange={() => {}}
            id="carbon-combobox"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            placeholder="Filter..."
            titleText="Combobox with warning state"
            helperText="Combobox helper text"
            warn
            warnText="Warning state message here"
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <ComboBox
            onChange={() => {}}
            id="carbon-combobox"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            placeholder="Filter..."
            titleText="Combobox with invalid state"
            helperText="Combobox with invalid state"
            invalid
            invalidText="Invalid text message here"
          />
        </div>
      </>
    );
  });

  it('should render', () => {
    cy.findByText(/Optional/).should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });

  it('should open on click and display list items', () => {
    cy.findAllByRole('button').first().click();
    cy.findAllByText(/Option 1/)
      .first()
      .should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });
});
