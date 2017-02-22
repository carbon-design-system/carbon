/* global window */

import React, { Component, PropTypes } from 'react';
import InteriorLeftNavHeader from './InteriorLeftNavHeader';
import InteriorLeftNavList from './InteriorLeftNavList';
import classnames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/components/inline-left-nav/inline-left-nav.scss');
}

class InteriorLeftNav extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  state = {
    activeHref: '#',
  };

  componentDidMount = () => {
    this.setState({ activeHref: window.location.pathname });
  };

  handleItemClick = (evt, href) => {
    evt.stopPropagation();
    // 13 = Enter, 32 = Spacebar
    if (evt.which === 13 || evt.which === 32 || evt.type === 'click') {
      this.setState({ activeHref: href });
    }
  };

  render() {
    const {
      className,
      children,
      ...other,
    } = this.props;

    const headerChild = [];
    const listChildren = [];

    React.Children.forEach(children, child => {
      if (child.type === InteriorLeftNavHeader) {
        headerChild.push(child);
      } else {
        listChildren.push(child);
      }
    });

    const newChildren = React.Children.map(listChildren, child => {
      let newChild;

      if (child.type === InteriorLeftNavList) {
        newChild = React.cloneElement(child, {
          onItemClick: this.handleItemClick,
          activeHref: this.state.activeHref,
        });
      } else {
        newChild = React.cloneElement(child, {
          onClick: this.handleItemClick,
          activeHref: this.state.activeHref,
        });
      }

      return newChild;
    });

    const classNames = classnames(
      'bx--inline-left-nav',
      className
    );

    return (
      <nav
        role="navigation"
        aria-label="Interior Left Navigation"
        className={classNames}
        {...other}
      >
        {headerChild.length > 0 && headerChild}
        <ul className="left-nav-list" role="menubar">
          {newChildren}
        </ul>
      </nav>
    );
  }
}

export default InteriorLeftNav;
