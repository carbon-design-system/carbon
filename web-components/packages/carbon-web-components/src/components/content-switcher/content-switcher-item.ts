/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import styles from './content-switcher.scss';

const { prefix } = settings;

/**
 * Content switcher button.
 *
 * @element bx-content-switcher-item
 */
@customElement(`${prefix}-content-switcher-item`)
class BXContentSwitcherItem extends FocusMixin(LitElement) {
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
   * The `value` attribute that is set to the parent `<bx-content-switcher>` when this content switcher item is selected.
   */
  @property()
  value = '';

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('selected') || changedProperties.has('target')) {
      const { selected, target } = this;
      if (target) {
        const doc = this.getRootNode() as HTMLDocument;
        // `doc` can be an element if such element is orphaned
        const targetNode = doc.getElementById && doc.getElementById(target);
        if (targetNode) {
          targetNode.toggleAttribute('hidden', !selected);
        }
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
    return html`
      <button
        type="button"
        role="tab"
        class="${className}"
        ?disabled="${disabled}"
        tabindex="${selected ? '0' : '-1'}"
        aria-controls="${ifNonNull(target)}"
        aria-selected="${Boolean(selected)}"
      >
        <span class="${prefix}--content-switcher__label"><slot></slot></span>
      </button>
    `;
  }

  static styles = styles;
}

export default BXContentSwitcherItem;
