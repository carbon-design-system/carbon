/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getByLabel, getByText } from '@carbon/test-utils/dom';
import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import FileUploader from '../';
import { uploadFiles } from '../test-helpers';

describe('FileUploader', () => {
  afterEach(cleanup);

  describe('automated accessibility tests', () => {
    it.skip('should have no axe violations', async () => {
      const { container } = render(<FileUploader />);
      await expect(container).toHaveNoAxeViolations();
    });

    it.skip('should have no AC violations', async () => {
      const { container } = render(<FileUploader />);
      await expect(container).toHaveNoACViolations('FileUploader');
    });
  });

  it('should support a custom class name on the root element', () => {
    const { container } = render(<FileUploader className="test" />);
    expect(container.firstChild.classList.contains('test')).toBe(true);
  });

  it('should not update the label by default when selecting files', () => {
    const { container } = render(<FileUploader buttonLabel="upload" />);
    const input = container.querySelector('input');
    const label = getByText(container, 'upload');

    expect(label).toBeInstanceOf(HTMLElement);
    uploadFiles(input, [new File(['test'], 'test.png', { type: 'image/png' })]);
    expect(getByText(container, 'upload')).toBeInstanceOf(HTMLElement);
  });

  it('should clear all uploaded files when `clearFiles` is called on a ref', () => {
    const ref = React.createRef();
    const { container } = render(<FileUploader ref={ref} />);
    const input = container.querySelector('input');

    const filename = 'test.png';
    uploadFiles(input, [new File(['test'], filename, { type: 'image/png' })]);

    expect(getByText(container, filename)).toBeInstanceOf(HTMLElement);
    ref.current.clearFiles();
    expect(getByText(container, filename)).not.toBeInstanceOf(HTMLElement);
  });

  it('should synchronize the filename status state when its prop changes', () => {
    const container = document.createElement('div');
    const description = 'test';
    render(
      <FileUploader filenameStatus="edit" iconDescription={description} />,
      {
        container,
      }
    );

    const input = container.querySelector('input');
    uploadFiles(input, [new File(['test'], 'test.png', { type: 'image/png' })]);

    const edit = getByLabel(container, description);

    render(
      <FileUploader filenameStatus="complete" iconDescription={description} />,
      {
        container,
      }
    );

    const complete = getByLabel(container, description);
    expect(edit.parentNode).not.toEqual(complete.parentNode);
  });
});
