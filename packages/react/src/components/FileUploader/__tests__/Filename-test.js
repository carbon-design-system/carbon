/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getByText, render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { Filename } from '../';

const statuses = ['uploading', 'edit', 'complete'];

describe('Filename', () => {
  describe.skip('automated accessibility tests', () => {
    it.each(statuses)(
      'should have no axe violations with status %s',
      async (status) => {
        const { container } = render(
          <Filename iconDescription="test description" status={status} />
        );
        await expect(container).toHaveNoAxeViolations();
      }
    );

    it.each(statuses)(
      'should have no AC violations with status %s',
      async (status) => {
        const { container } = render(
          <Filename iconDescription="test description" status={status} />
        );
        await expect(container).toHaveNoACViolations(`Filename-${status}`);
      }
    );
  });
});
