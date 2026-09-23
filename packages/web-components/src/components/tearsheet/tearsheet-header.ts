/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import '../modal/index';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { classMap } from 'lit-html/directives/class-map.js';
import styles from './tearsheet-header.scss?lit';
import { tearsheetSignal, updateTearsheetSignals } from './tearsheet-signal';
import { SignalWatcher } from '@lit-labs/signals';
import { registerFocusableContainers } from '../../utilities/manageFocusTrap/manageFocusTrap';

const blockClass = `${prefix}--tearsheet`;

/**
 * Tearsheet Header component - Contains the header section with title, description, and actions.
 * The decorator (AI label) and close button are now rendered inside cds-tearsheet-header-content
 * to achieve the correct DOM tab order: header-actions → decorator → close → header-content.
 *
 * @element cds-tearsheet-header
 * @slot header-content - The main header content area (use cds-tearsheet-header-content)
 * @slot - Default slot for other content
 * @slot navigation-bar - Navigation tabs or breadcrumbs below the header
 * @fires cds-tearsheet-header-collapse-change - Internal event; parent tearsheet re-dispatches
 *   this as the public `cds-tearsheet-collapse-change` event.
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

  connectedCallback() {
    super.connectedCallback();
    // Initialize signal with the initial prop values before any child components connect
    updateTearsheetSignals({
      disableHeaderCollapse: this.disableHeaderCollapse,
      closeIconDescription: this.closeIconDescription,
      hideCloseButton: this.hideCloseButton,
    });
  }

  protected firstUpdated() {
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
    if (_changedProperties.has('closeIconDescription')) {
      updateTearsheetSignals({
        closeIconDescription: this.closeIconDescription,
      });
    }
    if (_changedProperties.has('hideCloseButton')) {
      updateTearsheetSignals({ hideCloseButton: this.hideCloseButton });
    }
    this.updateCollapsedAttribute();
  }

  private updateCollapsedAttribute() {
    const { fullyCollapsed, open } = tearsheetSignal.get();
    const wasCollapsed = this.hasAttribute('collapsed');

    if (open) {
      if (fullyCollapsed) {
        this.setAttribute('collapsed', '');
      } else {
        this.removeAttribute('collapsed');
      }
    } else {
      this.removeAttribute('collapsed');
    }

    // Dispatch a single unified event only when the state actually changes
    const isNowCollapsed = this.hasAttribute('collapsed');
    if (isNowCollapsed !== wasCollapsed) {
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSTearsheetHeader).eventCollapseChange,
          {
            bubbles: true,
            composed: true,
            detail: { collapsed: isNowCollapsed },
          }
        )
      );
    }
  }

  render() {
    const { fullyCollapsed } = tearsheetSignal.get();
    const classes = classMap({
      [`${blockClass}__header`]: true,
      [`${blockClass}__header--with-close-icon`]: !!this.hideCloseButton,
      [`${blockClass}__header-collapsed`]: !!fullyCollapsed,
    });
    return html`<cds-modal-header class="${classes}">
      <slot name="header-content"></slot>
      <slot></slot>
      <slot name="navigation-bar"></slot>
    </cds-modal-header>`;
  }

  static styles = styles;

  static get eventCloseButtonClicked() {
    return `${prefix}-tearsheet-header-close-button-clicked`;
  }

  /**
   * Internal event fired when the collapse state changes.
   * The parent `cds-tearsheet` intercepts this and re-dispatches it as
   * the public `cds-tearsheet-collapse-change` event.
   */
  static get eventCollapseChange() {
    return `${prefix}-tearsheet-header-collapse-change`;
  }
}
export default CDSTearsheetHeader;
