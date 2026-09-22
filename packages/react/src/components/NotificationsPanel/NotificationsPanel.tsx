/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { dateTimeFormat } from '@carbon/utilities';
import { Button, Heading, IconButton, Link, Section, Toggle } from '../..';
import {
  CheckmarkFilled,
  ChevronDown,
  Close,
  ErrorFilled,
  InformationSquareFilled,
  Settings,
  WarningAltFilled,
} from '@carbon/icons-react';

import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { useOutsideClick } from '../../internal/useOutsideClick';
import { usePrefersReducedMotion } from '../../internal/usePrefersReducedMotion';
import { timeAgo } from './utils';
// NOTE: NotificationsEmptyState is an inline copy of the ibm-products
// EmptyStates/NotificationsEmptyState pattern. It can be removed once Carbon
// core develops its own empty-state pattern for notifications.
import { NotificationsEmptyState } from './NotificationsEmptyState';

const componentName = 'NotificationsPanel';

const DefaultLocale = 'en-US';
type Themes = 'light' | 'dark';
type DateTimeStyles = 'long' | 'short' | 'narrow';

/**
 * Ensures the requested `locale` is valid, else returns the default locale.
 * Inlined from ibm-products getSupportedLocale — remove if Carbon core
 * provides an equivalent utility.
 */
function getSupportedLocale(
  locale: Intl.LocalesArgument,
  defaultLocale: string = 'en-US'
): Intl.LocalesArgument {
  try {
    Intl.NumberFormat.supportedLocalesOf(locale);
    return locale;
  } catch {
    return defaultLocale;
  }
}

// Default values for props
const defaults = {
  dateTimeStyle: 'long' as DateTimeStyles,
  daysAgoText: (value: number) => `${value} days ago`,
  dismissAllLabel: 'Dismiss all',
  dismissSingleNotificationIconDescription: 'Dismiss',
  doNotDisturbLabel: 'Do not disturb',
  emptyStateLabel: 'You do not have any notifications',
  hourAgoText: (value: number) => `${value} hour ago`,
  hoursAgoText: (value: number) => `${value} hours ago`,
  illustrationTheme: 'light' as Themes,
  minuteAgoText: (value: number) => `${value} minute ago`,
  minutesAgoText: (value: number) => `${value} minutes ago`,
  monthAgoText: (value: number) => `${value} month ago`,
  monthsAgoText: (value: number) => `${value} months ago`,
  nowText: 'Now',
  onDismissAllNotifications: () => {},
  onDismissSingleNotification: () => {},
  previousLabel: 'Previous',
  readLessLabel: 'Read less',
  readMoreLabel: 'Read more',
  secondsAgoText: (value: number) => `${value} seconds ago`,
  settingsIconDescription: 'Settings',
  title: 'Notifications',
  todayLabel: 'Today',
  viewAllLabel: (value: number) => `View all (${value})`,
  yearAgoText: (value: number) => `${value} year ago`,
  yearsAgoText: (value: number) => `${value} years ago`,
  yesterdayAtText: (value: number) => `Yesterday at ${value}`,
  yesterdayLabel: 'Yesterday',
};

interface NotificationLink {
  url: string;
  text: string;
}

interface NotificationData {
  id?: string | number;
  type?: 'error' | 'warning' | 'success' | 'informational';
  timestamp?: Date;
  title?: string;
  description?: string;
  link?: NotificationLink;
  unread?: boolean;
  onNotificationClick?: (notification: NotificationData) => void;
  showAll?: boolean;
}

export interface NotificationsPanelProps
  extends React.HTMLAttributes<HTMLElement> {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Array of data for Notifications component to render
   */
  data: NotificationData[];

  /**
   * The language for each notification's time stamp.
   * Used with `dateTimeStyle`.
   */
  dateTimeLocale?: string;

  /**
   * The date/time format for each notification's time stamp.
   * Used with `dateTimeLocale`.
   *
   * E.g. `long` as "6 minutes ago", `short` as "6m ago".
   */
  dateTimeStyle?: DateTimeStyles;

  /**
   * Sets the `days ago` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  daysAgoText?: (value: number) => string;

  /**
   * Label for Dismiss all button
   */
  dismissAllLabel?: string;

  /**
   * Label for Dismiss single notification icon button
   */
  dismissSingleNotificationIconDescription?: string;

  /**
   * Optional: Determines if the `Do not disturb` toggle is on or off when the component is rendered
   */
  doNotDisturbDefaultToggled?: boolean;

  /**
   * Optional: Label for Do not disturb toggle
   */
  doNotDisturbLabel?: string;

  /**
   * Sets the empty state label text when there are no notifications
   */
  emptyStateLabel?: string;

  /**
   * Sets the `hour ago` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  hourAgoText?: (value: number) => string;

  /**
   * Sets the `hours ago` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  hoursAgoText?: (value: number) => string;

  /**
   * Determines the theme of the empty state's illustration.
   */
  illustrationTheme?: Themes;

  /**
   * Sets the `minute ago` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  minuteAgoText?: (value: number) => string;

  /**
   * Sets the `minutes ago` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  minutesAgoText?: (value: number) => string;

  /**
   * Sets the `month ago` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  monthAgoText?: (value: number) => string;

  /**
   * Sets the `months ago` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  monthsAgoText?: (value: number) => string;

  /**
   * Sets the `now` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  nowText?: string;

  /**
   * Optional function called after clicking outside of the panel.
   */
  onClickOutside?: () => void;

  /**
   * Optional function called after clicking the "Dismiss all" button.
   */
  onDismissAllNotifications?: () => void;

  /**
   * Optional function called after clicking a notification's "X" button.
   */
  onDismissSingleNotification?: (notification: NotificationData) => void;

  /**
   * Optional function called after toggling "Do not disturb".
   */
  onDoNotDisturbChange?: (checked: boolean) => void;

  /**
   * Optional function called after clicking settings / gear icon button.
   */
  onSettingsClick?: () => void;

  /**
   * Optional function called after clicking the "View all" button.
   */
  onViewAllClick?: () => void;

  /**
   * Determines whether the notifications panel should render or not
   */
  open: boolean;

  /**
   * Sets the previous label text
   */
  previousLabel?: string;

  /**
   * Sets the `read less` label text
   */
  readLessLabel?: string;

  /**
   * Sets the `read more` label text
   */
  readMoreLabel?: string;

  /**
   * Sets the `seconds ago` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  secondsAgoText?: (value: number) => string;

  /**
   * Sets the settings icon description text
   */
  settingsIconDescription?: string;

  /**
   * Sets the title for the Notifications panel
   */
  title?: string;

  /**
   * Sets the today label text
   */
  todayLabel?: string;

  /**
   * Reference to trigger button
   */
  triggerButtonRef?: RefObject<HTMLElement | null>;

  /**
   * Sets the View all button text
   */
  viewAllLabel?: (value: number) => string;

  /**
   * Sets the `year ago` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  yearAgoText?: (value: number) => string;

  /**
   * Sets the `years ago` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  yearsAgoText?: (value: number) => string;

  /**
   * Sets the `Yesterday at` label text
   *
   * @deprecated use `dateTimeLocale` instead.
   */
  yesterdayAtText?: (value: number) => string;

  /**
   * Sets the yesterday label text
   */
  yesterdayLabel?: string;
}

/**
 * The `NotificationsPanel` sets expectations on the behavior for notifications,
 * allowing the user to view and interact with them all in one place.
 *
 * **To adopt the new localization:**
 *
 * **Step 1:** Provide a locale to the `dateTimeLocale` prop, such as "de" or "fr-CA".
 *
 * **Step 2:** Remove the now _deprecated_ props: `daysAgoText`,
 * `hourAgoText`, `hoursAgoText`, `minuteAgoText`, `minutesAgoText`,
 * `monthAgoText`, `monthsAgoText`, `nowText`, `secondsAgoText`,
 * `yearAgoText`, `yearsAgoText`, `yesterdayAtText`.
 *
 * If you do not provide a locale, the deprecated props will be applied instead.
 */
export const NotificationsPanel = React.forwardRef<
  HTMLElement,
  NotificationsPanelProps
>(
  (
    {
      // The component props, in alphabetical order (for consistency).
      className,
      data,
      dateTimeLocale,
      dateTimeStyle = defaults.dateTimeStyle,
      daysAgoText = defaults.daysAgoText,
      dismissAllLabel = defaults.dismissAllLabel,
      dismissSingleNotificationIconDescription = defaults.dismissSingleNotificationIconDescription,
      doNotDisturbDefaultToggled,
      doNotDisturbLabel = defaults.doNotDisturbLabel,
      emptyStateLabel = defaults.emptyStateLabel,
      hourAgoText = defaults.hourAgoText,
      hoursAgoText = defaults.hoursAgoText,
      illustrationTheme = defaults.illustrationTheme,
      minuteAgoText = defaults.minuteAgoText,
      minutesAgoText = defaults.minutesAgoText,
      monthAgoText = defaults.monthAgoText,
      monthsAgoText = defaults.monthsAgoText,
      nowText = defaults.nowText,
      onClickOutside,
      onDismissAllNotifications = defaults.onDismissAllNotifications,
      onDismissSingleNotification = defaults.onDismissSingleNotification,
      onDoNotDisturbChange,
      onSettingsClick,
      onViewAllClick,
      open,
      previousLabel = defaults.previousLabel,
      readLessLabel = defaults.readLessLabel,
      readMoreLabel = defaults.readMoreLabel,
      secondsAgoText = defaults.secondsAgoText,
      settingsIconDescription = defaults.settingsIconDescription,
      title = defaults.title,
      todayLabel = defaults.todayLabel,
      triggerButtonRef,
      viewAllLabel = defaults.viewAllLabel,
      yearAgoText = defaults.yearAgoText,
      yearsAgoText = defaults.yearsAgoText,
      yesterdayAtText = defaults.yesterdayAtText,
      yesterdayLabel = defaults.yesterdayLabel,
      // Collect any other property values passed in.
      ...rest
    }: NotificationsPanelProps,
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--notifications-panel`;

    const notificationPanelRef = useRef<HTMLElement | null>(null);
    const [allNotifications, setAllNotifications] = useState<
      NotificationData[]
    >([]);
    const [shouldRender, setShouldRender] = useState<boolean>(open);
    const supportedLocale = getSupportedLocale(dateTimeLocale, DefaultLocale);
    const headingId = useId('notifications-panel-heading');
    const isClickOnTrigger = useRef<boolean>(false);
    const reducedMotion = usePrefersReducedMotion();

    // Track animation state for mount/unmount
    useEffect(() => {
      if (open) {
        setShouldRender(true);
      }
    }, [open]);

    const handleAnimationEnd = (event: React.AnimationEvent<HTMLElement>) => {
      const exitName = reducedMotion
        ? 'notifications-panel-exit-reduced'
        : 'notifications-panel-fade-out';
      if (!open && event.animationName === exitName) {
        setShouldRender(false);
      }
    };

    useEffect(() => {
      setAllNotifications(data);
    }, [data]);

    useEffect(() => {
      const button = triggerButtonRef?.current;
      const handleClick = () => {
        isClickOnTrigger.current = true;
      };
      button?.addEventListener('click', handleClick, true);
      return () => {
        button?.removeEventListener('click', handleClick, true);
      };
    }, [triggerButtonRef]);

    const resolvedRef = (ref ||
      notificationPanelRef) as RefObject<HTMLElement | null>;

    useOutsideClick(resolvedRef, (event) => {
      const element = event.target as HTMLElement;
      if (!isClickOnTrigger.current) {
        if (!isActionableElement(element)) {
          setTimeout(() => {
            triggerButtonRef?.current?.focus();
          }, 100);
        }
        onClickOutside?.();
      }
      isClickOnTrigger.current = false;
    });

    // Focus the dismiss button when the panel opens
    useEffect(() => {
      if (open) {
        const observer = new MutationObserver(() => {
          if (notificationPanelRef.current) {
            const button =
              notificationPanelRef.current.querySelector<HTMLButtonElement>(
                `.${blockClass}__dismiss-button`
              );
            button?.focus();
            observer.disconnect();
          }
        });
        if (notificationPanelRef.current) {
          const button =
            notificationPanelRef.current.querySelector<HTMLButtonElement>(
              `.${blockClass}__dismiss-button`
            );
          button?.focus();
        } else {
          observer.observe(document.body, { childList: true, subtree: true });
        }
        return () => observer.disconnect();
      }
    }, [open, blockClass]);

    const handleKeydown = (event: React.KeyboardEvent<HTMLElement>) => {
      event.stopPropagation();
      if (event.key === 'Escape') {
        onClickOutside?.();
        setTimeout(() => {
          triggerButtonRef?.current?.focus();
        }, 100);
      }
    };

    const sortChronologically = (arr: NotificationData[]) => {
      if (!arr || !arr.length) {
        return arr;
      }
      return arr.sort(
        (a, b) =>
          (b.timestamp as Date).getTime() - (a.timestamp as Date).getTime()
      );
    };

    const yesterdayDate = new Date(
      new Date().setDate(new Date().getDate() - 1)
    );
    const dayBeforeYesterdayDate = new Date(
      new Date().setDate(new Date().getDate() - 2)
    );

    let withinLastDayNotifications: NotificationData[] =
      allNotifications.filter(
        (item) => (item.timestamp as Date).getTime() >= yesterdayDate.getTime()
      );
    withinLastDayNotifications = sortChronologically(
      withinLastDayNotifications
    ) as NotificationData[];

    let previousDayNotifications: NotificationData[] = allNotifications.filter(
      (item) =>
        (item.timestamp as Date).getTime() < yesterdayDate.getTime() &&
        (item.timestamp as Date).getTime() >= dayBeforeYesterdayDate.getTime()
    );
    previousDayNotifications = sortChronologically(
      previousDayNotifications
    ) as NotificationData[];

    let previousNotifications: NotificationData[] = allNotifications.filter(
      (item) =>
        (item.timestamp as Date).getTime() < dayBeforeYesterdayDate.getTime()
    );
    previousNotifications = sortChronologically(
      previousNotifications
    ) as NotificationData[];

    const renderDescription = (id: string | number | undefined) => {
      const notification = allNotifications.find((item) => item.id === id);
      const trimLength = 88;
      const description = notification?.description ?? '';
      const descriptionClassName = cx([
        `${blockClass}__notification-description`,
        {
          [`${blockClass}__notification-long-description`]:
            notification?.showAll,
          [`${blockClass}__notification-short-description`]:
            !notification?.showAll,
        },
      ]);
      const showMoreButtonClassName = cx([
        {
          [`${blockClass}__notification-read-less-button`]:
            notification?.showAll,
          [`${blockClass}__notification-read-more-button`]:
            !notification?.showAll,
        },
      ]);
      return (
        <div>
          <p className={descriptionClassName}>{description}</p>
          {description.length > trimLength && (
            <Button
              kind="ghost"
              size="sm"
              renderIcon={(props) => <ChevronDown size={16} {...props} />}
              iconDescription={
                notification?.showAll ? readLessLabel : readMoreLabel
              }
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                const newData = allNotifications.map((item) => {
                  if (item.id === notification?.id) {
                    return { ...item, showAll: !item.showAll };
                  }
                  return item;
                });
                setAllNotifications(newData);
              }}
              className={showMoreButtonClassName}>
              {notification?.showAll ? readLessLabel : readMoreLabel}
            </Button>
          )}
        </div>
      );
    };

    const renderNotification = (
      group: string,
      notification: NotificationData,
      index: number
    ) => {
      const notificationClassName = cx([
        `${blockClass}__notification`,
        `${blockClass}__notification-${group}`,
      ]);
      const notificationHeaderClassName = cx([
        `${blockClass}__notification-title`,
        {
          [`${blockClass}__notification-title-unread`]: notification.unread,
        },
      ]);
      return (
        <Section
          key={`${notification.timestamp}-${notification.title}-${index}`}
          className={notificationClassName}
          as="div"
          role="button"
          tabIndex={0}
          onClick={() => notification.onNotificationClick?.(notification)}
          onKeyDown={(event) => {
            if (
              event.target instanceof HTMLElement &&
              event.target.classList.contains(
                `${blockClass}__dismiss-single-button`
              )
            ) {
              return;
            }
            if (event.which === 13) {
              notification.onNotificationClick?.(notification);
            }
          }}>
          {notification.type === 'error' && (
            <ErrorFilled
              size={16}
              className={cx([
                `${blockClass}__notification-status-icon`,
                `${blockClass}__notification-status-icon-error`,
              ])}
            />
          )}
          {notification.type === 'success' && (
            <CheckmarkFilled
              size={16}
              className={cx([
                `${blockClass}__notification-status-icon`,
                `${blockClass}__notification-status-icon-success`,
              ])}
            />
          )}
          {notification.type === 'warning' && (
            <WarningAltFilled
              size={16}
              className={cx([
                `${blockClass}__notification-status-icon`,
                `${blockClass}__notification-status-icon-warning`,
              ])}
            />
          )}
          {notification.type === 'informational' && (
            <InformationSquareFilled
              size={16}
              className={cx([
                `${blockClass}__notification-status-icon`,
                `${blockClass}__notification-status-icon-informational`,
              ])}
            />
          )}
          <div className={`${blockClass}__notification-content`}>
            <p className={`${blockClass}__notification-time-label`}>
              {dateTimeLocale
                ? dateTimeFormat.relative.format(
                    notification.timestamp as Date,
                    {
                      locale: supportedLocale as string,
                      style: dateTimeStyle,
                    }
                  )
                : timeAgo({
                    previousTime: notification.timestamp,
                    secondsAgoText,
                    minuteAgoText,
                    minutesAgoText,
                    hoursAgoText,
                    hourAgoText,
                    daysAgoText,
                    yesterdayAtText,
                    monthsAgoText,
                    monthAgoText,
                    yearsAgoText,
                    yearAgoText,
                    nowText,
                  })}
            </p>
            <Heading className={notificationHeaderClassName}>
              {notification.title}
            </Heading>
            {notification.description &&
              notification.description.length &&
              renderDescription(notification.id)}
            {notification.link?.text && notification.link?.url && (
              <Link
                href={notification.link.url}
                className={`${blockClass}__notifications-link`}>
                {notification.link.text}
              </Link>
            )}
          </div>
          <IconButton
            align="left"
            kind="ghost"
            size="sm"
            label={dismissSingleNotificationIconDescription}
            className={`${blockClass}__dismiss-single-button`}
            onClick={(event) => dismissSingleNotification(event, notification)}>
            <Close size={16} />
          </IconButton>
        </Section>
      );
    };

    const isActionableElement = (el: HTMLElement | null): boolean => {
      if (!el) {
        return false;
      }
      const interactiveRoles = new Set([
        'button',
        'link',
        'textbox',
        'checkbox',
        'radio',
        'slider',
        'spinbutton',
        'combobox',
        'switch',
        'menuitem',
      ]);
      const actionableAncestor = el.closest<HTMLElement>(
        'button, a, input, select, textarea, [tabindex], [contenteditable="true"], [role]'
      );
      if (!actionableAncestor) {
        return false;
      }
      return (
        actionableAncestor instanceof HTMLButtonElement ||
        actionableAncestor instanceof HTMLAnchorElement ||
        actionableAncestor instanceof HTMLInputElement ||
        actionableAncestor instanceof HTMLSelectElement ||
        actionableAncestor instanceof HTMLTextAreaElement ||
        actionableAncestor.tabIndex >= 0 ||
        actionableAncestor.isContentEditable ||
        interactiveRoles.has(
          actionableAncestor.getAttribute('role')?.toLowerCase() ?? ''
        )
      );
    };

    const dismissSingleNotification = (
      event: React.MouseEvent<HTMLButtonElement>,
      notification: NotificationData
    ) => {
      event.preventDefault();
      event.stopPropagation();
      onDismissSingleNotification(notification);
    };

    const mainSectionClassName = cx([
      `${blockClass}__main-section`,
      {
        [`${blockClass}__main-section-empty`]:
          allNotifications && !allNotifications.length,
      },
    ]);

    return shouldRender ? (
      <Section
        as="div"
        role="dialog"
        aria-labelledby={headingId}
        onKeyDown={handleKeydown}
        onAnimationEnd={handleAnimationEnd}
        {...rest}
        id={blockClass}
        className={cx(blockClass, className, `${blockClass}__container`, {
          [`${blockClass}__entrance`]: open,
          [`${blockClass}__exit`]: !open,
        })}
        ref={
          (ref as MutableRefObject<HTMLElement | null>) || notificationPanelRef
        }
        data-component-name={componentName}>
        <div>
          <div className={`${blockClass}__header-container`}>
            <div className={`${blockClass}__header-flex`}>
              <Heading id={headingId} className={`${blockClass}__header`}>
                {title}
              </Heading>
              <Button
                size="sm"
                kind="ghost"
                className={`${blockClass}__dismiss-button`}
                onClick={onDismissAllNotifications}>
                {dismissAllLabel}
              </Button>
            </div>
            {onDoNotDisturbChange && (
              <Toggle
                size="sm"
                className={`${blockClass}__do-not-disturb-toggle`}
                id={`${blockClass}__do-not-disturb-toggle-component`}
                labelA={doNotDisturbLabel}
                labelB={doNotDisturbLabel}
                onToggle={(checked) => onDoNotDisturbChange(checked)}
                defaultToggled={doNotDisturbDefaultToggled}
                aria-label={doNotDisturbLabel}
                labelText={doNotDisturbLabel}
              />
            )}
          </div>
          <Section className={mainSectionClassName}>
            {withinLastDayNotifications.length > 0 && (
              <>
                <Heading className={`${blockClass}__time-section-label`}>
                  {todayLabel}
                </Heading>
                {withinLastDayNotifications.map((notification, index) =>
                  renderNotification('today', notification, index)
                )}
              </>
            )}
            {previousDayNotifications.length > 0 && (
              <>
                <Heading className={`${blockClass}__time-section-label`}>
                  {yesterdayLabel}
                </Heading>
                {previousDayNotifications.map((notification, index) =>
                  renderNotification('yesterday', notification, index)
                )}
              </>
            )}
            {previousNotifications.length > 0 && (
              <>
                <Heading className={`${blockClass}__time-section-label`}>
                  {previousLabel}
                </Heading>
                {previousNotifications.map((notification, index) =>
                  renderNotification('previous', notification, index)
                )}
              </>
            )}
            {allNotifications.length === 0 && (
              // NOTE: NotificationsEmptyState is a temporary inline component
              // copied from ibm-products. Remove and replace with Carbon core
              // empty-state pattern when one is available.
              <NotificationsEmptyState
                illustrationTheme={illustrationTheme}
                title=""
                subtitle={emptyStateLabel}
              />
            )}
          </Section>
          {onViewAllClick && onSettingsClick && allNotifications.length > 0 && (
            <div className={`${blockClass}__bottom-actions`}>
              <Button
                kind="ghost"
                className={`${blockClass}__view-all-button`}
                onClick={onViewAllClick}>
                {viewAllLabel(allNotifications.length)}
              </Button>
              <Button
                kind="ghost"
                size="sm"
                className={`${blockClass}__settings-button`}
                renderIcon={(props) => <Settings size={16} {...props} />}
                iconDescription={settingsIconDescription}
                onClick={onSettingsClick}
                hasIconOnly
                tooltipPosition="left"
              />
            </div>
          )}
        </div>
      </Section>
    ) : null;
  }
);

NotificationsPanel.displayName = componentName;
