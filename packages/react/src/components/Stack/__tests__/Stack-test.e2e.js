/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../../../index.scss';

import { mount } from '@cypress/react';
import { spacing } from '@carbon/layout';
import React from 'react';
import { Stack } from '../../Stack';
import { PrefixContext } from '../../../internal/usePrefix';

const SPACING_STEPS = Array.from({ length: spacing.length - 1 }).map(
  (_, step) => {
    return step + 1;
  }
);

describe('Stack', () => {
  it('should default to the vertical orientation', () => {
    mount(
      <PrefixContext.Provider value="cds">
        {SPACING_STEPS.map((step) => {
          return (
            <Stack key={step} gap={step}>
              <div>item 1</div>
              <div>item 2</div>
              <div>item 3</div>
            </Stack>
          );
        })}
      </PrefixContext.Provider>
    );

    cy.percySnapshot();
  });

  it('should support a horizontal orientation', () => {
    mount(
      <PrefixContext.Provider value="cds">
        {SPACING_STEPS.map((step) => {
          return (
            <div key={step}>
              <Stack gap={step} orientation="horizontal">
                <div>item 1</div>
                <div>item 2</div>
                <div>item 3</div>
              </Stack>
            </div>
          );
        })}
      </PrefixContext.Provider>
    );

    cy.percySnapshot();
  });

  it('should support a custom gap with the `gap` prop', () => {
    mount(
      <PrefixContext.Provider value="cds">
        <Stack gap="20px">
          <div>item 1</div>
          <div>item 2</div>
          <div>item 3</div>
        </Stack>
      </PrefixContext.Provider>
    );

    cy.percySnapshot();
  });
});
