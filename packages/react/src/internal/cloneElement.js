/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';

const HANDLER_REGEX = /^on[A-Z]/;

/**
 * Helper function to "safely" clone an element by combining common props
 * instead of overriding the value on the child element
 */
export function safeCloneElement(child, cloneProps) {
  const mergedProps = {
    ...cloneProps,
  };

  Object.keys(child.props).forEach((key) => {
    if (cloneProps[key] === undefined) {
      return;
    }

    const childPropValue = child.props[key];
    const clonePropValue = cloneProps[key];

    if (key === 'className') {
      mergedProps.className = cx(childPropValue, clonePropValue);
    } else if (HANDLER_REGEX.test(key)) {
      mergedProps[key] = (...args) => {
        clonePropValue(...args);
        childPropValue(...args);
      };
    } else if (key === 'style') {
      mergedProps.style = {
        ...childPropValue,
        ...clonePropValue,
      };
    }
  });

  return React.cloneElement(child, mergedProps);
}
