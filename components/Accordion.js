import React, { PropTypes } from 'react';
import classnames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/accordion/accordion.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const Accordion = ({ children, className }) => {
  const classNames = classnames('bx--accordion', className);
  return (
    <ul className={classNames}>
      {children}
    </ul>
  );
};

Accordion.propTypes = propTypes;

export default Accordion;
