/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { ChevronDownGlyph } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class Tabs extends React.Component {
  static propTypes = {
    /**
     * Specify the text to be read by screen-readers when visiting the <Tabs>
     * component
     */
    ariaLabel: PropTypes.string,

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
    hidden: PropTypes.bool,

    /**
     * By default, this value is "navigation". You can also provide an alternate
     * role if it makes sense from the accessibility-side
     */
    role: PropTypes.string.isRequired,

    /**
     * Provide the type of Tab
     */
    type: PropTypes.oneOf(['default', 'container']),

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
     * Provide a string that represents the `href` for the triggered <Tab>
     */
    triggerHref: PropTypes.string.isRequired,

    /**
     * Optionally provide an index for the currently selected <Tab>
     */
    selected: PropTypes.number,

    /**
     * Provide a description that is read out when a user visits the caret icon
     * for the dropdown menu of items
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * Provide a className that is applied to the <TabContent> components
     */
    tabContentClassName: PropTypes.string,
  };

  static defaultProps = {
    iconDescription: 'show menu options',
    role: 'navigation',
    type: 'default',
    triggerHref: '#',
    selected: 0,
    ariaLabel: 'listbox',
  };

  state = {
    dropdownHidden: true,
  };

  static getDerivedStateFromProps({ selected }, state) {
    const { prevSelected } = state;
    return prevSelected === selected
      ? null
      : {
          selected,
          prevSelected: selected,
        };
  }

  getTabs() {
    return React.Children.map(this.props.children, tab => tab);
  }

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
  handleTabClick = onSelectionChange => {
    return (index, evt) => {
      evt.preventDefault();

      this.selectTabAt(index, onSelectionChange);
      this.setState({
        dropdownHidden: true,
      });
    };
  };

  handleTabKeyDown = onSelectionChange => {
    return (index, evt) => {
      const key = evt.key || evt.which;

      if (key === 'Enter' || key === 13 || key === ' ' || key === 32) {
        this.selectTabAt(index, onSelectionChange);
        this.setState({
          dropdownHidden: true,
        });
      }
    };
  };

  handleTabAnchorFocus = onSelectionChange => {
    return index => {
      const tabCount = React.Children.count(this.props.children) - 1;
      let tabIndex = index;
      if (index < 0) {
        tabIndex = tabCount;
      } else if (index > tabCount) {
        tabIndex = 0;
      }

      const tab = this.getTabAt(tabIndex);

      if (tab) {
        this.selectTabAt(tabIndex, onSelectionChange);
        if (tab.tabAnchor) {
          tab.tabAnchor.focus();
        }
      }
    };
  };

  handleDropdownClick = () => {
    this.setState({
      dropdownHidden: !this.state.dropdownHidden,
    });
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
      ariaLabel,
      iconDescription,
      className,
      triggerHref,
      role,
      type,
      onSelectionChange,
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
      const tabPanelIndex = index === this.state.selected ? 0 : -1;
      const tabIndex = !this.state.dropdownHidden ? 0 : tabPanelIndex;
      const newTab = React.cloneElement(tab, {
        index,
        selected: index === this.state.selected,
        handleTabClick: this.handleTabClick(onSelectionChange),
        handleTabAnchorFocus: this.handleTabAnchorFocus(onSelectionChange),
        tabIndex,
        ref: e => {
          this.setTabAt(index, e);
        },
        handleTabKeyDown: this.handleTabKeyDown(onSelectionChange),
      });

      return newTab;
    });

    const tabContentWithProps = React.Children.map(tabsWithProps, tab => {
      const { children, selected, renderContent: TabContent } = tab.props;

      return (
        <TabContent
          className={tabContentClassName}
          aria-hidden={!selected}
          hidden={!selected}
          selected={selected}>
          {children}
        </TabContent>
      );
    });

    const classes = {
      tabs: classNames(`${prefix}--tabs`, className, {
        [`${prefix}--tabs--container`]: type === 'container',
      }),
      tablist: classNames(`${prefix}--tabs__nav`, {
        [`${prefix}--tabs__nav--hidden`]: this.state.dropdownHidden,
      }),
    };

    const selectedTab = this.getTabAt(this.state.selected, true);
    const selectedLabel = selectedTab ? selectedTab.props.label : '';

    return (
      <>
        <div {...other} className={classes.tabs} role={role}>
          <div
            role="listbox"
            aria-label={ariaLabel}
            tabIndex={0}
            className={`${prefix}--tabs-trigger`}
            onClick={this.handleDropdownClick}
            onKeyPress={this.handleDropdownClick}>
            <a
              tabIndex={-1}
              className={`${prefix}--tabs-trigger-text`}
              href={triggerHref}
              onClick={this.handleDropdownClick}>
              {selectedLabel}
            </a>
            <ChevronDownGlyph aria-hidden="true">
              {iconDescription && <title>{iconDescription}</title>}
            </ChevronDownGlyph>
          </div>
          <ul role="tablist" className={classes.tablist}>
            {tabsWithProps}
          </ul>
        </div>
        {tabContentWithProps}
      </>
    );
  }
}
