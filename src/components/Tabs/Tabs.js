import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import TabContent from '../TabContent';

export default class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    firstSelectedLabel: PropTypes.string,
    hidden: PropTypes.bool,
    href: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
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
    selectedLabel: React.Children.toArray(this.props.children)[0].props.label,
  };

  componentWillReceiveProps({ selected }) {
    if (selected !== this.props.selected) {
      this.setState({ selected });
    }
  }

  getTabs() {
    return React.Children.map(this.props.children, tab => tab);
  }

  // following functions (handle*) are Props on Tab.js, see Tab.js for parameters
  handleTabClick = (index, label, evt) => {
    evt.preventDefault();
    this.setState({
      selected: index,
      selectedLabel: label,
      dropdownHidden: !this.state.dropdownHidden,
    });
  };

  handleTabKeyDown = (index, label, evt) => {
    const key = evt.key || evt.which;

    if (key === 'Enter' || key === 13 || key === ' ' || key === 32) {
      this.setState({
        selected: index,
        selectedLabel: label,
        dropdownHidden: !this.state.dropdownHidden,
      });
    }
  };

  handleTabAnchorFocus = index => {
    const tabCount = React.Children.count(this.props.children) - 1;

    if (index < 0) {
      const tab = this.refs[`tab${tabCount}`];
      tab.refs.tabAnchor.focus();
      this.setState({ selected: tabCount });
    } else if (index > tabCount) {
      const tab = this.refs.tab0;
      tab.refs.tabAnchor.focus();
      this.setState({ selected: 0 });
    } else {
      const tab = this.refs[`tab${index}`];
      tab.refs.tabAnchor.focus();
      this.setState({ selected: index });
    }
  };

  handleDropdownClick = () => {
    this.setState({
      dropdownHidden: !this.state.dropdownHidden,
    });
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
        ref: `tab${index}`,
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
              {this.state.selectedLabel}
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
