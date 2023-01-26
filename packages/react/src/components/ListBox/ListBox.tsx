/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { KeyboardEvent, MouseEvent, useContext} from 'react';
import PropTypes from 'prop-types';
import deprecate from '../../prop-types/deprecate';
import { ListBoxType, ListBoxSize } from './ListBoxPropTypes';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { ForwardRefReturn, ReactAttr } from '../../types/common';

const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
  if (event.keyCode === 27) {
    event.stopPropagation();
  }
};

const handleClick = (event: MouseEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

type ExcludedAttributes = 'onKeyDown' | 'onKeyPress' | 'ref'

export interface ListBoxProps
  extends Omit<ReactAttr<HTMLDivElement>, ExcludedAttributes> {

  /**
   * Specify whether the ListBox is currently disabled
   */
  disabled?: boolean;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Specify the text to be displayed when the control is invalid
   */
  invalidText?: React.ReactNode;

  /**
   * Specify if the control should render open
   */
  isOpen?: boolean;

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   * 
   * @deprecated The `light` prop for `ListBox` has been deprecated in favor of
   * the new `Layer` component. It will be removed in the next major release.
   */
  light?: boolean;

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size?: ListBoxSize;

  /**
   * Specify the "type" of the ListBox. Currently supports either `default` or
   * `inline` as an option.
   */
  type?: ListBoxType;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;
}

export type ListBoxComponent = ForwardRefReturn<HTMLDivElement, ListBoxProps>

/**
 * `ListBox` is a generic container component that handles creating the
 * container class name in response to certain props.
 */
const ListBox: ListBoxComponent = React.forwardRef(function ListBox(
  {
    children,
    className: containerClassName,
    disabled,
    type,
    size,
    invalid,
    invalidText,
    warn,
    warnText,
    light,
    isOpen,
    ...rest
  }: ListBoxProps,
  ref: React.LegacyRef<HTMLDivElement>
) {
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const showWarning = !invalid && warn;

  const className = cx({
    ...(containerClassName && {[containerClassName]: true}),
    [`${prefix}--list-box`]: true,
    [`${prefix}--list-box--${size}`]: size,
    [`${prefix}--list-box--inline`]: type === 'inline',
    [`${prefix}--list-box--disabled`]: disabled,
    [`${prefix}--list-box--light`]: light,
    [`${prefix}--list-box--expanded`]: isOpen,
    [`${prefix}--list-box--invalid`]: invalid,
    [`${prefix}--list-box--warning`]: showWarning,
  });
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        {...rest}
        className={className}
        ref={ref}
        onKeyDown={handleOnKeyDown}
        onClick={handleClick}
        data-invalid={invalid || undefined}>
        {children}
      </div>
      {isFluid && <hr className={`${prefix}--list-box__divider`} />}
      {invalid ? (
        <div className={`${prefix}--form-requirement`}>{invalidText}</div>
      ) : null}
      {showWarning ? (
        <div className={`${prefix}--form-requirement`}>{warnText}</div>
      ) : null}
    </>
  );
});

ListBox.displayName = 'ListBox';
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
   * Specify whether the ListBox is currently disabled
   */
  disabled: PropTypes.bool.isRequired,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Specify the text to be displayed when the control is invalid
   */
  invalidText: PropTypes.node,

  /**
   * Specify if the control should render open
   */
  isOpen: PropTypes.bool,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `ListBox` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxSize,

  /**
   * Specify the "type" of the ListBox. Currently supports either `default` or
   * `inline` as an option.
   */
  type: ListBoxType.isRequired,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

ListBox.defaultProps = {
  disabled: false,
  type: 'default',
};

export default ListBox;
