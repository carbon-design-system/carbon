/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkmark16 } from '@carbon/icons-react';
import ContextMenuOption from './ContextMenuOption';

function ContextMenuRadioGroupOptions({
  items,
  initialSelectedItem,
  onChange = () => {},
}) {
  const [selected, setSelected] = useState(initialSelectedItem);

  function handleClick(option) {
    setSelected(option);
    onChange(option);
  }

  const options = items.map((option, i) => {
    const isSelected = selected === option;

    return (
      <ContextMenuOption
        key={i}
        role="menuitemradio"
        aria-checked={isSelected}
        renderIcon={isSelected ? Checkmark16 : null}
        label={option}
        indented
        onClick={() => {
          handleClick(option);
        }}
      />
    );
  });

  return options;
}

ContextMenuRadioGroupOptions.propTypes = {
  /**
   * Whether the option should be checked by default
   */
  initialSelectedItem: PropTypes.string,

  /**
   * Array of the radio options
   */
  items: PropTypes.arrayOf(PropTypes.string).isRequired,

  /**
   * Callback function when selection the has been changed
   */
  onChange: PropTypes.func,
};

export default ContextMenuRadioGroupOptions;
