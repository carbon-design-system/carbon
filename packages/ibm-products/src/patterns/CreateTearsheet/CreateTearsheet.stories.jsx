/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import {
  decoratorArgTypes,
  slugArgTypes,
} from '../../global/js/story-parts/decorator';
import styles from './example/styles/_create-tearsheet.scss?inline';
import storyStyles from './example/styles/_story-styles.scss?inline';
import DocsPage from './CreateTearsheet.mdx';
import { MultiStepTearsheet } from './example/preview-components/MultiStepTearsheet';
import { MultiStepWithIntro } from './example/preview-components/MultiStepWithIntro';
import { MultiStepWithStepInErrorState } from './example/preview-components/MultiStepWithStepInErrorState';
import { TruncatedText } from '../../components/TruncatedText';

export default {
  title: 'Patterns/Create flows/CreateTearsheet',
  component: MultiStepTearsheet,
  tags: ['autodocs'],
  argTypes: {
    description: {
      control: {
        type: 'select',
        labels: {
          0: 'With plain String',
          1: 'With TruncatedText and 1 line',
          2: 'With TruncatedText and 2 lines',
        },
        default: 0,
      },
      description:
        'A description of the flow, displayed in the header area of the tearsheet.\n Note: `TruncatedText` can be passed as a React node to apply custom text formatting, including ellipsis truncation and a definition tooltip when the content is too long.',
      options: [0, 1, 2],
      mapping: {
        0: 'Specify details for the new topic you want to create',
        1: (
          <TruncatedText
            align="bottom"
            lines={1}
            value="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."
          />
        ),
        2: (
          <TruncatedText
            align="bottom"
            lines={2}
            value="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."
          />
        ),
      },
    },
    initialStep: {
      control: { type: 'number', min: 1 },
      description:
        'The step number to open when the tearsheet is first displayed. Use this to open the tearsheet at a specific step instead of starting at step 1.',
    },
    label: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    onClose: { control: { disable: true } },
    navigation: { control: { disable: true } },
    open: { control: { disable: true } },
    children: { control: { disable: true } },
    ...slugArgTypes(),
    ...decoratorArgTypes(),
  },
  parameters: {
    styles: [styles, storyStyles],
    docs: { page: DocsPage },
  },
};

const createTearsheetProps = {
  title: 'Create topic',
  description: 0,
  submitButtonText: 'Create',
  cancelButtonText: 'Cancel',
  backButtonText: 'Back',
  nextButtonText: 'Next',
  className: 'test-class-name',
  label: '',
};

export const multiStepTearsheet = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`.tearsheet-create-multi-step { opacity: 0 }`}</style>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close CreateTearsheet' : 'Open CreateTearsheet'}
      </Button>
      <MultiStepTearsheet {...args} open={open} setOpen={setOpen} />
    </>
  );
};
multiStepTearsheet.storyName = 'Create tearsheet';
multiStepTearsheet.args = {
  ...createTearsheetProps,
};

export const withIntroStep = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`.tearsheet-create-multi-step { opacity: 0 }`}</style>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close CreateTearsheet' : 'Open CreateTearsheet'}
      </Button>
      <MultiStepWithIntro {...args} open={open} setOpen={setOpen} />
    </>
  );
};
withIntroStep.storyName = 'Create tearsheet with intro step';
withIntroStep.args = {
  ...createTearsheetProps,
};

export const withErrorState = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`.tearsheet-create-multi-step { opacity: 0 }`}</style>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close CreateTearsheet' : 'Open CreateTearsheet'}
      </Button>
      <MultiStepWithStepInErrorState {...args} open={open} setOpen={setOpen} />
    </>
  );
};
withErrorState.storyName = 'Create tearsheet with step in error state';
withErrorState.args = {
  ...createTearsheetProps,
};
