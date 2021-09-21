/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { Welcome as Intro } from './Welcome';
import { default as Usage } from './Usage';
import mdx from './Welcome.mdx';

export default {
  title: ' Getting Started',
  component: Intro,
  Usage,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Welcome = () => <Intro />;

export const _UsingTheStorybook = () => <Usage />;
