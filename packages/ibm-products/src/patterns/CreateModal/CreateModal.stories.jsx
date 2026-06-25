/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import styles from './_story-styles.scss?inline';
import DocsPage from './CreateModal.mdx';
import { StandardCreateModal } from './example/preview-components/StandardCreateModal';
import { CreateModalWithValidation } from './example/preview-components/CreateModalWithValidation';

export default {
  title: 'Patterns/Create flows/Create Modal',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: DocsPage,
    },
  },
};

const CreateModalPattern = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <StandardCreateModal open={open} setOpen={setOpen} {...args} />
    </>
  );
};

const CreateModalWithValidationPattern = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Launch CreateModal with form validation
      </Button>
      <CreateModalWithValidation open={open} setOpen={setOpen} {...args} />
    </>
  );
};

export const CreateModal = CreateModalPattern.bind({});
CreateModal.args = {};

export const WithFormValidation = CreateModalWithValidationPattern.bind({});
WithFormValidation.args = {};
