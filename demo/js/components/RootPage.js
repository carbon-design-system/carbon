import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import CodePage from './CodePage/CodePage';
import SideNav from './SideNav';
import PageHeader from './PageHeader/PageHeader';
import SideNavToggle from './SideNavToggle/SideNavToggle';

/**
 * The top-most React component for dev env page.
 */
class RootPage extends Component {
  static propTypes = {
    /**
     * The array of component data.
     */
    componentItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,

    /**
     * The array of document data. (Preserved for future)
     */
    docItems: PropTypes.arrayOf(PropTypes.shape()).isRequired, // eslint-disable-line react/no-unused-prop-types
  };

  constructor() {
    super();
    this.state = {};
    window.addEventListener('popstate', evt => {
      this.switchTo(evt.state.name);
    });
  }

  componentDidMount() {
    const { componentItems } = this.props;
    if (!this.state.selectedNavItemId && componentItems) {
      const pathnameTokens = /^\/demo\/([\w-]+)$/.exec(location.pathname);
      const name = (pathnameTokens && pathnameTokens[1]) || '';
      const selectedNavItem = (name && componentItems.find(item => item.name === name)) || componentItems[0];
      if (selectedNavItem) {
        this.switchTo(selectedNavItem.id);
      }
    }
  }

  /**
   * The handler for changing in the state of side nav's toggle button.
   */
  onSideNavToggle = evt => {
    this.setState({ navClosed: evt.closed });
  };

  /**
   * The handler for the `click` event on the side nav for changing selection.
   */
  onSideNavItemClick = evt => {
    const { componentItems } = this.props;
    const selectedNavItem = componentItems && componentItems.find(item => item.id === evt.target.dataset.navId);
    if (selectedNavItem) {
      this.switchTo(selectedNavItem.id);
    }
  };

  /**
   * @returns The component data that is currently selected.
   */
  getCurrentComponentItem() {
    const { componentItems } = this.props;
    return componentItems && componentItems.find(item => item.id === this.state.selectedNavItemId);
  }

  /**
   * Switches the selected component.
   * @param {string} selectedNavItemId The ID of the newly selected component.
   */
  switchTo(selectedNavItemId) {
    this.setState({ selectedNavItemId }, () => {
      const { componentItems } = this.props;
      const selectedNavItem = componentItems && componentItems.find(item => item.id === selectedNavItemId);
      const { name } = selectedNavItem || {};
      if (name) {
        history.pushState({ name }, name, `/demo/${name}`);
      }
    });
  }

  render() {
    const { componentItems } = this.props;
    const metadata = this.getCurrentComponentItem();
    const { name, label } = metadata || {};
    const classNames = classnames({
      'bx--interior-left-nav--collapsed': this.state.navClosed,
    });
    return !metadata ? null : (
      <Fragment>
        <SideNavToggle onChange={this.onSideNavToggle} />
        <SideNav items={componentItems} className={classNames} onItemClick={this.onSideNavItemClick} />
        <main role="main" id="maincontent" className="container" aria-labelledby="page-title" tabIndex="-1" data-page={name}>
          <PageHeader label="Component" title={label} />
          <CodePage metadata={metadata} />
        </main>
      </Fragment>
    );
  }
}

export default RootPage;
