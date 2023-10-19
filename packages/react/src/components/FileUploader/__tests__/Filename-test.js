/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getByText, render } from '@testing-library/react';
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

  it('should support events on interactive icons when `edit` or `complete` is the status', () => {
    const onClick = jest.fn();
    const { container: edit } = render(
      <Filename
        name="File 1"
        iconDescription="test description"
        status="edit"
        onClick={onClick}
      />
    );

    Simulate.click(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      edit.querySelector(`[aria-label="test description - File 1"]`)
    );
    expect(onClick).toHaveBeenCalledTimes(1);

    onClick.mockReset();

    const { container: complete } = render(
      <Filename
        iconDescription="test description"
        status="complete"
        onClick={onClick}
      />
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    Simulate.click(complete.querySelector(`[aria-label="test description"]`));
    expect(onClick).toHaveBeenCalledTimes(1);

    const { container: uploading } = render(
      <Filename
        iconDescription="test description"
        status="uploading"
        onClick={onClick}
      />
    );

    onClick.mockReset();

    // eslint-disable-next-line testing-library/prefer-screen-queries
    Simulate.click(getByText(uploading, 'test description'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
