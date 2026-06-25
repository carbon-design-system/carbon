/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { previewCandidate__DelimitedList as DelimitedList } from '..';

import styles from './_storybook-styles.scss?inline';
import mdx from './DelimitedList.mdx';
import { Annotation } from '../../../.storybook/Annotation';

const storyClass = 'delimited-list-stories';

export default {
  title: 'Deprecated/DelimitedList',
  component: DelimitedList,
  tags: ['autodocs'],
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (story) => (
      <div>
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
      </div>
    ),
  ],
};

const Template = (args) => {
  return (
    <div className={`${storyClass}__viewport`}>
      <DelimitedList {...args} />
    </div>
  );
};

export const delimited = Template.bind({});
delimited.args = {
  delimiter: ', ',
  items: [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
  ],
  truncate: true,
};

export const notDelimited = Template.bind({});
notDelimited.args = {
  delimiter: ', ',
  items: ['Item 1', 'Item 2', 'Item 3'],
  truncate: true,
};

export const empty = Template.bind({});
empty.args = {
  items: [],
};
