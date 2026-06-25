/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';
// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg /*, carbon */ } from '../../settings';
// Carbon and package components we use.
import { StructuredListCell } from '@carbon/react';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--description-list__cell`;
const componentName = 'DescriptionListCell';

export let DescriptionListCell = React.forwardRef(
  ({ children /* TODO: remove if not needed. */, className, ...rest }, ref) => {
    return (
      <StructuredListCell
        className={cx(blockClass, className)}
        ref={ref}
        {...getDevtoolsProps(componentName)}
        {...rest}
      >
        {children}
      </StructuredListCell>
    );
  }
);

DescriptionListCell.propTypes = {
  /** Provide the contents of the node */
  children: PropTypes.node,
  /** Provide an optional class to be applied to the containing node */
  className: PropTypes.string,
};
DescriptionListCell = pkg.checkComponentEnabled(
  DescriptionListCell,
  componentName
);
DescriptionListCell.displayName = componentName;
