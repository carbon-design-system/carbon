/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import styles from './_storybook-styles.scss?inline';
import { EditTearsheet } from './EditTearsheet';
import DocsPage from './EditTearsheet.docs-page';
import { MultiFormEditTearsheet } from './preview-components/MultiFormEditTearsheet';
import { slugArgTypes } from '../../global/js/story-parts/slug';
import { Annotation } from '../../../.storybook/Annotation';

export default {
  title: 'Deprecated/Edit and update/EditTearsheet',
  component: EditTearsheet,
  tags: ['autodocs'],
  argTypes: {
    description: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    influencer: { control: { disable: true } },
    onClose: { control: { disable: true } },
    open: { control: { disable: true } },
    ...slugArgTypes(),
  },
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: { page: DocsPage },
  },
  decorators: [
    (story) => (
      <Annotation
        type="deprecation-notice"
        text={
          <div>
            This component is deprecated and will be removed in the next major
            version.
          </div>
        }
      >
        {story()}
      </Annotation>
    ),
  ],
};

const editTearsheetProps = {
  title: 'Edit topic',
  description: 'Specify details for the topic you want to update',
  submitButtonText: 'Save',
  cancelButtonText: 'Cancel',
  className: 'test-class-name',
  label: '',
  influencerWidth: 'narrow',
};

export const multiFormEditTearsheet = MultiFormEditTearsheet.bind({});
multiFormEditTearsheet.storyName = 'Edit tearsheet';
multiFormEditTearsheet.args = {
  ...editTearsheetProps,
};
