import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import TabContent from '../TabContent';

export default class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    hidden: PropTypes.bool,
    href: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    /** Called whenever selection changes, with index of the tab that was selected */
    onSelectionChange: PropTypes.func,
    triggerHref: PropTypes.string.isRequired,
    selected: PropTypes.number,
    iconDescription: PropTypes.string.isRequired,
  };

  static defaultProps = {
    iconDescription: 'show menu options',
    role: 'navigation',
    href: '#',
    triggerHref: '#',
    selected: 0,
  };

  state = {
    dropdownHidden: true,
    selected: this.props.selected,
  };

  componentWillReceiveProps({ selected }) {
    this.selectTabAt(selected);
  }

  getTabs() {
    return React.Children.map(this.props.children, tab => tab);
  }

  getTabAt = index => {
    return (
      this[`tab${index}`] || React.Children.toArray(this.props.children)[index]
    );
  };

  setTabAt = (index, tabRef) => {
    this[`tab${index}`] = tabRef;
  };

  // following functions (handle*) are Props on Tab.js, see Tab.js for parameters
  handleTabClick = (index, label, evt) => {
    evt.preventDefault();
    this.selectTabAt(index);
    this.setState({
      dropdownHidden: !this.state.dropdownHidden,
    });
  };

  handleTabKeyDown = (index, label, evt) => {
    const key = evt.key || evt.which;

    if (key === 'Enter' || key === 13 || key === ' ' || key === 32) {
      this.selectTabAt(index);
      this.setState({
        dropdownHidden: !this.state.dropdownHidden,
      });
    }
  };

  handleTabAnchorFocus = index => {
    const tabCount = React.Children.count(this.props.children) - 1;
    let tabIndex = index;

    if (index < 0) {
      tabIndex = tabCount;
    } else if (index > tabCount) {
      tabIndex = 0;
    }

    const tab = this.getTabAt(tabIndex);

    if (tab) {
      this.selectTabAt(tabIndex);
      if (tab.tabAnchor) {
        tab.tabAnchor.focus();
      }
    }
  };

  handleDropdownClick = () => {
    this.setState({
      dropdownHidden: !this.state.dropdownHidden,
    });
  };

  selectTabAt = index => {
    if (this.state.selected !== index) {
      this.setState({
        selected: index,
      });
      if (this.props.onSelectionChange) {
        this.props.onSelectionChange(index);
      }
    }
  };

  render() {
    const {
      iconDescription,
      className,
      triggerHref,
      role,
      ...other
    } = this.props;

    const tabsWithProps = this.getTabs().map((tab, index) => {
      const newTab = React.cloneElement(tab, {
        index,
        selected: index === this.state.selected,
        handleTabClick: this.handleTabClick,
        handleTabAnchorFocus: this.handleTabAnchorFocus,
        ref: e => {
          this.setTabAt(index, e);
        },
        handleTabKeyDown: this.handleTabKeyDown,
      });

      return newTab;
    });

    const tabContentWithProps = React.Children.map(tabsWithProps, tab => {
      const { children, selected } = tab.props;

      return (
        <TabContent
          className="tab-content"
          hidden={!selected}
          selected={selected}>
          {children}
        </TabContent>
      );
    });

    const classes = {
      tabs: classNames('bx--tabs', className),
      tablist: classNames('bx--tabs__nav', {
        'bx--tabs__nav--hidden': this.state.dropdownHidden,
      }),
    };

    const selectedTab = this.getTabAt(this.state.selected);
    const selectedLabel = selectedTab ? selectedTab.props.label : '';

    return (
      <div>
        <nav {...other} className={classes.tabs} role={role}>
          <div
            role="listbox"
            tabIndex={0}
            className="bx--tabs-trigger"
            onClick={this.handleDropdownClick}
            onKeyPress={this.handleDropdownClick}>
            <a
              tabIndex={-1}
              className="bx--tabs-trigger-text"
              href={triggerHref}
              onClick={this.handleDropdownClick}>
              {selectedLabel}
            </a>
            <Icon description={iconDescription} name="caret--down" />
          </div>
          <ul role="tablist" className={classes.tablist}>
            {tabsWithProps}
          </ul>
        </nav>
        {tabContentWithProps}
      </div>
    );
  }
}
