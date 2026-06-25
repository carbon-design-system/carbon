/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import DocsPage from './CreateTearsheet.mdx';
import { Default } from './example/preview-components/Default';
import { WithValidation } from './example/preview-components/WithValidation';
import styles from './example/styles/_story-styles.scss?inline';

export default {
  title: 'Patterns/Create flows/CreateTearsheetNarrow',
  component: Default,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: { page: DocsPage },
  },
};

const createTearsheetProps = {
  title: 'Create partition',
  description: 'Select the number of partitions you want to create',
  submitButtonText: 'Create',
  cancelButtonText: 'Cancel',
  className: 'test-class-name',
  label: 'Test label',
};

export const createTearsheetNarrow = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`.tearsheet-create-narrow { opacity: 0 }`}</style>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close CreateTearsheetNarrow' : 'Open CreateTearsheetNarrow'}
      </Button>
      <Default {...args} open={open} setOpen={setOpen} />
    </>
  );
};
createTearsheetNarrow.storyName = 'Default';
createTearsheetNarrow.args = {
  ...createTearsheetProps,
};

export const withFormValidation = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`.tearsheet-create-narrow { opacity: 0 }`}</style>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close CreateTearsheetNarrow' : 'Open CreateTearsheetNarrow'}
      </Button>
      <WithValidation {...args} open={open} setOpen={setOpen} />
    </>
  );
};
withFormValidation.storyName = 'With Form Validation';
withFormValidation.args = {
  ...createTearsheetProps,
};
