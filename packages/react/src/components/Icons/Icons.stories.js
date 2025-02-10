/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Icons.stories.scss';
import React from 'react';
import { Bee, Bicycle, ChevronUp } from '../../../icons';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Elements/Icons',
};

export const Default = (args) => {
  return (
    <section className="demo-icon-example">
      <h2>
        {args.size} pixel {args.size === 16 ? '(default)' : ''}
      </h2>
      <Bee {...args} />
    </section>
  );
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
