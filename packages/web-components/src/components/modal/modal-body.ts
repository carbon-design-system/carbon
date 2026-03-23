/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './modal.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Modal body.
 *
 * @element cds-modal-body
 */
@customElement(`${prefix}-modal-body`)
class CDSModalBody extends LitElement {
  private userDefinedTabindex: string | null = null;
  private _resizeObserver?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback?.();
    // Store the tabindex if user set it initially
    if (this.hasAttribute('tabindex')) {
      this.userDefinedTabindex = this.getAttribute('tabindex');
    }
    this._resizeObserver = new ResizeObserver(() => this.checkScroll());
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    super.disconnectedCallback?.();
  }

  protected _getAriaLabelledBy() {
    const modal = this.closest(`${prefix}-modal`);
    if (!modal) return null;

    const labelEl = modal.querySelector(`${prefix}-modal-label`);
    if (labelEl?.id) return labelEl.id;

    const headingEl = modal.querySelector(`${prefix}-modal-heading`);
    if (headingEl?.id) return headingEl.id;

    return null;
  }

  protected _parentHasScrollingContent() {
    const modal = this.closest(`${prefix}-modal`);
    return modal?.hasAttribute('has-scrolling-content') ?? false;
  }

  // TODO: add test coverage for setting the respective labels, attributes, and roles when the modal body is scrollable
  checkScroll() {
    const hasScroll = this.scrollHeight > this.clientHeight;
    const hasScrollingContent = this._parentHasScrollingContent();
    const hasAutoAlign = this.querySelector('[autoalign]') !== null;

    if (this.clientHeight <= 300 || hasAutoAlign) {
      this.setAttribute('no-fade', '');
    } else {
      this.removeAttribute('no-fade');
    }

    // Respect user-defined tabindex
    if (this.userDefinedTabindex !== null) return;

    if (hasScrollingContent || hasScroll) {
      this.setAttribute('tabindex', '0');
      this.setAttribute('is-scrollable', '');
      this.setAttribute('role', 'region');

      const ariaLabelledBy = this._getAriaLabelledBy();
      if (ariaLabelledBy) {
        this.setAttribute('aria-labelledby', ariaLabelledBy);
      }
    } else if (!hasScrollingContent) {
      this.removeAttribute('tabindex');
      this.removeAttribute('is-scrollable');
      this.removeAttribute('role');
      this.removeAttribute('aria-labelledby');
    }
  }

  render() {
    return html` <slot @slotchange=${this.checkScroll}></slot> `;
  }

  static styles = styles;
}

export default CDSModalBody;
