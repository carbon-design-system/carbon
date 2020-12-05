/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { <%= name %> } from '../';

describe('<%= name %>', () => {
  afterEach(cleanup);

  it('should work', () => {
    render(<<%= name %>>test</<%= name %>>);
    // TODO
  });

  describe('automated accessibility testing', () => {
    it('should have no axe violations', async () => {
      render(<<%= name %>>test</<%= name %>>);
      await expect(screen.getByText('test')).toHaveNoAxeViolations();
    });

    it('should have no accessibility checker violations', async () => {
      render(<<%= name %>>test</<%= name %>>);
      await expect(screen.getByText('test')).toHaveNoACViolations('<%= name %>');
    });
  });

  describe('Component API', () => {
    // TODO
  });
});
