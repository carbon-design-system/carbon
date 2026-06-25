/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from './_storybook-styles.scss?inline';
import mdx from './TruncatedText.mdx';
import { TruncatedText } from './TruncatedText';

const storyClass = 'truncated-text-stories';

const defaultProps = {
  align: 'top',
  autoAlign: false,
  collapseLabel: 'View less',
  expandLabel: 'View more',
  id: 'example-id',
  lines: 3,
  value:
    'Buttons are used to initialize an action, either in the background or foreground of an experience. There are several kinds of buttons. Primary buttons should be used for the principle call to action on the page. Secondary buttons should be used for secondary actions on each page. Danger buttons should be used for a negative action (such as Delete) on the page. Modify the behavior of the button by changing its event properties. Small buttons may be used when there is not enough space for a regular sized button. This issue is most found in tables. Small button should have three words or less. When words are not enough, icons can be used in buttons to better communicate what the button does. Icons are always paired with text.',
  type: 'tooltip',
};

export default {
  title: 'Utilities/TruncatedText',
  component: TruncatedText,
  tags: ['autodocs'],
  parameters: {
    styles,
    layout: 'centered',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    align: {
      options: [
        'top',
        'top-left',
        'top-right',
        'bottom',
        'bottom-left',
        'bottom-right',
        'left',
        'left-bottom',
        'left-top',
        'right',
        'right-bottom',
        'right-top',
      ],
      control: {
        type: 'select',
      },
    },
  },
};

const Template = (args) => {
  return (
    <div className={`${storyClass}__viewport`}>
      <TruncatedText {...args} />
    </div>
  );
};

export const WithTooltip = Template.bind({});
WithTooltip.args = { ...defaultProps };

export const WithExpand = Template.bind({});
WithExpand.args = { ...defaultProps, type: 'expand' };
