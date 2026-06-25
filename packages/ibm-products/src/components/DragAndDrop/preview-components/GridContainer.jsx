/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const GridContainer = ({
  children,
  columns,
  draggableClass,
  gridGap,
}) => {
  return (
    <ul
      className={cx(
        `${draggableClass}__list-container`,
        `${draggableClass}__list-container--grid`
      )}
      style={{
        '--col-count': columns,
        '--grid-gap': gridGap,
      }}
    >
      {children}
    </ul>
  );
};

GridContainer.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.number,
  draggableClass: PropTypes.string,
  gridGap: PropTypes.string,
  type: PropTypes.string,
};
