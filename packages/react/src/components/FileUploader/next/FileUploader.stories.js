/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { usePrefix } from '../../../internal/usePrefix';

import {
  FileUploader,
  FileUploaderButton,
  FileUploaderDropContainer,
  FileUploaderItem,
  FileUploaderSkeleton,
} from '../';
import './FileUploader-story.scss';

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
};

export const Default = (args) => {
  const prefix = usePrefix();

  return (
    <div className={`${prefix}--file__container`}>
      <FileUploader {...args} />
    </div>
  );
};
Default.args = {
  labelTitle: 'Upload files',
  labelDescription: 'Max file size is 500mb. Only .jpg files are supported.',
  buttonLabel: 'Add file',
  buttonKind: 'primary',
  size: 'md',
  filenameStatus: 'edit',
  accept: ['.jpg', '.png'],
  name: '',
  role: 'button',
  multiple: true,
  disabled: false,
  iconDescription: 'Delete file',
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
};

export const _FileUploaderItem = (args) => <FileUploaderItem {...args} />;
_FileUploaderItem.args = {
  errorBody: '500kb max file size. Select a new file and try again.',
  errorSubject: 'File size exceeds limit',
  iconDescription: 'Delete file',
  invalid: false,
  name: 'README.md',
  status: 'edit',
  size: 'md',
};
_FileUploaderItem.argTypes = {
  onDelete: { action: 'onDelete' },
  status: {
    control: { type: 'select' },
    options: filenameStatuses,
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
  },
};

export const _FileUploaderDropContainer = (args) => (
  <FileUploaderDropContainer {...args} />
);
_FileUploaderDropContainer.args = {
  labelText: 'Drag and drop files here or click to upload',
  name: '',
  multiple: true,
  accept: ['image/jpeg', 'image/png'],
  disabled: false,
  role: '',
  tabIndex: 0,
};
_FileUploaderDropContainer.argTypes = {
  onChange: { action: 'onChange' },
};

export const DragAndDropUploadContainerExampleApplication = (args) =>
  require('./stories/drop-container').default(args);

DragAndDropUploadContainerExampleApplication.args = {
  labelText: 'Drag and drop files here or click to upload',
  name: '',
  multiple: true,
  accept: ['image/jpeg', 'image/png'],
  disabled: false,
  role: '',
  tabIndex: 0,
};
DragAndDropUploadContainerExampleApplication.argTypes = {
  onChange: { action: 'onChange' },
};

export const Skeleton = () => (
  <div style={{ width: '500px' }}>
    <FileUploaderSkeleton />
  </div>
);
