import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import CodePage from './CodePage/CodePage';
import SideNav from './SideNav';
import PageHeader from './PageHeader/PageHeader';
import SideNavToggle from './SideNavToggle/SideNavToggle';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const load = (componentItems, selectedNavItemId) => {
  const metadata = componentItems && componentItems.find(item => item.id === selectedNavItemId);
  const subItems = metadata.items || [];
  const hasRenderedContent =
    !metadata.isCollection && subItems.length <= 1 ? metadata.renderedContent : subItems.every(item => item.renderedContent);
  if (!hasRenderedContent) {
    return fetch(`/code/${metadata.name}`)
      .then(checkStatus)
      .then(response => {
        const contentType = response.headers.get('content-type');
        return contentType && contentType.includes('application/json') ? response.json() : response.text();
      })
      .then(responseContent => {
        if (Object(responseContent) === responseContent) {
          return componentItems.map(item => {
            if (item.id !== selectedNavItemId) {
              return item;
            }
            return !item.items
              ? {
                  ...item,
                  renderedContent: responseContent[`${item.handle}--default`],
                }
              : {
                  ...item,
                  items: item.items.map(
                    subItem =>
                      !responseContent[subItem.handle]
                        ? subItem
                        : {
                            ...subItem,
                            renderedContent: responseContent[subItem.handle],
                          }
                  ),
                };
          });
        }
        return componentItems.map(
          item =>
            item.id !== selectedNavItemId
              ? item
              : {
                  ...item,
                  renderedContent: responseContent,
                }
        );
      });
  }
  return Promise.resolve(null);
};

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

  constructor(props) {
    super();

    const { componentItems } = props;

    this.state = {
      /**
       * The array of component data.
       * @type {Object[]}
       */
      componentItems,
    };

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

  componentWillReceiveProps(props) {
    const { componentItems } = props;
    if (this.props.componentItems !== componentItems) {
      this.setState({ componentItems });
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
    const { componentItems } = this.state;
    const selectedNavItem = componentItems && componentItems.find(item => item.id === evt.target.dataset.navId);
    if (selectedNavItem) {
      this.switchTo(selectedNavItem.id);
    }
  };

  /**
   * @returns The component data that is currently selected.
   */
  getCurrentComponentItem() {
    const { componentItems } = this.state;
    return componentItems && componentItems.find(item => item.id === this.state.selectedNavItemId);
  }

  /**
   * Switches the selected component.
   * @param {string} selectedNavItemId The ID of the newly selected component.
   */
  switchTo(selectedNavItemId) {
    this.setState({ selectedNavItemId }, () => {
      const { componentItems } = this.state;
      const selectedNavItem = componentItems && componentItems.find(item => item.id === selectedNavItemId);
      const { name } = selectedNavItem || {};
      if (name) {
        history.pushState({ name }, name, `/demo/${name}`);
      }
      load(componentItems, selectedNavItemId).then(newComponentItems => {
        if (newComponentItems) {
          this.setState({ componentItems: newComponentItems });
        }
      });
    });
  }

  render() {
    const { componentItems } = this.state;
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
