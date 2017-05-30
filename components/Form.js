import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('carbon-components/consumables/scss/base-elements/forms/forms.scss');
}

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
