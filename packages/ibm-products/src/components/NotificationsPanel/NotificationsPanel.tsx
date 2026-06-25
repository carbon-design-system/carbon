/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Carbon and package components we use.
import {
  Button,
  Heading,
  IconButton,
  Link,
  Section,
  Toggle,
  usePrefix,
} from '@carbon/react';
import { dateTimeFormat } from '@carbon/utilities';
import {
  CheckmarkFilled,
  ChevronDown,
  Close,
  ErrorFilled,
  InformationSquareFilled,
  Settings,
  WarningAltFilled,
} from '@carbon/react/icons';
// Import portions of React that are needed.
import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { NotificationsEmptyState } from '../EmptyStates';
// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefersReducedMotion } from '../../global/js/hooks/usePrefersReducedMotion';
import { useClickOutside, usePresence } from '../../global/js/hooks';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { prepareProps } from '../../global/js/utils/props-helper';
import { getSupportedLocale } from '../../global/js/utils/getSupportedLocale';
import { useId } from '../../global/js/utils/useId';
import { pkg } from '../../settings';
import { timeAgo } from './utils';

// The block part of our conventional BEM class names (blockClass__E--M).
const componentName = 'NotificationsPanel';
const blockClass = `${pkg.prefix}--notifications-panel`;

const DefaultLocale = 'en-US';
type Themes = 'light' | 'dark';
type DateTimeStyles = 'long' | 'short' | 'narrow';

// Default values for props
const defaults = {
  dateTimeStyle: 'long' as DateTimeStyles,
  daysAgoText: (value) => `${value} days ago`,
  dismissAllLabel: 'Dismiss all',
  dismissSingleNotificationIconDescription: 'Dismiss',
  doNotDisturbLabel: 'Do not disturb',
  emptyStateLabel: 'You do not have any notifications',
  hourAgoText: (value) => `${value} hour ago`,
  hoursAgoText: (value) => `${value} hours ago`,
  illustrationTheme: 'light' as Themes,
  minuteAgoText: (value) => `${value} minute ago`,
  minutesAgoText: (value) => `${value} minutes ago`,
  monthAgoText: (value) => `${value} month ago`,
  monthsAgoText: (value) => `${value} months ago`,
  nowText: 'Now',
  onDismissAllNotifications: () => {},
  onDismissSingleNotification: () => {},
  previousLabel: 'Previous',
  readLessLabel: 'Read less',
  readMoreLabel: 'Read more',
  secondsAgoText: (value) => `${value} seconds ago`,
  settingsIconDescription: 'Settings',
  title: 'Notifications',
  todayLabel: 'Today',
  viewAllLabel: (value: string | number) => `View all (${value})`,
  yearAgoText: (value) => `${value} year ago`,
  yearsAgoText: (value) => `${value} years ago`,
  yesterdayAtText: (value) => `Yesterday at ${value}`,
  yesterdayLabel: 'Yesterday',
};

interface Link {
  url: string;
  text: string;
}

interface Data {
  id?: string | number;
  type?: 'error' | 'warning' | 'success' | 'informational';
  timestamp?: Date;
  title?: string;
  description?: string;
  link?: Link;
  unread?: boolean;
  onNotificationClick?: () => void;
}

export interface NotificationsPanelProps {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Array of data for Notifications component to render
   */
  data: Data[];

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
  illustrationTheme: Themes;

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
  onDismissSingleNotification?: (prop) => void;

  /**
   * Optional function called after toggling "Do not disturb".
   */
  onDoNotDisturbChange?: (prop) => void;

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
  triggerButtonRef?: RefObject<any>;

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
export const NotificationsPanel = React.forwardRef(
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
      viewAllLabel = defaults.viewAllLabel,
      yearAgoText = defaults.yearAgoText,
      yearsAgoText = defaults.yearsAgoText,
      yesterdayAtText = defaults.yesterdayAtText,
      yesterdayLabel = defaults.yesterdayLabel,
      triggerButtonRef,
      // Collect any other property values passed in.
      ...rest
    }: NotificationsPanelProps,
    ref
  ) => {
    const notificationPanelRef = useRef<HTMLDialogElement | null>(null);
    const notificationPanelInnerRef = useRef(null);
    const startSentinel = useRef<HTMLButtonElement>(null);
    const endSentinel = useRef<HTMLButtonElement>(null);
    const [allNotifications, setAllNotifications] = useState<Data[]>([]);
    const supportedLocale = getSupportedLocale(dateTimeLocale, DefaultLocale);
    const carbonPrefix = usePrefix();
    const headingId = useId();
    const isClickOnTrigger = useRef(false);

    const reducedMotion = usePrefersReducedMotion();
    const exitAnimationName = reducedMotion
      ? 'notifications-panel-exit-reduced'
      : 'notifications-panel-fade-out';
    const { shouldRender } = usePresence(
      open,
      notificationPanelRef as RefObject<HTMLDialogElement>,
      exitAnimationName
    );

    useEffect(() => {
      // Set the notifications passed to the state within this component
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

    useClickOutside(ref || notificationPanelRef, (target) => {
      const element = target as HTMLElement;
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

    const handleKeydown = (event) => {
      event.stopPropagation();
      if (event.key === 'Escape') {
        onClickOutside?.();
        setTimeout(() => {
          triggerButtonRef?.current?.focus();
        }, 100);
      }
    };

    useEffect(() => {
      // initialize the notification panel to open
      if (open) {
        const observer = new MutationObserver(() => {
          if (notificationPanelRef.current) {
            const parentElement = notificationPanelRef.current;
            (parentElement as HTMLDialogElement)
              ?.querySelector<HTMLButtonElement>(
                `.${blockClass}__dismiss-button`
              )
              ?.focus();
            observer.disconnect();
          }
        });
        if (notificationPanelRef.current) {
          const parentElement = notificationPanelRef.current;
          const button = (
            parentElement as HTMLDialogElement
          )?.querySelector<HTMLButtonElement>(`.${blockClass}__dismiss-button`);
          button?.focus();
        } else {
          observer.observe(document.body, {
            childList: true,
            subtree: true,
          });
        }
        return () => observer.disconnect();
      }
    }, [open]);

    const sortChronologically = (arr) => {
      if (!arr || (arr && !arr.length)) {
        return;
      }
      return arr.sort((a, b) => b.timestamp - a.timestamp);
    };

    // Notifications should be grouped by "Today", "Yesterday", and "Previous", the variables
    // below filter the notifications based on those conditions and then render them in those groups
    let yesterdayDate = new Date();
    yesterdayDate = new Date(
      yesterdayDate.setDate(yesterdayDate.getDate() - 1)
    );
    let dayBeforeYesterdayDate = new Date();
    dayBeforeYesterdayDate = new Date(
      dayBeforeYesterdayDate.setDate(dayBeforeYesterdayDate.getDate() - 2)
    );
    let withinLastDayNotifications =
      allNotifications &&
      allNotifications.length &&
      allNotifications.filter(
        (item) => (item.timestamp as Date).getTime() >= yesterdayDate.getTime()
      );
    withinLastDayNotifications = sortChronologically(
      withinLastDayNotifications
    );
    let previousDayNotifications =
      allNotifications &&
      allNotifications.length &&
      allNotifications.filter(
        (item) =>
          (item.timestamp as Date).getTime() < yesterdayDate.getTime() &&
          (item.timestamp as Date).getTime() >= dayBeforeYesterdayDate.getTime()
      );
    previousDayNotifications = sortChronologically(previousDayNotifications);
    let previousNotifications =
      allNotifications &&
      allNotifications.length &&
      allNotifications.filter(
        (item) =>
          (item.timestamp as Date).getTime() < dayBeforeYesterdayDate.getTime()
      );
    previousNotifications = sortChronologically(previousNotifications);

    const renderDescription = (id) => {
      const notification =
        allNotifications &&
        allNotifications.length &&
        allNotifications.filter((item) => item.id === id)[0];
      const trimLength = 88;
      const description = notification?.['description'];
      const descriptionClassName = cx([
        `${blockClass}__notification-description`,
        {
          [`${blockClass}__notification-long-description`]:
            notification?.['showAll'],
          [`${blockClass}__notification-short-description`]:
            !notification?.['showAll'],
        },
      ]);
      const showMoreButtonClassName = cx([
        {
          [`${blockClass}__notification-read-less-button`]:
            notification?.['showAll'],
          [`${blockClass}__notification-read-more-button`]:
            !notification?.['showAll'],
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
                notification?.['showAll'] ? readLessLabel : readMoreLabel
              }
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                const newData = allNotifications.map((item) => {
                  if (item.id === notification?.['id']) {
                    return Object.assign({}, item, {
                      showAll: !item?.['showAll'],
                    });
                  }
                  return item;
                });
                setAllNotifications(newData);
              }}
              className={showMoreButtonClassName}
            >
              {notification?.['showAll'] ? readLessLabel : readMoreLabel}
            </Button>
          )}
        </div>
      );
    };

    const renderNotification = (group, notification, index) => {
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
          onClick={() => notification.onNotificationClick(notification)}
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
              notification.onNotificationClick(notification);
            }
          }}
        >
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
              {/**
               * If the new dateTimeLocale has been passed a value,
               * then use the new dateTimeFormat.relative.format(),
               * else use the deprecated timeAgo().
               */}
              {dateTimeLocale
                ? dateTimeFormat.relative.format(notification.timestamp, {
                    locale: supportedLocale as string,
                    style: dateTimeStyle,
                  })
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
            {notification.link &&
              notification.link.text &&
              notification.link.url && (
                <Link
                  href={notification.link.url}
                  className={`${blockClass}__notifications-link`}
                  {...prepareProps({}, notification.link, ['text', 'url'])}
                >
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
            onClick={(event) => dismissSingleNotification(event, notification)}
          >
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

    const dismissSingleNotification = (event, notification) => {
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
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        id={blockClass}
        className={cx(blockClass, className, `${blockClass}__container`, {
          [`${blockClass}__entrance`]: open,
          [`${blockClass}__exit`]: !open,
        })}
        ref={
          (ref as MutableRefObject<HTMLDivElement | null>) ||
          notificationPanelRef
        }
        {...getDevtoolsProps(componentName)}
      >
        <div ref={notificationPanelInnerRef}>
          <div className={`${blockClass}__header-container`}>
            <div className={`${blockClass}__header-flex`}>
              <Heading id={headingId} className={`${blockClass}__header`}>
                {title}
              </Heading>
              <Button
                size="sm"
                kind="ghost"
                className={`${blockClass}__dismiss-button`}
                onClick={onDismissAllNotifications}
              >
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
                onToggle={(event) => onDoNotDisturbChange(event)}
                defaultToggled={doNotDisturbDefaultToggled}
                aria-label={doNotDisturbLabel}
                labelText={doNotDisturbLabel}
              />
            )}
          </div>
          <Section className={mainSectionClassName}>
            {withinLastDayNotifications && withinLastDayNotifications.length ? (
              <>
                <Heading className={`${blockClass}__time-section-label`}>
                  {todayLabel}
                </Heading>
                {withinLastDayNotifications.map((notification, index) =>
                  renderNotification('today', notification, index)
                )}
              </>
            ) : null}
            {previousDayNotifications && previousDayNotifications.length ? (
              <>
                <Heading className={`${blockClass}__time-section-label`}>
                  {yesterdayLabel}
                </Heading>
                {previousDayNotifications.map((notification, index) =>
                  renderNotification('yesterday', notification, index)
                )}
              </>
            ) : null}
            {previousNotifications && previousNotifications.length ? (
              <>
                <Heading className={`${blockClass}__time-section-label`}>
                  {previousLabel}
                </Heading>
                {previousNotifications.map((notification, index) =>
                  renderNotification('previous', notification, index)
                )}
              </>
            ) : null}
            {!allNotifications.length && (
              <NotificationsEmptyState
                illustrationTheme={illustrationTheme}
                title=""
                subtitle={emptyStateLabel}
              />
            )}
          </Section>
          {onViewAllClick &&
            onSettingsClick &&
            allNotifications &&
            allNotifications.length > 0 && (
              <div className={`${blockClass}__bottom-actions`}>
                <Button
                  kind="ghost"
                  className={`${blockClass}__view-all-button`}
                  onClick={onViewAllClick}
                >
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

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
NotificationsPanel.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
NotificationsPanel.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Array of data for Notifications component to render
   */
  /**@ts-ignore*/
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.oneOf(['error', 'warning', 'success', 'informational']),
      timestamp: PropTypes.instanceOf(Date),
      title: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.shape({
        url: PropTypes.string,
        text: PropTypes.string,
      }),
      unread: PropTypes.bool,
      onNotificationClick: PropTypes.func,
    })
  ).isRequired,

  /**
   * The language for each notification's time stamp.
   */
  dateTimeLocale: PropTypes.string,

  /**
   * The date/time format for each notification's time stamp.
   *
   * E.g. `long` as "6 minutes ago", `short` as "6m ago".
   */
  dateTimeStyle: PropTypes.string,

  /**
   * Sets the `days ago` label text
   */
  daysAgoText: PropTypes.func,

  /**
   * Label for Dismiss all button
   */
  dismissAllLabel: PropTypes.string,

  /**
   * Label for Dismiss single notification icon button
   */
  dismissSingleNotificationIconDescription: PropTypes.string,

  /**
   * Optional: Determines if the `Do not disturb` toggle is on or off when the component is rendered
   */
  doNotDisturbDefaultToggled: PropTypes.bool,

  /**
   * Optional: Label for Do not disturb toggle
   */
  doNotDisturbLabel: PropTypes.string,

  /**
   * Sets the empty state label text when there are no notifications
   */
  emptyStateLabel: PropTypes.string,

  /**
   * Sets the `hour ago` label text
   */
  hourAgoText: PropTypes.func,

  /**
   * Sets the `hours ago` label text
   */
  hoursAgoText: PropTypes.func,

  /**
   * Determines the theme of the empty state's illustration.
   */
  illustrationTheme: PropTypes.oneOf(['light', 'dark']),

  /**
   * Sets the `minute ago` label text
   */
  minuteAgoText: PropTypes.func,

  /**
   * Sets the `minutes ago` label text
   */
  minutesAgoText: PropTypes.func,

  /**
   * Sets the `month ago` label text
   */
  monthAgoText: PropTypes.func,

  /**
   * Sets the `months ago` label text
   */
  monthsAgoText: PropTypes.func,

  /**
   * Sets the `now` label text
   */
  nowText: PropTypes.string,

  /**
   * Optional function called after clicking outside of the panel.
   */
  onClickOutside: PropTypes.func,

  /**
   * Optional function called after clicking the "Dismiss all" button.
   */
  onDismissAllNotifications: PropTypes.func,

  /**
   * Optional function called after clicking a notification's "X" button.
   */
  onDismissSingleNotification: PropTypes.func,

  /**
   * Optional function called after toggling "Do not disturb".
   */
  onDoNotDisturbChange: PropTypes.func,

  /**
   * Optional function called after clicking settings / gear icon button.
   */
  onSettingsClick: PropTypes.func,

  /**
   * Optional function called after clicking the "View all" button.
   */
  onViewAllClick: PropTypes.func,

  /**
   * Determines whether the notifications panel should render or not
   */
  open: PropTypes.bool.isRequired,

  /**
   * Sets the previous label text
   */
  previousLabel: PropTypes.string,

  /**
   * Sets the `read less` label text
   */
  readLessLabel: PropTypes.string,

  /**
   * Sets the `read more` label text
   */
  readMoreLabel: PropTypes.string,

  /**
   * Sets the `seconds ago` label text
   */
  secondsAgoText: PropTypes.func,

  /**
   * Sets the settings icon description text
   */
  settingsIconDescription: PropTypes.string,

  /**
   * Sets the title for the Notifications panel
   */
  title: PropTypes.string,

  /**
   * Sets the today label text
   */
  todayLabel: PropTypes.string,

  /**
   * Sets the today label text
   */
  triggerButtonRef: PropTypes.any,

  /**
   * Sets the View all button text
   */
  viewAllLabel: PropTypes.func,

  /**
   * Sets the `year ago` label text
   */
  yearAgoText: PropTypes.func,

  /**
   * Sets the `years ago` label text
   */
  yearsAgoText: PropTypes.func,

  /**
   * Sets the `Yesterday at` label text
   */
  yesterdayAtText: PropTypes.func,

  /**
   * Sets the yesterday label text
   */
  yesterdayLabel: PropTypes.string,
};
