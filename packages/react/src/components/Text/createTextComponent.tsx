/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Text, TextProps } from './Text';

/**
 * Create a text component wrapper for a given text node type. Useful for
 * returning a `Text` component for a text node like a `<label>`.
 * @param {string} element
 * @param {string} displayName
 */
export function createTextComponent(
  element: React.ElementType,
  displayName: string
) {
  function TextWrapper(props: TextProps<React.ElementType>) {
    return <Text as={element} {...props} />;
  }

  if (__DEV__) {
    TextWrapper.displayName = displayName;
  }

  return TextWrapper;
}
