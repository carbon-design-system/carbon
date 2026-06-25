/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import '@carbon/web-components/es/components/modal/index.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { classMap } from 'lit-html/directives/class-map.js';
import styles from './tearsheet-header.scss?lit';
import { tearsheetSignal, updateTearsheetSignals } from './tearsheet-signal';
import { SignalWatcher } from '@lit-labs/signals';
import { registerFocusableContainers } from '../../utilities/manageFocusTrap/manageFocusTrap';

const blockClass = `${prefix}--tearsheet__next`;

/**
 * Tearsheet Header component - Contains the header section with title, description, and actions.
 *
 * @element c4p-tearsheet-header
 * @slot header-content - The main header content area (use c4p-tearsheet-header-content)
 * @slot header-navigation - Navigation tabs or breadcrumbs below the header
 * @slot header-actions - Action buttons in the header (e.g., settings, delete)
 * @slot decorator - AI label or other decorative elements
 * @fires c4p-tearsheet-header-close-button-clicked - Internal event to notify parent tearsheet
 */
@customElement(`${prefix}-tearsheet-header`)
class CDSTearsheetHeader extends SignalWatcher(HostListenerMixin(LitElement)) {
  @property({ reflect: true })
  slot = 'header';

  /**
   * Tooltip text and aria label for the Close button icon.
   */
  @property({ reflect: true, attribute: 'close-icon-description' })
  closeIconDescription: string = 'Close';

  /**
   * Optional parameter to hide the progress indicator when multiple steps are used.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-close-button' })
  hideCloseButton: boolean = false;

  /**
   * Default header collapse/expand while scrolling the main content can be disabled  by setting this
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'disable-header-collapse',
  })
  disableHeaderCollapse: boolean = false;

  @state()
  _hasDecorator = false;

  @state()
  _hasAILabel = false;

  @query('slot[name="decorator"]')
  private decoratorSlot!: HTMLSlotElement;

  /**
   * Handles user-initiated close request of this tearsheet.
   * Dispatches an internal event to notify the parent tearsheet to close.
   *
   * @param triggeredBy The element that triggered this close request.
   */
  private _handleUserInitiatedClose(triggeredBy: EventTarget | null) {
    const init = {
      bubbles: true,
      composed: true,
      detail: {
        triggeredBy,
      },
    };

    // Dispatch internal event to notify parent tearsheet
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSTearsheetHeader).eventCloseButtonClicked,
        init
      )
    );
  }

  connectedCallback() {
    super.connectedCallback();
    // Initialize signal with the initial prop value before any child components connect
    updateTearsheetSignals({
      disableHeaderCollapse: this.disableHeaderCollapse,
    });
  }

  protected firstUpdated() {
    this.updateHeaderOffset();
    // Register with the current tearsheet's uniqueId
    const uniqueId = tearsheetSignal.get().uniqueId;
    if (uniqueId) {
      registerFocusableContainers(this.shadowRoot, uniqueId);
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has('disableHeaderCollapse')) {
      updateTearsheetSignals({
        disableHeaderCollapse: this.disableHeaderCollapse,
      });
    }
    this.updateHeaderOffset();
    this.updateCollapsedAttribute();
  }

  private updateCollapsedAttribute() {
    const { fullyCollapsed, open } = tearsheetSignal.get();

    if (open) {
      if (fullyCollapsed) {
        this.setAttribute('collapsed', '');
      } else {
        this.removeAttribute('collapsed');
      }
    } else {
      this.removeAttribute('collapsed');
    }
  }

  private updateHeaderOffset() {
    const { open, isSm } = tearsheetSignal.get();
    if (open) {
      const assigned = this.decoratorSlot.assignedElements({ flatten: true });

      const decoratorWidth = assigned?.[0]?.getBoundingClientRect().width ?? 0;
      const closeButtonWidth = !this.hideCloseButton ? 24 : 0;
      const offset = decoratorWidth + closeButtonWidth + (isSm ? 8 : 0);

      document.documentElement.style.setProperty(
        '--tearsheet-header-action-offset',
        `${offset}px`
      );
    }
  }

  private _handleDecoratorChange(e: Event) {
    this._hasAILabel = false;
    const childItems = (e.target as HTMLSlotElement).assignedElements();
    this._hasDecorator = childItems.length > 0;
    if (this._hasDecorator) {
      for (const item of childItems) {
        if (item.tagName.toLowerCase() === 'cds-ai-label') {
          this._hasAILabel = true;
          break;
        }
      }
    }
    if (this._hasAILabel || this._hasDecorator) {
      childItems[0].setAttribute('size', 'sm');
      this.setAttribute(this._hasAILabel ? 'ai-label' : 'decorator', '');
      this.removeAttribute(this._hasAILabel ? 'decorator' : 'ai-label');
    } else {
      this.removeAttribute('decorator');
      this.removeAttribute('ai-label');
    }

    this.updateHeaderOffset();
  }
  render() {
    const { fullyCollapsed } = tearsheetSignal.get();
    const classes = classMap({
      [`${blockClass}__header`]: true,
      [`${blockClass}__header--with-close-icon`]: !!this.hideCloseButton,
      [`${blockClass}__header-collapsed`]: !!fullyCollapsed,
    });
    return html`<cds-modal-header class="${classes}">
      <div
        slot="ai-label"
        role="${this._hasDecorator ? 'complementary' : undefined}"
        aria-label="${this._hasDecorator ? 'Decorator' : undefined}"
      >
        <slot
          name="decorator"
          @slotchange=${this._handleDecoratorChange}
        ></slot>
      </div>
      <cds-modal-close-button
        close-button-label=${this.closeIconDescription}
        @click="${this._handleUserInitiatedClose}"
        class="${this.hideCloseButton
          ? `${blockClass}__header--no-close-icon`
          : ''}"
      ></cds-modal-close-button>

      <slot name="header-content"></slot>
      <slot></slot>
      <slot name="navigation-bar"></slot>
    </cds-modal-header>`;
  }

  static styles = styles;

  static get eventCloseButtonClicked() {
    return `${prefix}-tearsheet-header-close-button-clicked`;
  }
}
export default CDSTearsheetHeader;
