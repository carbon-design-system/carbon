/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';
import {
  Close20,
  ErrorFilled20,
  CheckmarkFilled20,
  WarningFilled20,
  InformationFilled20,
} from '@carbon/icons-react';

import Button from '../Button';

const { prefix } = settings;

export function NotificationActionButton({
  children,
  className: customClassName,
  onClick,
  ...rest
}) {
  const className = cx(
    customClassName,
    `${prefix}--inline-notification__action-button`
  );

  return (
    <Button
      className={className}
      kind="ghost"
      onClick={onClick}
      size="small"
      {...rest}>
      {children}
    </Button>
  );
}

NotificationActionButton.propTypes = {
  /**
   * Specify an optional className to be applied to the notification action button
   */
  className: PropTypes.string,

  /**
   * Specify the content of the notification action button.
   */
  children: PropTypes.node,

  /**
   * Optionally specify a click handler for the notification action button.
   */
  onClick: PropTypes.func,
};

export function NotificationButton({
  ariaLabel,
  className,
  iconDescription,
  type,
  renderIcon: IconTag,
  name,
  notificationType,
  ...rest
}) {
  const buttonClassName = cx(className, {
    [`${prefix}--toast-notification__close-button`]:
      notificationType === 'toast',
    [`${prefix}--inline-notification__close-button`]:
      notificationType === 'inline',
  });
  const iconClassName = cx({
    [`${prefix}--toast-notification__close-icon`]: notificationType === 'toast',
    [`${prefix}--inline-notification__close-icon`]:
      notificationType === 'inline',
  });

  return (
    <button
      {...rest}
      type={type}
      aria-label={iconDescription}
      title={iconDescription}
      className={buttonClassName}>
      {IconTag && (
        <IconTag aria-label={ariaLabel} className={iconClassName} name={name} />
      )}
    </button>
  );
}

NotificationButton.propTypes = {
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
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

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

NotificationButton.defaultProps = {
  ariaLabel: 'close notification', // TODO: deprecate this prop
  notificationType: 'toast',
  type: 'button',
  iconDescription: 'close icon',
  renderIcon: Close20,
};

export function NotificationTextDetails({
  title,
  subtitle,
  caption,
  notificationType,
  children,
  ...rest
}) {
  if (notificationType === 'toast') {
    return (
      <div {...rest} className={`${prefix}--toast-notification__details`}>
        <h3 className={`${prefix}--toast-notification__title`}>{title}</h3>
        <div className={`${prefix}--toast-notification__subtitle`}>
          {subtitle}
        </div>
        <div className={`${prefix}--toast-notification__caption`}>
          {caption}
        </div>
        {children}
      </div>
    );
  }

  if (notificationType === 'inline') {
    return (
      <div {...rest} className={`${prefix}--inline-notification__text-wrapper`}>
        <p className={`${prefix}--inline-notification__title`}>{title}</p>
        <div className={`${prefix}--inline-notification__subtitle`}>
          {subtitle}
        </div>
        {children}
      </div>
    );
  }
}

NotificationTextDetails.propTypes = {
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

NotificationTextDetails.defaultProps = {
  title: 'title',
  caption: 'caption',
  notificationType: 'toast',
};

const iconTypes = {
  error: ErrorFilled20,
  success: CheckmarkFilled20,
  warning: WarningFilled20,
  info: InformationFilled20,
};

function NotificationIcon({ iconDescription, kind, notificationType }) {
  const IconForKind = iconTypes[kind];
  if (!IconForKind) {
    return null;
  }
  return (
    <IconForKind
      className={`${prefix}--${notificationType}-notification__icon`}>
      <title>{iconDescription}</title>
    </IconForKind>
  );
}

NotificationIcon.propTypes = {
  notificationType: PropTypes.oneOf(['inline', 'toast']).isRequired,
  kind: PropTypes.oneOf(['error', 'success', 'warning', 'info']).isRequired,
  iconDescription: PropTypes.string.isRequired,
};

export function ToastNotification({
  role,
  notificationType,
  onCloseButtonClick,
  iconDescription,
  statusIconDescription,
  className,
  caption,
  subtitle,
  title,
  kind,
  lowContrast,
  hideCloseButton,
  children,
  timeout,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(true);
  const containerClassName = cx(className, {
    [`${prefix}--toast-notification`]: true,
    [`${prefix}--toast-notification--low-contrast`]: lowContrast,
    [`${prefix}--toast-notification--${kind}`]: kind,
  });

  function handleCloseButtonClick(event) {
    setIsOpen(false);
    onCloseButtonClick(event);
  }

  useEffect(() => {
    if (!timeout) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsOpen(false);
      onCloseButtonClick(event);
    }, timeout);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [onCloseButtonClick, timeout]);

  if (!isOpen) {
    return null;
  }

  return (
    <div {...rest} role={role} kind={kind} className={containerClassName}>
      <NotificationIcon
        notificationType={notificationType}
        kind={kind}
        iconDescription={statusIconDescription || `${kind} icon`}
      />
      <NotificationTextDetails
        title={title}
        subtitle={subtitle}
        caption={caption}
        notificationType={notificationType}>
        {children}
      </NotificationTextDetails>
      {!hideCloseButton && (
        <NotificationButton
          iconDescription={iconDescription}
          notificationType={notificationType}
          onClick={handleCloseButtonClick}
        />
      )}
    </div>
  );
}

ToastNotification.propTypes = {
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
   * Specify whether you are using the low contrast variant of the ToastNotification.
   */
  lowContrast: PropTypes.bool,

  /**
   * Specify the title
   */
  title: PropTypes.string.isRequired,

  /**
   * Specify the sub-title
   */
  subtitle: PropTypes.node,

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
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription: PropTypes.string.isRequired,

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

ToastNotification.defaultProps = {
  kind: 'error',
  title: 'provide a title',
  caption: 'provide a caption',
  role: 'alert',
  notificationType: 'toast',
  iconDescription: 'closes notification',
  onCloseButtonClick: () => {},
  hideCloseButton: false,
  timeout: 0,
};

export function InlineNotification({
  actions,
  role,
  notificationType,
  onCloseButtonClick,
  iconDescription,
  statusIconDescription,
  className,
  subtitle,
  title,
  kind,
  lowContrast,
  hideCloseButton,
  children,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(true);
  const containerClassName = cx(className, {
    [`${prefix}--inline-notification`]: true,
    [`${prefix}--inline-notification--low-contrast`]: lowContrast,
    [`${prefix}--inline-notification--${kind}`]: kind,
    [`${prefix}--inline-notification--hide-close-button`]: hideCloseButton,
  });

  function handleCloseButtonClick(event) {
    setIsOpen(false);
    onCloseButtonClick(event);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div {...rest} role={role} kind={kind} className={containerClassName}>
      <div className={`${prefix}--inline-notification__details`}>
        <NotificationIcon
          notificationType={notificationType}
          kind={kind}
          iconDescription={statusIconDescription || `${kind} icon`}
        />
        <NotificationTextDetails
          title={title}
          subtitle={subtitle}
          notificationType={notificationType}>
          {children}
        </NotificationTextDetails>
      </div>
      {actions}
      {!hideCloseButton && (
        <NotificationButton
          iconDescription={iconDescription}
          notificationType={notificationType}
          onClick={handleCloseButtonClick}
        />
      )}
    </div>
  );
}

InlineNotification.propTypes = {
  /**
   * Pass in the action nodes that will be rendered within the InlineNotification
   */
  actions: PropTypes.node,

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
   * Specify whether you are using the low contrast variant of the InlineNotification.
   */
  lowContrast: PropTypes.bool,

  /**
   * Specify the title
   */
  title: PropTypes.string.isRequired,

  /**
   * Specify the sub-title
   */
  subtitle: PropTypes.node,

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
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription: PropTypes.string.isRequired,

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

InlineNotification.defaultProps = {
  role: 'alert',
  notificationType: 'inline',
  iconDescription: 'closes notification',
  onCloseButtonClick: () => {},
  hideCloseButton: false,
};
