import React, { PropTypes } from 'react';
import classnames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/base-elements/forms/forms.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const Form = ({ className, children, ...other }) => {
  const classNames = classnames('bx--form', className);

  return <form className={classNames} {...other}> {children} </form>;
};


Form.propTypes = propTypes;

export default Form;
