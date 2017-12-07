import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

export default class AccordionItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string,
    open: PropTypes.bool,
    onClick: PropTypes.func,
    onHeadingClick: PropTypes.func,
  };

  static defaultProps = {
    title: 'title',
    open: false,
    onClick: () => {},
    onHeadingClick: () => {},
  };

  state = {
    open: this.props.open,
  };

  componentWillReceiveProps({ open }) {
    if (open !== this.props.open) {
      this.setState({ open });
    }
  }

  handleClick = evt => {
    this.props.onClick(evt);
  };

  handleHeadingClick = evt => {
    const open = !this.state.open;
    this.setState({ open });
    this.props.onHeadingClick({ isOpen: open, event: evt });
  };

  handleKeyPress = evt => {
    const isKeyPressTarget = evt.target === evt.currentTarget;
    const isValidKeyPress = [13, 32].indexOf(evt.which) !== -1;

    if (isKeyPressTarget && isValidKeyPress) {
      this.handleHeadingClick(evt);
    }
  };

  render() {
    const {
      className,
      title,
      children,
      onClick, // eslint-disable-line no-unused-vars
      onHeadingClick, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classNames = classnames(
      {
        'bx--accordion__item--active': this.state.open,
      },
      'bx--accordion__item',
      className
    );
    return (
      <li
        className={classNames}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        role="presentation"
        {...other}>
        <button
          type="button"
          className="bx--accordion__heading"
          role="tab"
          onClick={this.handleHeadingClick}>
          <Icon
            className="bx--accordion__arrow"
            name="chevron--right"
            description="Expand/Collapse"
          />
          <p className="bx--accordion__title">{title}</p>
        </button>
        <div className="bx--accordion__content">{children}</div>
      </li>
    );
  }
}
