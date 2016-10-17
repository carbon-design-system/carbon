import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../elements/Icon';
import TabContent from './TabContent';
import '@console/bluemix-components/consumables/scss/components/tabs/tabs.scss';

class Tabs extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    firstSelectedLabel: PropTypes.string,
    hidden: PropTypes.bool,
    href: PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    triggerHref: PropTypes.string,
  }

  static defaultProps = {
    href: '#',
    triggerHref: '#',
  }

  state = {
    dropdownHidden: true,
    selected: 0,
    selectedLabel: React.Children.toArray(this.props.children)[0].props.label,
  }

  getTabs() {
    return React.Children.map(this.props.children, (tab) => tab);
  }

  handleTabClick = (index, label, evt) => {
    evt.preventDefault();
    this.setState({
      selected: index,
      selectedLabel: label,
      dropdownHidden: !this.state.dropdownHidden,
    });
  }

  handleTabAnchorFocus = (index) => {
    const tabCount = React.Children.count(this.props.children) - 1;

    if (index < 0) {
      const tab = this.refs[`tab${tabCount}`];
      ReactDOM.findDOMNode(tab.refs.tabAnchor).focus();
      this.setState({ selected: tabCount });
    } else if (index > tabCount) {
      const tab = this.refs.tab0;
      ReactDOM.findDOMNode(tab.refs.tabAnchor).focus();
      this.setState({ selected: 0 });
    } else {
      const tab = this.refs[`tab${index}`];
      ReactDOM.findDOMNode(tab.refs.tabAnchor).focus();
      this.setState({ selected: index });
    }
  }

  handleDropdownClick = () => {
    this.setState({
      dropdownHidden: !this.state.dropdownHidden,
    });
  }


  render() {
    const {
      className,
      triggerHref,
      ...other,
    } = this.props;

    const classes = {
      tabs: classNames(
        'bx--tabs',
        className,
      ),
      tablist: classNames(
        'bx--tabs__nav',
        { 'bx--tabs--hidden': this.state.dropdownHidden },
      ),
    };

    const tabsWithProps = this.getTabs()
      .map((tab, index) => {
        const newTab = React.cloneElement(tab, {
          index,
          selected: index === this.state.selected,
          handleTabClick: this.handleTabClick,
          handleTabAnchorFocus: this.handleTabAnchorFocus,
          ref: `tab${index}`,
        });

        return newTab;
      });

    const tabContentWithProps = React.Children.map(tabsWithProps, (tab) => {
      const {
        children,
        selected,
      } = tab.props;

      return (
        <TabContent
          className="tab-content"
          hidden={!selected}
          selected={selected}
        >
          {children}
        </TabContent>
      );
    });

    const props = {
      nav: {
        className: classes.tabs,
        role: 'navigation',
      },
      trigger: {
        div: {
          className: 'bx--tabs__trigger',
          onClick: this.handleDropdownClick,
        },
        anchor: {
          className: 'bx--tabs__trigger-text',
          href: triggerHref,
          onClick: this.handleDropdownClick,
        },
      },
      tablist: {
        className: classes.tablist,
        role: 'tablist',
      },
    };

    return (
      <div>
        <nav {...other} {...props.nav}>
          <div {...props.trigger.div}>
            <a {...props.trigger.anchor}>{this.state.selectedLabel}</a>
            <Icon description="show menu options" name="down-arrow" />
          </div>
          <ul {...props.tablist}>
            {tabsWithProps}
          </ul>
        </nav>
        {tabContentWithProps}
      </div>
    );
  }
}

export default Tabs;
