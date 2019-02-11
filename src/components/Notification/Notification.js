/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import {
  iconClose,
  iconCheckmarkSolid,
  iconErrorSolid,
  iconInfoSolid,
  iconWarningSolid,
} from 'carbon-icons';
import { settings } from 'carbon-components';
import Icon from '../Icon';
// temporary workaround for a11y warning icon. TODO: for @carbon/icons-react
import a11yIconWarningSolid from './a11yIconWarningSolid';
import Close16 from '@carbon/icons-react/lib/close/16';
import { componentsX } from '../../internal/FeatureFlags';

const { prefix } = settings;

export class NotificationButton extends Component {
  static propTypes = {
    /**
     * Specify an optional className to be applied to the notification button
     */
    className: PropTypes.string,

    /**
     * Specify a label to be read by screen readers on the notification button
     */
    ariaLabel: PropTypes.string,

    /**
     * Optional prop to specify the type of the Button
     */
    type: PropTypes.string,

    /**
     * Provide a description for "close" icon that can be read by screen readers
     */
    iconDescription: PropTypes.string,

    /**
     * Specify an optional icon for the Button through an object representing the SVG data of the icon,
     * if something but regular "close" icon is desirable
     */
    icon: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      viewBox: PropTypes.string.isRequired,
      svgData: PropTypes.object.isRequired,
    }),

    /**
     * Specify an optional icon for the Button through a string,
     * if something but regular "close" icon is desirable
     */
    name: PropTypes.string,

    /**
     * Specify the notification type
     */
    notificationType: PropTypes.oneOf(['toast', 'inline']),
  };

  static defaultProps = {
    ariaLabel: 'close notificaion',
    notificationType: 'toast',
    type: 'button',
    iconDescription: 'close icon',
  };

  render() {
    const {
      ariaLabel,
      className,
      iconDescription,
      type,
      icon,
      name,
      notificationType,
      ...other
    } = this.props;

    const buttonClasses = classNames(
      {
        [`${prefix}--toast-notification__close-button`]:
          notificationType === 'toast',
        [`${prefix}--inline-notification__close-button`]:
          notificationType === 'inline',
      },
      className
    );

    const iconClasses = classNames({
      [`${prefix}--toast-notification__close-icon`]:
        notificationType === 'toast',
      [`${prefix}--inline-notification__close-icon`]:
        notificationType === 'inline',
    });

    return (
      <button {...other} type={type} className={buttonClasses}>
        {componentsX ? (
          <Close16 className={iconClasses} aria-label={ariaLabel} />
        ) : (
          <Icon
            description={iconDescription}
            className={iconClasses}
            aria-label={ariaLabel}
            icon={!icon && !name ? iconClose : icon}
            name={name}
          />
        )}
      </button>
    );
  }
}

export class NotificationTextDetails extends Component {
  static propTypes = {
    /**
     * Pass in the children that will be rendered in NotificationTextDetails
     */
    children: PropTypes.node,
    /**
     * Specify the title
     */
    title: PropTypes.string,
    /**
     * Specify the sub-title
     */
    subtitle: PropTypes.node,
    /**
     * Specify the caption
     */
    caption: PropTypes.node,
    /**
     * Specify the notification type
     */
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
        <div {...other} className={`${prefix}--toast-notification__details`}>
          <h3 className={`${prefix}--toast-notification__title`}>{title}</h3>
          <div className={`${prefix}--toast-notification__subtitle`}>
            {subtitle}
          </div>
          <div className={`${prefix}--toast-notification__caption`}>
            {caption}
          </div>
          {this.props.children}
        </div>
      );
    }

    if (notificationType === 'inline') {
      return (
        <div
          {...other}
          className={`${prefix}--inline-notification__text-wrapper`}>
          <p className={`${prefix}--inline-notification__title`}>{title}</p>
          <div className={`${prefix}--inline-notification__subtitle`}>
            {subtitle}
          </div>
          {this.props.children}
        </div>
      );
    }
  }
}

export class ToastNotification extends Component {
  static propTypes = {
    /**
     * Pass in the children that will be rendered within the ToastNotification
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the notification box
     */
    className: PropTypes.string,

    /**
     * Specify what state the notification represents
     */
    kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,

    /**
     * Specify the title
     */
    title: PropTypes.string.isRequired,

    /**
     * Specify the sub-title
     */
    subtitle: PropTypes.node.isRequired,

    /**
     * By default, this value is "alert". You can also provide an alternate
     * role if it makes sense from the accessibility-side
     */
    role: PropTypes.string.isRequired,

    /**
     * Specify the caption
     */
    caption: PropTypes.node,

    /**
     * Provide a function that is called when menu is closed
     */
    onCloseButtonClick: PropTypes.func,

    /**
     * Provide a description for "close" icon that can be read by screen readers
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * By default, this value is "toast". You can also provide an alternate type
     * if it makes sense for the underlying `<NotificationTextDetails>` and `<NotificationButton>`
     */
    notificationType: PropTypes.string,

    /**
     * Specify the close button should be disabled, or not
     */
    hideCloseButton: PropTypes.bool,

    /**
     * Specify an optional duration the notification should be closed in
     */
    timeout: PropTypes.number,
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
    hideCloseButton: false,
    timeout: 0,
  };

  state = {
    open: true,
  };

  componentDidMount() {
    if (this.props.timeout) {
      setTimeout(() => {
        this.handleCloseButtonClick();
      }, this.props.timeout);
    }
  }

  handleCloseButtonClick = evt => {
    this.setState({ open: false });
    this.props.onCloseButtonClick(evt);
  };

  useIcon = kindProp =>
    ({
      error: iconErrorSolid,
      success: iconCheckmarkSolid,
      warning: iconWarningSolid,
      info: iconInfoSolid,
    }[kindProp]);

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
      hideCloseButton,
      ...other
    } = this.props;

    const classes = classNames(
      `${prefix}--toast-notification`,
      {
        [`${prefix}--toast-notification--${this.props.kind}`]: this.props.kind,
      },
      className
    );

    return (
      <div {...other} role={role} kind={kind} className={classes}>
        <NotificationTextDetails
          title={title}
          subtitle={subtitle}
          caption={caption}
          notificationType={notificationType}>
          {this.props.children}
        </NotificationTextDetails>
        {!hideCloseButton && (
          <NotificationButton
            iconDescription={iconDescription}
            notificationType={notificationType}
            onClick={this.handleCloseButtonClick}
          />
        )}
      </div>
    );
  }
}

export class InlineNotification extends Component {
  static propTypes = {
    /**
     * Pass in the children that will be rendered within the InlineNotification
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the notification box
     */
    className: PropTypes.string,

    /**
     * Specify what state the notification represents
     */
    kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,

    /**
     * Specify the title
     */
    title: PropTypes.string.isRequired,

    /**
     * Specify the sub-title
     */
    subtitle: PropTypes.node.isRequired,

    /**
     * By default, this value is "alert". You can also provide an alternate
     * role if it makes sense from the accessibility-side
     */
    role: PropTypes.string.isRequired,

    /**
     * Provide a function that is called when menu is closed
     */
    onCloseButtonClick: PropTypes.func,

    /**
     * Provide a description for "close" icon that can be read by screen readers
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * By default, this value is "inline". You can also provide an alternate type
     * if it makes sense for the underlying `<NotificationTextDetails>` and `<NotificationButton>`
     */
    notificationType: PropTypes.string,

    /**
     * Specify the close button should be disabled, or not
     */
    hideCloseButton: PropTypes.bool,
  };

  static defaultProps = {
    role: 'alert',
    notificationType: 'inline',
    iconDescription: 'closes notification',
    onCloseButtonClick: () => {},
    hideCloseButton: false,
  };

  state = {
    open: true,
  };

  handleCloseButtonClick = evt => {
    this.setState({ open: false });
    this.props.onCloseButtonClick(evt);
  };

  useIcon = kindProp =>
    ({
      error: iconErrorSolid,
      success: iconCheckmarkSolid,
      warning: iconWarningSolid,
      info: iconInfoSolid,
    }[kindProp]);

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
      hideCloseButton,
      ...other
    } = this.props;

    const classes = classNames(
      `${prefix}--inline-notification`,
      {
        [`${prefix}--inline-notification--${this.props.kind}`]: this.props.kind,
      },
      className
    );

    const NotificationIcon = kind => {
      switch (kind) {
        case 'warning':
          return a11yIconWarningSolid(prefix, notificationType);
        default:
          return (
            <Icon
              description={this.props.iconDescription}
              className={`${prefix}--inline-notification__icon`}
              aria-label="close"
              icon={this.useIcon(kind)}
            />
          );
      }
    };

    return (
      <div {...other} role={role} kind={kind} className={classes}>
        <div className={`${prefix}--inline-notification__details`}>
          {NotificationIcon(kind)}
          <NotificationTextDetails
            title={title}
            subtitle={subtitle}
            notificationType={notificationType}>
            {this.props.children}
          </NotificationTextDetails>
        </div>
        {!hideCloseButton && (
          <NotificationButton
            iconDescription={iconDescription}
            notificationType={notificationType}
            onClick={this.handleCloseButtonClick}
          />
        )}
      </div>
    );
  }
}

// Deprecated

export default class Notification extends Component {
  static propTypes = {
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the notification box
     */
    className: PropTypes.string,

    /**
     * Specify what state the notification represents
     */
    kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,

    /**
     * Specify the title
     */
    title: PropTypes.string.isRequired,

    /**
     * Specify the sub-title
     */
    subtitle: PropTypes.string.isRequired,

    /**
     * Specify the caption
     */
    caption: PropTypes.string,

    /**
     * Provide a function that is called when menu is closed
     */
    onCloseButtonClick: PropTypes.func,

    /**
     * Provide a description for "close" icon that can be read by screen readers
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * Specify the close button should be disabled, or not
     */
    hideCloseButton: PropTypes.bool,
  };

  static defaultProps = {
    onCloseButtonClick: () => {},
    iconDescription: 'closes notification',
    title: 'Provide a title',
    subtitle: 'Provide a subtitle',
    hideCloseButton: false,
  };

  state = {
    open: true,
  };

  handleCloseButtonClick = evt => {
    this.setState({ open: false });
    this.props.onCloseButtonClick(evt);
  };

  useIcon = kindProp =>
    ({
      error: iconErrorSolid,
      info: iconInfoSolid,
      success: iconCheckmarkSolid,
      warning: iconWarningSolid,
    }[kindProp]);

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
      hideCloseButton,
      ...other
    } = this.props;

    const notificationClasses = {
      toast: classNames(
        `${prefix}--toast-notification`,
        {
          [`${prefix}--toast-notification--${this.props.kind}`]: this.props
            .kind,
        },
        className
      ),
      inline: classNames(
        `${prefix}--inline-notification`,
        {
          [`${prefix}--inline-notification--${this.props.kind}`]: this.props
            .kind,
        },
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
        {!hideCloseButton && (
          <NotificationButton
            notificationType="toast"
            onClick={this.handleCloseButtonClick}
          />
        )}
      </div>
    );

    const inlineHTML = (
      <div
        {...other}
        role="alert"
        kind={kind}
        className={notificationClasses.inline}>
        <div className={`${prefix}--inline-notification__details`}>
          <Icon
            description={this.props.iconDescription}
            className={`${prefix}--inline-notification__icon`}
            aria-label="close"
            icon={this.useIcon(kind)}
          />
          <NotificationTextDetails
            title={title}
            subtitle={subtitle}
            notificationType="inline"
          />
        </div>
        {!hideCloseButton && (
          <NotificationButton
            notificationType="inline"
            onClick={this.handleCloseButtonClick}
          />
        )}
      </div>
    );

    return caption ? toastHTML : inlineHTML;
  }
}
