/**
 * Copyright IBM Corp. 2023, 2026
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
    const doc = this.ownerDocument;
    doc.addEventListener('click', this._handleDocumentClick, true);
    doc.addEventListener('focusin', this._handleDocumentFocusIn, true);
    doc.addEventListener('focusout', this._handleDocumentFocusOut, true);
  }

  disconnectedCallback() {
    const doc = this.ownerDocument;
    doc.removeEventListener('click', this._handleDocumentClick, true);
    doc.removeEventListener('focusin', this._handleDocumentFocusIn, true);
    doc.removeEventListener('focusout', this._handleDocumentFocusOut, true);
    super.disconnectedCallback();
  }

  private _handleDocumentClick = (event: MouseEvent) => {
    this._closePanelIfOutside(event.composedPath(), false);
  };

  private _handleDocumentFocusIn = (event: FocusEvent) => {
    this._closePanelIfOutside(event.composedPath(), true);
  };

  private get _panel() {
    return this.panelId
      ? this.ownerDocument.getElementById(this.panelId)
      : null;
  }

  private _handleDocumentFocusOut = (event: FocusEvent) => {
    const panel = this._panel;
    if (
      !panel?.hasAttribute('expanded') ||
      !this._isInsidePanel(panel, event.composedPath(), true)
    ) {
      return;
    }

    if (event.relatedTarget) {
      this._closePanelIfOutside([event.relatedTarget], true);
    } else if (
      panel.querySelector(`${prefix}-switcher`) &&
      !this.matches(':active')
    ) {
      // Safari blurs the focused action before a mouse click toggles the panel.
      this._closePanel(panel);
    }
  };

  private _isInsidePanel(
    panel: Element,
    path: EventTarget[],
    movingFocus: boolean
  ) {
    const header =
      movingFocus &&
      panel.querySelector(`${prefix}-switcher`) &&
      panel.closest(`${prefix}-header`);
    return path.some(
      (el) =>
        el instanceof Element &&
        (panel.contains(el) ||
          this.contains(el) ||
          (header &&
            el.closest(`${prefix}-header-global-action`) &&
            el.closest(`${prefix}-header`) === header))
    );
  }

  private _closePanelIfOutside(path: EventTarget[], movingFocus: boolean) {
    const panel = this._panel;
    if (panel && !this._isInsidePanel(panel, path, movingFocus)) {
      this._closePanel(panel);
    }
  }

  private _closePanel(panel: Element) {
    panel.removeAttribute('expanded');
    this.active = false;
  }

  @HostListener('click', { capture: true })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore
  private _handleClick(event: Event) {
    const { disabled } = this;
    if (disabled) {
      event.stopPropagation();
    } else {
      const panel = this._panel;

      // see if there is related panel for header-global-action button first
      // and then set the expanded attr of it accordingly
      if (panel) {
        const expanded = panel.hasAttribute('expanded');

        panel.toggleAttribute('expanded', !expanded);

        const active = !this.active;
        this.active = active;
      }
    }
  }

  @HostListener('keydown', { capture: true })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore
  private _handleKeyDown(event: KeyboardEvent) {
    const { key } = event;
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      this._handleClick(event);
    } else if (key === 'Escape') {
      const panel = this._panel;
      if (panel) {
        panel.removeAttribute('expanded');
      }
      this.active = false;
    }
  }

  updated(changedProperties) {
    if (this._buttonNode) {
      this._buttonNode.classList.add(`${prefix}--header__action`);

      if (changedProperties.has('active') || changedProperties.size === 0) {
        if (this.active) {
          this._buttonNode.classList.add(`${prefix}--header__action--active`);

          if (this.buttonLabelActive) {
            this.tooltipText = this.buttonLabelActive;
          }
        } else {
          this._buttonNode.classList.remove(
            `${prefix}--header__action--active`
          );

          if (this.buttonLabelInactive) {
            this.tooltipText = this.buttonLabelInactive;
          }
        }
      }
    }
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('active') && this._buttonNode) {
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
