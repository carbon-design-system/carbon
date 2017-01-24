import React, { PropTypes } from 'react';
import classnames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/inline-left-nav/inline-left-nav.scss';

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  activeHref: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
};

const defaultProps = {
  activeHref: '#',
  tabIndex: 0,
  onClick: () => {},
};

const InteriorLeftNavItem = ({ title, className, href, activeHref, onClick, tabIndex, ...other }) => {
  const classNames = classnames(
    'left-nav-list__item',
    className,
    {
      'left-nav-list__item--active': (activeHref === href),
    },
  );

  return (
    <li
      role="menuitem"
      tabIndex={tabIndex}
      className={classNames}
      onClick={(evt) => onClick(evt, href)}
      onKeyPress={(evt) => onClick(evt, href)}
      {...other}
    >
      <a
        href={href}
        tabIndex={tabIndex}
        className="left-nav-list__item-link"
      >
        {title}
      </a>
    </li>
  );
};

InteriorLeftNavItem.propTypes = propTypes;
InteriorLeftNavItem.defaultProps = defaultProps;

export default InteriorLeftNavItem;
