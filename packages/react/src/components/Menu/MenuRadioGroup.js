/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import MenuGroup from './MenuGroup';
import MenuRadioGroupOptions from './MenuRadioGroupOptions';

function MenuRadioGroup({
  items,
  initialSelectedItem,
  label,
  onChange = () => {},
}) {
  return (
    <MenuGroup label={label}>
      <MenuRadioGroupOptions
        items={items}
        initialSelectedItem={initialSelectedItem}
        onChange={onChange}
      />
    </MenuGroup>
  );
}

MenuRadioGroup.propTypes = {
  /**
   * Whether the option should be checked by default
   */
  initialSelectedItem: PropTypes.string,

  /**
   * Array of the radio options
   */
  items: PropTypes.arrayOf(PropTypes.string).isRequired,

  /**
   * The radio group label
   */
  label: PropTypes.string.isRequired,

  /**
   * Callback function when selection the has been changed
   */
  onChange: PropTypes.func,
};

export default MenuRadioGroup;
