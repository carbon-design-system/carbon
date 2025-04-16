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

export const IconWithRemSize = () => {
  return (
    <section className="demo-icon-example" style={{ fontSize: '1rem' }}>
      <h2>1rem (responsive)</h2>
      <IconButton label="Edit icon" kind="primary">
        <Edit size="1rem" />
      </IconButton>
    </section>
  );
};

IconWithRemSize.storyName = 'Icon with relative size';

export const IconWithRenderFunction = () => {
  return (
    <section className="demo-icon-example">
      <h2>Using renderIcon with rem</h2>
      <IconButton
        label="Edit icon"
        kind="primary"
        renderIcon={() => <Edit size="1rem" />}
      />
    </section>
  );
};

IconWithRenderFunction.storyName = 'Icon with renderIcon function';
