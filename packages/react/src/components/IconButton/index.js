/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import { Tooltip } from '../Tooltip/next';
import { usePrefix } from '../../internal/usePrefix';

const IconButton = React.forwardRef(function IconButton(props, ref) {
  const {
    align,
    children,
    defaultOpen = false,
    enterDelayMs,
    kind,
    label,
    leaveDelayMs,
    ...rest
  } = props;
  const prefix = usePrefix();

  return (
    <Tooltip
      align={align}
      className={`${prefix}--icon-tooltip`}
      defaultOpen={defaultOpen}
      enterDelayMs={enterDelayMs}
      label={label}
      leaveDelayMs={leaveDelayMs}>
      <Button {...rest} hasIconOnly kind={kind} ref={ref} size="sm">
        {children}
      </Button>
    </Tooltip>
  );
});

IconButton.propTypes = {
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
    'right',
  ]),

  /**
   * Provide an icon or asset to be rendered inside of the IconButton
   */
  children: PropTypes.node,

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen: PropTypes.bool,

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs: PropTypes.number,

  /**
   * Specify the type of button to be used as the base for the IconButton
   */
  kind: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'tertiary']),

  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader.
   */
  label: PropTypes.node.isRequired,

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: PropTypes.number,
};

export { IconButton };
