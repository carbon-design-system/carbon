/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import styles from './content-switcher.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Content switcher button.
 *
 * @element cds-content-switcher-item
 */
@customElement(`${prefix}-content-switcher-item`)
export default class CDSContentSwitcherItem extends FocusMixin(LitElement) {
  /**
   * `true` if this content switcher item should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` to hide the divider at the left.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-divider' })
  hideDivider = false;

  /**
   * `true` if the content switcher button should be selected.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The element ID of target panel.
   */
  @property()
  target!: string;

  /**
   * The `value` attribute that is set to the parent `<cds-content-switcher>`
   * when this content switcher item is selected.
   */
  @property()
  value = '';

  /**
   * `true` if the content switcher button should be icon-only.
   */
  @property({ type: Boolean, reflect: true })
  icon = false;

  /**
   * Specify how the trigger should align with the tooltip for icon-only
   * switcher item
   */
  @property({ reflect: true, type: String })
  align = 'top';

  /**
   * Determines whether the tooltip should close when inner content is
   * activated (click, Enter or Space)
   */
  @property({ attribute: 'close-on-activation', reflect: true, type: Boolean })
  closeOnActivation = true;

  /**
   * Specify the duration in milliseconds to delay before displaying the
   * tooltip for icon-only switcher item
   */
  enterDelayMs = 100;

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   * for icon-only switcher-item
   *
   * TODO: match upstream value once #10471 is resolved
   */
  leaveDelayMs = 100;

  updated(changedProperties) {
    if (changedProperties) {
      this.shadowRoot
        ?.querySelector(`${prefix}-tooltip`)
        ?.shadowRoot?.querySelector(`.${prefix}--tooltip`)
        ?.classList.add(`${prefix}--icon-tooltip`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected _renderTooltipContent() {
    return html`
      <cds-tooltip-content>
        <slot name="tooltip-content"></slot>
      </cds-tooltip-content>
    `;
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('selected') || changedProperties.has('target')) {
      const { selected, target } = this;
      if (target) {
        const doc = this.getRootNode() as HTMLDocument;
        // `doc` can be an element if such element is orphaned
        const targetNode = doc?.getElementById(target);
        targetNode?.toggleAttribute('hidden', !selected);
      }
    }
    return true;
  }

  render() {
    const { disabled, selected, target } = this;
    const className = classMap({
      [`${prefix}--content-switcher-btn`]: true,
      [`${prefix}--content-switcher--selected`]: selected,
    });
    const switcherItem = html`<button
      type="button"
      role="tab"
      class="${className}"
      ?disabled="${disabled}"
      tabindex="${selected ? '0' : '-1'}"
      aria-controls="${ifDefined(target)}"
      aria-selected="${Boolean(selected)}">
      <span class="${prefix}--content-switcher__label"><slot></slot></span>
    </button>`;

    if (this.icon) {
      const { align, closeOnActivation, enterDelayMs, leaveDelayMs } = this;
      return html`<cds-tooltip
        align=${align}
        close-on-activation="${closeOnActivation}"
        enter-delay-ms=${enterDelayMs}
        leave-delay-ms=${leaveDelayMs}>
        ${switcherItem} ${this._renderTooltipContent()}
      </cds-tooltip>`;
    }
    return switcherItem;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}
