/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { Welcome as Intro } from './Welcome';

export default {
  title: ' Getting Started/ Welcome',
  component: Intro,
};

export const Welcome = () => <Intro />;
