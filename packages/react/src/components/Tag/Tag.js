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
  'high-contrast': 'High-Contrast',
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
  const tagClasses = classNames(`${prefix}--tag`, className, {
    [`${prefix}--tag--disabled`]: disabled,
    [`${prefix}--tag--filter`]: filter,
    [`${prefix}--tag--${type}`]: type,
  });
  const handleClose = (event) => {
    if (onClose) {
      event.stopPropagation();
      onClose(event);
    }
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
      {...other}>
      <span
        className={`${prefix}--tag__label`}
        title={typeof children === 'string' ? children : null}>
        {children !== null && children !== undefined ? children : TYPES[type]}
      </span>
      <button
        type="button"
        className={`${prefix}--tag__close-icon`}
        onClick={handleClose}
        disabled={disabled}
        aria-labelledby={tagId}
        title={title}>
        <Close16 />
      </button>
    </div>
  ) : (
    <span
      className={tagClasses}
      title={typeof children === 'string' ? children : null}
      {...other}>
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
   * Specify if the <Tag> is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Determine if <Tag> is a filter/chip
   */
  filter: PropTypes.bool,

  /**
   * Specify the id for the tag.
   */
  id: PropTypes.string,

  /**
   * Click handler for filter tag close button.
   */
  onClose: PropTypes.func,

  /**
   * Text to show on clear filters
   */
  title: PropTypes.string,

  /**
   * Specify the type of the <Tag>
   */
  type: PropTypes.oneOf(Object.keys(TYPES)),
};

export const types = Object.keys(TYPES);
export default Tag;
