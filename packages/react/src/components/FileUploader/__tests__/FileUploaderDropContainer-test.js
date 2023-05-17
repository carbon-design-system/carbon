/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getByText } from '@carbon/test-utils/dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { FileUploaderDropContainer } from '../';
import { uploadFiles } from '../test-helpers';

describe('FileUploaderDropContainer', () => {
  it('should not have axe violations', async () => {
    const { container } = render(<FileUploaderDropContainer />);
    await expect(container).toHaveNoAxeViolations();
  });

  it('should support a custom class name on the drop area', () => {
    const { container } = render(
      <FileUploaderDropContainer className="test" />
    );
    const dropArea = container.querySelector('button');
    expect(dropArea).toHaveClass('test');
  });

  it('should have a unique id each time it is used', () => {
    const { container } = render(
      <>
        <FileUploaderDropContainer />
        <FileUploaderDropContainer />
      </>
    );
    const inputs = container.querySelectorAll('input');
    expect(inputs[0].getAttribute('id')).not.toBe(inputs[1].getAttribute('id'));
  });

  it('should render with the default labelText prop', () => {
    const { container } = render(<FileUploaderDropContainer />);
    const label = getByText(container, 'Add file');
    expect(label).toBeInstanceOf(HTMLElement);
  });

  it('should render with multiple set to false by default', () => {
    const { container } = render(<FileUploaderDropContainer />);
    const input = container.querySelector('input');
    expect(input.getAttribute('multiple')).toBeFalsy();
  });

  it('should reset the value of the input when the drop area is clicked', () => {
    const { container } = render(
      <FileUploaderDropContainer labelText="test" />
    );
    const input = container.querySelector('input');

    uploadFiles(input, [
      new File(['content'], 'test.png', { type: 'image/png' }),
    ]);
    expect(input.files.length).toBe(1);
    Simulate.click(input);
    expect(input.files.length).toBe(0);
  });

  it('should call `onAddFiles` when a file is selected', () => {
    const onAddFiles = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer onAddFiles={onAddFiles} />
    );
    const input = container.querySelector('input');
    const files = [
      new File(['foo'], 'foo.txt', { type: 'text/plain' }),
      new File(['bar'], 'bar.txt', { type: 'text/plain' }),
    ];

    uploadFiles(input, files);
    expect(onAddFiles).toHaveBeenCalledTimes(1);
    expect(onAddFiles).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          files,
        },
      }),
      { addedFiles: files }
    );
  });

  it('should mark invalid files using default pattern', () => {
    const onAddFiles = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer onAddFiles={onAddFiles} accept={['.txt']} />
    );
    const input = container.querySelector('input');

    const files = [
      new File(['foo'], 'foo.txt', { type: 'text/plain' }),
      new File(['bar'], 'bar.a_a', { type: 'text/plain' }),
      new File(['bar_foo'], 'bar_foo.b-b', { type: 'text/plain' }),
      new File(['bar-foo'], 'bar-foo.a-b_c', { type: 'text/plain' }),
    ];

    uploadFiles(input, files);

    expect(onAddFiles).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          files,
        },
      }),
      { addedFiles: files }
    );

    expect(onAddFiles).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          files,
        },
      }),
      {
        addedFiles: expect.arrayContaining([
          expect.not.objectContaining({ invalidFileType: true }),
          expect.objectContaining({ invalidFileType: true }),
          expect.objectContaining({ invalidFileType: true }),
          expect.objectContaining({ invalidFileType: true }),
        ]),
      }
    );
  });

  it('should be case insensitive when marking files invalid', () => {
    const onAddFiles = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer onAddFiles={onAddFiles} accept={['.jpeg']} />
    );
    const input = container.querySelector('input');

    const files = [
      new File(['foo'], 'foo.JPEG', { type: 'image/jpeg' }),
      new File(['bar'], 'bar.a_a', { type: 'text/plain' }),
    ];

    uploadFiles(input, files);

    expect(onAddFiles).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          files,
        },
      }),
      { addedFiles: files }
    );

    expect(onAddFiles).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          files,
        },
      }),
      {
        addedFiles: expect.arrayContaining([
          expect.not.objectContaining({ invalidFileType: false }),
          expect.objectContaining({ invalidFileType: true }),
        ]),
      }
    );
  });

  it('should not mark any invalid files using custom pattern', () => {
    const onAddFiles = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer
        onAddFiles={onAddFiles}
        accept={['.txt', '.a_a', '.b-b', '.a-b_c']}
        pattern=".[0-9a-z-_]+$"
      />
    );
    const input = container.querySelector('input');

    const files = [
      new File(['foo'], 'foo.txt', { type: 'text/plain' }),
      new File(['bar'], 'bar.a_a', { type: 'text/plain' }),
      new File(['bar_foo'], 'bar_foo.b-b', { type: 'text/plain' }),
      new File(['bar-foo'], 'bar-foo.a-b_c', { type: 'text/plain' }),
    ];

    uploadFiles(input, files);

    expect(onAddFiles).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          files,
        },
      }),
      { addedFiles: files }
    );

    expect(onAddFiles).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          files,
        },
      }),
      {
        addedFiles: expect.arrayContaining([
          expect.not.objectContaining({ invalidFileType: true }),
          expect.not.objectContaining({ invalidFileType: true }),
          expect.not.objectContaining({ invalidFileType: true }),
          expect.not.objectContaining({ invalidFileType: true }),
        ]),
      }
    );
  });
});
