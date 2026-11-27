/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it, jest } from '@jest/globals';
import { getByText, render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Filename } from '../';

const statuses = ['uploading', 'edit', 'complete'] as const;

describe('Filename', () => {
  describe('automated accessibility tests', () => {
    it.each(statuses)(
      'should have no axe violations with status %s',
      async (status) => {
        const { container } = render(
          <Filename iconDescription="test description" status={status} />
        );
        await expect(container).toHaveNoAxeViolations();
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

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const editControl = edit.querySelector(
      `[aria-label="test description - File 1"]`
    );
    if (!editControl) {
      throw new Error('Expected the edit icon to render.');
    }
    fireEvent.click(editControl);
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
    const completeControl = complete.querySelector(
      `[aria-label="test description"]`
    );
    if (!completeControl) {
      throw new Error('Expected the complete icon to render.');
    }
    fireEvent.click(completeControl);
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
    fireEvent.click(getByText(uploading, 'test description'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
