/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as classes from './CSSGrid.module.scss';

import cx from 'clsx';
import React from 'react';
import { Box } from '../Box';

const utilities = new Set(['cols', 'gap', 'gapX', 'gapY']);

function CSSGrid({ as: BaseComponent = 'div', children, ...rest }) {
  const childProps = {};
  const utilityClasses = Object.keys(rest).filter((key) => {
    if (utilities.has(key)) {
      return true;
    }
    childProps[key] = rest[key];
    return false;
  });
  const className = cx(
    classes.grid,
    utilityClasses.map((key) => {
      if (key === 'gapX') {
        return classes[`gap-x-${rest[key]}`];
      }
      if (key === 'gapY') {
        return classes[`gap-y-${rest[key]}`];
      }
      return classes[`${key}-${rest[key]}`];
    })
  );

  return (
    <Box {...childProps}>
      <BaseComponent className={className}>{children}</BaseComponent>
    </Box>
  );
}

export { CSSGrid };
