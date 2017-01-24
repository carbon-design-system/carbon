import React, { Component, PropTypes } from 'react';
import InteriorLeftNavHeader from './InteriorLeftNavHeader';
import classnames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/inline-left-nav/inline-left-nav.scss';

class InteriorLeftNav extends Component {

  static propTypes = {
    previousPageText: PropTypes.string,
    previousPageHref: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static defaultProps = {
    previousPageText: 'Previous Page',
    previousPageHref: '#',
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
      previousPageText,
      previousPageHref,
      className,
      children,
      ...other,
    } = this.props;

    const newChildren = React.Children.map(children, child => {
      let newChild;

      if (child.type.name === 'InteriorLeftNavList') {
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
      <nav className={classNames} {...other}>
        <InteriorLeftNavHeader
          previousPageText={previousPageText}
          previousPageHref={previousPageHref}
        />
        <ul className="left-nav-list">
          {newChildren}
        </ul>
      </nav>
    );
  }
}

export default InteriorLeftNav;
