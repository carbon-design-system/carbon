/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TestComponent } from './';
import mdx from './TestComponent.mdx';

export default {
  title: 'TestComponent',
  component: TestComponent,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const example = () => <TestComponent>Story Example</TestComponent>;
