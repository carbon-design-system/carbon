import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TabContent } from 'carbon-components-react';
import { ChevronDownGlyph } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

class Tabs extends React.Component {
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
     */
    hidden: PropTypes.bool,

    /**
     * By default, this value is "navigation". You can also provide an alternate
     * role if it makes sense from the accessibility-side
     */
    role: PropTypes.string.isRequired,

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
      const {
        children,
        selected,
        renderContent: Content = TabContent,
      } = tab.props;

      return (
        <Content
          className={tabContentClassName}
          aria-hidden={!selected}
          hidden={!selected}
          selected={selected}>
          {children}
        </Content>
      );
    });

    const classes = {
      tabs: classnames(`${prefix}--tabs`, className),
      tablist: classnames(`${prefix}--tabs__nav`, {
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
            <ChevronDownGlyph aria-hidden>
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

export default class WebsiteTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      displayTabsAtSmallerBreakpoints: false,
    };
    this.tabChildren = [];
    this.displayTabsAtSmallerBreakpoints = false;
  }

  /**
   * check browser width. checking to see if when need to display
   * tabs or the default dropdown while at a smaller screen size
   */
  updateDimensions = () => {
    let shouldShowTabs = false;
    if (window.innerWidth < 500) {
      if (this.tabChildren.length <= 2) {
        shouldShowTabs = true;
      }
    } else if (window.innerWidth < 1056) {
      if (this.tabChildren.length <= 3) {
        shouldShowTabs = true;
      }
    }
    this.setState({ displayTabsAtSmallerBreakpoints: shouldShowTabs });
  };

  updateTabChildren = () => {
    this.tabChildren = this.props.children.filter(child => {
      return child.$$typeof !== undefined;
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.updateTabChildren();
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    this.updateTabChildren();

    const classNames = classnames({
      'website-tabs': true,
      'bp-tabs-shown': this.state.displayTabsAtSmallerBreakpoints,
      'bp-tabs-not-shown': !this.state.displayTabsAtSmallerBreakpoints,
    });

    return (
      <div className="bx--row">
        <div className="bx--col-lg-12 bx--offset-lg-4 bx--no-gutter">
          <div className={classNames}>
            <Tabs>{this.tabChildren}</Tabs>
          </div>
        </div>
      </div>
    );
  }
}
