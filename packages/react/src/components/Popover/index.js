/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const { prefix } = settings;

function Popover({
  className: customClassName,
  children,
  direction = 'bottom',
  light = false,
  open,
  relative,
  ...rest
}) {
  const className = cx({
    [`${prefix}--popover`]: true,
    [`${prefix}--popover--light`]: light,
    [`${prefix}--popover--${direction}`]: true,
    [`${prefix}--popover--open`]: open,
    [`${prefix}--popover--relative`]: relative,
    [customClassName]: !!customClassName,
  });

  return (
    <div {...rest} className={className}>
      {children}
    </div>
  );
}

Popover.displayName = 'Popover';
Popover.propTypes = {
  direction: PropTypes.oneOf([
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
  light: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};

function PopoverContent({ className, children, ...rest }) {
  return (
    <div {...rest} className={cx(`${prefix}--popover-contents`, className)}>
      {children}
    </div>
  );
}

export { Popover, PopoverContent };
