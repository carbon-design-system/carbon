import { ChevronDown20 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import SideNavIcon from './SideNavIcon';

const { prefix } = settings;

export class SideNavMenu extends React.Component {
  static propTypes = {
    /**
     * Provide an optional class to be applied to the containing node
     */
    className: PropTypes.string,

    /**
     * Provide <SideNavMenuItem>'s inside of the `SideNavMenu`
     */
    children: PropTypes.node,

    /**
     * Pass in a custom icon to render next to the `SideNavMenu` title
     */
    icon: PropTypes.node.isRequired,

    /**
     * Specify whether the `SideNavMenu` is "active". `SideNavMenu` should be
     * considered active if one of its menu items are a link for the current
     * page.
     */
    isActive: PropTypes.bool,

    /**
     * Provide the text for the overall menu name
     */
    title: PropTypes.string.isRequired,

    /**
     * Specify whether the menu should default to expanded. By default, it will
     * be closed.
     */
    defaultExpanded: PropTypes.bool,
  };

  static defaultProps = {
    defaultExpanded: false,
    isActive: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: props.defaultExpanded || false,
    };
  }

  handleToggleExpand = () => {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  };

  render() {
    const {
      buttonRef,
      className: customClassName,
      children,
      icon,
      isActive,
      title,
    } = this.props;
    const { isExpanded } = this.state;
    const className = cx({
      [`${prefix}--side-nav__item`]: true,
      [`${prefix}--side-nav__item--active`]: isActive,
      [customClassName]: !!customClassName,
    });
    return (
      <li className={className}>
        <button
          aria-haspopup="true"
          aria-expanded={isExpanded}
          className={`${prefix}--side-nav__submenu`}
          onClick={this.handleToggleExpand}
          ref={buttonRef}
          type="button">
          <SideNavIcon>{icon}</SideNavIcon>
          <span className={`${prefix}--side-nav__submenu-title`}>{title}</span>
          <SideNavIcon className={`${prefix}--side-nav__submenu-chevron`} small>
            <ChevronDown20 />
          </SideNavIcon>
        </button>
        <ul className={`${prefix}--side-nav__menu`} role="menu">
          {children}
        </ul>
      </li>
    );
  }
}

export default React.forwardRef((props, ref) => {
  return <SideNavMenu {...props} buttonRef={ref} />;
});
