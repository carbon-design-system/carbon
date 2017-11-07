import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const ListItem = ({ children, className, ...other }) => {
  const classNames = classnames('bx--list__item', className);
  return (
    <li className={classNames} {...other}>
      {children}
    </li>
  );
};

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ListItem;
