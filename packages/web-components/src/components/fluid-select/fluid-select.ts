/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSSelect from '../select/select';
import styles from './fluid-select.scss?lit';
import { classMap } from 'lit/directives/class-map.js';
import { state } from 'lit/decorators.js';

/**
 * Fluid text select.
 *
 * @element cds-fluid-select
 */
@customElement(`${prefix}-fluid-select`)
class CDSFluidSelect extends CDSSelect {
  @state()
  private _hasFocus = false;

  private _handleToggleTipLabelClick = (event: MouseEvent) => {
    const path = event.composedPath();
    const hasLabel = path.some((node) => node instanceof HTMLLabelElement);
    const hasToggleTip = path.some(
      (node) =>
        node instanceof HTMLElement &&
        (node.matches?.(`${prefix}-toggletip`) ||
          node.classList.contains(`${prefix}--toggletip-button`))
    );

    if (hasLabel && hasToggleTip) {
      event.preventDefault();
    }
  };

  private _handleFocusIn = (event: FocusEvent) => {
    if ((event.target as Element | null)?.matches?.('select')) {
      this._hasFocus = true;
    }
  };

  private _handleFocusOut = (event: FocusEvent) => {
    if ((event.target as Element | null)?.matches?.('select')) {
      this._hasFocus = false;
    }
  };

  connectedCallback() {
    this.setAttribute('isFluid', 'true');
    super.connectedCallback();
    this.addEventListener('click', this._handleToggleTipLabelClick, {
      capture: true,
    });
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleToggleTipLabelClick, {
      capture: true,
    });
    super.disconnectedCallback?.();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (
      changedProperties.has('invalid') ||
      changedProperties.has('disabled') ||
      changedProperties.has('readonly') ||
      changedProperties.has('warn')
    ) {
      this.requestUpdate();
    }
  }

  render() {
    const wrapperClasses = classMap({
      [`${prefix}--select`]: true,
      [`${prefix}--select--invalid`]: this.invalid,
      [`${prefix}--select--warning`]: this.warn && !this.invalid,
      [`${prefix}--select--disabled`]: this.disabled,
      [`${prefix}--select--readonly`]: this.readonly,
      [`${prefix}--select--fluid--focus`]: this._hasFocus,
    });
    return html`<div
      class="${wrapperClasses}"
      @focusin="${this._handleFocusIn}"
      @focusout="${this._handleFocusOut}">
      ${super.render()}
    </div>`;
  }

  static styles = [CDSSelect.styles, styles];
}

export default CDSFluidSelect;
