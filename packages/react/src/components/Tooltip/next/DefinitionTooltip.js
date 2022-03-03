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

function DefinitionTooltip({
  align,
  className,
  children,
  defaultOpen,
  definition,
  ...rest
}) {
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
      align={align}
      className={className}
      defaultOpen={defaultOpen}
      dropShadow={false}
      highContrast
      onMouseLeave={() => {
        setOpen(false);
      }}
      open={isOpen}>
      <button
        {...rest}
        className={`${prefix}--definition-term`}
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
   * Specify how the trigger should align with the tooltip
   */
  align: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',

    'bottom',
    'bottom-left',
    'bottom-right',

    'left',
    'left-bottom',
    'left-top',

    'right',
    'right-bottom',
    'right-top',
  ]),

  /**
   * Provide the content being defined
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen: PropTypes.bool,

  /**
   * Provide the content being defined
   */
  definition: PropTypes.node.isRequired,
};

export { DefinitionTooltip };
