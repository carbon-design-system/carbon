/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Popover, PopoverContent } from '../Popover';
import { match, keys } from '../../internal/keyboard';
import { useFallbackId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';

function DefinitionTooltip({
  align = 'bottom-left',
  className,
  children,
  definition,
  defaultOpen = false,
  id,
  openOnHover,
  tooltipText,
  triggerClassName,
  ...rest
}) {
  const [isOpen, setOpen] = useState(defaultOpen);
  const prefix = usePrefix();
  const tooltipId = useFallbackId(id);

  function onKeyDown(event) {
    if (isOpen && match(event, keys.Escape)) {
      event.stopPropagation();
      setOpen(false);
    }
  }

  return (
    <Popover
      align={align}
      className={className}
      dropShadow={false}
      highContrast
      onMouseLeave={() => {
        setOpen(false);
      }}
      onMouseEnter={() => {
        openOnHover ? setOpen(true) : null;
      }}
      open={isOpen}>
      <button
        {...rest}
        className={cx(`${prefix}--definition-term`, triggerClassName)}
        aria-controls={tooltipId}
        aria-expanded={isOpen}
        onBlur={() => {
          setOpen(false);
        }}
        onClick={() => {
          setOpen(!isOpen);
        }}
        onKeyDown={onKeyDown}
        type="button">
        {children}
      </button>
      <PopoverContent
        className={`${prefix}--definition-tooltip`}
        id={tooltipId}>
        {tooltipText ?? definition}
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
   * The `children` prop will be used as the value that is being defined
   */
  children: PropTypes.node.isRequired,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen: PropTypes.bool,

  /**
   * The `definition` prop is used as the content inside of the tooltip that
   * appears when a user interacts with the element rendered by the `children`
   * prop
   */
  definition: PropTypes.node.isRequired,

  /**
   * Provide a value that will be assigned as the id of the tooltip
   */
  id: PropTypes.string,

  /**
   * Specifies whether or not the `DefinitionTooltip` should open on hover or not
   */
  openOnHover: PropTypes.bool,

  /**
   * [Deprecated in v11] Please use the `definition` prop instead.
   *
   * Provide the text that will be displayed in the tooltip when it is rendered.
   */
  tooltipText: deprecate(
    PropTypes.node,
    'The tooltipText prop has been deprecated. Please use the `definition` prop instead.'
  ),

  /**
   * The CSS class name of the trigger element
   */
  triggerClassName: PropTypes.string,
};

export { DefinitionTooltip };
