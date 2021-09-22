/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  array,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import { settings } from 'carbon-components';
import FileUploader, { FileUploaderButton } from '../FileUploader';
import FileUploaderSkeleton from '../FileUploader/FileUploader.Skeleton';
import FileUploaderItem from './FileUploaderItem';
import FileUploaderDropContainer from './FileUploaderDropContainer';
import mdx from './FileUploader.mdx';
import './FileUploader-story.scss';

const { prefix } = settings;
const buttonKinds = {
  'Primary (primary)': 'primary',
  'Secondary (secondary)': 'secondary',
  'Danger (danger)': 'danger',
  'Ghost (ghost)': 'ghost',
  'Danger Primary (danger--primary)': 'danger--primary',
  'Tertiary (tertiary)': 'tertiary',
};

const sizes = {
  'Compat check - Field': 'field',
  'Compat check - Small': 'small',
  'Compat check - default': 'default',
  'Small  (sm)': 'sm',
  'Medium (md)': 'md',
  'Large (lg) - Default': 'lg',
};

const filenameStatuses = {
  'Edit (edit)': 'edit',
  'Complete (complete)': 'complete',
  'Uploading (uploading)': 'uploading',
};

const props = {
  fileUploaderButton: () => {
    const buttonKind = select('Button kind (buttonKind)', buttonKinds, '');
    return {
      className: 'bob',
      labelText: text('Label text (labelText)', 'Add files'),
      name: text('Form item name: (name)', ''),
      multiple: boolean('Supports multiple files (multiple)', true),
      disabled: boolean('Disabled (disabled)', false),
      buttonKind: buttonKind || 'primary',
      size: select('Button size (size)', sizes, 'default'),
      disableLabelChanges: boolean(
        'Prevent the label from being replaced with file selected file (disableLabelChanges)',
        false
      ),
      role: text('ARIA role of the button (role)', 'button'),
      tabIndex: number('Tab index (tabIndex)', 0),
      onChange: action('onChange'),
    };
  },
  fileUploader: () => {
    const buttonKind = select(
      'Button kind (buttonKind)',
      {
        'Primary (primary)': 'primary',
        'Tertiary (tertiary)': 'tertiary',
      },
      ''
    );
    return {
      labelTitle: text('The label title (labelTitle)', 'Upload files'),
      labelDescription: text(
        'The label description (labelDescription)',
        'Max file size is 500mb. Only .jpg files are supported.'
      ),
      buttonLabel: text('The button label (buttonLabel)', 'Add file'),
      buttonKind: buttonKind || 'primary',
      size: select('Button size (size)', sizes, 'default'),
      filenameStatus: select(
        'Status for file name (filenameStatus)',
        filenameStatuses,
        'edit'
      ),
      accept: array('Accepted file extensions (accept)', ['.jpg', '.png'], ','),
      name: text('Form item name: (name)', ''),
      multiple: boolean('Supports multiple files (multiple)', true),
      iconDescription: text(
        'Close button icon description (iconDescription)',
        'Clear file'
      ),
      onChange: action('onChange'),
      onClick: action('onClick'),
      onDelete: action('onDelete'),
    };
  },
  fileUploaderItem: () => ({
    name: text('Filename (name)', 'README.md'),
    status: select('Status for file name (status)', filenameStatuses, 'edit'),
    iconDescription: text(
      'Close button icon description (iconDescription)',
      'Clear file'
    ),
    onDelete: action('onDelete'),
    invalid: boolean('Invalid (invalid)', false),
    errorSubject: text(
      'Error subject (errorSubject)',
      'File size exceeds limit'
    ),
    errorBody: text(
      'Error body (errorBody)',
      '500kb max file size. Select a new file and try again.'
    ),
    size: select('FileUploaderItem height (size)', sizes, 'default'),
  }),
  fileUploaderDropContainer: () => ({
    size: select('Filename height (size)', sizes, 'default'),
    labelText: text(
      'Label text (labelText)',
      'Drag and drop files here or click to upload'
    ),
    name: text('Form item name (name)', ''),
    multiple: boolean('Supports multiple files (multiple)', true),
    accept: array(
      'Accepted MIME types or file extensions (accept)',
      ['image/jpeg', 'image/png'],
      ','
    ),
    disabled: boolean('Disabled (disabled)', false),
    role: text('ARIA role of the button (role)', ''),
    tabIndex: number('Tab index (tabIndex)', 0),
    onAddFiles: action('onAddFiles'),
  }),
};

export default {
  title: 'Components/FileUploader',
  decorators: [withKnobs],

  parameters: {
    component: FileUploader,
    docs: {
      page: mdx,
    },

    subcomponents: {
      FileUploaderButton,
      FileUploaderSkeleton,
      FileUploaderItem,
      FileUploaderDropContainer,
    },
  },
};

export const _FileUploader = () => {
  return (
    <div className={`${prefix}--file__container`}>
      <FileUploader {...props.fileUploader()} />
    </div>
  );
};

_FileUploader.storyName = 'FileUploader';

_FileUploader.parameters = {
  info: {
    text: `
        The FileUploader components allow the user to upload any necessary files. This uses the FileUploaderButton and Filename components. Filename components will appear below the FileUploaderButton when files are added. Use the filenameStatus prop to control what icon appears in Filename ('edit', 'complete', or 'uploading').
      `,
  },
};

export const _FileUploaderItem = () => (
  <FileUploaderItem {...props.fileUploaderItem()} />
);

_FileUploaderItem.storyName = 'FileUploaderItem';

_FileUploaderItem.parameters = {
  info: {
    text: `
      <FileUploaderItem /> represents an item that has been uploaded to the file uploader component. Use the \`status\` prop to control which icon appears ('edit', 'complete', or 'uploading').
    `,
  },
};

export const _FileUploaderDropContainer = () => (
  <FileUploaderDropContainer {...props.fileUploaderDropContainer()} />
);

_FileUploaderDropContainer.storyName = 'FileUploaderDropContainer';

_FileUploaderDropContainer.parameters = {
  info: {
    text:
      '<FileUploaderDropContainer /> is a drag and drop file uploader which allows users to upload files via both the normal file selection dialog and by dragging and dropping files.',
  },
};

export const DragAndDropUploadContainerExampleApplication = () =>
  require('./stories/drop-container').default(
    props.fileUploaderDropContainer()
  );

DragAndDropUploadContainerExampleApplication.storyName =
  'Drag and drop upload container example application';

DragAndDropUploadContainerExampleApplication.parameters = {
  info: {
    text: 'Example application with drag and drop file uploader',
  },
};

export const Skeleton = () => (
  <div style={{ width: '500px' }}>
    <FileUploaderSkeleton />
  </div>
);

Skeleton.storyName = 'skeleton';

Skeleton.parameters = {
  info: {
    text: `
Placeholder skeleton state to use when content is loading.
`,
  },
};
