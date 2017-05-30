/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import InteriorLeftNavList from './InteriorLeftNavList';
import InteriorLeftNavItem from './InteriorLeftNavItem';
import Icon from './Icon';
if (!process.env.EXCLUDE_SASS) {
  import('carbon-components/consumables/scss/components/inline-left-nav/inline-left-nav.scss');
}

class InteriorLeftNav extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    activeHref: PropTypes.string,
    onToggle: PropTypes.func,
  };

  static defaultProps = {
    onToggle: () => {},
  }

  state = {
    activeHref: this.props.activeHref || '#',
    open: true,
  };

  componentDidMount = () => {
    this.setState({ activeHref: window.location.pathname });
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.activeHref) {
      this.setState({ activeHref: nextProps.activeHref });
    }
  };

  handleItemClick = (evt, href) => {
    evt.stopPropagation();

    // 13 = Enter, 32 = Spacebar
    const acceptableEvent = (evt.which === 13 || evt.which === 32 || evt.type === 'click');
    const diffHref = (href !== this.state.activeHref);
    if (acceptableEvent && diffHref) {
      this.setState({ activeHref: href });
    }
  };

  handleListClick = (id) => {
    this.props.children.forEach((child, index) => {
      if (child.type === InteriorLeftNavList) {
        const childId = `list-${index}`;
        if (childId !== id) {
          this.refs[childId].close();
        }
      }
    });
  };

  toggle = (evt) => {
    evt.stopPropagation();
    this.props.onToggle(!this.state.open);
    this.setState({ open: !this.state.open });
  };

  buildNewListChild = (child, index) => {
    const key = `list-${index}`;
    return (
      <InteriorLeftNavList
        {...child.props}
        key={key}
        ref={key}
        id={key}
        onListClick={this.handleListClick}
        onItemClick={this.handleItemClick}
        activeHref={this.state.activeHref}
      />
    );
  };

  buildNewItemChild = (child, index) => {
    const key = `item-${index}`;
    return (
      <InteriorLeftNavItem
        {...child.props}
        key={key}
        onClick={this.handleItemClick}
        activeHref={this.state.activeHref}
      />
    );
  };

  render() {
    const {
      className,
      children,
      activeHref, // eslint-disable-line no-unused-vars
      onToggle, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const newChildren = React.Children.map(children, (child, index) => {
      let newChild;
      if (child.type === InteriorLeftNavList) {
        newChild = this.buildNewListChild(child, index);
      } else {
        newChild = this.buildNewItemChild(child, index);
      }

      return newChild;
    });

    const classNames = classnames(
      'bx--inline-left-nav',
      'bx--inline-left-nav--collapseable',
      {
        'bx--inline-left-nav--collapsed': !this.state.open,
      },
      className,
    );

    return (
      <nav
        role="navigation"
        aria-label="Interior Left Navigation"
        className={classNames}
        onClick={!this.state.open && this.toggle}
        {...other}
      >
        <ReactCSSTransitionGroup
          transitionName={{
            enter: 'bx--inline-left-nav--collapseable',
            enterActive: 'bx--inline-left-nav--expanding',
            leave: 'bx--inline-left-nav--collapsed',
            leaveActive: 'bx--inline-left-nav--collapsing',
          }}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          <ul key="main_list" className="left-nav-list" role="menubar">
            {newChildren}
          </ul>
        </ReactCSSTransitionGroup>
        <div
          className="bx--inline-left-nav-collapse"
          onClick={this.toggle}
        >
          <a className="bx--inline-left-nav-collapse__link">
            <Icon
              name="chevron--left"
              description="close/open iln"
              className="bx--inline-left-nav-collapse__arrow"
            />
          </a>
        </div>
      </nav>
    );
  }
}

export default InteriorLeftNav;
