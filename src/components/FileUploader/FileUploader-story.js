/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import FileUploader, { FileUploaderButton } from '../FileUploader';

storiesOf('FileUploader', module)
  .addWithInfo(
    'FileUploaderButton',
    `
      The FileUploaderButton can be used as a standalone component if you do not need the extra UI that comes with FileUploader. The FileUploaderButton is used in FileUploader.
    `,
    () => (
      <FileUploaderButton
        labelText="Add files"
        className="bob"
        onChange={() => console.log('hi')}
        multiple
      />
    )
  )
  .addWithInfo(
    'FileUploader',
    `
      The FileUploader components allow the user to upload any necessary files. This uses the FileUploaderButton and Filename components. Filename components will appear below the FileUploaderButton when files are added. Use the filenameStatus prop to control what icon appears in Filename ('edit', 'complete', or 'uploading').
    `,
    () => (
      <FileUploader
        labelTitle="Upload"
        labelDescription="only .jpg files at 500mb or less"
        buttonLabel="Add files"
        filenameStatus="edit"
        multiple
      />
    )
  );
