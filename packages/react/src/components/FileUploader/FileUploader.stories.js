/**
 * Copyright IBM Corp. 2016, 2026
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

const fileUploaderItemArgs = {
  disabled: false,
  errorBody: '1 MB max file size. Select a new file and try again.',
  errorSubject: 'File size exceeds limit',
  iconDescription: 'Delete file',
  invalid: false,
  name: 'THIS IS A VERY LONG FILENAME WHICH WILL BE TRUNCATED',
  size: 'md',
  status: 'edit',
  uuid: 'storybook-file',
};

const fileUploaderItemArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether file uploader item is disabled',
  },
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
    options: filenameStatuses,
    description: 'Status of the file upload',
  },
  uuid: {
    control: 'text',
    description: 'Unique identifier for the file object',
  },
};

const dropContainerArgs = {
  accept: ['image/jpeg', 'image/png'],
  disabled: false,
  labelText: 'Drag and drop files here or click to upload',
  maxFileSize: 1024 * 1024,
  multiple: true,
  name: '',
  size: 'md',
};

const dropContainerArgTypes = {
  accept: { control: 'object' },
  disabled: { control: 'boolean' },
  labelText: { control: 'text' },
  maxFileSize: { control: { type: 'number', min: 0, step: 1 } },
  multiple: { control: 'boolean' },
  name: { control: 'text' },
  onAddFiles: { action: 'onAddFiles' },
  onClick: { action: 'onClick' },
  size: { control: 'select', options: ['sm', 'md', 'lg'] },
};

const fileUploaderArgs = {
  accept: ['.jpg', '.png'],
  buttonKind: 'primary',
  buttonLabel: 'Add file',
  disabled: false,
  filenameStatus: 'edit',
  iconDescription: 'Delete file',
  labelDescription: 'Max file size is 1 MB. Only .jpg files are supported.',
  labelTitle: 'Upload files',
  maxFileSize: 1024 * 1024,
  multiple: true,
  name: '',
  size: 'md',
};

const fileUploaderArgTypes = {
  accept: { control: 'object' },
  buttonKind: {
    control: 'select',
    options: [
      'primary',
      'secondary',
      'danger',
      'ghost',
      'danger--primary',
      'tertiary',
    ],
  },
  buttonLabel: { control: 'text' },
  disabled: { control: 'boolean' },
  filenameStatus: {
    control: 'select',
    options: filenameStatuses,
  },
  iconDescription: { control: 'text' },
  labelDescription: { control: 'text' },
  labelTitle: { control: 'text' },
  maxFileSize: { control: { type: 'number', min: 0, step: 1 } },
  multiple: { control: 'boolean' },
  name: { control: 'text' },
  onAddFiles: { action: 'onAddFiles' },
  onChange: { action: 'onChange' },
  onClick: { action: 'onClick' },
  onDelete: { action: 'onDelete' },
  size: { control: 'select', options: ['sm', 'md', 'lg'] },
};

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
  return <FileUploaderItem {...args} />;
};

_FileUploaderItem.args = { ...fileUploaderItemArgs };
_FileUploaderItem.argTypes = { ...fileUploaderItemArgTypes };

// Remove all the props that don't apply to FileUploaderItem
_FileUploaderItem.parameters = {
  controls: {
    include: Object.keys(fileUploaderItemArgTypes),
  },
};

export const _FileUploaderDropContainer = (args) => {
  return <FileUploaderDropContainer {...args} />;
};

_FileUploaderDropContainer.args = { ...dropContainerArgs };
_FileUploaderDropContainer.argTypes = { ...dropContainerArgTypes };
_FileUploaderDropContainer.parameters = {
  controls: { include: Object.keys(dropContainerArgTypes) },
};

export const DragAndDropUploadContainerExampleApplication = (args) =>
  ExampleDropContainerApp(args);

DragAndDropUploadContainerExampleApplication.args = {
  ...dropContainerArgs,
};
DragAndDropUploadContainerExampleApplication.argTypes = {
  ...dropContainerArgTypes,
};
DragAndDropUploadContainerExampleApplication.parameters = {
  controls: { include: Object.keys(dropContainerArgTypes) },
};

export const DragAndDropUploadSingleContainerExampleApplication = (args) =>
  ExampleDropContainerAppSingle(args);

DragAndDropUploadSingleContainerExampleApplication.args = {
  ...dropContainerArgs,
  labelText: 'Drag and drop a file here or click to upload',
  multiple: false,
};
DragAndDropUploadSingleContainerExampleApplication.argTypes = {
  ...dropContainerArgTypes,
  multiple: {
    ...dropContainerArgTypes.multiple,
    table: { readonly: true },
  },
};
DragAndDropUploadSingleContainerExampleApplication.parameters = {
  controls: { include: Object.keys(dropContainerArgTypes) },
};

export const Skeleton = () => {
  return (
    <div style={{ width: '500px' }}>
      <FileUploaderSkeleton />
    </div>
  );
};

Skeleton.parameters = { controls: { disable: true } };

export const Default = (args) => {
  return (
    <div className="cds--file__container">
      <FileUploader {...args} />
    </div>
  );
};

Default.args = {
  ...fileUploaderArgs,
};
Default.argTypes = {
  ...fileUploaderArgTypes,
};

Default.parameters = {
  controls: { include: Object.keys(fileUploaderArgTypes) },
};
