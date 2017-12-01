import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import InteriorLeftNavItem from '../InteriorLeftNavItem';
import Icon from '../Icon';

export default class InteriorLeftNavList extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    tabIndex: PropTypes.number,
    title: PropTypes.string,
    open: PropTypes.bool,
    onListClick: PropTypes.func,
    onItemClick: PropTypes.func,
    activeHref: PropTypes.string,
    iconDescription: PropTypes.string,
    id: PropTypes.string,
    isExpanded: PropTypes.bool,
  };

  static defaultProps = {
    title: 'Provide title',
    open: false,
    tabIndex: 0,
    activeHref: '#',
    iconDescription: 'display sub navigation items',
    onListClick: /* istanbul ignore next */ () => {},
    onItemClick: /* istanbul ignore next */ () => {},
    isExpanded: false,
  };

  state = {
    open: this.props.open,
  };

  toggle = evt => {
    if (evt.which === 13 || evt.which === 32 || evt.type === 'click') {
      if (!this.state.open) {
        this.props.onListClick(this.props.id);
      }
      this.setState({ open: !this.state.open });
    }
  };

  close = () => this.state.open && this.setState({ open: false });

  buildNewItemChild = (child, index) => {
    const { onItemClick, activeHref } = this.props;

    const key = `listitem-${index}`;
    return (
      <InteriorLeftNavItem
        {...child.props}
        key={key}
        onClick={onItemClick}
        activeHref={activeHref}
        tabIndex={this.state.open ? 0 : -1}
      />
    );
  };

  render() {
    const {
      tabIndex,
      title,
      children,
      className,
      iconDescription,
      onListClick, // eslint-disable-line no-unused-vars
      onItemClick, // eslint-disable-line no-unused-vars
      activeHref, // eslint-disable-line no-unused-vars
    } = this.props;

    const classNames = classnames(
      'left-nav-list__item',
      'left-nav-list__item--has-children',
      {
        'left-nav-list__item--expanded': this.state.open,
      },
      className
    );

    const newChildren = React.Children.map(children, (child, index) =>
      this.buildNewItemChild(child, index)
    );

    return (
      <li
        className={classNames}
        tabIndex={tabIndex}
        onClick={this.toggle}
        onKeyPress={this.toggle}
        role="menuitem">
        <div className="left-nav-list__item-link">
          {title}
          <div className="left-nav-list__item-icon">
            <Icon
              name="chevron--down"
              description={iconDescription}
              className="left-nav-list__item-icon bx--interior-left-nav__icon"
            />
          </div>
        </div>
        <ul
          role="menu"
          className="left-nav-list left-nav-list--nested"
          aria-hidden>
          {newChildren}
        </ul>
      </li>
    );
  }
}
