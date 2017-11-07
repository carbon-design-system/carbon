import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const FormGroup = ({
  legendText,
  invalid,
  children,
  className,
  message,
  messageText,
  ...other
}) => {
  const classNamesLegend = classnames('bx--label', className);
  const classNamesFieldset = classnames('bx--fieldset', className);

  return (
    <fieldset
      {...invalid && { 'data-invalid': '' }}
      className={classNamesFieldset}
      {...other}>
      <legend className={classNamesLegend}>{legendText}</legend>
      {children}
      {message ? (
        <div className="bx--form__requirements">{messageText}</div>
      ) : null}
    </fieldset>
  );
};

FormGroup.propTypes = {
  children: PropTypes.node,
  legendText: PropTypes.string,
  className: PropTypes.string,
  invalid: PropTypes.bool,
  message: PropTypes.bool,
  messageText: PropTypes.string,
};

FormGroup.defaultProps = {
  invalid: false,
  message: false,
  messageText: 'Provide message text',
  legendText: 'Provide legend text',
};

export default FormGroup;
