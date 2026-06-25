//
// Copyright IBM Corp. 2021, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { action } from 'storybook/actions';
// import styles from './_storybook-styles.scss?inline'; // import index in case more files are added later.
import { ImportModal } from '.';
import mdx from './ImportModal.mdx';
// import mdx from './ImportModal.mdx';

export default {
  title: 'Patterns/Prebuilt patterns/ImportModal',
  component: ImportModal,
  tags: ['autodocs'],
  parameters: {
    // styles,
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    accept: {
      control: {
        type: 'select',
        labels: {
          0: 'image (png, jpeg or gif)',
          1: 'document (doc or pdf)',
          2: 'development (html, css or javascript)',
        },
      },
      options: [0, 1, 2],
    },
    portalTarget: {
      control: false,
    },
  },
};

const defaultProps = {
  className: 'test-class',
  defaultErrorBody: 'Select a new file and try again.',
  defaultErrorHeader: 'Import failed',
  description:
    'You can specify a file to import by either dragging it into the drag and drop area or by specifying a URL. (Maximum file size of 500KB)',
  fetchErrorBody: 'Unable to fetch URL.',
  fetchErrorHeader: 'Import failed',
  fileDropHeader: 'Add files using drag and drop',
  fileDropLabel: 'Drag and drop files here or click to upload',
  fileUploadLabel: 'files uploaded',
  inputButtonIcon: false,
  inputButtonText: 'Add file',
  inputId: 'test-id',
  inputLabel: 'Add a file by specifying a URL',
  inputPlaceholder: 'URL',
  invalidFileTypeErrorBody: 'Invalid file type.',
  invalidFileTypeErrorHeader: 'Import failed',
  invalidIconDescription: 'Delete',
  maxFileSize: 500000,
  maxFileSizeErrorBody: '500kb max file size. Select a new file and try again.',
  maxFileSizeErrorHeader: 'Import failed',
  onClose: action('onClose event'),
  onRequestSubmit: (file) => console.log('file contents', file),
  open: true,
  primaryButtonText: 'Import',
  secondaryButtonText: 'Cancel',
  title: 'Import',
};

const TemplateWithState = ({ ...args }, context) => {
  const { accept } = args;
  const getAcceptValues = (value) => {
    if (value === 0) {
      return ['image/png', 'image/jpeg', 'image/gif'];
    } else if (value === 1) {
      return ['application/doc', 'application/docx', 'application/pdf'];
    } else if (value === 2) {
      return ['text/plain', 'text/css', 'text/html', 'text/javascript'];
    }
  };
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  return (
    <>
      <ImportModal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        accept={getAcceptValues(accept)}
      />
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
    </>
  );
};

export const Standard = TemplateWithState.bind({});
Standard.args = {
  accept: 0,
  ...defaultProps,
};
