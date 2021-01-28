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

function Popover({ children, direction = 'bottom', open, relative, ...rest }) {
  const className = cx({
    [`${prefix}--popover`]: true,
    [`${prefix}--popover--${direction}`]: true,
    [`${prefix}--popover--open`]: open,
    [`${prefix}--popover--relative`]: relative,
  });
  return (
    <div className={className}>
      <div className={`${prefix}--popover-contents`}>{children}</div>
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
  open: PropTypes.bool.isRequired,
};

export { Popover };
