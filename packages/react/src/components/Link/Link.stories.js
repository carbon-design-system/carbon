/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Download } from '@carbon/icons-react';
import Link from './Link';
import mdx from './Link.mdx';

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    disabled: false,
    inline: false,
    visited: false,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    renderIcon: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = () => <Link href="#">Link</Link>;

export const PairedWithIcon = () => (
  <Link href="#" renderIcon={Download}>
    Download
  </Link>
);

export const Playground = (args) => (
  <Link href="#" {...args}>
    Link
  </Link>
);
