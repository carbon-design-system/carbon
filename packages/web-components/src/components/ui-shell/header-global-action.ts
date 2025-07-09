/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import {
  BUTTON_TOOLTIP_POSITION,
  BUTTON_KIND,
  BUTTON_SIZE,
} from '../button/button';
import CDSButton from '../button/button';
import HostListener from '../../globals/decorators/host-listener';
import styles from './header.scss?lit';
import { prefix } from '../../globals/settings';

/**
 * Header global action button
 *
 * @element cds-header-global-action
 */
@customElement(`${prefix}-header-global-action`)
class CDSHeaderGlobalAction extends CDSButton {
  @query('button')
  protected _buttonNode!: HTMLButtonElement;

  /**
   * Specify whether the action is currently active
   */
  @property({ type: Boolean, reflect: true })
  active;

  /**
   * Specify which header panel the button is associated with.
   */
  @property({ type: String, attribute: 'panel-id', reflect: true })
  panelId;

  /**
   * The `aria-label` attribute for the button in its active state.
   */
  @property({ attribute: 'button-label-active' })
  buttonLabelActive;

  /**
   * The `aria-label` attribute for the button in its inactive state.
   */
  @property({ attribute: 'button-label-inactive' })
  buttonLabelInactive;

  connectedCallback() {
    this.tooltipPosition = BUTTON_TOOLTIP_POSITION.BOTTOM;
    this.kind = BUTTON_KIND.GHOST;
    this.size = BUTTON_SIZE.LARGE;
    super.connectedCallback();
  }

  firstUpdated() {
    document.addEventListener('click', this._handleDocumentClick, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._handleDocumentClick, true);
    super.disconnectedCallback();
  }

  private _handleDocumentClick = (event: MouseEvent) => {
    const panel = this.ownerDocument?.querySelector(`#${this.panelId}`);
    const target = event.composedPath()[0] as HTMLElement;

    if (panel && !this.contains(target) && !panel.contains(target)) {
      panel.removeAttribute('expanded');
      this.active = false;
    }
  };

  @HostListener('focusout')
  // @ts-ignore
  private _handleFocusOut(event: FocusEvent) {
    const panel = this.ownerDocument?.querySelector(`#${this.panelId}`);
    const relatedTarget = event.relatedTarget as HTMLElement;

    if (
      panel &&
      relatedTarget &&
      !this.contains(relatedTarget) &&
      !panel.contains(relatedTarget)
    ) {
      panel.removeAttribute('expanded');
      this.active = false;
    }
  }

  @HostListener('click', { capture: true })
  // @ts-ignore
  private _handleClick(event: Event) {
    const { disabled } = this;
    if (disabled) {
      event.stopPropagation();
    } else {
      const panel = this.ownerDocument?.querySelector(`#${this.panelId}`);

      // see if there is related panel for header-global-action button first
      // and then set the expanded attr of it accordingly
      if (panel) {
        const expanded = panel.getAttribute('expanded');

        if (expanded) {
          panel.removeAttribute('expanded');
        } else {
          panel.setAttribute('expanded', 'true');
        }

        const active = !this.active;
        this.active = active;
      }
    }
  }

  @HostListener('keydown', { capture: true })
  // @ts-ignore
  private _handleKeyDown(event: KeyboardEvent) {
    const { key } = event;
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      this._handleClick(event);
    } else if (key === 'Escape') {
      const panel = this.ownerDocument?.querySelector(`#${this.panelId}`);
      if (panel) {
        panel.removeAttribute('expanded');
      }
      this.active = false;
    }
  }

  updated() {
    if (this._buttonNode) {
      this._buttonNode.classList.add(`${prefix}--header__action`);
    }
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('active')) {
      if (this.active) {
        this._buttonNode.classList.add(`${prefix}--header__action--active`);

        if (this.buttonLabelActive) {
          this.tooltipText = this.buttonLabelActive;
        }
      } else {
        this._buttonNode.classList.remove(`${prefix}--header__action--active`);

        if (this.buttonLabelInactive) {
          this.tooltipText = this.buttonLabelInactive;
        }
      }
    }
    return true;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles;
}

export default CDSHeaderGlobalAction;
