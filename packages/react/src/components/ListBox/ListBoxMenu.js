/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';
import PropTypes from 'prop-types';
import ListBoxMenuItem from './ListBoxMenuItem';
import childrenOfType from '../../prop-types/childrenOfType';

const { prefix } = settings;

/**
 * `ListBoxMenu` is a simple container node that isolates the `list-box__menu`
 * class into a single component. It is also being used to validate given
 * `children` components.
 */
const ListBoxMenu = ({ children, id, ...rest }) => (
  <div
    id={`${id}__menu`}
    className={`${prefix}--list-box__menu`}
    role="listbox"
    {...rest}>
    {children}
  </div>
);

ListBoxMenu.propTypes = {
  /**
   * Provide the contents of your ListBoxMenu
   */
  children: childrenOfType(ListBoxMenuItem),
  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,
};

export default ListBoxMenu;
