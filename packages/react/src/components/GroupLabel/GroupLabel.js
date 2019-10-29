import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const categoryLabel = {
  color: '#5A6872',
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '0.2px',
  margin: '8px 16px',
};

const GroupLabel = ({ className, children, id, ...other }) => {
  const classNames = classnames('bx--group-label', className);

  return (
    <label htmlFor={id} className={classNames} style={categoryLabel} {...other}>
      {children}
    </label>
  );
};

GroupLabel.propTypes = {
  /**
   * Specify the content of the form label
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing <label> node
   */
  className: PropTypes.string,

  /**
   * Provide a unique id for the given <GroupLabel>
   */
  id: PropTypes.string,
};

export default GroupLabel;
