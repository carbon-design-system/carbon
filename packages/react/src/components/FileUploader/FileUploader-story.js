/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  withKnobs,
  array,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import FileUploader, { FileUploaderButton } from '../FileUploader';
import FileUploaderSkeleton from '../FileUploader/FileUploader.Skeleton';
import Button from '../Button';
import { settings } from 'carbon-components';

const { prefix } = settings;
const buttonKinds = {
  'Primary (primary)': 'primary',
  'Secondary (secondary)': 'secondary',
  'Danger (danger)': 'danger',
  'Ghost (ghost)': 'ghost',
  'Danger Primary (danger--primary)': 'danger--primary',
  'Tertiary (tertiary)': 'tertiary',
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
      disableLabelChanges: boolean(
        'Prevent the label from being replaced with file selected file (disableLabelChanges)',
        false
      ),
      role: text('ARIA role of the button (role)', ''),
      tabIndex: number('Tab index (tabIndex)', 0),
      onChange: action('onChange'),
    };
  },
  fileUploader: () => ({
    labelTitle: text('The label title (labelTitle)', 'Upload'),
    labelDescription: text(
      'The label description (labelDescription)',
      'only .jpg files at 500mb or less'
    ),
    buttonLabel: text('The button label (buttonLabel)', 'Add files'),
    filenameStatus: select(
      'Status for file name (filenameStatus)',
      filenameStatuses,
      'edit'
    ),
    accept: array('Accepted file extensions (accept)', ['.jpg', '.png'], ','),
    name: text('Form item name: (name)', ''),
    multiple: boolean('Supports multiple files (multiple)', true),
  }),
};

storiesOf('FileUploader', module)
  .addDecorator(withKnobs)
  .add(
    'FileUploaderButton',
    () => <FileUploaderButton {...props.fileUploaderButton()} />,
    {
      info: {
        text: `
            The FileUploaderButton can be used as a standalone component if you do not need the extra UI that comes with FileUploader. The FileUploaderButton is used in FileUploader.
          `,
      },
    }
  )
  .add(
    'FileUploader',
    () => {
      let fileUploader;
      return (
        <div className={`${prefix}--file__container`}>
          <FileUploader
            {...props.fileUploader()}
            ref={node => (fileUploader = node)}
          />
          <Button
            kind="secondary"
            small
            style={{ marginTop: '1rem' }}
            onClick={() => {
              fileUploader.clearFiles();
            }}>
            Clear File
          </Button>
        </div>
      );
    },
    {
      info: {
        text: `
            The FileUploader components allow the user to upload any necessary files. This uses the FileUploaderButton and Filename components. Filename components will appear below the FileUploaderButton when files are added. Use the filenameStatus prop to control what icon appears in Filename ('edit', 'complete', or 'uploading').
          `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div style={{ width: '500px' }}>
        <FileUploaderSkeleton />
      </div>
    ),
    {
      info: {
        text: `
    Placeholder skeleton state to use when content is loading.
    `,
      },
    }
  );
