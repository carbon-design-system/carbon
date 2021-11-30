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

const DefinitionTooltip = ({ children, definition }) => {
  const [isOpen, setOpen] = useState(false);
  const prefix = usePrefix();

  function handleKeyDown(event) {
    if (match(event, keys.Escape) && isOpen) {
      setOpen(false);
    }
  }

  return (
    <Popover open={isOpen} highContrast dropShadow={false} align="bottom-left">
      <button
        type="button"
        className={`${prefix}--definition-term`}
        aria-controls="definition-id"
        aria-expanded={isOpen}
        onMouseOut={() => setOpen(!isOpen)}
        onFocus={() => setOpen(!isOpen)}
        onBlur={() => setOpen(!isOpen)}
        onMouseOver={() => setOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        onClick={() => {
          setOpen(!isOpen);
        }}>
        {children}
      </button>
      <PopoverContent
        className={`${prefix}--definition-tooltip`}
        id="definition-id">
        {definition}
      </PopoverContent>
    </Popover>
  );
};

DefinitionTooltip.propTypes = {
  /**
   * Provide the content being defined
   */
  children: PropTypes.node,

  /**
   * Provide the content being defined
   */
  definition: PropTypes.string.isRequired,
};

export { DefinitionTooltip };
