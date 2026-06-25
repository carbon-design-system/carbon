/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  decoratorArgTypes,
  slugArgTypes,
} from '../../global/js/story-parts/decorator';
import styles from './_storybook-styles.scss?inline';
import { CreateTearsheet } from './CreateTearsheet';
import DocsPage from './CreateTearsheet.docs-page';
import { MultiStepTearsheet } from './preview-components/MultiStepTearsheet';
import { MultiStepWithIntro } from './preview-components/MultiStepWithIntro';
import { MultiStepWithStepInErrorState } from './preview-components/MultiStepWithStepInErrorState';
import { TruncatedText } from '../TruncatedText';

export default {
  title: 'Patterns/Prebuilt patterns/Create flows/CreateTearsheet',
  component: CreateTearsheet,
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
    label: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    secondaryButtonDisabled: {
      control: { type: 'boolean' },
      description:
        'Conditionally disable the secondary (Back) button. This can be useful during form submission or when certain conditions need to be met before allowing navigation back.',
    },
    onClose: { control: { disable: true } },
    navigation: { control: { disable: true } },
    open: { control: { disable: true } },
    children: { control: { disable: true } },
    ...slugArgTypes(),
    ...decoratorArgTypes(),
  },
  parameters: {
    styles,
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
  influencerWidth: 'narrow',
};

export const multiStepTearsheet = MultiStepTearsheet.bind({});
multiStepTearsheet.storyName = 'Create tearsheet';
multiStepTearsheet.args = {
  ...createTearsheetProps,
  firstFocusElement: '#tearsheet-multi-step-story-text-input-multi-step-1',
};

export const withIntroStep = MultiStepWithIntro.bind({});
withIntroStep.storyName = 'Create tearsheet with intro step';
withIntroStep.args = {
  ...createTearsheetProps,
};

export const withErrorState = MultiStepWithStepInErrorState.bind({});
withErrorState.storyName = 'Create tearsheet with step in error state';
withErrorState.args = {
  ...createTearsheetProps,
};
