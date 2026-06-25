/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const ListContainer = ({ children, draggableClass, type }) => {
  return (
    <ul
      className={cx(`${draggableClass}__list-container`, {
        [`${draggableClass}__list-container--horizontal`]:
          type === 'horizontal',
      })}
    >
      {children}
    </ul>
  );
};

ListContainer.propTypes = {
  children: PropTypes.node,
  draggableClass: PropTypes.string,
  type: PropTypes.string,
};
