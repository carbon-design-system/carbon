import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const SelectItemGroup = ({
  children,
  className,
  disabled,
  label,
  ...other
}) => {
  const classNames = classnames(`${prefix}--select-optgroup`, className);
  return (
    <optgroup
      className={classNames}
      label={label}
      disabled={disabled}
      {...other}>
      {children}
    </optgroup>
  );
};

SelectItemGroup.propTypes = {
  /**
   * Provide the contents of your <SelectItemGroup>
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node
   */
  className: PropTypes.string,

  /**
   * Specify whether the <SelectItemGroup> should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the label to be displayed
   */
  label: PropTypes.string.isRequired,
};

SelectItemGroup.defaultProps = {
  disabled: false,
  label: 'Provide label',
};

export default SelectItemGroup;
