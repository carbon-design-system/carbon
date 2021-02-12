/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { Checkmark16 } from '@carbon/icons-react';
import ContextMenuOption from './ContextMenuOption';

const { prefix } = settings;

function ContextMenuRadioGroup({
  items,
  initialSelectedItem,
  label,
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

  return (
    <ul className={`${prefix}--context-menu-radio-group`} aria-label={label}>
      {options}
    </ul>
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
