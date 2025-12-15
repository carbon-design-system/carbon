/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FileUploader from '../';
import { FeatureFlags } from '../../FeatureFlags';
import React from 'react';

const iconDescription = 'test description';
const requiredProps = {
  iconDescription,
  filenameStatus: 'uploading',
  labelTitle: 'Upload files',
  labelDescription: 'Max file size is 500 MB. Only .jpg files are supported.',
};

describe('FileUploader', () => {
  it('should support a custom class name on the root element', () => {
    const { container } = render(
      <FileUploader {...requiredProps} className="test" />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should not update the label by default when selecting files', async () => {
    const { container } = render(
      <FileUploader {...requiredProps} buttonLabel="upload" />
    );

    const input = container.querySelector('input');
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    const uploadButton = screen.getByRole('button', { name: 'upload' });
    expect(uploadButton).toBeInTheDocument();

    await userEvent.upload(input, file);

    // Verify button label remains unchanged after upload
    expect(screen.getByRole('button', { name: 'upload' })).toBeInTheDocument();
  });

  it('should clear all uploaded files when `clearFiles` is called on a ref', async () => {
    const ref = React.createRef();
    const { container } = render(<FileUploader {...requiredProps} ref={ref} />);

    const input = container.querySelector('input');
    const filename = 'test.png';
    const file = new File(['test'], filename, { type: 'image/png' });

    await userEvent.upload(input, file);

    expect(screen.getByText(filename)).toBeInTheDocument();

    await act(async () => {
      ref.current.clearFiles();
    });

    expect(screen.queryByText(filename)).not.toBeInTheDocument();
  });

  it('should synchronize the filename status state when its prop changes', async () => {
    const { container, rerender } = render(
      <FileUploader {...requiredProps} filenameStatus="edit" />
    );

    const input = container.querySelector('input');
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    await userEvent.upload(input, file);

    const edit = screen.getByLabelText(`${iconDescription} - test.png`);

    rerender(<FileUploader {...requiredProps} filenameStatus="complete" />);

    const complete = screen.getByLabelText(iconDescription);
    expect(edit).not.toEqual(complete);
  });
  it('should disable file input when `disabled` prop is true', () => {
    const { container } = render(
      <FileUploader {...requiredProps} disabled buttonLabel="disabled upload" />
    );
    const input = container.querySelector('input');
    expect(input).toBeDisabled();
  });
  it('should render with different button kinds', () => {
    const buttonKinds = ['primary', 'secondary', 'danger', 'ghost'];
    buttonKinds.forEach((kind) => {
      const { container } = render(
        <FileUploader {...requiredProps} buttonKind={kind} />
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass(`cds--btn--${kind}`);
    });
  });
  it('should trigger `onDelete` when a file is removed', async () => {
    const onDelete = jest.fn();
    const { container } = render(
      <FileUploader
        {...requiredProps}
        filenameStatus="edit"
        onDelete={onDelete}
      />
    );

    const input = container.querySelector('input');
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    await userEvent.upload(input, file);

    const removeFileButton = screen.getByLabelText(
      'test description - test.png'
    );

    await userEvent.click(removeFileButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
  it('should trigger `onChange` when files are selected', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <FileUploader {...requiredProps} onChange={onChange} />
    );

    const input = container.querySelector('input');
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    await userEvent.upload(input, file);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should filter out files larger than maxFileSize', async () => {
    const onAddFiles = jest.fn();
    const onChange = jest.fn();
    const { container } = render(
      <FileUploader
        {...requiredProps}
        maxFileSize={1}
        onAddFiles={onAddFiles}
        onChange={onChange}
      />
    );

    const input = container.querySelector('input');
    const largeFile = new File(['max filesize'], 'max-filesize.txt', {
      type: 'text/plain',
    });

    await userEvent.upload(input, largeFile);

    // File should be marked as invalid in onAddFiles callback but not displayed
    expect(screen.queryByText('max-filesize.txt')).not.toBeInTheDocument();
    expect(onAddFiles).toHaveBeenCalledTimes(1);
    const addedFiles = onAddFiles.mock.calls[0][1].addedFiles;
    expect(addedFiles[0].invalidFileType).toBeTruthy();
    // onChange should not be called since no valid files were added
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should call onAddFiles with validated files after validation', async () => {
    const onAddFiles = jest.fn();
    const { container } = render(
      <FileUploader {...requiredProps} multiple onAddFiles={onAddFiles} />
    );

    const input = container.querySelector('input');
    const fileA = new File(['a'], 'a.txt', { type: 'text/plain' });
    const fileB = new File(['b'], 'b.txt', { type: 'text/plain' });

    await userEvent.upload(input, [fileA, fileB]);

    expect(onAddFiles).toHaveBeenCalledTimes(1);
    const addedFiles = onAddFiles.mock.calls[0][1].addedFiles;
    expect(addedFiles).toHaveLength(2);
    expect(addedFiles[0].name).toBe('a.txt');
    expect(addedFiles[1].name).toBe('b.txt');
    // Both files should be in the document (onAddFiles cannot filter)
    expect(screen.getByText('a.txt')).toBeInTheDocument();
    expect(screen.getByText('b.txt')).toBeInTheDocument();
  });

  describe('Enhanced FileUploader (with feature flag)', () => {
    beforeAll(() => {
      Object.defineProperty(global, 'crypto', {
        value: {
          getRandomValues: (arr) => {
            for (let i = 0; i < arr.length; i++) {
              arr[i] = Math.floor(Math.random() * 256);
            }
            return arr;
          },
        },
        writable: true,
      });
    });

    it('should handle multiple file uploads with duplicate prevention', async () => {
      const onChange = jest.fn();

      render(
        <FeatureFlags enableEnhancedFileUploader>
          <FileUploader
            {...requiredProps}
            multiple={true}
            onChange={onChange}
          />
        </FeatureFlags>
      );

      const input = document.querySelector('input[type="file"]');

      const file1 = new File(['content1'], 'photo1.png', { type: 'image/png' });
      await userEvent.upload(input, file1);

      const duplicateFile = new File(['duplicate'], 'photo1.png', {
        type: 'image/png',
      });
      const newFile = new File(['new'], 'photo2.png', { type: 'image/png' });
      await userEvent.upload(input, [duplicateFile, newFile]);

      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
      expect(lastCall.target.action).toBe('add');
      expect(lastCall.target.currentFiles.length).toBe(2);
      expect(typeof lastCall.target.files.item).toBe('function');
      expect(lastCall.target.files.item(0)).toBeDefined();
      expect(lastCall.target.files.item(99)).toBe(null);
    });

    it('should replace files in single file mode', async () => {
      const onChange = jest.fn();

      render(
        <FeatureFlags enableEnhancedFileUploader>
          <FileUploader
            {...requiredProps}
            multiple={false}
            onChange={onChange}
          />
        </FeatureFlags>
      );

      const input = document.querySelector('input[type="file"]');

      const file1 = new File(['content1'], 'first.png', { type: 'image/png' });
      await userEvent.upload(input, file1);

      const file2 = new File(['content2'], 'second.png', { type: 'image/png' });
      await userEvent.upload(input, file2);

      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
      expect(lastCall.target.currentFiles).toHaveLength(1);
      expect(lastCall.target.currentFiles[0].name).toBe('second.png');
    });

    it('should provide enhanced callbacks when deleting files', async () => {
      const onDelete = jest.fn();
      const onChange = jest.fn();

      render(
        <FeatureFlags enableEnhancedFileUploader>
          <FileUploader
            {...requiredProps}
            filenameStatus="edit"
            onDelete={onDelete}
            onChange={onChange}
          />
        </FeatureFlags>
      );

      const input = document.querySelector('input[type="file"]');
      const file = new File(['test'], 'deleteme.png', { type: 'image/png' });

      await userEvent.upload(input, file);
      onChange.mockClear();

      const removeButton = screen.getByLabelText(
        'test description - deleteme.png'
      );
      await userEvent.click(removeButton);

      expect(onDelete).toHaveBeenCalledTimes(1);
      const deleteEvent = onDelete.mock.calls[0][0];
      //verifys the event
      expect(deleteEvent.target.action).toBe('remove');
      expect(deleteEvent.target.deletedFile.name).toBe('deleteme.png');
      expect(deleteEvent.target.deletedFileName).toBe('deleteme.png');

      expect(onChange).toHaveBeenCalledTimes(1);
      const changeEvent = onChange.mock.calls[0][0];
      expect(changeEvent.target.action).toBe('remove');
    });

    it('should provide file management utilities through ref methods', async () => {
      const ref = React.createRef();

      render(
        <FeatureFlags enableEnhancedFileUploader>
          <FileUploader {...requiredProps} ref={ref} multiple={true} />
        </FeatureFlags>
      );

      const input = document.querySelector('input[type="file"]');
      const files = [
        new File(['content1'], 'util1.png', { type: 'image/png' }),
        new File(['content2'], 'util2.png', { type: 'image/png' }),
      ];

      await userEvent.upload(input, files);

      const currentFiles = ref.current.getCurrentFiles();
      expect(currentFiles).toHaveLength(2);
      expect(currentFiles[0].name).toBe('util1.png');
      expect(currentFiles[1].name).toBe('util2.png');

      await act(async () => {
        ref.current.clearFiles();
      });

      expect(screen.queryByText('util1.png')).not.toBeInTheDocument();
      expect(screen.queryByText('util2.png')).not.toBeInTheDocument();
    });
  });
});
