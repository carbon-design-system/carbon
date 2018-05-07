import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import ListBoxField from './ListBoxField';
import ListBoxMenu from './ListBoxMenu';
import { ListBoxType } from './ListBoxPropTypes';
import childrenOf from '../../prop-types/childrenOf';

const handleOnKeyDown = event => {
  if (event.keyCode === 27) {
    event.stopPropagation();
  }
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
  ...rest
}) => {
  const className = cx({
    [containerClassName]: !!containerClassName,
    'bx--list-box': true,
    'bx--list-box--inline': type === 'inline',
    'bx--list-box--disabled': disabled,
  });
  return (
    <div
      {...rest}
      className={className}
      ref={innerRef}
      onKeyDown={handleOnKeyDown}>
      {children}
    </div>
  );
};

ListBox.propTypes = {
  children: childrenOf([ListBoxField, ListBoxMenu]),

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
};

ListBox.defaultProps = {
  innerRef: () => {},
  disabled: false,
  type: 'default',
};

export default ListBox;
