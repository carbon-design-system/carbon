/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable no-console */

import React from 'react';
import CopyButton from './CopyButton';
import mdx from './CopyButton.mdx';

export default {
  title: 'Components/CopyButton',
  component: CopyButton,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const _Default = () => <CopyButton />;

export const Playground = (args) => <CopyButton {...args} />;

Playground.argTypes = {
  className: {
    table: {
      disable: true,
    },
  },
  onClick: {
    action: 'onClick',
  },
};
