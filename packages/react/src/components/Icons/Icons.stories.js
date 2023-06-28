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

export const Default = () => {
  return (
    <>
      <section className="demo-icon-example">
        <h2>16 pixel (default)</h2>
        <Bee />
      </section>

      <section className="demo-icon-example">
        <h2>20 pixel</h2>
        <Bicycle size={20} />
      </section>

      <section className="demo-icon-example">
        <h2>32 pixel</h2>
        <ChevronUp size={32} />
      </section>
    </>
  );
};

export const Playground = (args) => {
  return <Bee {...args} />;
};

Playground.args = {
  size: 16,
};

Playground.argTypes = {
  size: {
    options: ['16', '20', '32'],
    control: { type: 'select' },
  },
};
