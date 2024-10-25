/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fireEvent, render } from '@testing-library/react';

import { FileUploaderDropContainer } from '../';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { getByText } from '@carbon/test-utils/dom';
import { uploadFiles } from '../test-helpers';

const requiredProps = { labelText: 'Add file' };

describe('FileUploaderDropContainer', () => {
  it('should not have axe violations', async () => {
    const { container } = render(
      <FileUploaderDropContainer {...requiredProps} />
    );
    await expect(container).toHaveNoAxeViolations();
  });

  it('should support a custom class name on the drop area', () => {
    const { container } = render(
      <FileUploaderDropContainer className="test" {...requiredProps} />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const dropArea = container.querySelector('button');
    expect(dropArea).toHaveClass('test');
  });

  it('should have a unique id each time it is used', () => {
    const { container } = render(
      <>
        <FileUploaderDropContainer {...requiredProps} />
        <FileUploaderDropContainer {...requiredProps} />
      </>
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const inputs = container.querySelectorAll('input');
    expect(inputs[0].getAttribute('id')).not.toBe(inputs[1].getAttribute('id'));
  });

  it('should render with the default labelText prop', () => {
    const { container } = render(
      <FileUploaderDropContainer {...requiredProps} />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const label = getByText(container, 'Add file');
    expect(label).toBeInstanceOf(HTMLElement);
  });

  it('should render with multiple set to false by default', () => {
    const { container } = render(
      <FileUploaderDropContainer {...requiredProps} />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const input = container.querySelector('input');
    expect(input.getAttribute('multiple')).toBeFalsy();
  });

  it('should reset the value of the input when the drop area is clicked', () => {
    const { container } = render(
      <FileUploaderDropContainer labelText="test" />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
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
      <FileUploaderDropContainer onAddFiles={onAddFiles} {...requiredProps} />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
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
      <FileUploaderDropContainer
        onAddFiles={onAddFiles}
        accept={['.txt']}
        {...requiredProps}
      />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
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
      <FileUploaderDropContainer
        onAddFiles={onAddFiles}
        accept={['.jpeg']}
        {...requiredProps}
      />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
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
        {...requiredProps}
      />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
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
  it('should not allow file selection when disabled', () => {
    const onAddFiles = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer
        onAddFiles={onAddFiles}
        disabled
        {...requiredProps}
      />
    );

    const dropArea = container.querySelector('button');
    Simulate.click(dropArea);

    expect(onAddFiles).not.toHaveBeenCalled();
  });

  it('should filter files based on the accept prop', () => {
    const onAddFiles = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer
        accept={['.png']}
        onAddFiles={onAddFiles}
        {...requiredProps}
      />
    );
    const input = container.querySelector('input');

    const files = [
      new File(['foo'], 'foo.txt', { type: 'text/plain' }),
      new File(['bar'], 'bar.png', { type: 'image/png' }),
    ];

    uploadFiles(input, files);

    expect(onAddFiles).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          files,
        },
      }),
      {
        addedFiles: expect.arrayContaining([
          expect.objectContaining({ invalidFileType: true }), // foo.txt
          expect.not.objectContaining({ invalidFileType: true }), // bar.png
        ]),
      }
    );
  });

  it('should call onClick when drop area is clicked', () => {
    const onClick = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer onClick={onClick} {...requiredProps} />
    );

    const dropArea = container.querySelector('button');
    Simulate.click(dropArea);

    expect(onClick).toHaveBeenCalled();
  });

  it('should reset input value when clicked after selecting files', () => {
    const { container } = render(
      <FileUploaderDropContainer labelText="test" />
    );
    const input = container.querySelector('input');

    uploadFiles(input, [
      new File(['content'], 'test.png', { type: 'image/png' }),
    ]);

    expect(input.files.length).toBe(1);

    Simulate.click(container.querySelector('button'));
    expect(input.files.length).toBe(0);
  });

  it('should call the onClick handler when the drop area is clicked', () => {
    const onClick = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer onClick={onClick} {...requiredProps} />
    );
    const dropArea = container.querySelector('button');
    Simulate.click(dropArea);
    expect(onClick).toHaveBeenCalled();
  });

  it('should handle the case when no files are added', () => {
    const onAddFiles = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer onAddFiles={onAddFiles} {...requiredProps} />
    );
    const input = container.querySelector('input');

    expect(onAddFiles).not.toHaveBeenCalled();
  });

  it('should have a properly associated label for accessibility', () => {
    const { container } = render(
      <FileUploaderDropContainer
        labelText="Upload your files"
        {...requiredProps}
      />
    );
    const label = container.querySelector('label');
    const input = container.querySelector('input');
    expect(label).toHaveAttribute('for', input.id);
  });
  it('should not set active state on drag over when disabled', () => {
    const { container } = render(
      <FileUploaderDropContainer disabled {...requiredProps} />
    );

    const dropArea = container.firstChild;

    const dragOverEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    Simulate.dragOver(dropArea, dragOverEvent);
    expect(dropArea).not.toHaveClass('test');
  });
  it('should not call onAddFiles when disabled', () => {
    const onAddFiles = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer
        onAddFiles={onAddFiles}
        disabled
        labelText="Add file"
      />
    );

    const dropArea = container.querySelector('button');
    Simulate.click(dropArea);

    expect(onAddFiles).not.toHaveBeenCalled();
  });
  it('should initialize with default props', () => {
    const { container } = render(
      <FileUploaderDropContainer labelText="Upload" />
    );
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
    expect(input.multiple).toBe(false);
  });

  it('should reset input value after files are selected and clicked again', () => {
    const { container } = render(
      <FileUploaderDropContainer labelText="Upload" />
    );
    const input = container.querySelector('input');

    uploadFiles(input, [
      new File(['content'], 'test.txt', { type: 'text/plain' }),
    ]);

    expect(input.files.length).toBe(1);

    const dropArea = container.querySelector('button');
    Simulate.click(dropArea);

    expect(input.files.length).toBe(0);
  });

  it('should not set active state when disabled on drag over', () => {
    const { container } = render(
      <FileUploaderDropContainer disabled {...requiredProps} />
    );
    const dropArea = container.firstChild;

    const dragOverEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    Simulate.dragOver(dropArea, dragOverEvent);
    expect(dragOverEvent.preventDefault).toHaveBeenCalled();
    expect(dragOverEvent.stopPropagation).toHaveBeenCalled();
    expect(dropArea).not.toHaveClass('some-active-class');
  });
  it('should return array of files marked as invalid if they dont match accepted types', () => {
    const onAddFilesMock = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer
        accept={['image/png']}
        onAddFiles={onAddFilesMock}
        {...requiredProps}
      />
    );
    const event = {
      dataTransfer: {
        files: [
          new File(['sample text'], 'example.txt', { type: 'text/plain' }),
        ],
      },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    fireEvent.drop(container.firstChild, event);
    expect(onAddFilesMock).toHaveBeenCalledWith(expect.anything(), {
      addedFiles: [
        expect.objectContaining({
          invalidFileType: true,
        }),
      ],
    });
  });

  it('should render a label with custom labelText for screen readers', () => {
    const { getByLabelText } = render(
      <FileUploaderDropContainer labelText="Upload your file" />
    );
    const hiddenLabel = getByLabelText('Upload your file');
    expect(hiddenLabel).toBeInTheDocument();
  });
  it('should prevent default action on Space key press', () => {
    const { container } = render(
      <FileUploaderDropContainer {...requiredProps} />
    );
    const dropArea = container.querySelector('button');
    const preventDefault = jest.fn();
    const event = new KeyboardEvent('keydown', {
      key: ' ',
      code: 'Space',
      bubbles: true,
    });
    Object.defineProperty(event, 'preventDefault', { value: preventDefault });
    dropArea.dispatchEvent(event);
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should trigger input click on Enter key press', () => {
    const { container } = render(
      <FileUploaderDropContainer {...requiredProps} />
    );
    const dropArea = container.querySelector('button');
    const input = container.querySelector('input');
    const clickMock = jest.spyOn(input, 'click').mockImplementation(() => {});
    dropArea.focus();
    fireEvent.keyDown(dropArea, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(clickMock).toHaveBeenCalled();
    clickMock.mockRestore();
  });

  it('should return early when disabled', () => {
    const handleDrop = jest.fn();
    const { container } = render(
      <FileUploaderDropContainer
        onDrop={handleDrop}
        disabled
        {...requiredProps}
      />
    );
    const dropArea = container.firstChild;
    const dropEvent = new Event('drop', {
      bubbles: true,
      cancelable: true,
    });

    dropArea.dispatchEvent(dropEvent);
    expect(handleDrop).not.toHaveBeenCalled();
  });
});
