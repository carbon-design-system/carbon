import React, { PropTypes } from 'react';
import classnames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/components/accordion/accordion.scss';

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
