/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FileUploader from '../';
import React from 'react';
import { uploadFiles } from '../test-helpers';

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
  describe('FileUploader enhanced callbacks', () => {
    it('should provide complete file information in onChange callback', async () => {
      const onChange = jest.fn();
      const { container } = render(
        <FileUploader {...requiredProps} onChange={onChange} />
      );

      const input = container.querySelector('input');
      const file = new File(['test'], 'test.png', { type: 'image/png' });

      await userEvent.upload(input, file);

      expect(onChange).toHaveBeenCalledTimes(1);

      const [event, data] = onChange.mock.calls[0];

      // Test backward compatibility
      expect(event.target.files.length).toBe(1);
      expect(event.target.files[0].name).toBe('test.png');

      // Test enhanced data
      expect(data).toEqual({
        addedFiles: expect.arrayContaining([
          expect.objectContaining({
            name: 'test.png',
            uuid: expect.any(String),
            file: expect.any(File),
          }),
        ]),
        removedFiles: [],
        currentFiles: expect.any(Array),
        action: 'add',
      });
    });

    it('should provide complete file information in onDelete callback', async () => {
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

      const [event, data] = onDelete.mock.calls[0];

      expect(event.target.files).toBeDefined();
      expect(event.target.files.length).toBe(0);

      expect(data).toEqual({
        deletedFile: expect.objectContaining({
          name: 'test.png',
          uuid: expect.any(String),
          file: expect.any(File),
        }),
        remainingFiles: [],
      });
    });

    it('should call onChange for both add and delete operations', async () => {
      const onChange = jest.fn();
      const { container } = render(
        <FileUploader
          {...requiredProps}
          filenameStatus="edit"
          onChange={onChange}
        />
      );

      const input = container.querySelector('input');
      const file = new File(['test'], 'test.png', { type: 'image/png' });

      // Add file - should trigger onChange
      await userEvent.upload(input, file);
      expect(onChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ action: 'add' })
      );

      // Delete file - should also trigger onChange
      const removeFileButton = screen.getByLabelText(
        'test description - test.png'
      );
      await userEvent.click(removeFileButton);

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({
          action: 'remove',
          removedFiles: expect.arrayContaining([
            expect.objectContaining({ name: 'test.png' }),
          ]),
        })
      );
    });

    it('should maintain backward compatibility with existing callback patterns', async () => {
      const onChange = jest.fn();
      const onDelete = jest.fn();

      const { container } = render(
        <FileUploader
          {...requiredProps}
          filenameStatus="edit"
          onChange={onChange}
          onDelete={onDelete}
        />
      );

      const input = container.querySelector('input');
      const file = new File(['test'], 'test.png', { type: 'image/png' });

      await userEvent.upload(input, file);

      //for backword compatibility
      const [changeEvent] = onChange.mock.calls[0];
      expect(changeEvent.target.files).toBeDefined();
      expect(changeEvent.target.files.length).toBe(1);
      expect(changeEvent.target.files[0]).toBe(file);

      const removeFileButton = screen.getByLabelText(
        'test description - test.png'
      );
      await userEvent.click(removeFileButton);

      // onDelete should provides file information
      const [deleteEvent] = onDelete.mock.calls[0];
      expect(deleteEvent.target.files).toBeDefined();
      expect(deleteEvent.target.files.length).toBe(0);

      expect(typeof deleteEvent.target.files.item).toBe('function');
      expect(deleteEvent.target.files.item(0)).toBe(null);
    });
  });
});
