import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  SideNav as UIShellSideNav,
  SideNavItems,
  SideNavLink,
} from 'carbon-components-react/es/components/UIShell';

/**
 * The side nav.
 */
class SideNav extends Component {
  static propTypes = {
    /**
     * The ID of the selected component.
     */
    activeItemId: PropTypes.string,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * The array of component data.
     */
    items: PropTypes.arrayOf(PropTypes.shape()).isRequired,

    /**
     * The handler for the `click` event for changing selection.
     */
    onItemClick: PropTypes.func,
  };

  handleItemClick = (evt) => {
    const { onItemClick = () => {} } = this.props;
    onItemClick(evt);
    evt.preventDefault();
  };

  render() {
    const { items, activeItemId, className } = this.props;
    return (
      <UIShellSideNav className={className}>
        <SideNavItems>
          {items
            .filter((item) => !item.isHidden)
            .map((item) => {
              const { id, name, label } = item;
              return (
                <SideNavLink
                  key={id}
                  data-nav-id={id}
                  isActive={id === activeItemId}
                  href={`/demo/${name}`}
                  onClick={this.handleItemClick}>
                  {label}
                </SideNavLink>
              );
            })}
        </SideNavItems>
      </UIShellSideNav>
    );
  }
}

export default SideNav;
