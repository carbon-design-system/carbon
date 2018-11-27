import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const Accordion = ({ children, className, ...other }) => {
  const classNames = classnames(`${prefix}--accordion`, className);
  return (
    <ul
      className={classNames}
      role="tablist"
      aria-multiselectable="true"
      {...other}>
      {children}
    </ul>
  );
};

Accordion.propTypes = {
  /**
   * Pass in the children that will be rendered within the Accordion
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
};

export default Accordion;
