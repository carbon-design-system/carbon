import React, { PropTypes } from 'react';
import classnames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/components/inline-left-nav/inline-left-nav.scss');
}

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
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

const InteriorLeftNavItem = ({ children, className, href, activeHref, onClick, tabIndex, ...other }) => {
  const classNames = classnames(
    'left-nav-list__item',
    className,
    {
      'left-nav-list__item--active': (activeHref === href),
    },
  );

  const child = React.Children.only(children);
  const newChild = React.cloneElement(child, {
    tabIndex,
    className: 'left-nav-list__item-link',
  });

  return (
    <li
      role="menuitem"
      tabIndex={tabIndex}
      className={classNames}
      onClick={(evt) => onClick(evt, href)}
      onKeyPress={(evt) => onClick(evt, href)}
      {...other}
    >
      {newChild}
    </li>
  );
};

InteriorLeftNavItem.propTypes = propTypes;
InteriorLeftNavItem.defaultProps = defaultProps;

export default InteriorLeftNavItem;
