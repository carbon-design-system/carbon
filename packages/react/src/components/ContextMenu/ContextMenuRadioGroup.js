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

function ContextMenuRadioGroup({ items, initialSelectedItem, label }) {
  const [selected, setSelected] = useState(initialSelectedItem);

  const options = items.map((option, i) => {
    const isSelected = selected === option;

    return (
      <ContextMenuOption
        key={i}
        role="radio"
        aria-checked={isSelected}
        renderIcon={isSelected ? Checkmark16 : null}
        label={option}
        indented
        onClick={() => {
          setSelected(option);
        }}
      />
    );
  });

  return (
    <div role="radiogroup" aria-label={label}>
      {options}
    </div>
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
};

export default ContextMenuRadioGroup;
