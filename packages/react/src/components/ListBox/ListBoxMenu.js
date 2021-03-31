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

const { prefix } = settings;

/**
 * `ListBoxMenu` is a simple container node that isolates the `list-box__menu`
 * class into a single component. It is also being used to validate given
 * `children` components.
 */
const ListBoxMenu = React.forwardRef(function ListBoxMenu(
  { children, id, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      id={id}
      className={`${prefix}--list-box__menu`}
      role="listbox"
      {...rest}>
      {children}
    </div>
  );
});

ListBoxMenu.displayName = 'ListBoxMenu';
ListBoxMenu.propTypes = {
  /**
   * Provide the contents of your ListBoxMenu
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(ListBoxMenuItem),
    /**
     * allow single item using the workaround for functional components
     * https://github.com/facebook/react/issues/2979#issuecomment-222379916
     */
    PropTypes.shape({
      type: PropTypes.oneOf([ListBoxMenuItem]),
    }),
    PropTypes.bool, // used in Dropdown for closed state
  ]),

  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,
};

export default ListBoxMenu;
