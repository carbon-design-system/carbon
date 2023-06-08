/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render } from '@testing-library/react';
import { getByText } from '@carbon/test-utils/dom';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { FileUploaderButton } from '../';
import { uploadFiles } from '../test-helpers';

describe('FileUploaderButton', () => {
  describe('automated accessibility tests', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<FileUploaderButton name="test" />);
      await expect(container).toHaveNoAxeViolations();
    });
  });

  it('should support a custom class name on the root element', () => {
    const { container } = render(<FileUploaderButton className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should call `onClick` if the label is clicked', () => {
    const onClick = jest.fn();
    const { container } = render(
      <FileUploaderButton labelText="test" onClick={onClick} />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const label = getByText(container, 'test');
    Simulate.click(label);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call `onChange` if the value of the input changes', () => {
    const onChange = jest.fn();
    const { container } = render(
      <FileUploaderButton onChange={onChange} accept={['.png']} />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const input = container.querySelector('input');
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    uploadFiles(input, file);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should not support multiple files by default', () => {
    const { container } = render(<FileUploaderButton />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const input = container.querySelector('input');
    expect(input.getAttribute('multiple')).toBeFalsy();
  });

  it('should have a unique id', () => {
    const { container } = render(
      <>
        <FileUploaderButton />
        <FileUploaderButton />
      </>
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const inputs = container.querySelectorAll('input');
    expect(inputs[0].getAttribute('id')).not.toBe(inputs[1].getAttribute('id'));
  });

  it('should reset the input value when the label is clicked', () => {
    const { container } = render(
      <FileUploaderButton accept={['.png']} labelText="test" />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const input = container.querySelector('button');

    const filename = 'test.png';
    const file = new File(['test'], filename, { type: 'image/png' });
    uploadFiles(input, [file]);

    expect(input.files.length).toBe(1);
    Simulate.click(input);
    expect(input.files.length).toBe(0);
  });

  it('should update the label text if it receives a new value from props', () => {
    const container = document.createElement('div');
    render(<FileUploaderButton labelText="test" />, { container });
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText(container, 'test')).toBeInstanceOf(HTMLElement);

    render(<FileUploaderButton labelText="tester" />, { container });
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText(container, 'tester')).toBeInstanceOf(HTMLElement);
  });

  describe('FileUploaderButton label', () => {
    it('should update the label when a file is selected', () => {
      const { container } = render(
        <FileUploaderButton accept={['.png']} labelText="test" />
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const input = container.querySelector('input');
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const label = getByText(container, 'test');
      expect(label).toBeInstanceOf(HTMLElement);

      const filename = 'test.png';
      const file = new File(['test'], filename, { type: 'image/png' });
      act(() => {
        uploadFiles(input, [file]);
      });

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText(container, filename)).toBeInstanceOf(HTMLElement);
    });

    it('should update the label when multiple files are selected', () => {
      const { container } = render(
        <FileUploaderButton accept={['.png']} labelText="test" multiple />
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const input = container.querySelector('input');
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const label = getByText(container, 'test');
      expect(label).toBeInstanceOf(HTMLElement);

      const files = [
        new File(['test-1'], 'test-1.png', { type: 'image/png' }),
        new File(['test-2'], 'test-1.png', { type: 'image/png' }),
        new File(['test-3'], 'test-1.png', { type: 'image/png' }),
      ];

      act(() => {
        uploadFiles(input, files);
      });
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText(container, `${files.length} files`)).toBeInstanceOf(
        HTMLElement
      );
    });

    it('should not update the label when files are selected but `disableLabelChanges` is false', () => {
      const { container } = render(
        <FileUploaderButton
          accept={['.png']}
          labelText="test"
          disableLabelChanges
        />
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const input = container.querySelector('input');
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const label = getByText(container, 'test');
      expect(label).toBeInstanceOf(HTMLElement);

      const filename = 'test.png';
      const file = new File(['test'], filename, { type: 'image/png' });
      uploadFiles(input, [file]);

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText(container, 'test')).toBeInstanceOf(HTMLElement);
    });
  });
});
