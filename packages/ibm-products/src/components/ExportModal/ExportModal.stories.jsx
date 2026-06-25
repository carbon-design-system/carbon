/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef } from 'react';
import { Button } from '@carbon/react';
import { ExportModal } from '.';
import wait from '../../global/js/utils/wait';
import mdx from './ExportModal.mdx';

export default {
  title: 'Patterns/Prebuilt patterns/ExportModal',
  component: ExportModal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    validExtensions: {
      control: {
        type: 'select',
        labels: {
          0: 'no extension validation',
          1: 'pdf extension validation',
        },
      },
      options: [0, 1],
    },
    preformattedExtensions: {
      control: {
        type: 'select',
        labels: {
          0: 'no preformatted extensions',
          1: 'preformatted extensions',
        },
      },
      options: [0, 1],
    },
  },
};

const defaultProps = {
  filename: 'Sample02.pdf',
  inputLabel: 'File name',
  onClose: () => {},
  onRequestSubmit: () => {},
  open: true,
  primaryButtonText: 'Export',
  secondaryButtonText: 'Cancel',
  title: 'Export',
  inputType: 'text',
  successful: true,
};

const Template = ({ storyInitiallyOpen, ...args }, context) => {
  const { preformattedExtensions, validExtensions } = args;
  const getPreformattedExtensions = (value) => {
    if (value === 1) {
      return [
        {
          extension: 'YAML',
          description: 'best for IBM managed cloud',
        },
        {
          extension: 'BAR',
          description: 'best for integration server',
        },
      ];
    }
    return [];
  };

  const getValidations = (value) => {
    if (value === 1) {
      return ['pdf'];
    }
    return [];
  };

  const [open, setOpen] = useState(
    context.viewMode !== 'docs' && storyInitiallyOpen
  );
  const triggerButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);

  const onSubmitHandler = async () => {
    setLoading(true);
    await wait(1000);
    if (args.successful) {
      setSuccessful(true);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const onCloseHandler = () => {
    setOpen(false);
    setSuccessful(false);
    setError(false);
  };
  function RenderButton(triggerButtonRef) {
    return (
      <Button ref={triggerButtonRef} onClick={() => setOpen(true)}>
        Launch modal
      </Button>
    );
  }
  return (
    <main>
      {RenderButton(triggerButtonRef)}
      <ExportModal
        {...args}
        validExtensions={getValidations(validExtensions)}
        preformattedExtensions={getPreformattedExtensions(
          preformattedExtensions
        )}
        open={open}
        onClose={onCloseHandler}
        onRequestSubmit={onSubmitHandler}
        loading={loading}
        successful={successful}
        loadingMessage="Exporting file..."
        successMessage="The file has been exported."
        error={error}
        errorMessage="Server error 500"
        triggerButtonRef={triggerButtonRef}
      />
    </main>
  );
};

export const Standard = Template.bind({});
Standard.args = {
  ...defaultProps,
  validExtensions: 0,
  preformattedExtensions: 0,
  invalidInputText: 'File must have valid extension .pdf',
  body: '',
  preformattedExtensionsLabel: 'Choose an export format',
  storyInitiallyOpen: true,
};

export const WithExtensionValidation = Template.bind({});
WithExtensionValidation.args = {
  ...defaultProps,
  validExtensions: 1,
  preformattedExtensions: 0,
  filename: '',
  invalidInputText: 'File must have valid extension .pdf',
  body: 'File must be exported in a PDF format.',
  preformattedExtensionsLabel: 'Choose an export format',
  storyInitiallyOpen: true,
};

export const WithPreformattedExtensions = Template.bind({});
WithPreformattedExtensions.args = {
  ...defaultProps,
  filename: 'test',
  validExtensions: 0,
  preformattedExtensions: 1,
  invalidInputText: 'File must have valid extension .pdf',
  body: '',
  preformattedExtensionsLabel: 'Choose an export format',
  storyInitiallyOpen: true,
};
