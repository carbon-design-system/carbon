import React, { PropTypes } from 'react';
import classnames from 'classnames';
if (process.env.importSASS || process.env.importSASS === undefined) {
  require('@console/bluemix-components/consumables/scss/base-elements/select/select.scss');
}

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

const defaultProps = {
  disabled: false,
};

const SelectItemGroup = ({ children, className, disabled, label, ...other }) => {
  const classNames = classnames('bx--select__optgroup', className);
  return <optgroup className={classNames} label={label} disabled={disabled} {...other}>{children}</optgroup>;
};

SelectItemGroup.propTypes = propTypes;
SelectItemGroup.defaultProps = defaultProps;

export default SelectItemGroup;
