/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { Stack, StackProps } from './Stack';

const VStack = React.forwardRef<React.ReactNode, StackProps>(function VStack(
  props,
  ref
) {
  return <Stack {...props} ref={ref} orientation="vertical" />;
});

export { VStack };
