/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import Slug from '.';
import mdx from './Slug.mdx';
import './slug-story.scss';

export default {
  title: 'Experimental/unstable__Slug',
  component: Slug,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Slug
    align="right"
    slugContent="A brief description of this AI interaction"
  />
);

export const Playground = (args) => (
  <Slug slugContent="A brief description of this AI interaction" {...args} />
);
