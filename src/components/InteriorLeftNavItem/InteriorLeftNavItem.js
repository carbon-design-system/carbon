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
  href,
  activeHref,
  onClick,
  tabIndex,
  children,
  label,
  ...other
}) => {
  const classNames = classnames('left-nav-list__item', className, {
    'left-nav-list__item--active': activeHref === href,
  });

  return (
    <li
      tabIndex={children ? -1 : tabIndex}
      role="menuitem"
      className={classNames}
      onClick={evt => onClick(evt, href)}
      onKeyPress={evt => onClick(evt, href)}
      {...other}>
      {children ? (
        newChild(children, tabIndex)
      ) : (
        <a
          className="left-nav-list__item-link"
          href={href}
          tabIndex={children ? tabIndex : -1}>
          {label}
        </a>
      )}
    </li>
  );
};

InteriorLeftNavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  activeHref: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
  blankTarget: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};

InteriorLeftNavItem.defaultProps = {
  activeHref: '#',
  tabIndex: 0,
  label: 'InteriorLeftNavItem Label',
  onClick: /* istanbul ignore next */ () => {},
};

export default InteriorLeftNavItem;
