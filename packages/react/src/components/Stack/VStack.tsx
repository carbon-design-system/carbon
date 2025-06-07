/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';

import { Stack, StackProps } from './Stack';

export const VStack = forwardRef<HTMLElement, StackProps>((props, ref) => {
  return <Stack {...props} ref={ref} orientation="vertical" />;
});

VStack.propTypes = Stack.propTypes;
