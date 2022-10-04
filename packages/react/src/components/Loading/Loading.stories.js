/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Loading from '.';
import mdx from './Loading.mdx';

export default {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return <Loading className={'some-class'} withOverlay={false} />;
};

export const Playground = (args) => {
  return <Loading className={'some-class'} {...args} />;
};

Playground.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  // The id prop is deprecated and should be remove in the next major release
  id: {
    table: {
      disable: true,
    },
  },
  active: {
    control: {
      type: 'boolean',
    },
    defaultValue: true,
  },
  withOverlay: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  small: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  description: {
    control: {
      type: 'text',
    },
    defaultValue: 'Loading',
  },
};
