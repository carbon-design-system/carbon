/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
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

const buttonKinds = {
  none: 'None ()',
  primary: 'Primary (primary)',
  secondary: 'Secondary (secondary)',
};

const filenameStatuses = {
  edit: 'Edit (edit)',
  complete: 'Complete (complete)',
  uploading: 'Uploading (uploading)',
};

const props = {
  fileUploaderButton: () => {
    const buttonKind = select('Button kind (buttonKind)', buttonKinds, '');
    return {
      className: 'bob',
      labelText: text('Label text (labelText)', 'Add files'),
      name: text('Form item name: (name)', ''),
      multiple: boolean('Supports multiple files (multiple)', true),
      buttonKind: buttonKind === 'none' ? '' : buttonKind,
      disableLabelChanges: boolean(
        'Prevent the label from being replaced with file selected file (disableLabelChanges)',
        false
      ),
      role: text('ARIA role of the button (role)', ''),
      tabIndex: number('Tab index (tabIndex)', -1),
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
    withInfo({
      text: `
        The FileUploaderButton can be used as a standalone component if you do not need the extra UI that comes with FileUploader. The FileUploaderButton is used in FileUploader.
      `,
    })(() => <FileUploaderButton {...props.fileUploaderButton()} />)
  )
  .add(
    'FileUploader',
    withInfo({
      text: `
        The FileUploader components allow the user to upload any necessary files. This uses the FileUploaderButton and Filename components. Filename components will appear below the FileUploaderButton when files are added. Use the filenameStatus prop to control what icon appears in Filename ('edit', 'complete', or 'uploading').
      `,
    })(() => (
      <div className="bx--file__container">
        <FileUploader
          {...props.fileUploader()()}
          ref={fileUploader => (this.fileUploader = fileUploader)}
        />
        <Button
          kind="secondary"
          small
          style={{ marginTop: '1rem' }}
          onClick={() => {
            this.fileUploader.clearFiles();
          }}>
          Clear File
        </Button>
      </div>
    ))
  )
  .add(
    'skeleton',
    withInfo({
      text: `
        Placeholder skeleton state to use when content is loading.
      `,
    })(() => (
      <div style={{ width: '500px' }}>
        <FileUploaderSkeleton />
      </div>
    ))
  );
