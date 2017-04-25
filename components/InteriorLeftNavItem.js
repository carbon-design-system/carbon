import React, { PropTypes } from 'react';
import classnames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  activeHref: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  blankTarget: PropTypes.bool,
};

const defaultProps = {
  activeHref: '#',
  tabIndex: 0,
  onClick: /* istanbul ignore next */ () => {},
};

const InteriorLeftNavItem = (
  {
    className,
    href,
    activeHref,
    onClick,
    tabIndex,
    label,
    ...other
  }
) => {
  const classNames = classnames('left-nav-list__item', className, {
    'left-nav-list__item--active': activeHref === href,
  });

  return (
    <li
      role="menuitem"
      tabIndex={tabIndex}
      className={classNames}
      onClick={evt => onClick(evt, href)}
      onKeyPress={evt => onClick(evt, href)}
      {...other}
    >
      <a className="left-nav-list__item-link" href={href} tabIndex={tabIndex}>
        {label}
      </a>
    </li>
  );
};

InteriorLeftNavItem.propTypes = propTypes;
InteriorLeftNavItem.defaultProps = defaultProps;

export default InteriorLeftNavItem;
