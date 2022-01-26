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

function DefinitionTooltip({ children, definition, ...rest }) {
  const [isOpen, setOpen] = useState(false);
  const prefix = usePrefix();
  const id = useId();

  function handleKeyDown(event) {
    if (isOpen && match(event, keys.Escape)) {
      event.stopPropagation();
      setOpen(false);
    }
  }

  return (
    <Popover
      align="bottom-left"
      dropShadow={false}
      highContrast
      onMouseLeave={() => {
        setOpen(false);
      }}
      open={isOpen}>
      <button
        className={`${prefix}--definition-term`}
        {...rest}
        aria-controls={id}
        aria-expanded={isOpen}
        onBlur={() => {
          setOpen(false);
        }}
        onClick={() => {
          setOpen(!isOpen);
        }}
        onKeyDown={handleKeyDown}
        type="button">
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
};

export { DefinitionTooltip };
