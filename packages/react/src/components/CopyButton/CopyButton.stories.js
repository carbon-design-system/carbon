/**
 * Copyright IBM Corp. 2016, 2023
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

// Note: autoAlign is used here only to make tooltips visible in StackBlitz,
// autoAlign is experimental and not part of the actual implementation.
export const Default = (args) => <CopyButton autoAlign {...args} />;

Default.argTypes = {
  className: {
    table: {
      disable: true,
    },
  },
  onClick: {
    action: 'onClick',
  },
};
