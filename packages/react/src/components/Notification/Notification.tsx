/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  type ReactNode,
  type MouseEvent,
  type ComponentType,
  type FunctionComponent,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import deprecate from '../../prop-types/deprecate';
import cx from 'classnames';
import {
  Close,
  ErrorFilled,
  CheckmarkFilled,
  WarningFilled,
  WarningAltFilled,
  InformationFilled,
  InformationSquareFilled,
} from '@carbon/icons-react';

import Button, { type ButtonProps } from '../Button';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useNoInteractiveChildren } from '../../internal/useNoInteractiveChildren';
import { keys, matches } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';

/**
 * Conditionally call a callback when the escape key is pressed
 * @param {node} ref - ref of the container element to scope the functionality to
 * @param {func} callback - function to be called
 * @param {bool} override - escape hatch to conditionally call the callback
 */
function useEscapeToClose(ref, callback, override = true) {
  const handleKeyDown = (event) => {
    // The callback should only be called when focus is on or within the container
    const elementContainsFocus =
      (ref.current && document.activeElement === ref.current) ||
      ref.current.contains(document.activeElement);

    if (matches(event, [keys.Escape]) && override && elementContainsFocus) {
      callback(event);
    }
  };

  useIsomorphicEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => document.removeEventListener('keydown', handleKeyDown, false);
  });
}

export interface NotificationActionButtonProps extends ButtonProps<'button'> {
  /**
   * Specify the content of the notification action button.
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the notification action button
   */
  className?: string;

  /**
   * Specify if the visual treatment of the button should be for an inline notification
   */
  inline?: boolean;

  /**
   * Optionally specify a click handler for the notification action button.
   */
  onClick?(): void;
}

export function NotificationActionButton({
  children,
  className: customClassName,
  onClick,
  inline,
  ...rest
}: NotificationActionButtonProps) {
  const prefix = usePrefix();
  const className = cx(customClassName, {
    [`${prefix}--actionable-notification__action-button`]: true,
  });

  return (
    <Button
      className={className}
      kind={inline ? 'ghost' : 'tertiary'}
      onClick={onClick}
      size="sm"
      {...rest}>
      {children}
    </Button>
  );
}

NotificationActionButton.propTypes = {
  /**
   * Specify the content of the notification action button.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the notification action button
   */
  className: PropTypes.string,

  /**
   * Specify if the visual treatment of the button should be for an inline notification
   */
  inline: PropTypes.bool,

  /**
   * Optionally specify a click handler for the notification action button.
   */
  onClick: PropTypes.func,
};

/**
 * NotificationButton
 * ==================
 */

export interface NotificationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specify an optional icon for the Button through a string,
   * if provided. However, regular "close" icon is preferred.
   */
  name?: string;

  /**
   * Specify the notification type
   */
  notificationType?: 'toast' | 'inline' | 'actionable';

  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   */
  renderIcon?:
    | ComponentType<{ className?: string; name?: string }>
    | FunctionComponent<{ className?: string; name?: string }>;
}

export function NotificationButton({
  'aria-label': ariaLabel,
  // @ts-expect-error: deprecated prop
  ariaLabel: deprecatedAriaLabel,
  className,
  type,
  renderIcon: IconTag,
  name,
  notificationType,
  ...rest
}: NotificationButtonProps) {
  const prefix = usePrefix();
  const buttonClassName = cx(className, {
    [`${prefix}--${notificationType}-notification__close-button`]:
      notificationType,
  });
  const iconClassName = cx({
    [`${prefix}--${notificationType}-notification__close-icon`]:
      notificationType,
  });

  return (
    <button
      {...rest}
      // eslint-disable-next-line react/button-has-type
      type={type}
      aria-label={deprecatedAriaLabel || ariaLabel}
      title={deprecatedAriaLabel || ariaLabel}
      className={buttonClassName}>
      {IconTag && <IconTag className={iconClassName} name={name} />}
    </button>
  );
}

NotificationButton.propTypes = {
  /**
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container note.
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),

  /**
   * Specify an optional className to be applied to the notification button
   */
  className: PropTypes.string,

  /**
   * Specify an optional icon for the Button through a string,
   * if something but regular "close" icon is desirable
   */
  name: PropTypes.string,

  /**
   * Specify the notification type
   */
  notificationType: PropTypes.oneOf(['toast', 'inline', 'actionable']),

  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Optional prop to specify the type of the Button
   */
  type: PropTypes.string,
};
NotificationButton.defaultProps = {
  ['aria-label']: 'close notification',
  notificationType: 'toast',
  type: 'button',
  renderIcon: Close,
};

/**
 * NotificationIcon
 * ================
 */

const iconTypes = {
  error: ErrorFilled,
  success: CheckmarkFilled,
  warning: WarningFilled,
  ['warning-alt']: WarningAltFilled,
  info: InformationFilled,
  ['info-square']: InformationSquareFilled,
};
export interface NotificationIconProps {
  iconDescription: string;
  kind:
    | 'error'
    | 'success'
    | 'warning'
    | 'warning-alt'
    | 'info'
    | 'info-square';
  notificationType: 'inline' | 'toast';
}

function NotificationIcon({
  iconDescription,
  kind,
  notificationType,
}: NotificationIconProps) {
  const prefix = usePrefix();
  const IconForKind = iconTypes[kind];
  if (!IconForKind) {
    return null;
  }
  return (
    <IconForKind
      className={`${prefix}--${notificationType}-notification__icon`}
      size={20}>
      <title>{iconDescription}</title>
    </IconForKind>
  );
}

NotificationIcon.propTypes = {
  iconDescription: PropTypes.string.isRequired,
  kind: PropTypes.oneOf([
    'error',
    'success',
    'warning',
    'warning-alt',
    'info',
    'info-square',
  ]).isRequired,
  notificationType: PropTypes.oneOf(['inline', 'toast']).isRequired,
};

/**
 * ToastNotification
 * =================
 */

export interface ToastNotificationProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Provide a description for "close" icon button that can be read by screen readers
   */
  'aria-label'?: string;

  /**
   * Specify the caption
   */
  caption?: string;

  /**
   * Specify the content
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the notification box
   */
  className?: string;

  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton?: boolean;

  /**
   * Specify what state the notification represents
   */
  kind:
    | 'error'
    | 'info'
    | 'info-square'
    | 'success'
    | 'warning'
    | 'warning-alt';

  /**
   * Specify whether you are using the low contrast variant of the ToastNotification.
   */
  lowContrast?: boolean;

  /**
   * Provide a function that is called when menu is closed
   */
  onClose?(event: MouseEvent): boolean | void;

  /**
   * Provide a function that is called when the close button is clicked
   */
  onCloseButtonClick(event: MouseEvent): void;

  /**
   * By default, this value is "status". You can also provide an alternate
   * role if it makes sense from the accessibility-side
   */
  role: 'alert' | 'log' | 'status';

  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription?: string;

  /**
   * Specify the subtitle
   */
  subtitle?: string;

  /**
   * Specify an optional duration the notification should be closed in
   */
  timeout?: number;

  /**
   * Specify the title
   */
  title?: string;
}

export function ToastNotification({
  ['aria-label']: ariaLabel,
  // @ts-expect-error: deprecated prop
  ariaLabel: deprecatedAriaLabel,
  role,
  onClose,
  onCloseButtonClick,
  statusIconDescription,
  className,
  children,
  kind,
  lowContrast,
  hideCloseButton,
  timeout,
  title,
  caption,
  subtitle,
  ...rest
}: ToastNotificationProps) {
  const [isOpen, setIsOpen] = useState(true);
  const prefix = usePrefix();
  const containerClassName = cx(className, {
    [`${prefix}--toast-notification`]: true,
    [`${prefix}--toast-notification--low-contrast`]: lowContrast,
    [`${prefix}--toast-notification--${kind}`]: kind,
  });

  const contentRef = useRef(null);
  useNoInteractiveChildren(contentRef);

  const handleClose = (evt) => {
    if (!onClose || onClose(evt) !== false) {
      setIsOpen(false);
    }
  };
  const ref = useRef(null);

  function handleCloseButtonClick(event: MouseEvent) {
    onCloseButtonClick(event);
    handleClose(event);
  }

  const savedOnClose = useRef(onClose);

  useEffect(() => {
    savedOnClose.current = onClose;
  });

  useEffect(() => {
    if (!timeout) {
      return;
    }

    const timeoutId = window.setTimeout((event) => {
      setIsOpen(false);
      if (savedOnClose.current) {
        savedOnClose.current(event);
      }
    }, timeout);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [timeout]);

  if (!isOpen) {
    return null;
  }

  return (
    <div ref={ref} {...rest} role={role} className={containerClassName}>
      <NotificationIcon
        notificationType="toast"
        kind={kind}
        iconDescription={statusIconDescription || `${kind} icon`}
      />
      <div
        ref={contentRef}
        className={`${prefix}--toast-notification__details`}>
        {title && (
          <div className={`${prefix}--toast-notification__title`}>{title}</div>
        )}
        {subtitle && (
          <div className={`${prefix}--toast-notification__subtitle`}>
            {subtitle}
          </div>
        )}
        {caption && (
          <div className={`${prefix}--toast-notification__caption`}>
            {caption}
          </div>
        )}
        {children}
      </div>
      {!hideCloseButton && (
        <NotificationButton
          notificationType="toast"
          onClick={handleCloseButtonClick}
          aria-hidden="true"
          aria-label={deprecatedAriaLabel || ariaLabel}
          tabIndex={-1}
        />
      )}
    </div>
  );
}

ToastNotification.propTypes = {
  /**
   * Provide a description for "close" icon button that can be read by screen readers
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Provide a description for "close" icon button that can be read by screen readers
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),

  /**
   * Specify the caption
   */
  caption: PropTypes.string,

  /**
   * Specify the content
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the notification box
   */
  className: PropTypes.string,

  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton: PropTypes.bool,

  /**
   * Specify what state the notification represents
   */
  kind: PropTypes.oneOf([
    'error',
    'info',
    'info-square',
    'success',
    'warning',
    'warning-alt',
  ]),

  /**
   * Specify whether you are using the low contrast variant of the ToastNotification.
   */
  lowContrast: PropTypes.bool,

  /**
   * Provide a function that is called when menu is closed
   */
  onClose: PropTypes.func,

  /**
   * Provide a function that is called when the close button is clicked
   */
  onCloseButtonClick: PropTypes.func,

  /**
   * By default, this value is "status". You can also provide an alternate
   * role if it makes sense from the accessibility-side
   */
  role: PropTypes.oneOf(['alert', 'log', 'status']),

  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription: PropTypes.string,

  /**
   * Specify the subtitle
   */
  subtitle: PropTypes.string,

  /**
   * Specify an optional duration the notification should be closed in
   */
  timeout: PropTypes.number,

  /**
   * Specify the title
   */
  title: PropTypes.string,
};
ToastNotification.defaultProps = {
  kind: 'error',
  role: 'status',
  onCloseButtonClick: () => {},
  hideCloseButton: false,
  timeout: 0,
};

/**
 * InlineNotification
 * ==================
 */

export interface InlineNotificationProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Provide a description for "close" icon button that can be read by screen readers
   */
  'aria-label'?: string;

  /**
   * Specify the content
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the notification box
   */
  className?: string;

  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton?: boolean;

  /**
   * Specify what state the notification represents
   */
  kind:
    | 'error'
    | 'info'
    | 'info-square'
    | 'success'
    | 'warning'
    | 'warning-alt';

  /**
   * Specify whether you are using the low contrast variant of the InlineNotification.
   */
  lowContrast?: boolean;

  /**
   * Provide a function that is called when menu is closed
   */
  onClose?(event: MouseEvent): boolean | void;

  /**
   * Provide a function that is called when the close button is clicked
   */
  onCloseButtonClick(event: MouseEvent): void;

  /**
   * By default, this value is "status". You can also provide an alternate
   * role if it makes sense from the accessibility-side.
   */
  role: 'alert' | 'log' | 'status';

  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription?: string;

  /**
   * Specify the subtitle
   */
  subtitle?: string;

  /**
   * Specify the title
   */
  title?: string;
}

export function InlineNotification({
  ['aria-label']: ariaLabel,
  children,
  title,
  subtitle,
  role,
  onClose,
  onCloseButtonClick,
  statusIconDescription,
  className,
  kind,
  lowContrast,
  hideCloseButton,
  ...rest
}: InlineNotificationProps) {
  const [isOpen, setIsOpen] = useState(true);
  const prefix = usePrefix();
  const containerClassName = cx(className, {
    [`${prefix}--inline-notification`]: true,
    [`${prefix}--inline-notification--low-contrast`]: lowContrast,
    [`${prefix}--inline-notification--${kind}`]: kind,
    [`${prefix}--inline-notification--hide-close-button`]: hideCloseButton,
  });

  const contentRef = useRef(null);
  useNoInteractiveChildren(contentRef);

  const handleClose = (evt) => {
    if (!onClose || onClose(evt) !== false) {
      setIsOpen(false);
    }
  };
  const ref = useRef(null);

  function handleCloseButtonClick(event) {
    onCloseButtonClick(event);
    handleClose(event);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div ref={ref} {...rest} role={role} className={containerClassName}>
      <div className={`${prefix}--inline-notification__details`}>
        <NotificationIcon
          notificationType="inline"
          kind={kind}
          iconDescription={statusIconDescription || `${kind} icon`}
        />
        <div
          ref={contentRef}
          className={`${prefix}--inline-notification__text-wrapper`}>
          {title && (
            <div className={`${prefix}--inline-notification__title`}>
              {title}
            </div>
          )}
          {subtitle && (
            <div className={`${prefix}--inline-notification__subtitle`}>
              {subtitle}
            </div>
          )}
          {children}
        </div>
      </div>
      {!hideCloseButton && (
        <NotificationButton
          notificationType="inline"
          onClick={handleCloseButtonClick}
          aria-hidden="true"
          aria-label={ariaLabel}
          tabIndex={-1}
        />
      )}
    </div>
  );
}

InlineNotification.propTypes = {
  /**
   * Provide a description for "close" icon button that can be read by screen readers
   */
  ['aria-label']: PropTypes.string,

  /**
   * Specify the content
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the notification box
   */
  className: PropTypes.string,

  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton: PropTypes.bool,

  /**
   * Specify what state the notification represents
   */
  kind: PropTypes.oneOf([
    'error',
    'info',
    'info-square',
    'success',
    'warning',
    'warning-alt',
  ]),

  /**
   * Specify whether you are using the low contrast variant of the InlineNotification.
   */
  lowContrast: PropTypes.bool,

  /**
   * Provide a function that is called when menu is closed
   */
  onClose: PropTypes.func,

  /**
   * Provide a function that is called when the close button is clicked
   */
  onCloseButtonClick: PropTypes.func,

  /**
   * By default, this value is "status". You can also provide an alternate
   * role if it makes sense from the accessibility-side.
   */
  role: PropTypes.oneOf(['alert', 'log', 'status']),

  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription: PropTypes.string,

  /**
   * Specify the subtitle
   */
  subtitle: PropTypes.string,

  /**
   * Specify the title
   */
  title: PropTypes.string,
};
InlineNotification.defaultProps = {
  kind: 'error',
  role: 'status',
  onCloseButtonClick: () => {},
  hideCloseButton: false,
};

/**
 * ActionableNotification
 * ======================
 */

export interface ActionableNotificationProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Pass in the action button label that will be rendered within the ActionableNotification.
   */
  actionButtonLabel?: string;

  /**
   * Provide a description for "close" icon button that can be read by screen readers
   */
  'aria-label'?: string;

  /**
   * Specify the content
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the notification box
   */
  className?: string;

  /**
   * Specify if pressing the escape key should close notifications
   */
  closeOnEscape?: boolean;

  /**
   * Specify if focus should be moved to the component when the notification contains actions
   */
  hasFocus?: boolean;

  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton?: boolean;

  /*
   * Specify if the notification should have inline styling applied instead of toast
   */
  inline?: boolean;

  /**
   * Specify what state the notification represents
   */
  kind:
    | 'error'
    | 'info'
    | 'info-square'
    | 'success'
    | 'warning'
    | 'warning-alt';

  /**
   * Specify whether you are using the low contrast variant of the ActionableNotification.
   */
  lowContrast?: boolean;

  /**
   * Provide a function that is called when the action is clicked
   */
  onActionButtonClick?(): void;

  /**
   * Provide a function that is called when menu is closed.
   * Default behavior of hiding the notification is prevented if this function returns false.
   */
  onClose?(event: MouseEvent): boolean | void;

  /**
   * Provide a function that is called when the close button is clicked
   */
  onCloseButtonClick(event: MouseEvent): void;

  /**
   * By default, this value is "alertdialog". You can also provide an alternate
   * role if it makes sense from from an accessibility perspective.
   */
  role?: string;

  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription?: string;

  /**
   * Specify the subtitle
   */
  subtitle?: ReactNode;

  /**
   * Specify the title
   */
  title?: string;
}

export function ActionableNotification({
  actionButtonLabel,
  ['aria-label']: ariaLabel,
  // @ts-expect-error: deprecated prop
  ariaLabel: deprecatedAriaLabel,
  children,
  role,
  onActionButtonClick,
  onClose,
  onCloseButtonClick,
  statusIconDescription,
  className,
  inline,
  kind,
  lowContrast,
  hideCloseButton,
  hasFocus,
  closeOnEscape,
  title,
  subtitle,
  ...rest
}: ActionableNotificationProps) {
  const [isOpen, setIsOpen] = useState(true);
  const prefix = usePrefix();
  const id = useId('actionable-notification');
  const subtitleId = useId('actionable-notification-subtitle');
  const containerClassName = cx(className, {
    [`${prefix}--actionable-notification`]: true,
    [`${prefix}--actionable-notification--toast`]: !inline,
    [`${prefix}--actionable-notification--low-contrast`]: lowContrast,
    [`${prefix}--actionable-notification--${kind}`]: kind,
    [`${prefix}--actionable-notification--hide-close-button`]: hideCloseButton,
  });

  const ref = useRef<HTMLDivElement>(null);
  useIsomorphicEffect(() => {
    if (ref.current && hasFocus) {
      ref.current.focus();
    }
  });

  const handleClose = (evt: MouseEvent) => {
    if (!onClose || onClose(evt) !== false) {
      setIsOpen(false);
    }
  };
  useEscapeToClose(ref, handleCloseButtonClick, closeOnEscape);

  function handleCloseButtonClick(event: MouseEvent) {
    onCloseButtonClick(event);
    handleClose(event);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      {...rest}
      ref={ref}
      role={role}
      className={containerClassName}
      aria-labelledby={title ? id : subtitleId}>
      <div className={`${prefix}--actionable-notification__details`}>
        <NotificationIcon
          notificationType={inline ? 'inline' : 'toast'}
          kind={kind}
          iconDescription={statusIconDescription || `${kind} icon`}
        />
        <div className={`${prefix}--actionable-notification__text-wrapper`}>
          <div className={`${prefix}--actionable-notification__content`}>
            {title && (
              <div
                className={`${prefix}--actionable-notification__title`}
                id={id}>
                {title}
              </div>
            )}
            {subtitle && (
              <div
                className={`${prefix}--actionable-notification__subtitle`}
                id={subtitleId}>
                {subtitle}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>

      {actionButtonLabel && (
        <NotificationActionButton onClick={onActionButtonClick} inline={inline}>
          {actionButtonLabel}
        </NotificationActionButton>
      )}

      {!hideCloseButton && (
        <NotificationButton
          aria-label={deprecatedAriaLabel || ariaLabel}
          notificationType="actionable"
          onClick={handleCloseButtonClick}
        />
      )}
    </div>
  );
}

ActionableNotification.propTypes = {
  /**
   * Pass in the action button label that will be rendered within the ActionableNotification.
   */
  actionButtonLabel: PropTypes.string,

  /**
   * Provide a description for "close" icon button that can be read by screen readers
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Provide a description for "close" icon button that can be read by screen readers
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),

  /**
   * Specify the content
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the notification box
   */
  className: PropTypes.string,

  /**
   * Specify if pressing the escape key should close notifications
   */
  closeOnEscape: PropTypes.bool,

  /**
   * Specify if focus should be moved to the component when the notification contains actions
   */
  hasFocus: PropTypes.bool,

  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton: PropTypes.bool,

  /*
   * Specify if the notification should have inline styling applied instead of toast
   */
  inline: PropTypes.bool,

  /**
   * Specify what state the notification represents
   */
  kind: PropTypes.oneOf([
    'error',
    'info',
    'info-square',
    'success',
    'warning',
    'warning-alt',
  ]).isRequired,

  /**
   * Specify whether you are using the low contrast variant of the ActionableNotification.
   */
  lowContrast: PropTypes.bool,

  /**
   * Provide a function that is called when the action is clicked
   */
  onActionButtonClick: PropTypes.func,

  /**
   * Provide a function that is called when menu is closed
   */
  onClose: PropTypes.func,

  /**
   * Provide a function that is called when the close button is clicked
   */
  onCloseButtonClick: PropTypes.func,

  /**
   * By default, this value is "alertdialog". You can also provide an alternate
   * role if it makes sense from the accessibility-side.
   */
  role: PropTypes.string,

  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription: PropTypes.string,

  /**
   * Specify the subtitle
   */
  subtitle: PropTypes.node,

  /**
   * Specify the title
   */
  title: PropTypes.string,
};
ActionableNotification.defaultProps = {
  kind: 'error',
  role: 'alertdialog',
  onCloseButtonClick: () => {},
  hideCloseButton: false,
  hasFocus: true,
  closeOnEscape: true,
  inline: false,
};
