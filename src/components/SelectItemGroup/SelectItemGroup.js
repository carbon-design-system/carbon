import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

const defaultProps = {
  disabled: false,
  label: 'Provide label',
};

const SelectItemGroup = ({
  children,
  className,
  disabled,
  label,
  ...other
}) => {
  const classNames = classnames('bx--select-optgroup', className);
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

SelectItemGroup.propTypes = propTypes;
SelectItemGroup.defaultProps = defaultProps;

export default SelectItemGroup;
