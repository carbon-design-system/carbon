/**
 * Copyright IBM Corp. 2016, 2026
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

  it('should support events on interactive icons when `edit` is the status', () => {
    const onClick = jest.fn();
    const { container: edit } = render(
      <Filename
        name="File 1"
        iconDescription="test description"
        status="edit"
        onClick={onClick}
      />
    );

    fireEvent.click(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      edit.querySelector(`[aria-label="test description - File 1"]`)
    );
    expect(onClick).toHaveBeenCalledTimes(1);

    onClick.mockReset();

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

  it('should return null for invalid status', () => {
    const { container } = render(<Filename status="invalid" />);
    expect(container.firstChild).toBeNull();
  });

  it('should use status-specific default descriptions when iconDescription is not provided', () => {
    // Without filename
    const { container: uploading } = render(<Filename status="uploading" />);
    expect(getByText(uploading, 'Uploading file')).toBeInTheDocument();

    const { container: complete } = render(<Filename status="complete" />);
    const svg = complete.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Upload complete');
    const title = complete.querySelector('title');
    expect(title).toHaveTextContent('Upload complete');

    // With filename
    const { container: uploadingWithName } = render(
      <Filename status="uploading" name="test.txt" />
    );
    expect(
      getByText(uploadingWithName, 'Uploading test.txt')
    ).toBeInTheDocument();

    const { container: edit } = render(
      <Filename status="edit" name="test.txt" />
    );
    const button = edit.querySelector('button');
    expect(button).toHaveAttribute('aria-label', 'Remove file - test.txt');

    const { container: completeWithName } = render(
      <Filename status="complete" name="test.txt" />
    );
    const svgWithName = completeWithName.querySelector('svg');
    expect(svgWithName).toHaveAttribute('aria-label', 'test.txt uploaded');
    const titleWithName = completeWithName.querySelector('title');
    expect(titleWithName).toHaveTextContent('test.txt uploaded');
  });

  it('should use custom iconDescription when provided', () => {
    const { container } = render(
      <Filename status="complete" iconDescription="Custom description" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Custom description');
    const title = container.querySelector('title');
    expect(title).toHaveTextContent('Custom description');
  });
});
