import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/components/accordion/accordion.scss');
}

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const Accordion = ({ children, className, ...other }) => {
  const classNames = classnames('bx--accordion', className);
  return (
    <ul className={classNames} {...other}>
      {children}
    </ul>
  );
};

Accordion.propTypes = propTypes;

export default Accordion;
