/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { classMap } from 'lit-html/directives/class-map.js';
import styles from './tearsheet.scss?lit';
import type { ActionButton, ButtonSize } from '../action-set/index.js';
import { tearsheetSignal } from './tearsheet-signal';
import { SignalWatcher } from '@lit-labs/signals';
import '../action-set/index.js';
import { registerFocusableContainers } from '../../utilities/manageFocusTrap/manageFocusTrap';

const blockClass = `${prefix}--tearsheet__next`;

/**
 * Tearsheet Footer component - Contains action buttons at the bottom of the tearsheet.
 *
 * @element c4p-tearsheet-footer
 * @slot - Default slot for custom footer content (rendered before actions)
 */
@customElement(`${prefix}-tearsheet-footer`)
class CDSTearsheetFooter extends SignalWatcher(HostListenerMixin(LitElement)) {
  @property({ reflect: true })
  slot = 'footer';

  /**
   * Array of action button configurations. Each action is an object with properties
   * like 'kind', 'label', 'disabled', 'onClick', etc.
   * These are passed directly to the action-set component which handles rendering.
   */
  @property({ type: Array })
  actions: ActionButton[] = [];

  /**
   * Optional button size override. If not provided, defaults based on tearsheet variant.
   */
  @property({ attribute: 'button-size' })
  buttonSize?: ButtonSize;

  @query('c4p-action-set')
  private actionSetElement?: HTMLElement;

  private _actionSetRegistered = false;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    // Register with the current tearsheet's uniqueId
    const uniqueId = tearsheetSignal.get().uniqueId;
    if (uniqueId) {
      registerFocusableContainers(this, uniqueId);
    }
  }

  protected updated(_changedProperties: PropertyValues): void {
    // Register action-set shadow root after it's rendered (only once)
    const uniqueId = tearsheetSignal.get().uniqueId;
    if (
      this.actionSetElement?.shadowRoot &&
      uniqueId &&
      !this._actionSetRegistered
    ) {
      registerFocusableContainers(this.actionSetElement.shadowRoot, uniqueId);
      this._actionSetRegistered = true;
    }
  }

  /**
   * Renders the action-set component with actions
   */
  private _renderActions() {
    if (!this.actions || this.actions.length === 0) {
      return null;
    }

    const variant = tearsheetSignal.get().variant;
    const actionSetSize = variant === 'wide' ? '2xl' : 'lg';
    const buttonSize = this.buttonSize || (variant === 'wide' ? '2xl' : 'xl');

    return html`
      <c4p-action-set
        size="${actionSetSize}"
        button-size="${buttonSize}"
        .actions="${this.actions}"
        ?disable-stacking="${true}"
      >
      </c4p-action-set>
    `;
  }

  render() {
    const actionCount = this.actions?.length || 0;
    const classes = classMap({
      [`${blockClass}__footer`]: true,
      [`${blockClass}__footer--three-actions`]: actionCount === 3,
      [`${blockClass}__footer--many-actions`]: actionCount > 3,
    });

    return html`<footer class="${classes}">
      <slot></slot>
      ${this._renderActions()}
    </footer>`;
  }

  static styles = styles;
}

export default CDSTearsheetFooter;
