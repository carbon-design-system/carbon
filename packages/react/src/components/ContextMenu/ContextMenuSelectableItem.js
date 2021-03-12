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

function ContextMenuSelectableItem({
  label,
  initialChecked,
  onChange = () => {},
}) {
  const [checked, setChecked] = useState(initialChecked);

  function handleClick() {
    setChecked(!checked);
    onChange(!checked);
  }

  return (
    <ContextMenuOption
      role="menuitemcheckbox"
      aria-checked={checked}
      renderIcon={checked ? Checkmark16 : null}
      label={label}
      indented
      onClick={handleClick}
    />
  );
}

ContextMenuSelectableItem.propTypes = {
  /**
   * Whether the option should be checked by default
   */
  initialChecked: PropTypes.bool,

  /**
   * Rendered label for the ContextMenuOptionContent
   */
  label: PropTypes.node.isRequired,

  /**
   * Callback function when selection the has been changed
   */
  onChange: PropTypes.func,
};

export default ContextMenuSelectableItem;
