/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import ExampleDropContainerApp from './stories/drop-container';
import ExampleDropContainerAppSingle from './stories/drag-and-drop-single';
import mdx from './FileUploader.mdx';

import {
  default as FileUploader,
  FileUploaderButton,
  FileUploaderDropContainer,
  FileUploaderItem,
  FileUploaderSkeleton,
} from './';

const filenameStatuses = ['edit', 'complete', 'uploading'];

export default {
  title: 'Components/FileUploader',
  component: FileUploader,
  subcomponents: {
    FileUploaderButton,
    FileUploaderSkeleton,
    FileUploaderItem,
    FileUploaderDropContainer,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const _FileUploaderItem = (args) => {
  return (
    <FileUploaderItem
      errorBody="500 KB max file size. Select a new file and try again."
      errorSubject="File size exceeds limit"
      iconDescription="Delete file"
      invalid={false}
      name="THIS IS A VERY LONG FILENAME WHICH WILL BE TRUNCATED"
      status="edit"
      size="md"
      {...args}
    />
  );
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
  iconDescription: { control: 'text' },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently uploaded file is invalid',
  },
  name: { control: 'text', description: 'Name of the uploaded file' },
  onDelete: { action: 'onDelete' },
  size: { control: 'select', options: ['sm', 'md', 'lg'] },
  status: {
    control: 'inline-radio',
    options: ['uploading', 'edit', 'complete'],
    description: 'Status of the file upload',
  },
  uuid: {
    control: 'text',
    description: 'Unique identifier for the file object',
  },

  // Remove all the props that don't apply to FileUploaderItem
  accept: {
    table: { disable: true },
  },
  buttonKind: {
    table: { disable: true },
  },
  buttonLabel: {
    table: { disable: true },
  },
  className: {
    table: { disable: true },
  },
  disabled: {
    table: { disable: true },
  },
  labelDescription: {
    table: { disable: true },
  },
  labelTitle: {
    table: { disable: true },
  },
  multiple: {
    table: { disable: true },
  },
  onChange: {
    table: { disable: true },
  },
  onClick: {
    table: { disable: true },
  },
  filenameStatus: {
    table: { disable: true },
  },
};

export const _FileUploaderDropContainer = () => {
  return (
    <FileUploaderDropContainer
      labelText="Drag and drop files here or click to upload"
      multiple={true}
      accept={['image/jpeg', 'image/png']}
      disabled={false}
      name=""
      tabIndex={0}
    />
  );
};

export const DragAndDropUploadContainerExampleApplication = (args) =>
  ExampleDropContainerApp(args);

DragAndDropUploadContainerExampleApplication.args = {
  labelText: 'Drag and drop files here or click to upload',
  name: '',
  multiple: true,
  accept: ['image/jpeg', 'image/png'],
  disabled: false,
  tabIndex: 0,
};
DragAndDropUploadContainerExampleApplication.argTypes = {
  onChange: { action: 'onChange' },
};

export const DragAndDropUploadSingleContainerExampleApplication = (args) =>
  ExampleDropContainerAppSingle(args);

DragAndDropUploadSingleContainerExampleApplication.args = {
  labelText: 'Drag and drop a file here or click to upload',
  name: '',
  multiple: false,
  accept: ['image/jpeg', 'image/png'],
  disabled: false,
  tabIndex: 0,
};
DragAndDropUploadSingleContainerExampleApplication.argTypes = {
  onChange: { action: 'onChange' },
};

export const Skeleton = () => {
  return (
    <div style={{ width: '500px' }}>
      <FileUploaderSkeleton />
    </div>
  );
};

export const Default = (args) => {
  return (
    <div className="cds--file__container">
      <FileUploader {...args} />
    </div>
  );
};

Default.args = {
  labelTitle: 'Upload files',
  labelDescription: 'Max file size is 500 MB. Only .jpg files are supported.',
  buttonLabel: 'Add file',
  buttonKind: 'primary',
  size: 'md',
  filenameStatus: 'edit',
  accept: ['.jpg', '.png'],
  multiple: true,
  disabled: false,
  iconDescription: 'Delete file',
  name: '',
};
Default.argTypes = {
  onChange: { action: 'onChange' },
  onClick: { action: 'onClick' },
  onDelete: { action: 'onDelete' },
  buttonKind: {
    control: { type: 'select' },
    options: [
      'primary',
      'secondary',
      'danger',
      'ghost',
      'danger--primary',
      'tertiary',
    ],
  },
  filenameStatus: {
    control: { type: 'select' },
    options: filenameStatuses,
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
  },
  accept: {
    table: { disable: true },
  },
  className: {
    table: { disable: true },
  },
  role: {
    table: { disable: true },
  },
};
