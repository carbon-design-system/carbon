/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import './Annotation.scss';

import { WarningHex, Layers, Chemistry } from '@carbon/react/icons';

import { prefix } from '../_prefix';

const types = {
  'deprecation-notice': {
    icon: WarningHex,
  },
  layer: {
    icon: Layers,
  },
  'feature-flags': {
    icon: Chemistry,
  },
};

function Annotation({ className, type, text, children }) {
  const Icon = types[type].icon;

  const classes = classnames([
    className,
    `${prefix}--annotation`,
    `${prefix}--annotation--${type}`,
  ]);

  return (
    <div className={classes}>
      <div className={`${prefix}--annotation__label`}>
        <Icon />
        {text}
      </div>
      <div className={`${prefix}--annotation__content`}>{children}</div>
    </div>
  );
}

Annotation.propTypes = {
  /**
   * The story to be rendered with this annotation.
   */
  children: PropTypes.node,

  /**
   * Additional css class names.
   */
  className: PropTypes.string,

  /**
   * The annotation.
   */
  text: PropTypes.node,

  /**
   * The story to be rendered with this annotation.
   */
  type: PropTypes.oneOf(Object.keys(types)),
};

export { Annotation };
