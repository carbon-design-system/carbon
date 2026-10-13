/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './data-table.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Table toolbar content.
 *
 * @element cds-table-toolbar-content
 */
@customElement(`${prefix}-table-toolbar-content`)
class CDSTableToolbarContent extends LitElement {
  /**
   * Children that had a `size` attribute before the toolbar managed them.
   */
  private _childrenWithUserSize = new WeakSet<Element>();

  /**
   * Children whose `size` attribute was set by this toolbar.
   */
  private _childrenWithToolbarSize = new WeakSet<Element>();

  /**
   * Children whose `size` attribute was reflected by the child component.
   */
  private _childrenWithReflectedSize = new WeakSet<Element>();

  /**
   * `true` once initial child sizes have been captured.
   */
  private _hasCapturedInitialChildSizes = false;

  /**
   * `true` if the toolbar size changed before initial child sizes were captured.
   */
  private _shouldUpdateChildSizes = false;

  /**
   * Watches for child components reflecting their default `size`.
   */
  private _observer = new MutationObserver((records) => {
    records.forEach(({ attributeName, oldValue, target }) => {
      if (
        attributeName === 'size' &&
        oldValue === null &&
        !this._childrenWithToolbarSize.has(target as Element)
      ) {
        this._childrenWithReflectedSize.add(target as Element);
        this._childrenWithUserSize.delete(target as Element);
      }
    });
  });

  /**
   * `true` if this batch actions bar is active.
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-batch-actions' })
  hasBatchActions = false;

  /**
   * Table toolbar contents size
   */
  @property({ reflect: true })
  size;

  connectedCallback() {
    super.connectedCallback();

    this._observer.observe(this, {
      attributes: true,
      attributeFilter: ['size'],
      attributeOldValue: true,
      subtree: true,
    });
  }

  disconnectedCallback() {
    this._observer.disconnect();
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (this.hasBatchActions) {
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('tabindex');
    }

    if (changedProperties.has('size')) {
      if (!this._hasCapturedInitialChildSizes) {
        this._shouldUpdateChildSizes = true;
        return;
      }

      this._updateChildSizes();
    }
  }

  private _handleSlotChange({ target }) {
    (target as HTMLSlotElement).assignedElements().forEach((e) => {
      if (e.hasAttribute('size') && !this._childrenWithReflectedSize.has(e)) {
        this._childrenWithUserSize.add(e);
      }
    });

    this._hasCapturedInitialChildSizes = true;

    if (this._shouldUpdateChildSizes || this.size) {
      this._shouldUpdateChildSizes = false;
      this._updateChildSizes();
    }
  }

  private _updateChildSizes() {
    const size = this.size === 'md' || this.size === 'xl' ? 'lg' : this.size;

    [...this.children].forEach((e) => {
      if (
        this._childrenWithUserSize.has(e) &&
        !this._childrenWithToolbarSize.has(e)
      ) {
        return;
      }

      e.setAttribute('size', size);
      this._childrenWithToolbarSize.add(e);
    });
  }

  render() {
    return html` <slot @slotchange="${this._handleSlotChange}"></slot> `;
  }

  static styles = styles;
}

export default CDSTableToolbarContent;
