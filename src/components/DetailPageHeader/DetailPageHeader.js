import PropTypes from 'prop-types';
import React, { Component, Children } from 'react';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import window from 'window-or-global';
import Breadcrumb from '../Breadcrumb';
import Tabs from '../Tabs';
import OverflowMenu from '../OverflowMenu';
import Icon from '../Icon';

export default class DetailPageHeader extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    role: PropTypes.string,
    statusColor: PropTypes.string,
    statusContent: PropTypes.node,
    statusText: PropTypes.string,
    hasTabs: PropTypes.bool,
    isScrolled: PropTypes.bool,
    isScrollingDownward: PropTypes.bool,
  };

  static defaultProps = {
    title: 'Provide a title',
    statusText: 'Running',
    role: 'banner', // a11y compliance
    hasTabs: false,
  };

  state = {
    isScrolled: this.props.isScrolled || false,
    isScrollingDownward: this.props.isScrollingDownward || false,
    lastPosition: 0,
  };

  componentDidMount() {
    this._debouncedScroll = debounce(this.handleScroll, 25);
    window.addEventListener('scroll', this._debouncedScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isScrolled !== this.props.isScrolled) {
      this.setState({ isScrolled: nextProps.isScrolled });
    }

    if (nextProps.isScrollingDownward !== this.props.isScrollingDownward) {
      this.setState({ isScrollingDownward: nextProps.isScrollingDownward });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._debouncedScroll);
  }

  handleScroll = () => {
    const { lastPosition } = this.state;

    const currentPosition = window.pageYOffset || 0;

    if (currentPosition > 86) {
      if (currentPosition > lastPosition) {
        this.setState({
          isScrolled: true,
          isScrollingDownward: true,
          lastPosition: currentPosition,
        });
      } else {
        this.setState({
          isScrolled: true,
          isScrollingDownward: false,
          lastPosition: currentPosition,
        });
      }
    } else {
      this.setState({
        isScrolled: false,
        isScrollingDownward: false,
        lastPosition: currentPosition,
      });
    }
  };
  render() {
    const {
      children,
      title,
      hasTabs,
      statusColor,
      statusContent,
      statusText,
      ...other
    } = this.props;

    const { isScrolled, isScrollingDownward } = this.state;

    const defaultIcon = (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path fill="#D8D8D8" d="M0 0h24v24H0z" fillRule="evenodd" />
      </svg>
    );

    const withTabs = hasTabs
      ? 'bx--detail-page-header--with-tabs'
      : 'bx--detail-page-header--no-tabs';

    const scrolled = isScrollingDownward
      ? 'bx--detail-page-header--scroll'
      : null;

    const classNames = classnames('bx--detail-page-header', withTabs, scrolled);

    let breadcrumb;
    let tabs;
    let overflow;
    let icon;

    Children.map(children, child => {
      if (child.type === Breadcrumb) {
        breadcrumb = child;
      }

      if (child.type === Tabs) {
        tabs = child;
      }

      if (child.type === OverflowMenu) {
        overflow = child;
      }

      if (child.type === Icon) {
        icon = child;
      }

      return null;
    });

    const statusStyles = {
      backgroundColor: statusColor,
    };

    icon = icon === undefined ? defaultIcon : icon;

    return (
      <header {...other} className={classNames} data-header-active={isScrolled}>
        <div className="bx--detail-page-header-content">
          {breadcrumb}
          <div className="bx--detail-page-header-title-container">
            <div className="bx--detail-page-header-icon-container">{icon}</div>
            <h1 className="bx--detail-page-header-title">{title}</h1>
            <div className="bx--detail-page-header-status-container">
              <div
                style={statusStyles}
                className="bx--detail-page-header-status-icon"
              />{' '}
              <span className="bx--detail-page-header-status-text">
                {statusText}
                {statusContent}
              </span>
            </div>
          </div>
          {tabs}
        </div>
        <div className="bx--detail-page-header-menu">{overflow}</div>
      </header>
    );
  }
}
