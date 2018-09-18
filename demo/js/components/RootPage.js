import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { ToggleSmall } from 'carbon-components-react';
import on from '../../../src/globals/js/misc/on';
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
 * @param {Object[]} componentItems The components data.
 * @returns {Object[]} The component data with `isHidden` moved to `meta.isDefaultHidden`.
 */
const preserveDefaultHidden = componentItems =>
  componentItems.map(item => {
    const { items: subItems, meta = {} } = item;
    return {
      ...item,
      meta: {
        ...meta,
        isDefaultHidden: item.isHidden,
      },
      ...(!subItems
        ? {}
        : {
            items: preserveDefaultHidden(subItems),
          }),
    };
  });

/**
 * @param {Object[]} componentItems The components data.
 * @param {boolean} isComponentsX `true` if the current style is of the experimental version.
 * @returns {Object[]} The component data with `isHidden` calculated with `meta.isDefaultHidden` and `isComponentsX`.
 */
const applyComponentsX = (componentItems, isComponentsX) =>
  componentItems.map(item => {
    const { items: subItems, meta = {} } = item;
    return {
      ...item,
      isHidden: meta.isDefaultHidden || (meta.xVersionNotSupported && isComponentsX) || (meta.xVersionOnly && !isComponentsX),
      ...(!subItems
        ? {}
        : {
            items: applyComponentsX(subItems, isComponentsX),
          }),
    };
  });

/**
 * @param {string} name The event name.
 * @param {Function} callback The callback.
 * @returns {Handle} The handle to release the attached event handler.
 */
const onBrowserSyncEvent = (name, callback) => {
  // eslint-disable-next-line no-underscore-dangle
  if (!window.___browserSync___) {
    return null;
  }
  window.___browserSync___.socket.on(name, callback); // eslint-disable-line no-underscore-dangle
  return {
    release() {
      window.___browserSync___.socket.off(name, callback); // eslint-disable-line no-underscore-dangle
      return null;
    },
  };
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

    /**
     * The port of the server triggering experimental/classic Sass build
     */
    portSassBuild: PropTypes.number,
  };

  constructor() {
    super();
    window.addEventListener('popstate', evt => {
      this.switchTo(evt.state.name);
    });
  }

  state = {};

  static getDerivedStateFromProps({ componentItems, isComponentsX }, state) {
    const { prevComponentItems, prevIsComponentsX, componentItems: currentComponentItems } = state;
    if (prevComponentItems === componentItems && prevIsComponentsX === isComponentsX) {
      return null;
    }
    return {
      componentItems: applyComponentsX(
        preserveDefaultHidden(prevComponentItems === componentItems ? currentComponentItems : componentItems),
        isComponentsX
      ),
      isComponentsX,
      prevComponentItems: componentItems,
      prevIsComponentsX: isComponentsX,
    };
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
    if (!this.hBrowserSyncEvent) {
      this.hBrowserSyncEvent = onBrowserSyncEvent('file:reload', this._handleBrowserSyncEvent);
    }
    this._inspectLinkTag();
  }

  componentWillUnmount() {
    if (this.hStyleLoad) {
      this.hStyleLoad = this.hStyleLoad.release();
    }
    if (this.hStyleInspectionTimeout) {
      clearTimeout(this.hStyleInspectionTimeout);
      this.hStyleInspectionTimeout = null;
    }
    if (this.hBrowserSyncEvent) {
      this.hBrowserSyncEvent = this.hBrowserSyncEvent.release();
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
   * Detects if the demo CSS bundle is of X version and set states accordingly.
   * @param {HTMLElement} link The `<link>` for the demo CSS bundle.
   * @private
   */
  _detectComponentsX(link) {
    if (this.hTimeoutDetectExperimental) {
      clearTimeout(this.hTimeoutDetectExperimental);
      this.hTimeoutDetectExperimental = null;
    }
    // For IE11
    if (link.sheet.cssRules.length === 0) {
      this.hTimeoutDetectExperimental = setTimeout(() => {
        this._detectComponentsX(link);
      }, 100);
    }
    const isComponentsX = Array.prototype.some.call(
      link.sheet.cssRules,
      rule =>
        /^\.bx--body$/.test(rule.selectorText) &&
        /^rgb\(255,\s*255,\s*255\)$/.test(rule.style.getPropertyValue('background-color'))
    );
    this.setState({
      componentItems: applyComponentsX(this.state.componentItems, isComponentsX),
      isComponentsX,
    });
  }

  /**
   * Handles an event from BrowserSync.
   * @param {Object} evt The event.
   * @private
   */
  _handleBrowserSyncEvent = evt => {
    if (evt.basename === 'demo.css') {
      this._inspectLinkTag();
    }
  };

  /**
   * Inspects `<link>` tag to see if experimental version of demo CSS is loaded there.
   */
  _inspectLinkTag() {
    if (this.hStyleLoad) {
      this.hStyleLoad = this.hStyleLoad.release();
    }
    if (this.hStyleInspectionTimeout) {
      clearTimeout(this.hStyleInspectionTimeout);
      this.hStyleInspectionTimeout = null;
    }
    this.hStyleInspectionTimeout = setTimeout(() => {
      const links = Array.prototype.filter.call(document.querySelectorAll('link[type="text/css"]'), link =>
        /\/demo\/demo\.css/i.test(link.getAttribute('href'))
      );
      const lastLink = links[links.length - 1];
      if (lastLink.sheet) {
        this._detectComponentsX(lastLink);
      } else {
        this.hStyleLoad = on(lastLink, 'load', () => {
          this._detectComponentsX(lastLink);
        });
      }
    }, 0);
  }

  /**
   * Toggles usage of experimental CSS upon user event.
   * @param {Object} evt The event.
   * @private
   */
  _switchExperimental = evt => {
    fetch(`http://localhost:${this.props.portSassBuild}/${evt.target.checked ? 'experimental' : 'classic'}`);
  };

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
    const { portSassBuild } = this.props;
    const { componentItems, isComponentsX } = this.state;
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
          <ToggleSmall
            id="theme-switcher"
            className="demo--theme-switcher"
            ariaLabel="Theme switcher"
            disabled={!portSassBuild}
            toggled={isComponentsX}
            onChange={this._switchExperimental}
          />
        </main>
      </Fragment>
    );
  }
}

export default RootPage;
