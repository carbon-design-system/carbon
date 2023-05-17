/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Stack } from './Stack';

const HStack = React.forwardRef(function HStack(props, ref) {
  return <Stack {...props} ref={ref} orientation="horizontal" />;
});

const VStack = React.forwardRef(function VStack(props, ref) {
  return <Stack {...props} ref={ref} orientation="vertical" />;
});

export { HStack, Stack, VStack };
