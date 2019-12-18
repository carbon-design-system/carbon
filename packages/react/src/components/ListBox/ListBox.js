/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { ListBoxType, ListBoxSize } from './ListBoxPropTypes';

const { prefix } = settings;

const handleOnKeyDown = event => {
  if (event.keyCode === 27) {
    event.stopPropagation();
  }
};

const handleClick = event => {
  event.preventDefault();
  event.stopPropagation();
};

/**
 * `ListBox` is a generic container component that handles creating the
 * container class name in response to certain props.
 */
const ListBox = ({
  children,
  className: containerClassName,
  disabled,
  innerRef,
  type,
  size,
  invalid,
  invalidText,
  light,
  isOpen,
  ...rest
}) => {
  const className = cx({
    [containerClassName]: !!containerClassName,
    [`${prefix}--list-box`]: true,
    [`${prefix}--list-box--${size}`]: size,
    [`${prefix}--list-box--inline`]: type === 'inline',
    [`${prefix}--list-box--disabled`]: disabled,
    [`${prefix}--list-box--light`]: light,
    [`${prefix}--list-box--expanded`]: isOpen,
  });
  return (
    <>
      <div
        {...rest}
        role="listbox"
        tabIndex="-1"
        className={className}
        ref={innerRef}
        onKeyDown={handleOnKeyDown}
        onClick={handleClick}
        data-invalid={invalid || undefined}>
        {children}
      </div>
      {invalid ? (
        <div className={`${prefix}--form-requirement`}>{invalidText}</div>
      ) : null}
    </>
  );
};

ListBox.propTypes = {
  /**
   * Provide the contents of your ListBox
   */
  children: PropTypes.node,

  /**
   * Specify a class name to be applied on the containing list box node
   */
  className: PropTypes.string,

  /**
   * `innerRef` hook used for libraries like Downshift that require a reference
   * on a container node when it is not a native element
   */
  innerRef: PropTypes.func.isRequired,

  /**
   * Specify whether the ListBox is currently disabled
   */
  disabled: PropTypes.bool.isRequired,

  /**
   * Specify the "type" of the ListBox. Currently supports either `default` or
   * `inline` as an option.
   */
  type: ListBoxType.isRequired,

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `lg` or `xl` as an option.
   */
  size: ListBoxSize,
};

ListBox.defaultProps = {
  innerRef: () => {},
  disabled: false,
  type: 'default',
};

export default ListBox;
