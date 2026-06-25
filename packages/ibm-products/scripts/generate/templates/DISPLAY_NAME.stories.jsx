/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// TODO: import action to handle events if required.

import { DISPLAY_NAME } from '.';
import mdx from './DISPLAY_NAME.mdx';

import styles from './_storybook-styles.scss?inline';

export default {
  title: `IBM Products/Components/${DISPLAY_NAME}`,
  component: DISPLAY_NAME,
  tags: ['autodocs'],
  // TODO: Define argTypes for props not represented by standard JS types.
  // argTypes: {
  //   egProp: { control: 'color' },
  // },
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

/**
 * TODO: Declare template(s) for one or more scenarios.
 */
const Template = (args) => {
  return (
    <DISPLAY_NAME
      // TODO: handle events with action or local handler.
      // onTodo={action('onTodo log action')}
      {...args}
    />
  );
};

/**
 * TODO: Declare one or more stories, generally one per design scenario.
 * NB no need for a 'Playground' because all stories have all controls anyway.
 */
export const CAMEL_NAME = Template.bind({});
CAMEL_NAME.args = {
  // TODO: Component args - https://storybook.js.org/docs/react/writing-stories/args#DISPLAY_NAME-args
  children: 'hello, world',
};
