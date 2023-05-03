/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as classes from './Flex.module.scss';

import cx from 'clsx';
import React from 'react';
import { Box } from '../Box';

function Flex({ as: BaseComponent = 'div', children, ...rest }) {
  const childProps = {};
  const utilityClasses = Object.keys(rest).filter((key) => {
    if (classes[key]) {
      return true;
    }
    childProps[key] = rest[key];
    return false;
  });
  const className = cx(
    classes.flex,
    utilityClasses.map((key) => {
      return classes[key];
    })
  );

  return (
    <Box {...childProps}>
      <BaseComponent className={className}>{children}</BaseComponent>
    </Box>
  );
}

export { Flex };
