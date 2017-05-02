import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from './Icon';

class Notification extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    caption: PropTypes.string,
    onCloseButtonClick: PropTypes.func,
    iconDescription: PropTypes.string.isRequired,
  };

  static defaultProps = {
    onCloseButtonClick: () => {},
    iconDescription: 'closes notification',
  };

  state = {
    open: true,
  };

  handleCloseButtonClick = evt => {
    this.setState({ open: false });
    this.props.onCloseButtonClick(evt);
  };

  useIconName = kindProp => {
    const isSuccess = kindProp === 'success';
    return isSuccess ? 'checkmark--glyph' : `${kindProp}--glyph`;
  };

  render() {
    if (!this.state.open) {
      return null;
    }

    const {
      onCloseButtonClick, // eslint-disable-line
      iconDescription, // eslint-disable-line
      className,
      caption,
      subtitle,
      title,
      kind,
      ...other
    } = this.props;

    const notificationClasses = {
      toast: classNames(
        'bx--toast-notification',
        { [`bx--toast-notification--${this.props.kind}`]: this.props.kind },
        className
      ),
      inline: classNames(
        'bx--inline-notification',
        { [`bx--inline-notification--${this.props.kind}`]: this.props.kind },
        className
      ),
    };

    const commonProps = {
      alert: {
        role: 'alert',
        kind,
      },
      button: {
        type: 'button',
        onClick: this.handleCloseButtonClick,
      },
    };

    const toastHTML = (
      <div
        {...other}
        {...commonProps.alert}
        className={notificationClasses.toast}
      >
        <div className="bx--toast-notification__details">
          <h3 className="bx--toast-notification__title">{title}</h3>
          <p className="bx--toast-notification__subtitle">{subtitle}</p>
          <p className="bx--toast-notification__caption">{caption}</p>
        </div>
        <button
          {...commonProps.button}
          className="bx--toast-notification__close-button"
        >
          <Icon
            description={this.props.iconDescription}
            className="bx--toast-notification__icon"
            aria-label="close"
            name="close"
          />
        </button>
      </div>
    );

    const inlineHTML = (
      <div
        {...other}
        {...commonProps.alert}
        className={notificationClasses.inline}
      >
        <div className="bx--inline-notification__details">
          <Icon
            description={this.props.iconDescription}
            className="bx--inline-notification__icon"
            aria-label="close"
            name={this.useIconName(kind)}
          />
          <div className="bx--inline-notification__text-wrapper">
            <p className="bx--inline-notification__title">{title}</p>
            <p className="bx--inline-notification__subtitle">{subtitle}</p>
          </div>
        </div>
        <button
          {...commonProps.button}
          className="bx--inline-notification__close-button"
        >
          <Icon
            description={this.props.iconDescription}
            className="bx--inline-notification__close-icon"
            aria-label="close"
            name="close"
          />
        </button>
      </div>
    );

    return caption ? toastHTML : inlineHTML;
  }
}

export default Notification;
