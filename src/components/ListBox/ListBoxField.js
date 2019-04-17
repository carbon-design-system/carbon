/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';
import PropTypes from 'prop-types';
import ListBoxMenuIcon from './ListBoxMenuIcon';
import ListBoxSelection from './ListBoxSelection';
import childrenOf from '../../prop-types/childrenOf';

const { prefix } = settings;

/**
 * `ListBoxField` is responsible for creating the containing node for valid
 * elements inside of a field. It also provides a11y-related attributes like
 * `role` to make sure a user can focus the given field.
 */
const ListBoxField = ({ children, id, ...rest }) => (
  <div
    role="combobox"
    aria-haspopup="listbox"
    aria-expanded={rest[`aria-expanded`]}
    aria-owns={`${id}__menu`}
    aria-controls={`${id}__menu`}
    className={`${prefix}--list-box__field`}
    tabIndex={rest.tabIndex || -1}
    {...rest}>
    {children}
  </div>
);

ListBoxField.propTypes = {
  /**
   * Provide the contents of your ListBoxField
   */
  children: childrenOf([ListBoxMenuIcon, ListBoxSelection, 'span', 'input']),
  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,
};

export default ListBoxField;
