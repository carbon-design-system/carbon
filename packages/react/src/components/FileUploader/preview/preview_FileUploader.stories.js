/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import FileUploader from './index';

export default {
  title: 'Preview/preview__FileUploader',
  component: FileUploader,
  parameters: {
    controls: {
      // Exclude auto-generated controls from FileUploader component PropTypes
      // We use explicit dot-notation controls instead (e.g., 'FileUploader disabled')
      exclude: ['disabled', 'labelDescription', 'labelTitle', 'size'],
    },
  },
  args: {
    // FileUploader props
    'FileUploader disabled': false,
    'FileUploader size': 'md',
    'FileUploader labelTitle': 'Upload files',
    'FileUploader labelDescription':
      'Max file size is 500kb. Supported file types are .jpg and .png.',
    // FileUploader.Button props
    'FileUploader.Button labelText': 'Add files',
    'FileUploader.Button buttonKind': 'primary',
    'FileUploader.Button accept': ['.jpg', '.png'],
    'FileUploader.Button multiple': true,
    'FileUploader.Button name': 'file-uploader',
    // FileUploader.DropContainer props
    'FileUploader.DropContainer labelText':
      'Drag and drop files here or click to upload',
    'FileUploader.DropContainer maxFileSize': 500000,
    'FileUploader.DropContainer pattern': '\\.(jpg|png)$',
    // FileUploader.Item props
    'FileUploader.Item errorBody':
      '1 MB max file size. Select a new file and try again.',
    'FileUploader.Item errorSubject': 'File size exceeds limit',
    'FileUploader.Item iconDescription': 'Delete file',
    'FileUploader.Item invalid': false,
    'FileUploader.Item name': 'example-file.jpg',
    'FileUploader.Item status': 'edit',
    'FileUploader.Item size': 'md',
  },
  argTypes: {
    // Container props
    'FileUploader disabled': {
      control: 'boolean',
      description: 'Disable all file uploader components',
      table: {
        category: 'FileUploader',
      },
    },
    'FileUploader size': {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of file uploader components',
      table: {
        category: 'FileUploader',
      },
    },
    'FileUploader labelTitle': {
      control: 'text',
      description: 'Title text for the file uploader',
      table: {
        category: 'FileUploader',
      },
    },
    'FileUploader labelDescription': {
      control: 'text',
      description: 'Description text for the file uploader',
      table: {
        category: 'FileUploader',
      },
    },
    // Button props
    'FileUploader.Button labelText': {
      control: 'text',
      description: 'Label text for the button',
      table: {
        category: 'FileUploader.Button',
      },
    },
    'FileUploader.Button buttonKind': {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'danger',
        'ghost',
        'danger--primary',
        'danger--ghost',
        'danger--tertiary',
        'tertiary',
      ],
      description: 'Button kind/variant',
      table: {
        category: 'FileUploader.Button',
      },
    },
    'FileUploader.Button accept': {
      control: 'object',
      description: 'Accepted file types (e.g., [".jpg", ".png"])',
      table: {
        category: 'FileUploader.Button',
      },
    },
    'FileUploader.Button multiple': {
      control: 'boolean',
      description: 'Allow multiple file selection',
      table: {
        category: 'FileUploader.Button',
      },
    },
    'FileUploader.Button name': {
      control: 'text',
      description: 'Name attribute for the input element',
      table: {
        category: 'FileUploader.Button',
      },
    },
    // DropContainer props
    'FileUploader.DropContainer labelText': {
      control: 'text',
      description: 'Label text for the drop container',
      table: {
        category: 'FileUploader.DropContainer',
      },
    },
    'FileUploader.DropContainer maxFileSize': {
      control: 'number',
      description: 'Maximum file size in bytes',
      table: {
        category: 'FileUploader.DropContainer',
      },
    },
    'FileUploader.DropContainer pattern': {
      control: 'text',
      description: 'Custom regex pattern for accepted types',
      table: {
        category: 'FileUploader.DropContainer',
      },
    },
    // Item props (shared across all items)
    'FileUploader.Item errorBody': {
      control: 'text',
      description: 'Error message body for invalid file items',
      table: {
        category: 'FileUploader.Item',
      },
    },
    'FileUploader.Item errorSubject': {
      control: 'text',
      description: 'Error message subject for invalid file items',
      table: {
        category: 'FileUploader.Item',
      },
    },
    'FileUploader.Item iconDescription': {
      control: 'text',
      description: 'Icon description for delete button on items',
      table: {
        category: 'FileUploader.Item',
      },
    },
    'FileUploader.Item invalid': {
      control: 'boolean',
      description: 'Mark all file items as invalid',
      table: {
        category: 'FileUploader.Item',
      },
    },
    'FileUploader.Item name': {
      control: 'text',
      description: 'Override name for all file items (for demo purposes)',
      table: {
        category: 'FileUploader.Item',
      },
    },
    'FileUploader.Item status': {
      control: 'inline-radio',
      options: ['uploading', 'edit', 'complete'],
      description: 'Default status for file items',
      table: {
        category: 'FileUploader.Item',
      },
    },
    'FileUploader.Item size': {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of file items',
      table: {
        category: 'FileUploader.Item',
      },
    },
  },
};

// Constants
const DEFAULT_MAX_FILE_SIZE = 500000; // 500kb

// Helper to generate unique IDs
const generateUuid = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Helper to create file objects with validation
const createFileObject = (file, maxSize = DEFAULT_MAX_FILE_SIZE) => ({
  uuid: generateUuid(),
  name: file.name,
  invalid: file.size > maxSize,
  file,
});

// Helper to render FileUploader.Item with args
const renderFileItem = (file, args, handleDelete) => (
  <FileUploader.Item
    key={file.uuid}
    uuid={file.uuid}
    name={args['FileUploader.Item name'] || file.name}
    status={file.status || args['FileUploader.Item status'] || 'edit'}
    invalid={
      args['FileUploader.Item invalid'] !== undefined
        ? args['FileUploader.Item invalid']
        : file.invalid
    }
    errorSubject={
      args['FileUploader.Item errorSubject'] ||
      (file.invalid ? 'File size exceeds limit' : undefined)
    }
    errorBody={
      args['FileUploader.Item errorBody'] ||
      (file.invalid
        ? `${file.name} is ${Math.round(file.file.size / 1000)}kb. Maximum file size is ${Math.round((args['FileUploader.DropContainer maxFileSize'] || DEFAULT_MAX_FILE_SIZE) / 1000)}kb.`
        : undefined)
    }
    iconDescription={args['FileUploader.Item iconDescription'] || 'Delete file'}
    size={args['FileUploader.Item size']}
    onDelete={handleDelete}
  />
);

export const Default = (args) => {
  const [files, setFiles] = useState([]);

  const handleAddFiles = (evt, { addedFiles }) => {
    const newFiles = addedFiles.map((file) => createFileObject(file));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (evt, { uuid }) => {
    setFiles((prev) => prev.filter((f) => f.uuid !== uuid));
  };

  return (
    <FileUploader
      disabled={args['FileUploader disabled']}
      size={args['FileUploader size']}
      labelTitle={args['FileUploader labelTitle']}
      labelDescription={args['FileUploader labelDescription']}>
      <FileUploader.Button
        labelText={args['FileUploader.Button labelText'] || 'Add files'}
        buttonKind={args['FileUploader.Button buttonKind']}
        accept={args['FileUploader.Button accept'] || ['.jpg', '.png']}
        multiple={args['FileUploader.Button multiple'] !== false}
        name={args['FileUploader.Button name']}
        onAddFiles={handleAddFiles}
      />
      <FileUploader.List>
        {files.map((file) => renderFileItem(file, args, handleDelete))}
      </FileUploader.List>
    </FileUploader>
  );
};

Default.args = {
  'FileUploader.Button labelText': 'Add files',
  'FileUploader.Button accept': ['.jpg', '.png'],
  'FileUploader.Button multiple': true,
  'FileUploader.Item iconDescription': 'Delete file',
  'FileUploader.Item status': 'edit',
  'FileUploader.Item size': 'md',
  'FileUploader.Item invalid': false,
};

export const WithDropContainer = (args) => {
  const [files, setFiles] = useState([]);

  const handleAddFiles = (evt, { addedFiles }) => {
    const maxSize =
      args['FileUploader.DropContainer maxFileSize'] || DEFAULT_MAX_FILE_SIZE;
    const newFiles = addedFiles.map((file) => createFileObject(file, maxSize));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (evt, { uuid }) => {
    setFiles((prev) => prev.filter((f) => f.uuid !== uuid));
  };

  return (
    <FileUploader
      disabled={args['FileUploader disabled']}
      size={args['FileUploader size']}
      labelTitle={args['FileUploader labelTitle']}
      labelDescription={args['FileUploader labelDescription']}>
      <FileUploader.DropContainer
        labelText={
          args['FileUploader.DropContainer labelText'] ||
          'Drag and drop files here or click to upload'
        }
        accept={args['FileUploader.Button accept'] || ['.jpg', '.png']}
        multiple={args['FileUploader.Button multiple'] !== false}
        maxFileSize={args['FileUploader.DropContainer maxFileSize']}
        name={args['FileUploader.Button name']}
        pattern={args['FileUploader.DropContainer pattern']}
        onAddFiles={handleAddFiles}
      />
      <FileUploader.List>
        {files.map((file) => renderFileItem(file, args, handleDelete))}
      </FileUploader.List>
    </FileUploader>
  );
};

WithDropContainer.args = {
  'FileUploader.DropContainer labelText':
    'Drag and drop files here or click to upload',
  'FileUploader.Button accept': ['.jpg', '.png'],
  'FileUploader.Button multiple': true,
  'FileUploader.DropContainer maxFileSize': 500000,
  'FileUploader.Item iconDescription': 'Delete file',
  'FileUploader.Item status': 'edit',
  'FileUploader.Item size': 'md',
  'FileUploader.Item invalid': false,
};

export const WithUploadingState = (args) => {
  const [files, setFiles] = useState([]);

  const handleAddFiles = (evt, { addedFiles }) => {
    const newFiles = addedFiles.map((file) => ({
      uuid: generateUuid(),
      name: file.name,
      status: 'uploading',
      invalid: false,
      file,
    }));
    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate real-world upload flow: uploading → complete → edit
    newFiles.forEach((file) => {
      // After 1.5 seconds, change to complete
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.uuid === file.uuid ? { ...f, status: 'complete' } : f
          )
        );
      }, 1500);

      // After 3 seconds, change to edit (ready for deletion)
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) => (f.uuid === file.uuid ? { ...f, status: 'edit' } : f))
        );
      }, 3000);
    });
  };

  const handleDelete = (evt, { uuid }) => {
    setFiles((prev) => prev.filter((f) => f.uuid !== uuid));
  };

  return (
    <FileUploader
      disabled={args['FileUploader disabled']}
      size={args['FileUploader size']}
      labelTitle={args['FileUploader labelTitle']}
      labelDescription={args['FileUploader labelDescription']}>
      <FileUploader.Button
        labelText={args['FileUploader.Button labelText'] || 'Add files'}
        buttonKind={args['FileUploader.Button buttonKind']}
        accept={args['FileUploader.Button accept']}
        multiple={args['FileUploader.Button multiple'] !== false}
        name={args['FileUploader.Button name']}
        onAddFiles={handleAddFiles}
      />
      <FileUploader.List>
        {files.map((file) => (
          <FileUploader.Item
            key={file.uuid}
            uuid={file.uuid}
            name={args['FileUploader.Item name'] || file.name}
            status={file.status}
            invalid={args['FileUploader.Item invalid']}
            errorSubject={args['FileUploader.Item errorSubject']}
            errorBody={args['FileUploader.Item errorBody']}
            iconDescription={
              args['FileUploader.Item iconDescription'] || 'Delete file'
            }
            size={args['FileUploader.Item size']}
            onDelete={handleDelete}
          />
        ))}
      </FileUploader.List>
    </FileUploader>
  );
};

WithUploadingState.args = {
  'FileUploader.Button labelText': 'Add files',
  'FileUploader.Button multiple': true,
  'FileUploader.Item iconDescription': 'Delete file',
  'FileUploader.Item size': 'md',
  'FileUploader.Item invalid': false,
};

export const Disabled = (args) => {
  const [files, setFiles] = useState([]);

  const handleAddFiles = (evt, { addedFiles }) => {
    const newFiles = addedFiles.map((file) => createFileObject(file));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (evt, { uuid }) => {
    setFiles((prev) => prev.filter((f) => f.uuid !== uuid));
  };

  return (
    <FileUploader
      disabled={args['FileUploader disabled']}
      size={args['FileUploader size']}
      labelTitle={args['FileUploader labelTitle']}
      labelDescription={args['FileUploader labelDescription']}>
      <FileUploader.Button
        labelText={args['FileUploader.Button labelText'] || 'Add files'}
        buttonKind={args['FileUploader.Button buttonKind']}
        accept={args['FileUploader.Button accept'] || ['.jpg', '.png']}
        multiple={args['FileUploader.Button multiple'] !== false}
        name={args['FileUploader.Button name']}
        onAddFiles={handleAddFiles}
      />
      <FileUploader.List>
        {files.map((file) => renderFileItem(file, args, handleDelete))}
      </FileUploader.List>
    </FileUploader>
  );
};

Disabled.args = {
  'FileUploader disabled': true,
  'FileUploader.Button labelText': 'Add files',
  'FileUploader.Button accept': ['.jpg', '.png'],
  'FileUploader.Button multiple': true,
  'FileUploader.Item iconDescription': 'Delete file',
  'FileUploader.Item status': 'edit',
  'FileUploader.Item size': 'md',
  'FileUploader.Item invalid': false,
};

export const _FileUploaderItem = (args) => {
  return (
    <FileUploader.Item
      errorBody={args.errorBody}
      errorSubject={args.errorSubject}
      iconDescription={args.iconDescription}
      invalid={args.invalid}
      name={args.name}
      status={args.status}
      size={args.size}
      uuid={args.uuid}
      onDelete={args.onDelete}
    />
  );
};

_FileUploaderItem.args = {
  errorBody: '1 MB max file size. Select a new file and try again.',
  errorSubject: 'File size exceeds limit',
  iconDescription: 'Delete file',
  invalid: false,
  name: 'THIS IS A VERY LONG FILENAME WHICH WILL BE TRUNCATED',
  status: 'edit',
  size: 'md',
  uuid: 'file-1',
};

_FileUploaderItem.argTypes = {
  errorBody: {
    control: 'text',
    description: 'Error message body for an invalid file upload',
  },
  errorSubject: {
    control: 'text',
    description: 'Error message subject for an invalid file upload',
  },
  iconDescription: {
    control: 'text',
    description: 'Icon description for delete button',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently uploaded file is invalid',
  },
  name: {
    control: 'text',
    description: 'Name of the uploaded file',
  },
  onDelete: { action: 'onDelete' },
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg'],
    description: 'Size of the file item',
    table: {
      category: null, // Explicitly remove category
    },
  },
  status: {
    control: 'inline-radio',
    options: ['uploading', 'edit', 'complete'],
    description: 'Status of the file upload',
  },
  uuid: {
    control: 'text',
    description: 'Unique identifier for the file object',
  },
};

_FileUploaderItem.parameters = {
  controls: {
    // For this story, we want the raw FileUploaderItem props (not the dot-notation ones)
    // So we exclude all the composite story controls
    exclude: [
      'disabled',
      'labelDescription',
      'labelTitle',
      'size',
      'FileUploader disabled',
      'FileUploader size',
      'FileUploader labelTitle',
      'FileUploader labelDescription',
      'FileUploader.Button labelText',
      'FileUploader.Button buttonKind',
      'FileUploader.Button accept',
      'FileUploader.Button multiple',
      'FileUploader.Button name',
      'FileUploader.DropContainer labelText',
      'FileUploader.DropContainer maxFileSize',
      'FileUploader.DropContainer pattern',
      'FileUploader.Item errorBody',
      'FileUploader.Item errorSubject',
      'FileUploader.Item iconDescription',
      'FileUploader.Item invalid',
      'FileUploader.Item name',
      'FileUploader.Item status',
      'FileUploader.Item size',
    ],
  },
};
