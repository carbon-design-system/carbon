import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

export class NotificationButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    ariaLabel: PropTypes.string,
    type: PropTypes.string,
    iconDescription: PropTypes.string,
    name: PropTypes.string,
    notificationType: PropTypes.oneOf(['toast', 'inline']),
  };
  static defaultProps = {
    ariaLabel: 'close notificaion',
    notificationType: 'toast',
    type: 'button',
    iconDescription: 'close icon',
    name: 'close',
  };
  render() {
    const {
      ariaLabel,
      className,
      iconDescription,
      type,
      name,
      notificationType,
      ...other
    } = this.props;

    const buttonClasses = classNames(
      {
        'bx--toast-notification__close-button': notificationType === 'toast',
        'bx--inline-notification__close-button': notificationType === 'inline',
      },
      className
    );

    const iconClasses = classNames({
      'bx--toast-notification__icon': notificationType === 'toast',
      'bx--inline-notification__close-icon': notificationType === 'inline',
    });

    return (
      <button {...other} type={type} className={buttonClasses}>
        <Icon
          description={iconDescription}
          className={iconClasses}
          aria-label={ariaLabel}
          name={name}
        />
      </button>
    );
  }
}

export class NotificationTextDetails extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.node,
    caption: PropTypes.node,
    notificationType: PropTypes.oneOf(['toast', 'inline']),
  };

  static defaultProps = {
    title: 'title',
    subtitle: 'subtitle',
    caption: 'caption',
    notificationType: 'toast',
  };

  render() {
    const { title, subtitle, caption, notificationType, ...other } = this.props;

    if (notificationType === 'toast') {
      return (
        <div {...other} className="bx--toast-notification__details">
          <h3 className="bx--toast-notification__title">{title}</h3>
          <div className="bx--toast-notification__subtitle">{subtitle}</div>
          <div className="bx--toast-notification__caption">{caption}</div>
        </div>
      );
    }

    if (notificationType === 'inline') {
      return (
        <div {...other} className="bx--inline-notification__text-wrapper">
          <p className="bx--inline-notification__title">{title}</p>
          <div className="bx--inline-notification__subtitle">{subtitle}</div>
        </div>
      );
    }
  }
}

export class ToastNotification extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.node.isRequired,
    role: PropTypes.string.isRequired,
    caption: PropTypes.node,
    onCloseButtonClick: PropTypes.func,
    iconDescription: PropTypes.string.isRequired,
    notificationType: PropTypes.string,
  };

  static defaultProps = {
    kind: 'error',
    title: 'provide a title',
    subtitle: 'provide a subtitle',
    caption: 'provide a caption',
    role: 'alert',
    notificationType: 'toast',
    iconDescription: 'closes notification',
    onCloseButtonClick: () => {},
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
      role,
      notificationType,
      onCloseButtonClick, // eslint-disable-line
      iconDescription, // eslint-disable-line
      className,
      caption,
      subtitle,
      title,
      kind,
      ...other
    } = this.props;

    const classes = classNames(
      'bx--toast-notification',
      { [`bx--toast-notification--${this.props.kind}`]: this.props.kind },
      className
    );

    return (
      <div {...other} role={role} kind={kind} className={classes}>
        <NotificationTextDetails
          title={title}
          subtitle={subtitle}
          caption={caption}
          notificationType={notificationType}
        />
        <NotificationButton
          iconDescription={iconDescription}
          notificationType={notificationType}
          onClick={this.handleCloseButtonClick}
        />
      </div>
    );
  }
}

export class InlineNotification extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.node.isRequired,
    role: PropTypes.string.isRequired,
    onCloseButtonClick: PropTypes.func,
    iconDescription: PropTypes.string.isRequired,
    notificationType: PropTypes.string,
  };

  static defaultProps = {
    role: 'alert',
    notificationType: 'inline',
    iconDescription: 'closes notification',
    onCloseButtonClick: () => {},
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
      role,
      notificationType,
      onCloseButtonClick, // eslint-disable-line
      iconDescription, // eslint-disable-line
      className,
      subtitle,
      title,
      kind,
      ...other
    } = this.props;

    const classes = classNames(
      'bx--inline-notification',
      { [`bx--inline-notification--${this.props.kind}`]: this.props.kind },
      className
    );

    return (
      <div {...other} role={role} kind={kind} className={classes}>
        <div className="bx--inline-notification__details">
          <Icon
            description={this.props.iconDescription}
            className="bx--inline-notification__icon"
            aria-label="close"
            name={this.useIconName(kind)}
          />
          <NotificationTextDetails
            title={title}
            subtitle={subtitle}
            notificationType={notificationType}
          />
        </div>
        <NotificationButton
          notificationType={notificationType}
          onClick={this.handleCloseButtonClick}
        />
      </div>
    );
  }
}

// Deprecated

export default class Notification extends Component {
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
    title: 'Provide a title',
    subtitle: 'Provide a subtitle',
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

    const toastHTML = (
      <div
        {...other}
        role="alert"
        kind={kind}
        className={notificationClasses.toast}>
        <NotificationTextDetails
          title={title}
          subtitle={subtitle}
          caption={caption}
          notificationType="toast"
        />
        <NotificationButton
          notificationType="toast"
          onClick={this.handleCloseButtonClick}
        />
      </div>
    );

    const inlineHTML = (
      <div
        {...other}
        role="alert"
        kind={kind}
        className={notificationClasses.inline}>
        <div className="bx--inline-notification__details">
          <Icon
            description={this.props.iconDescription}
            className="bx--inline-notification__icon"
            aria-label="close"
            name={this.useIconName(kind)}
          />
          <NotificationTextDetails
            title={title}
            subtitle={subtitle}
            notificationType="inline"
          />
        </div>
        <NotificationButton
          notificationType="inline"
          onClick={this.handleCloseButtonClick}
        />
      </div>
    );

    return caption ? toastHTML : inlineHTML;
  }
}
