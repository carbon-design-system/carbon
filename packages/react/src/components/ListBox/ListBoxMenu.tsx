/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ForwardedRef } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import PropTypes from 'prop-types';
import ListBoxMenuItem from './ListBoxMenuItem';
import { ForwardRefReturn, ReactAttr } from '../../types/common';

type ExcludedAttributes = 'id';

export interface ListBoxMenuProps
  extends Omit<ReactAttr<HTMLDivElement>, ExcludedAttributes> {

  /**
   * Specify a custom `id`
   */
  id: string;
}

export type ListBoxMenuComponent = ForwardRefReturn<HTMLDivElement, ListBoxMenuProps>

/**
 * `ListBoxMenu` is a simple container node that isolates the `list-box__menu`
 * class into a single component. It is also being used to validate given
 * `children` components.
 */
const ListBoxMenu: ListBoxMenuComponent = React.forwardRef(function ListBoxMenu(
  { children, id, ...rest }: ListBoxMenuProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const prefix = usePrefix();
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
    PropTypes.arrayOf(PropTypes.oneOf([ListBoxMenuItem])),
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
