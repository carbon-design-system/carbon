import React, { PropTypes } from 'react';
import classnames from 'classnames';
if (process.env.importSASS || process.env.importSASS === undefined) {
  require('@console/bluemix-components/consumables/scss/base-elements/forms/forms.scss');
}

const propTypes = {
  children: PropTypes.node,
  legendText: PropTypes.string,
  className: PropTypes.string,
  invalid: PropTypes.bool,
  message: PropTypes.bool,
  messageText: PropTypes.string,
};
const defaultProps = {
  invalid: false,
  message: false,
  messageText: undefined,
};

const FormGroup = ({ legendText, invalid, children, className, message, messageText, ...other }) => {
  const classNamesLegend = classnames('bx--form__legend', className);
  const classNamesFieldset = classnames('bx--form__fieldset', className);

  return (
    <fieldset {...(invalid && { 'data-invalid': '' })} className={classNamesFieldset} {...other}>
      <legend className={classNamesLegend}>
        {legendText}
      </legend>
      {children}
      {message ? (
        <div className="bx--form__requirements">
          {messageText}
        </div>
        ) :
        null}
    </fieldset>
  );
};


FormGroup.propTypes = propTypes;
FormGroup.defaultProps = defaultProps;

export default FormGroup;
