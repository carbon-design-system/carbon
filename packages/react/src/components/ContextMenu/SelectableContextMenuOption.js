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

function SelectableContextMenuOption({ label, initialChecked }) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <ContextMenuOption
      role="checkbox"
      aria-checked={checked}
      renderIcon={checked ? Checkmark16 : null}
      label={label}
      indented
      onClick={() => {
        setChecked(!checked);
      }}
    />
  );
}

SelectableContextMenuOption.propTypes = {
  /**
   * Whether the option should be checked by default
   */
  initialChecked: PropTypes.bool,

  /**
   * Rendered label for the ContextMenuOptionContent
   */
  label: PropTypes.node.isRequired,
};

export default SelectableContextMenuOption;
