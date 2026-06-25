/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { action } from 'storybook/actions';
import './index';
import styles from './story-styles.scss?lit';
import { useState } from '@storybook/preview-api';
import { prefix, carbonPrefix } from '../../globals/settings';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/ui-shell/index.js';
import '@carbon/web-components/es/components/heading/index.js';
import './../truncated-text/index.js';
import { UnreadNotificationBell } from './_story-assets/unread-notification-bell';
import User20 from '@carbon/icons/es/user/20.js';
import Notification20 from '@carbon/icons/es/notification/20.js';
import Close20 from '@carbon/icons/es/close/20.js';
import SwitcherIcon20 from '@carbon/icons/es/switcher/20.js';
import {
  dataToday as initialDataToday,
  dataPrevious as initialDataPrevious,
  extraData,
} from './_story-assets/NotificationsPanel_data';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
const blockClassNotification = `${prefix}--notifications-panel__notification`;
const storyBlockClass = `${prefix}--notifications-panel__story`;
const blockClass = `${prefix}--notifications-panel`;

const dateTimeLocaleOptions = {
  undefined: undefined,
  bg: 'bg',
  cs: 'cs',
  'da-DK': 'da-DK',
  'de-CH': 'de-CH',
  de: 'de',
  'en-AU': 'en-AU',
  'en-GB': 'en-GB',
  'en-US': 'en-US',
  'en-ZA': 'en-ZA',
  'es-ES': 'es-ES',
  es: 'es',
  et: 'et',
  fi: 'fi',
  'fr-CA': 'fr-CA',
  'fr-CH': 'fr-CH',
  fr: 'fr',
  hu: 'hu',
  it: 'it',
  ja: 'ja',
  lv: 'lv',
  'nl-BE': 'nl-BE',
  'nl-NL': 'nl-NL',
  no: 'no',
  pl: 'pl',
  'pt-BR': 'pt-BR',
  'pt-PT': 'pt-PT',
  'ru-UA': 'ru-UA',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  th: 'th',
  tr: 'tr',
  'uk-UA': 'uk-UA',
  vi: 'vi',
};

const defaultTemplate = {
  args: {
    titleText: 'Notifications',
    open: true,
    todayText: 'Today',
    previousText: 'Previous',
    dismissAllLabel: 'Dismiss all',
    emptyStateLabel: 'You do not have any notifications',
    doNotDisturbLabel: 'Do not disturb',
  },
  argTypes: {
    titleText: {
      control: 'text',
      description: 'Sets the Title for the Notification panel',
    },
    open: {
      description:
        'Determines whether the notifications panel should render or not',
    },
    todayText: {
      control: 'text',
      description: 'Sets the Today text for the Notification panel',
    },
    previousText: {
      control: 'text',
      description: 'Sets the Previous section title for the Notification panel',
    },
    dismissAllLabel: {
      control: 'text',
      description:
        'Sets the label text for the "Dismiss all" button in the Notification panel',
    },
    emptyStateLabel: {
      control: 'text',
      description:
        'Sets the empty state label text when there are no notifications',
    },
    doNotDisturbLabel: {
      control: 'text',
      description:
        'Sets the label text for the "Do Not Disturb" toggle in the Notification panel',
    },
    dateTimeLocale: {
      control: 'select',
      description: "The language for each notification's time stamp",
      options: dateTimeLocaleOptions,
    },
  },
  render: function Render(args) {
    const [dataToday, setDataToday] = useState([...initialDataToday]);
    const [dataPrevious, setDataPrevious] = useState([...initialDataPrevious]);
    const [openPanel, setOpenPanel] = useState(args.open);
    const [expandUserPanel, setExpandUserPanel] = useState(false);
    const [expandPanel, setExpandPanel] = useState(false);
    const [isNewNotification, setIsNewNotification] = useState(false);
    const triggerButton = document.querySelector('#trigger-button');
    const toggleButton = () => {
      setOpenPanel(!openPanel);
      setExpandPanel(false);
      setExpandUserPanel(false);
      setTimeout(() => {
        setIsNewNotification(false);
      }, 0);
    };
    const dismissAllNotification = () => {
      setDataToday([]);
      setDataPrevious([]);
    };
    const addNotification = () => {
      setDataToday([extraData, ...dataToday]);
      setIsNewNotification(true);
    };
    const notificationSingleDismiss = (
      notificationId: string,
      dataType: 'today' | 'previous'
    ) => {
      if (dataType === 'today') {
        const filteredData = dataToday.filter(
          (obj) => obj.id !== notificationId
        );
        setDataToday([...filteredData]);
      } else {
        const filteredData = dataPrevious.filter(
          (obj) => obj.id !== notificationId
        );
        setDataPrevious([...filteredData]);
      }
    };
    const clickOutside = (event) => {
      setOpenPanel(false);
      const updatedTodayData = dataToday.map((data) => {
        return {
          ...data,
          unread: false,
        };
      });
      const updatedPreviousData = dataPrevious.map((data) => {
        return {
          ...data,
          unread: false,
        };
      });
      setDataToday([...updatedTodayData]);
      setDataPrevious([...updatedPreviousData]);
    };
    return html`
      <style>
        ${styles}
      </style>
      <cds-header aria-label="IBM Cloud Pak" class="${storyBlockClass}--header">
        <cds-header-name
          href="/"
          prefix="IBM"
          @click=${(e) => {
            e.preventDefault();
          }}
        >
          Cloud Pak
        </cds-header-name>
        <div class="${carbonPrefix}--header__global">
          <cds-header-global-action
            aria-label="User"
            tooltip-text="User"
            @click=${() => {
              setExpandUserPanel((prev) => !prev);
            }}
          >
            ${expandUserPanel
              ? iconLoader(Close20, { slot: 'icon' })
              : iconLoader(User20, { slot: 'icon' })}
          </cds-header-global-action>
          <cds-header-panel
            id="user-panel"
            .expanded="${expandUserPanel}"
            aria-label="User Panel"
          >
            <div class="${storyBlockClass}__header-panel">
              User account
              <br />
              example panel
            </div>
          </cds-header-panel>
          <cds-header-global-action
            class="${storyBlockClass}__notification-trigger"
            aria-label="Notification"
            tooltip-text="Notification"
            id="trigger-button"
            @click="${toggleButton}"
          >
            ${openPanel
              ? iconLoader(Close20, { slot: 'icon' })
              : isNewNotification
                ? UnreadNotificationBell({ slot: 'icon' })
                : iconLoader(Notification20, { slot: 'icon' })}
          </cds-header-global-action>
          <cds-header-global-action
            aria-label="App Switcher"
            tooltip-text="App Switcher"
            tooltip-alignment="right"
            @click=${() => {
              setExpandPanel((prev) => !prev);
            }}
          >
            ${expandPanel
              ? iconLoader(Close20, { slot: 'icon' })
              : iconLoader(SwitcherIcon20, { slot: 'icon' })}
          </cds-header-global-action>
          <cds-header-panel
            id="switcher-panel"
            .expanded="${expandPanel}"
            aria-label="Header Panel"
          >
            <div class="${storyBlockClass}__header-panel">
              App switcher
              <br />
              example panel
            </div>
          </cds-header-panel>
        </div>
      </cds-header>
      <c4p-notification-panel
        .triggerButtonRef=${triggerButton}
        .open="${openPanel}"
        title-text="${args.titleText}"
        today-text="${args.todayText}"
        previous-text="${args.previousText}"
        dismiss-all-label="${args.dismissAllLabel}"
        empty-state-label="${args.emptyStateLabel}"
        donot-disturb-label="${args.doNotDisturbLabel}"
        date-time-locale="${args.dateTimeLocale}"
        @c4p-notification-dismiss-all=${dismissAllNotification}
        @c4p-notification-click-outside=${clickOutside}
      >
        ${dataToday.length > 0
          ? html`
              ${dataToday.map((item) => {
                return html`
                  <c4p-notification
                    slot="today"
                    .open=${args.open}
                    @click=${item.onNotificationClick}
                    @c4p-notification-dismiss=${() => {
                      notificationSingleDismiss(item.id, 'today');
                    }}
                    type=${item.type}
                    unread=${item.unread}
                    .timestamp=${item.timestamp}
                  >
                    <h4
                      class=${classMap({
                        [`${blockClassNotification}-title`]: true,
                        [`${blockClassNotification}-title-unread`]: item.unread,
                      })}
                      slot="title"
                    >
                      ${item.title}
                    </h4>
                    <c4p-truncated-text
                      slot="description"
                      value=${item.description}
                      lines="2"
                      type="expand"
                      expand-label="Read more"
                      collapse-label="Read less"
                    />
                  </c4p-notification>
                `;
              })}
            `
          : ''}
        ${dataPrevious.length > 0
          ? html`
              ${dataPrevious.map((item) => {
                return html`
                  <c4p-notification
                    slot="previous"
                    @click=${item.onNotificationClick}
                    @c4p-notification-dismiss=${() => {
                      notificationSingleDismiss(item.id, 'previous');
                    }}
                    type=${item.type}
                    unread=${item.unread}
                    .timestamp=${item.timestamp}
                  >
                    <h4
                      class=${classMap({
                        [`${blockClassNotification}-title`]: true,
                        [`${blockClassNotification}-title-unread`]: item.unread,
                      })}
                      slot="title"
                    >
                      ${item.title}
                    </h4>
                    <c4p-truncated-text
                      slot="description"
                      value=${item.description}
                      lines="2"
                      type="expand"
                      expand-label="Read more"
                      collapse-label="Read less"
                    />
                  </c4p-notification>
                `;
              })}
            `
          : ''}
        <c4p-notification-footer
          slot="footer"
          view-all-label="View all (${dataToday.length + dataPrevious.length})"
          @c4p-notification-view-all=${action(`Clicked View All`)}
          @c4p-notification-settings=${action(`Clicked Settings`)}
        ></c4p-notification-footer>
      </c4p-notification-panel>
      <div class="${storyBlockClass}story-container">
        <div class="${storyBlockClass}story-header"></div>
        <div id="page-content-selector" class="${storyBlockClass}story-content">
          <cds-button @click=${addNotification}
            >Add new notification</cds-button
          >
        </div>
      </div>
    `;
  },
};

async function queryShadowElement(hostSelector, targetSelector) {
  const host = document.querySelector(hostSelector);
  await new Promise((resolve) => {
    const checkShadow = () => {
      if (host && host.shadowRoot) {
        resolve(true);
      } else {
        requestAnimationFrame(checkShadow);
      }
    };
    checkShadow();
  });
  return host.shadowRoot.querySelector(targetSelector);
}

const meta = {
  title: 'Components/NotificationPanel',
};

export const Default = {
  ...defaultTemplate,
};

export const EmptyState = {
  ...defaultTemplate,
  play: async ({ userEvent }) => {
    const dismissAllButton = await queryShadowElement(
      'c4p-notification-panel',
      `.${blockClass}__dismiss-button`
    );
    await userEvent.click(dismissAllButton);
  },
};

export default meta;
