/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { Close16 } from '@carbon/icons-react';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const { prefix } = settings;
const getInstanceId = setupGetInstanceId();
const TYPES = {
  red: 'Red',
  magenta: 'Magenta',
  purple: 'Purple',
  blue: 'Blue',
  cyan: 'Cyan',
  teal: 'Teal',
  green: 'Green',
  gray: 'Gray',
  'cool-gray': 'Cool-Gray',
  'warm-gray': 'Warm-Gray',
};

const Tag = ({
  children,
  className,
  id,
  type,
  filter,
  title,
  disabled,
  onClose,
  ...other
}) => {
  const tagId = id || `tag-${getInstanceId()}`;
  const tagClass = `${prefix}--tag--${type}`;
  const tagClasses = classNames(`${prefix}--tag`, tagClass, className, {
    [`${prefix}--tag--disabled`]: disabled,
    [`${prefix}--tag--filter`]: filter,
  });
  const handleClose = event => {
    event.stopPropagation();
    onClose(event);
  };
  return filter ? (
    <div
      className={tagClasses}
      aria-label={
        title !== undefined
          ? `${title} ${children}`
          : `Clear filter ${children}`
      }
      id={tagId}
      disabled={disabled}
      {...other}>
      <span className={`${prefix}--tag__label`}>
        {children !== null && children !== undefined ? children : TYPES[type]}
      </span>
      <button
        className={`${prefix}--tag__close-icon`}
        onClick={handleClose}
        aria-labelledby={tagId}>
        <Close16 />
      </button>
    </div>
  ) : (
    <span className={tagClasses} {...other}>
      {children !== null && children !== undefined ? children : TYPES[type]}
    </span>
  );
};

Tag.propTypes = {
  /**
   * Provide content to be rendered inside of a <Tag>
   */
  children: PropTypes.node,

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Specify the type of the <Tag>
   */
  type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,

  /**
   * Specify if the <Tag> is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Determine if <Tag> is a filter/chip
   */
  filter: PropTypes.bool,

  /**
   * Text to show on clear filters
   */
  title: PropTypes.string,

  /**
   * Click handler for filter tag close button.
   */
  onClose: PropTypes.func,
};

export const types = Object.keys(TYPES);
export default Tag;
