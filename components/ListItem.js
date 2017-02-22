import React, { PropTypes } from 'react';
import classnames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/base-elements/lists/lists.scss');
}

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const ListItem = ({ children, className, ...other }) => {
  const classNames = classnames('bx--list__item', className);
  return <li className={classNames} {...other}>{children}</li>;
};

ListItem.propTypes = propTypes;

export default ListItem;
