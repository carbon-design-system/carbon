/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { WarningHex, Layers, Chemistry } from '@carbon/react/icons';
import { pkg } from '../../src';

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

export const Annotation = ({
  className,
  type = 'layer',
  text,
  children,
  icon: IconProp,
}) => {
  const Icon = types[type].icon;
  return (
    <div
      className={cx(
        `${pkg.prefix}--annotation`,
        `${pkg.prefix}--annotation--${type}`,
        className
      )}
    >
      <div className={`${pkg.prefix}--annotation__label`}>
        {IconProp ? <IconProp /> : <Icon />}
        {text}
      </div>
      <div className={`${pkg.prefix}--annotation__content`}>{children}</div>
    </div>
  );
};

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
