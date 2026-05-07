/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileUploader from '../index';

describe('FileUploader (Composable)', () => {
  describe('renders as expected - Component API', () => {
    it('should render with label title and description', () => {
      render(
        <FileUploader
          labelTitle="Upload files"
          labelDescription="Max file size is 500kb">
          <FileUploader.Button>Add files</FileUploader.Button>
        </FileUploader>
      );

      expect(screen.getByText('Upload files')).toBeInTheDocument();
      expect(screen.getByText('Max file size is 500kb')).toBeInTheDocument();
    });

    it('should render FileUploader.Button', () => {
      render(
        <FileUploader>
          <FileUploader.Button labelText="Add files" />
        </FileUploader>
      );

      expect(
        screen.getByRole('button', { name: 'Add files' })
      ).toBeInTheDocument();
    });

    it('should render FileUploader.List with items', () => {
      render(
        <FileUploader>
          <FileUploader.List>
            <FileUploader.Item
              uuid="file-1"
              name="test-file.jpg"
              status="edit"
            />
            <FileUploader.Item
              uuid="file-2"
              name="another-file.png"
              status="edit"
            />
          </FileUploader.List>
        </FileUploader>
      );

      expect(screen.getByText('test-file.jpg')).toBeInTheDocument();
      expect(screen.getByText('another-file.png')).toBeInTheDocument();
    });

    it('should apply disabled state from context', () => {
      render(
        <FileUploader disabled>
          <FileUploader.Button labelText="Add files" />
        </FileUploader>
      );

      const button = screen.getByRole('button', { name: 'Add files' });
      expect(button).toBeDisabled();
    });

    it('should apply size from context', () => {
      const { container } = render(
        <FileUploader size="sm">
          <FileUploader.Button labelText="Add files" />
        </FileUploader>
      );

      const button = container.querySelector('.cds--btn--sm');
      expect(button).toBeInTheDocument();
    });
  });

  describe('behaves as expected - Component API', () => {
    it('should call onAddFiles when files are selected via button', async () => {
      const user = userEvent.setup();
      const handleAddFiles = jest.fn();
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });

      render(
        <FileUploader>
          <FileUploader.Button onAddFiles={handleAddFiles} multiple>
            Add files
          </FileUploader.Button>
        </FileUploader>
      );

      const input = document.querySelector('input[type="file"]');
      await user.upload(input, file);

      expect(handleAddFiles).toHaveBeenCalledTimes(1);
      expect(handleAddFiles).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          addedFiles: expect.arrayContaining([file]),
        })
      );
    });

    it('should call onDelete when delete button is clicked', async () => {
      const user = userEvent.setup();
      const handleDelete = jest.fn();

      render(
        <FileUploader>
          <FileUploader.List>
            <FileUploader.Item
              uuid="file-1"
              name="test-file.jpg"
              status="edit"
              onDelete={handleDelete}
            />
          </FileUploader.List>
        </FileUploader>
      );

      const deleteButton = screen.getByRole('button', {
        name: /uploading file/i,
      });
      await user.click(deleteButton);

      expect(handleDelete).toHaveBeenCalledTimes(1);
      expect(handleDelete).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          uuid: 'file-1',
        })
      );
    });

    it('should display error messages for invalid files', () => {
      render(
        <FileUploader>
          <FileUploader.List>
            <FileUploader.Item
              uuid="file-1"
              name="large-file.jpg"
              status="edit"
              invalid
              errorSubject="File size exceeds limit"
              errorBody="Maximum file size is 500kb"
            />
          </FileUploader.List>
        </FileUploader>
      );

      expect(screen.getByText('File size exceeds limit')).toBeInTheDocument();
      expect(
        screen.getByText('Maximum file size is 500kb')
      ).toBeInTheDocument();
    });
  });

  describe('FileUploader.DropContainer', () => {
    it('should render drop container', () => {
      render(
        <FileUploader>
          <FileUploader.DropContainer labelText="Drag and drop files here" />
        </FileUploader>
      );

      expect(
        screen.getByRole('button', { name: 'Drag and drop files here' })
      ).toBeInTheDocument();
    });

    it('should call onAddFiles when files are dropped', async () => {
      const handleAddFiles = jest.fn();
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });

      render(
        <FileUploader>
          <FileUploader.DropContainer
            labelText="Drop files"
            onAddFiles={handleAddFiles}
          />
        </FileUploader>
      );

      const dropZone = screen
        .getByRole('button', { name: 'Drop files' })
        .closest('div');
      const dataTransfer = {
        files: [file],
        items: [
          {
            kind: 'file',
            type: file.type,
            getAsFile: () => file,
            webkitGetAsEntry: () => null,
          },
        ],
        types: ['Files'],
      };

      // Simulate drop event
      const dropEvent = new Event('drop', { bubbles: true });
      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: dataTransfer,
      });
      dropZone.dispatchEvent(dropEvent);

      expect(handleAddFiles).toHaveBeenCalled();
    });
  });

  describe('Composability', () => {
    it('should allow using both Button and DropContainer together', () => {
      render(
        <FileUploader labelTitle="Upload files">
          <FileUploader.Button labelText="Add files" />
          <FileUploader.DropContainer labelText="Or drag and drop" />
          <FileUploader.List />
        </FileUploader>
      );

      expect(
        screen.getByRole('button', { name: 'Add files' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Or drag and drop' })
      ).toBeInTheDocument();
    });

    it('should allow custom file list rendering', () => {
      const files = [
        { uuid: '1', name: 'file1.jpg', status: 'edit' },
        { uuid: '2', name: 'file2.png', status: 'complete' },
      ];

      render(
        <FileUploader>
          <FileUploader.List>
            {files.map((file) => (
              <FileUploader.Item key={file.uuid} {...file} />
            ))}
          </FileUploader.List>
        </FileUploader>
      );

      expect(screen.getByText('file1.jpg')).toBeInTheDocument();
      expect(screen.getByText('file2.png')).toBeInTheDocument();
    });
  });
});
