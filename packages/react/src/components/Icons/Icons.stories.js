/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Icons.stories.scss';
import React from 'react';
import { Bee, Edit } from '../../../icons';
import { IconButton } from '../IconButton';
import mdx from './Icons.mdx';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Elements/Icons',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story, { args }) => {
      return (
        <section className="demo-icon-example">
          <h2>
            {args.size} {typeof args.size === 'number' && 'pixel'}{' '}
            {args.size === 16 && '(default)'}
            {typeof args.size === 'string' &&
              args.size.includes('rem') &&
              '(responsive)'}
          </h2>
          <Story />
        </section>
      );
    },
  ],
};

export const Default = (args) => {
  return <Bee {...args} />;
};

Default.args = {
  size: 16,
};

Default.argTypes = {
  size: {
    options: ['16', '20', '32'],
    control: { type: 'select' },
  },
};

export const WithRelativeSize = (args) => {
  return <Edit {...args} />;
};

WithRelativeSize.args = {
  size: '1rem',
};

WithRelativeSize.argTypes = { size: { control: 'text' } };
