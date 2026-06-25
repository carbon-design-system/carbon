/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import {
  state,
  property,
  query,
  queryAssignedElements,
} from 'lit/decorators.js';
import { provide } from '@lit/context';
import { prefix } from '../../globals/settings';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import styles from './notification-panel.scss?lit';
import { selectorTabbable } from '@carbon/web-components/es/globals/settings.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { classMap } from 'lit/directives/class-map.js';
import { dateTimeLocaleContext } from './date-time-context';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/toggle/index.js';
import '@carbon/web-components/es/components/icon-button/index.js';
import '@carbon-labs/wc-empty-state/es/index.js';

const blockClass = `${prefix}--notifications-panel`;
/**
 * NotificationPanel.
 *
 * @element c4p-notification-panel
 * @csspart dialog The dialog.
 * @slot today - Today Section.
 * @slot previous - Previous Section.
 * @slot footer - Footer for the Panel.
 * @fires c4p-notification-panel-beingclosed - The custom event before notification-panel is closed.
 * @fires c4p-notification-dismiss-all - The custom event fired after notification-panel is closed upon a user gesture.
 * @fires c4p-notification-donot-disturb-change - The custom event fired after notification-panel is closed upon a user gesture.
 * @fires c4p-notification-click-outside - The custom event fired after user clicks outside the panel or Esc key is pressed.
 */
@customElement(`${prefix}-notification-panel`)
class CDSNotificationPanel extends HostListenerMixin(LitElement) {
  /**
   * Sets the Title for the Notification panel
   */
  @property({ type: String, attribute: 'title-text' })
  titleText;
  /**
   * Sets the Today text for the Notification panel
   */
  @property({ type: String, attribute: 'today-text' })
  todayText;
  /**
   * Sets the Previous section title for the Notification panel
   */
  @property({ type: String, attribute: 'previous-text' })
  previousText;
  /**
   * Determines whether the notifications panel should render or not
   */
  @property({ reflect: true, type: Boolean })
  open = false;
  /**
   * Sets the label text for the "Dismiss all" button in the Notification panel
   */
  @property({ type: String, attribute: 'dismiss-all-label' })
  dismissAllLabel;
  /**
   * Sets the empty state label text when there are no notifications
   */
  @property({ type: String, attribute: 'empty-state-label' })
  emptyStateLabel;
  /**
   * Sets the label text for the "Do Not Disturb" toggle in the Notification panel
   */
  @property({ type: String, attribute: 'donot-disturb-label' })
  doNotDisturbLabel;
  /**
   * Reference to the trigger button
   */
  @property({ type: Object })
  triggerButtonRef?: HTMLElement;

  /**
   * The language for each notification's time stamp.
   * Used with `dateTimeStyle`.
   */
  @property({ type: String, attribute: 'date-time-locale' })
  dateTimeLocale?: string;

  @provide({ context: dateTimeLocaleContext })
  // @ts-ignore
  private _providedLocale: string | undefined;
  @query('slot[name="today"]')
  private todaySlot!: HTMLSlotElement;
  @query('slot[name="previous"]')
  private previousSlot!: HTMLSlotElement;
  @state() // Use @state decorator
  private _hasTodayContent = false;

  @state() // Use @state decorator
  private _hasPreviousContent = false;

  @queryAssignedElements({ slot: 'today', flatten: true })
  _todayElements!: Array<HTMLElement>;

  @queryAssignedElements({ slot: 'previous', flatten: true })
  _previousElements!: Array<HTMLElement>;
  private _mutationObserver?: MutationObserver;

  willUpdate(changedProperties: any) {
    if (changedProperties.has('dateTimeLocale')) {
      this._providedLocale = this.dateTimeLocale;
    }
    if (
      changedProperties.has('_todayElements') ||
      changedProperties.has('_previousElements')
    ) {
      this._hasTodayContent = this._todayElements.length > 0;
      this._hasPreviousContent = this._previousElements.length > 0;
    }
  }

  firstUpdated() {
    this.todaySlot?.addEventListener('slotchange', () =>
      this._handleSlotChange('today')
    );
    this.previousSlot?.addEventListener('slotchange', () =>
      this._handleSlotChange('previous')
    );
    this._markFirstNotification();

    const addNotificationListeners = (slotName: string) => {
      const slot = this.shadowRoot?.querySelector(
        `slot[name="${slotName}"]`
      ) as HTMLSlotElement | null;
      const slottedElements = slot?.assignedElements({ flatten: true }) || [];
      for (const el of slottedElements) {
        el.addEventListener('mouseenter', () => {
          this._handleMouseEnter(el);
        });
        el.addEventListener('mouseleave', () => {
          this._handleMouseLeave(el);
        });
        el.addEventListener('focusin', () => {
          this._handleFocusIn(el);
        });
        el.addEventListener('focusout', () => {
          this._handleFocusOut(el);
        });
      }
    };

    addNotificationListeners('today');
    addNotificationListeners('previous');
  }

  updated() {
    this._markFirstNotification();
    if (this.open) {
      requestAnimationFrame(() => this._tryFocusDismissButton());
    }
  }

  render() {
    const {
      titleText,
      todayText,
      previousText,
      dismissAllLabel,
      emptyStateLabel,
      doNotDisturbLabel,
      open,
      _hasTodayContent,
      _hasPreviousContent,
      _onDismissAllNotifications: onDismissAllNotifications,
      _handleToggle: handleToggle,
    } = this;
    const classes = classMap({
      [`${blockClass}__container`]: true,
      [`${blockClass}__entrance`]: open,
      [`${blockClass}__exit`]: !open,
    });

    const mainSectionClasses = classMap({
      [`${blockClass}__main-section`]: true,
      [`${blockClass}__main-section-empty`]:
        !_hasTodayContent && !_hasPreviousContent,
    });

    return html`
      <div role="dialog" tabindex="0" class=${classes}>
        <div class="${blockClass}__header-container">
          <div class="${blockClass}__header-flex">
            <h2 class="${blockClass}__header">${titleText}</h2>
            <cds-button
              size="sm"
              kind="ghost"
              class="${blockClass}__dismiss-button"
              @click=${onDismissAllNotifications}
            >
              ${dismissAllLabel}
            </cds-button>
          </div>
          <cds-toggle
            size="sm"
            class="${blockClass}__do-not-disturb-toggle"
            id="${blockClass}__do-not-disturb-toggle-component"
            label-a=${doNotDisturbLabel}
            label-b=${doNotDisturbLabel}
            aria-label=${doNotDisturbLabel}
            @cds-toggle-changed=${handleToggle}
          ></cds-toggle>
        </div>
        <div class=${mainSectionClasses}>
          ${_hasTodayContent
            ? html`
                <h3
                  class="${blockClass}__time-section-label ${blockClass}__time-section-label--today"
                >
                  ${todayText}
                </h3>
              `
            : ''}
          <slot name="today"></slot>
          ${_hasPreviousContent
            ? html`
                <h3
                  class="${blockClass}__time-section-label ${blockClass}__time-section-label--previous"
                >
                  ${previousText}
                </h3>
              `
            : ''}
          <slot name="previous"></slot>
          ${!_hasTodayContent && !_hasPreviousContent
            ? html` <slot name="empty-state">
                <clabs-empty-state
                  subtitle="${emptyStateLabel}"
                  kind="notifications"
                >
                </clabs-empty-state>
              </slot>`
            : ''}
        </div>
        ${_hasTodayContent || _hasPreviousContent
          ? html`<div class="${blockClass}__bottom-actions-container">
              <slot name="footer"></slot>
            </div>`
          : ''}
      </div>
    `;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._mutationObserver?.disconnect();
  }

  private _handleMouseEnter(el: Element) {
    const next = el.nextElementSibling;
    if (next?.tagName.toLowerCase() === `${prefix}-notification`) {
      next.classList.add(`${blockClass}__notification--next`);
    }
  }
  private _handleMouseLeave(el: Element) {
    const next = el.nextElementSibling;
    if (next?.tagName.toLowerCase() === `${prefix}-notification`) {
      next.classList.remove(`${blockClass}__notification--next`);
    }
  }
  private _handleFocusIn(el: Element) {
    const next = el.nextElementSibling;
    if (next?.tagName.toLowerCase() === `${prefix}-notification`) {
      next.classList.add(`${blockClass}__notification--next`);
    }
  }
  private _handleFocusOut(el: Element) {
    const next = el.nextElementSibling;
    if (next?.tagName.toLowerCase() === `${prefix}-notification`) {
      next.classList.remove(`${blockClass}__notification--next`);
    }
  }
  private _markFirstNotification() {
    const notifications = this.querySelectorAll(`${prefix}-notification`);
    notifications.forEach((el, i) => {
      el.classList.toggle('first-notification', i === 0);
    });
  }
  private _handleSlotChange(slotName: 'today' | 'previous') {
    slotName === 'today'
      ? (this._hasTodayContent = this._todayElements.length > 0)
      : (this._hasPreviousContent = this._previousElements.length > 0);
  }
  private _tryFocusDismissButton() {
    const button = this.renderRoot.querySelector<HTMLButtonElement>(
      `.${blockClass}__dismiss-button`
    );
    if (button) {
      button.focus();
    } else {
      this._mutationObserver?.disconnect();
      this._mutationObserver = new MutationObserver(() => {
        const btn = this.renderRoot.querySelector<HTMLButtonElement>(
          `.${blockClass}__dismiss-button`
        );
        if (btn) {
          btn.focus();
          this._mutationObserver?.disconnect();
        }
      });

      this._mutationObserver.observe(this.renderRoot, {
        childList: true,
        subtree: true,
      });
    }
  }
  /**
   * Handles user-initiated dismiss of all notifications.
   *
   * @param event The event that triggered the click.
   */
  private _onDismissAllNotifications(event: Event) {
    const triggeredBy = event.target;
    event.stopPropagation();
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSNotificationPanel).eventDismissAll,
        init
      )
    );
  }

  private _handleToggle(event: Event) {
    const triggeredBy = event.target;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (
          this.constructor as typeof CDSNotificationPanel
        ).eventDonotDisturbChange,
        init
      )
    );
  }
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = ({ key, target }: KeyboardEvent) => {
    if (key === 'Escape') {
      this.open = false;
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy: target,
        },
      };

      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSNotificationPanel).eventClickOutside,
          init
        )
      );
      this.triggerButtonRef?.focus();
    }
  };
  // Use @HostListener for global document click events
  @HostListener('document:click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: MouseEvent) => {
    const target = event.target as Node;

    if (!this.open || this.contains(target)) {
      return;
    }
    // Check if the target is an actionable element
    const actionableSelectors = [
      'a',
      'button',
      'input',
      'select',
      'textarea',
      '[role="button"]',
      '[role="link"]',
      '[tabindex]:not([tabindex="-1"]',
      'cds-button',
      'cds-link',
      'cds-accordion-item',
      'cds-breadcrumb-item',
      'cds-icon-button',
      'cds-checkbox',
      'cds-dropdown',
      'cds-dropdown-item',
      'cds-file-uploader',
      'cds-file-uploader-button',
      'cds-menu-button',
      'cds-menu',
      'cds-menu-item',
      'cds-multi-select',
      'cds-multi-select-item',
      'cds-number-input',
      'cds-overflow-menu',
      'cds-overflow-menu-body',
      'cds-overflow-menu-item',
      'cds-pagination',
      'cds-select-item',
      'cds-radio-button',
      'cds-search',
      'cds-select',
      'cds-slider',
      'cds-slider-input',
      'cds-tabs',
      'cds-tab',
      'cds-textarea',
      'cds-text-input',
      'cds-time-picker',
      'cds-time-picker-select',
      'cds-select-item',
      'cds-toggle',
      'cds-toggletip',
    ];
    const isActionable = actionableSelectors.some((selector) => {
      if (!(target instanceof Element)) {
        return false;
      }
      if (target.closest(selector)) {
        return true;
      }
      const root = target.getRootNode();
      return (
        root instanceof ShadowRoot &&
        root.host instanceof Element &&
        root.host.matches(selector)
      );
    });
    if (this.open && this.triggerButtonRef?.contains(target)) {
      return;
    }
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy: target,
      },
    };
    if (
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSNotificationPanel).eventBeforeClose,
          init
        )
      )
    ) {
      this.open = false;
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSNotificationPanel).eventClickOutside,
          init
        )
      );
      if (!isActionable) {
        this.triggerButtonRef?.focus();
      }
    }
  };

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return selectorTabbable;
  }

  /**
   * The name of the custom event fired before this notification-panel is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this notification-panel.
   */
  static get eventBeforeClose() {
    return `${prefix}-notification-panel-beingclosed`;
  }

  /**
   * The name of the custom event fired after this notification-panel is closed upon a user gesture.
   */
  static get eventClickOutside() {
    return `${prefix}-notification-click-outside`;
  }

  /**
   * The name of the custom event fired after dismiss all button click
   */
  static get eventDismissAll() {
    return `${prefix}-notification-dismiss-all`;
  }

  /**
   * The name of the custom event fired after this do not disturb button toggled.
   */
  static get eventDonotDisturbChange() {
    return `${prefix}-notification-donot-disturb-change`;
  }
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSNotificationPanel;
