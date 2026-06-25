/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button, Link } from '@carbon/react';
// import styles from './_storybook-styles.scss?inline'; // import index in case more files are added later.
import { RemoveModal } from '.';
import mdx from './RemoveModal.mdx';

export default {
  title: 'Patterns/Prebuilt patterns/RemoveModal',
  component: RemoveModal,
  tags: ['autodocs'],
  parameters: {
    // styles,
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    portalTarget: {
      control: false,
    },
  },
};

const resourceName = 'bx1001';

const defaultProps = {
  className: 'remove-modal-test',
  title: 'Confirm delete',
  iconDescription: 'Close',
  inputInvalidText: 'A valid value is required',
  inputLabelText: `Type ${resourceName} to confirm`,
  inputPlaceholderText: 'Name of resourceName',
  onClose: () => false,
  open: true,
  primaryButtonDisabled: false,
  primaryButtonText: 'Delete',
  resourceName,
  secondaryButtonText: 'Cancel',
  label: `Delete ${resourceName}`,
  preventCloseOnClickOutside: true,
};

const Template = ({ open: initOpen, ...args }, context) => {
  const [open, setOpen] = useState(context.viewMode !== 'docs' && initOpen);

  return (
    <>
      <RemoveModal {...args} open={open} onClose={() => setOpen(false)} />
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
    </>
  );
};

const ComponentInBodyPatternTemplate = (
  { open: initOpen, ...args },
  context
) => {
  const [open, setOpen] = useState(context.viewMode !== 'docs' && initOpen);

  return (
    <>
      <RemoveModal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        body={
          <React.Fragment>
            {`Before removing bx1001, you can find out more information on the `}
            <Link href={'https://www.carbondesignsystem.com'}>
              Carbon Design System
            </Link>
            {' website.'}
          </React.Fragment>
        }
      />
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
    </>
  );
};

export const Standard = Template.bind({});
Standard.args = {
  ...defaultProps,
  body: `Removing ${resourceName} will permanently remove the configuration. This action cannot be undone.`,
  title: 'Confirm removal',
  primaryButtonText: 'Remove',
  label: `Remove ${resourceName}`,
};

export const RemovePattern = Template.bind({});
RemovePattern.args = {
  ...defaultProps,
  body: `Removing ${resourceName} will permanently remove the configuration. This action cannot be undone.`,
  title: 'Confirm removal',
  primaryButtonText: 'Remove',
  label: `Remove ${resourceName}`,
  open: true,
};

export const DeletePattern = Template.bind({});
DeletePattern.args = {
  ...defaultProps,
  textConfirmation: true,
  body: `Deleting ${resourceName} will permanently delete the configuration. This action cannot be undone.`,
};

export const ComponentInBodyPattern = ComponentInBodyPatternTemplate.bind({});
ComponentInBodyPattern.args = {
  ...defaultProps,
};
