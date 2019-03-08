import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InteriorLeftNav, InteriorLeftNavItem } from 'carbon-addons-cloud';

/**
 * The side nav.
 */
class SideNav extends Component {
  static propTypes = {
    /**
     * The array of component data.
     */
    items: PropTypes.arrayOf(PropTypes.shape()).isRequired,

    /**
     * The ID of the selected component.
     */
    activeItemId: PropTypes.string,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * The handler for the `click` event for changing selection.
     */
    onItemClick: PropTypes.func,
  };

  handleItemClick = evt => {
    const { onItemClick = () => {} } = this.props;
    onItemClick(evt);
    evt.preventDefault();
  };

  render() {
    const { items, activeItemId, className } = this.props;
    const activeItem = items && items.find(item => item.id === activeItemId);
    const { activeName } = activeItem || {};
    return (
      <InteriorLeftNav className={className} activeHref={activeName ? `/demo/${activeName}` : ''}>
        {items
          .filter(item => !item.isHidden)
          .map(item => {
            const { id, name, label } = item;
            return (
              <InteriorLeftNavItem key={id} href={`/demo/${name}`}>
                <a href={`/demo/${name}`} data-nav-id={id} onClick={this.handleItemClick}>
                  {label}
                </a>
              </InteriorLeftNavItem>
            );
          })}
      </InteriorLeftNav>
    );
  }
}

export default SideNav;
