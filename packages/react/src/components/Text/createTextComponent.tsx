/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ElementType } from 'react';
import { Text, TextProps } from '.';

/**
 * Create a text component wrapper for a given text node type. Useful for
 * returning a `Text` component for a text node like a `<label>`.
 * @param {string} element
 * @param {string} displayName
 */
export const createTextComponent = (
  element: ElementType,
  displayName: string
) => {
  const TextWrapper = (props: TextProps<ElementType>) => {
    return <Text as={element} {...props} />;
  };

  if (process.env.NODE_ENV !== 'production') {
    TextWrapper.displayName = displayName;
  }

  return TextWrapper;
};
