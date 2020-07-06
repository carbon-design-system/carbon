/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { ChevronLeft16, ChevronRight16 } from '@carbon/icons-react';
import debounce from 'lodash.debounce';
import { keys, match, matches } from '../../internal/keyboard';

const { prefix } = settings;

export default class Tabs extends React.Component {
  static propTypes = {
    /**
     * Pass in a collection of <Tab> children to be rendered depending on the
     * currently selected tab
     */
    children: PropTypes.node,

    /**
     * Provide a className that is applied to the root <nav> component for the
     * <Tabs>
     */
    className: PropTypes.string,

    /**
     * Specify whether the Tab content is hidden
     */
    hidden: PropTypes.bool,

    /**
     * Provide a description that is read out when a user visits the caret icon
     * for the dropdown menu of items
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * Optionally provide an `onClick` handler that is invoked when a <Tab> is
     * clicked
     */
    onClick: PropTypes.func,

    /**
     * Optionally provide an `onKeyDown` handler that is invoked when keyed
     * navigation is triggered
     */
    onKeyDown: PropTypes.func,

    /**
     * Provide an optional handler that is called whenever the selection
     * changes. This method is called with the index of the tab that was
     * selected
     */
    onSelectionChange: PropTypes.func,

    /**
     * Optionally provide an index for the currently selected <Tab>
     */
    selected: PropTypes.number,

    /**
     * Provide a className that is applied to the <TabContent> components
     */
    tabContentClassName: PropTypes.string,

    /**
     * Provide a string that represents the `href` for the triggered <Tab>
     */
    triggerHref: PropTypes.string.isRequired,

    /**
     * Provide the type of Tab
     */
    type: PropTypes.oneOf(['default', 'container']),
  };

  static defaultProps = {
    role: 'navigation',
    type: 'default',
    selected: 0,
    selectionMode: 'automatic',
  };

  state = {
    horizontalOverflow: false,
  };

  tablist = React.createRef();

  static getDerivedStateFromProps({ selected }, state) {
    const { prevSelected } = state;
    return prevSelected === selected
      ? null
      : {
          selected,
          prevSelected: selected,
        };
  }

  /**
   * `scroll` event handler to save tablist clientWidth, scrollWidth, and
   * scrollLeft
   */
  handleScroll = () => {
    const {
      clientWidth: tablistClientWidth,
      scrollLeft: tablistScrollLeft,
      scrollWidth: tablistScrollWidth,
    } = this.tablist.current;
    this.setState({
      tablistClientWidth,
      horizontalOverflow: tablistScrollWidth > tablistClientWidth,
      tablistScrollWidth,
      tablistScrollLeft,
    });
  };

  /**
   * The debounced version of the `resize` event handler.
   * @type {Function}
   * @private
   */
  _debouncedHandleWindowResize = null;

  _handleWindowResize = this.handleScroll;

  componentDidMount() {
    if (!this._debouncedHandleWindowResize) {
      this._debouncedHandleWindowResize = debounce(
        this._handleWindowResize,
        200
      );
    }

    this._handleWindowResize();
    window.addEventListener('resize', this._debouncedHandleWindowResize);
  }

  componentWillUnmount() {
    if (this._debouncedHandleWindowResize) {
      this._debouncedHandleWindowResize.cancel();
    }
    window.removeEventListener('resize', this._debouncedHandleWindowResize);
  }

  getTabs() {
    return React.Children.map(this.props.children, (tab) => tab);
  }

  getEnabledTabs = () =>
    React.Children.toArray(this.props.children).reduce(
      (acc, tab, index) => (!tab.props.disabled ? acc.concat(index) : acc),
      []
    );

  getTabAt = (index, useFresh) => {
    return (
      (!useFresh && this[`tab${index}`]) ||
      React.Children.toArray(this.props.children)[index]
    );
  };

  setTabAt = (index, tabRef) => {
    this[`tab${index}`] = tabRef;
  };

  // following functions (handle*) are Props on Tab.js, see Tab.js for parameters
  handleTabClick = (onSelectionChange) => {
    return (index, evt) => {
      evt.preventDefault();

      this.selectTabAt(index, onSelectionChange);
    };
  };

  getDirection = (evt) => {
    if (match(evt, keys.ArrowLeft)) {
      return -1;
    }
    if (match(evt, keys.ArrowRight)) {
      return 1;
    }
    return 0;
  };

  getNextIndex = (index, direction) => {
    const enabledTabs = this.getEnabledTabs();
    const nextIndex = Math.max(
      enabledTabs.indexOf(index) + direction,
      -1 /* For `tab` not found in `enabledTabs` */
    );
    const nextIndexLooped =
      nextIndex >= 0 && nextIndex < enabledTabs.length
        ? nextIndex
        : nextIndex - Math.sign(nextIndex) * enabledTabs.length;
    return enabledTabs[nextIndexLooped];
  };

  handleTabKeyDown = (onSelectionChange) => {
    return (index, evt) => {
      if (matches(evt, [keys.Enter, keys.Space])) {
        this.selectTabAt(index, onSelectionChange);
      }
      const nextIndex = this.getNextIndex(index, this.getDirection(evt));
      const tab = this.getTabAt(nextIndex);
      if (tab && matches(evt, [keys.ArrowLeft, keys.ArrowRight])) {
        evt.preventDefault();
        if (this.props.selectionMode !== 'manual') {
          this.selectTabAt(nextIndex, onSelectionChange);
        }
        if (tab.tabAnchor) {
          tab.tabAnchor.focus();
        }
      }
    };
  };

  selectTabAt = (index, onSelectionChange) => {
    if (this.state.selected !== index) {
      this.setState({
        selected: index,
      });
      if (typeof onSelectionChange === 'function') {
        onSelectionChange(index);
      }
    }
  };

  render() {
    const {
      className,
      role,
      type,
      onSelectionChange,
      selectionMode, // eslint-disable-line no-unused-vars
      tabContentClassName,
      ...other
    } = this.props;

    /**
     * The tab panel acts like a tab panel when the screen is wider, but acts
     * like a select list when the screen is narrow.  In the wide case we want
     * to allow the user to use the tab key to set the focus in the tab panel
     * and then use the left and right arrow keys to navigate the tabs.  In the
     * narrow case we want to use the tab key to select different options in
     * the list.
     *
     * We set the tab index based on the different states so the browser will treat
     * the whole tab panel as a single focus component when it looks like a tab
     * panel and separate components when it looks like a select list.
     */
    const tabsWithProps = this.getTabs().map((tab, index) => {
      const tabIndex = index === this.state.selected ? 0 : -1;
      const newTab = React.cloneElement(tab, {
        index,
        selected: index === this.state.selected,
        handleTabClick: this.handleTabClick(onSelectionChange),
        tabIndex,
        ref: (e) => {
          this.setTabAt(index, e);
        },
        handleTabKeyDown: this.handleTabKeyDown(onSelectionChange),
      });

      return newTab;
    });

    const tabContentWithProps = React.Children.map(tabsWithProps, (tab) => {
      const {
        id: tabId,
        children,
        selected,
        renderContent: TabContent,
      } = tab.props;

      return (
        <TabContent
          id={tabId && `${tabId}__panel`}
          className={tabContentClassName}
          aria-hidden={!selected}
          hidden={!selected}
          selected={selected}
          aria-labelledby={tabId}>
          {children}
        </TabContent>
      );
    });

    const classes = {
      tabs: classNames(`${prefix}--tabs`, className, {
        [`${prefix}--tabs--container`]: type === 'container',
      }),
      tablist: classNames(`${prefix}--tabs__nav`),
      leftOverflowButtonClasses: classNames({
        [`${prefix}--tab--overflow-nav-button`]: this.state.horizontalOverflow,
        [`${prefix}--tab--overflow-nav-button--hidden`]:
          !this.state.horizontalOverflow || !this.state.tablistScrollLeft,
      }),
      rightOverflowButtonClasses: classNames({
        [`${prefix}--tab--overflow-nav-button`]: this.state.horizontalOverflow,
        [`${prefix}--tab--overflow-nav-button--hidden`]:
          !this.state.horizontalOverflow ||
          this.state.tablistScrollLeft + this.state.tablistClientWidth ===
            this.state.tablistScrollWidth,
      }),
    };

    return (
      <>
        <div
          {...other}
          className={classes.tabs}
          role={role}
          onScroll={this.handleScroll}>
          <button className={classes.leftOverflowButtonClasses}>
            <ChevronLeft16 />
          </button>
          <ul role="tablist" className={classes.tablist} ref={this.tablist}>
            {tabsWithProps}
          </ul>
          <button className={classes.rightOverflowButtonClasses}>
            <ChevronRight16 />
          </button>
        </div>
        {tabContentWithProps}
      </>
    );
  }
}
