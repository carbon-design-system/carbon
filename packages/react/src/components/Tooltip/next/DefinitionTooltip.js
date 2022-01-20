/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Popover, PopoverContent } from '../../Popover';
import { match, keys } from '../../../internal/keyboard';
import { usePrefix } from '../../../internal/usePrefix';
import { useId } from '../../../internal/useId';

function DefinitionTooltip({ children, definition, openOnClick, ...rest }) {
  const [isOpen, setOpen] = useState(false);
  const prefix = usePrefix();
  const id = useId();

  function handleKeyDown(event) {
    if (isOpen && match(event, keys.Escape)) {
      event.stopPropagation();
      setOpen(false);
    }
    if (openOnClick && match(event, [keys.Enter, keys.Space])) {
      event.stopPropagation();
      setOpen(!isOpen);
    }
  }

  return (
    <Popover open={isOpen} highContrast dropShadow={false} align="bottom-left">
      <button
        type="button"
        className={`${prefix}--definition-term`}
        aria-controls="definition-id"
        aria-expanded={isOpen}
        onMouseOut={() => !openOnClick && setOpen(false)}
        onMouseOver={() => !openOnClick && setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        onClick={() => setOpen(!isOpen)}
        onFocus={() => !openOnClick && setOpen(true)}
        {...rest}>
        {children}
      </button>
      <PopoverContent className={`${prefix}--definition-tooltip`} id={id}>
        {definition}
      </PopoverContent>
    </Popover>
  );
}

DefinitionTooltip.propTypes = {
  /**
   * Provide the content being defined
   */
  children: PropTypes.node,

  /**
   * Provide the content being defined
   */
  definition: PropTypes.string.isRequired,
  /**
   * Specify whether the tooltip should toggle on click and NOT on mouse enter/leave
   */
  openOnClick: PropTypes.bool,
};

export { DefinitionTooltip };
