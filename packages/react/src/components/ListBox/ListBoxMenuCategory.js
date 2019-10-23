/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;

/**
 * `ListBoxMenuCategory` is a helper component for managing the container class
 * name, alongside any classes for any corresponding states, for a generic list
 * box menu category item.
 */
const ListBoxMenuCategory = ({ children, ...rest }) => {
  const className = cx({
    [`${prefix}--list-box__menu-category`]: true,
  });
  return (
    <div className={className} {...rest}>
      <div className={`${prefix}--list-box__menu-category__option`}>
        {children}
      </div>
    </div>
  );
};

ListBoxMenuCategory.propTypes = {
  /**
   * Specify any children nodes that hsould be rendered inside of the ListBox
   * Menu Item
   */
  children: PropTypes.node,
};

ListBoxMenuCategory.defaultProps = {};

export default ListBoxMenuCategory;
