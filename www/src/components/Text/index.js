/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as classes from './Text.module.scss';

import cx from 'clsx';
import React from 'react';
import { Box } from '../Box';

function Text({ children, ...rest }) {
  const childProps = {};
  const names = Object.keys(rest)
    .filter((key) => {
      if (classes[key]) {
        return true;
      }
      childProps[key] = rest[key];
      return false;
    })
    .map((key) => {
      return classes[key];
    });
  const className = cx(names);

  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <Box {...childProps}>
        <span className={className}>{children}</span>
      </Box>
    );
  }
  const child = React.Children.only(children);
  return (
    <Box {...childProps}>
      {React.cloneElement(child, {
        className: cx(child.props.className, className),
      })}
    </Box>
  );
}

export { Text };
