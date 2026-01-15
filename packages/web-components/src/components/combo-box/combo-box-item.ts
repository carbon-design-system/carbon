/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { PropertyValues } from 'lit';
import { prefix } from '../../globals/settings';
import CDSDropdownItem from '../dropdown/dropdown-item';
import styles from './combo-box.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

type NextSiblingAttribute =
  | 'hovered-next-sibling'
  | 'highlighted-next-sibling'
  | 'selected-next-sibling';

/**
 * Combo box item.
 *
 * @element cds-combo-box-item
 */
@customElement(`${prefix}-combo-box-item`)
class CDSComboBoxItem extends CDSDropdownItem {
  private _nextSiblingRefs: Record<NextSiblingAttribute, Element | null> = {
    'hovered-next-sibling': null,
    'highlighted-next-sibling': null,
    'selected-next-sibling': null,
  };

  private _handleMouseEnter = () => {
    if (this.hasAttribute('disabled')) {
      return;
    }
    this._syncNextSibling('hovered-next-sibling', true);
  };

  private _handleMouseLeave = () => {
    this._syncNextSibling('hovered-next-sibling', false);
  };

  connectedCallback() {
    super.connectedCallback();
    this.classList.add(`${prefix}--list-box__menu-item`);
    this.addEventListener('mouseenter', this._handleMouseEnter);
    this.addEventListener('mouseleave', this._handleMouseLeave);
  }

  disconnectedCallback() {
    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);
    this._syncNextSibling('hovered-next-sibling', false);
    this._syncNextSibling('highlighted-next-sibling', false);
    this._syncNextSibling('selected-next-sibling', false);
    super.disconnectedCallback();
  }

  private _getNextItem(): Element | null {
    let next = this.nextElementSibling;
    while (next) {
      if (
        next instanceof HTMLElement &&
        next.tagName.toLowerCase() === `${prefix}-combo-box-item`
      ) {
        return next;
      }
      next = next.nextElementSibling;
    }
    return null;
  }

  private _syncNextSibling(
    attribute: NextSiblingAttribute,
    shouldSet: boolean
  ) {
    const currentSibling = this._nextSiblingRefs[attribute];
    currentSibling?.removeAttribute(attribute);
    if (shouldSet) {
      const next = this._getNextItem();
      if (next) {
        next.setAttribute(attribute, '');
        this._nextSiblingRefs[attribute] = next;
        return;
      }
    }
    this._nextSiblingRefs[attribute] = null;
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('highlighted')) {
      this._syncNextSibling('highlighted-next-sibling', this.highlighted);
    }
    if (changedProperties.has('selected')) {
      this._syncNextSibling('selected-next-sibling', this.selected);
    }
  }

  static styles = styles;
}

export default CDSComboBoxItem;
