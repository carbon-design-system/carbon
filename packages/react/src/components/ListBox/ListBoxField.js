/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';
import PropTypes from 'prop-types';

const { prefix } = settings;

export const translationIds = {}; // No longer used, left export for backward-compatibility

/**
 * `ListBoxField` is responsible for creating the containing node for valid
 * elements inside of a field. It also provides a11y-related attributes like
 * `role` to make sure a user can focus the given field.
 */
const ListBoxField = ({ children, id, disabled, tabIndex, ...rest }) => (
  <div
    role={rest['aria-expanded'] ? 'combobox' : rest.role || 'combobox'}
    aria-owns={(rest['aria-expanded'] && `${id}__menu`) || null}
    aria-controls={(rest['aria-expanded'] && `${id}__menu`) || null}
    aria-haspopup="listbox"
    className={`${prefix}--list-box__field`}
    tabIndex={(!disabled && tabIndex) || -1}
    {...rest}>
    {children}
  </div>
);

ListBoxField.propTypes = {
  /**
   * Provide the contents of your ListBoxField
   */
  children: PropTypes.node,

  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify if the parent <ListBox> is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Optional prop to specify the tabIndex of the <ListBox> trigger button
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ListBoxField;
