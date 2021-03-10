/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ContextMenuGroup from './ContextMenuGroup';
import ContextMenuRadioGroupOptions from './ContextMenuRadioGroupOptions';

function ContextMenuRadioGroup({
  items,
  initialSelectedItem,
  label,
  onChange = () => {},
}) {
  return (
    <ContextMenuGroup label={label}>
      <ContextMenuRadioGroupOptions
        items={items}
        initialSelectedItem={initialSelectedItem}
        onChange={onChange}
      />
    </ContextMenuGroup>
  );
}

ContextMenuRadioGroup.propTypes = {
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

export default ContextMenuRadioGroup;
