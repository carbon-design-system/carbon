import window from 'window-or-global';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const newChild = (children, tabIndex) => {
  const child = React.Children.only(children);
  return React.cloneElement(React.Children.only(child), {
    tabIndex,
    className: 'left-nav-list__item-link',
  });
};

const InteriorLeftNavItem = ({
  className,
  tabIndex,
  children,
  onClick,
  activeHref,
  ...other
}) => {
  const childHref =
    children.props.href === undefined ? children.props.to : children.props.href;
  const activePath =
    window.location && window.location.hash ? window.location.hash : activeHref;
  const classNames = classnames('left-nav-list__item', className, {
    'left-nav-list__item--active': activePath === childHref,
  });

  return (
    <li
      tabIndex={children ? -1 : tabIndex}
      role="menuitem"
      className={classNames}
      onClick={evt => onClick(evt, childHref)}
      onKeyPress={evt => onClick(evt, childHref)}
      {...other}>
      {newChild(children, tabIndex)}
    </li>
  );
};

InteriorLeftNavItem.propTypes = {
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  children: PropTypes.node,
};

InteriorLeftNavItem.defaultProps = {
  tabIndex: 0,
  label: 'InteriorLeftNavItem Label',
  onClick: /* istanbul ignore next */ () => {},
};

export default InteriorLeftNavItem;
