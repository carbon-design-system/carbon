/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './list.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export type UnorderedListMarkerType =
  | 'disc'
  | 'circle'
  | 'square'
  | 'hyphen'
  | 'custom';

/**
 * Unordered list.
 *
 * @element cds-unordered-list
 */
@customElement(`${prefix}-unordered-list`)
class CDSUnorderedList extends LitElement {
  /**
   * `true` if expressive theme enabled.
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-expressive' })
  isExpressive = false;

  /**
   * Specify whether the list is nested, or not
   */
  @property({ type: Boolean })
  nested = false;

  /**
   * Specify the marker type for the list items.
   * - `disc`: filled circle (•)
   * - `circle`: hollow circle (○)
   * - `square`: filled square (▪)
   * - `hyphen`: en dash (default for top-level lists) (–)
   * - `custom`: custom marker (requires `customMarker` attribute)
   */
  @property({ reflect: true })
  type?: UnorderedListMarkerType;

  /**
   * Specify a custom marker character/content.
   * Only used when `type="custom"`.
   * The value will be used as the CSS content for the marker.
   */
  @property({ attribute: 'custom-marker' })
  customMarker?: string;

  private _hasWarnedAboutDeprecation = false;

  connectedCallback() {
    if (
      this.closest(
        (this.constructor as typeof CDSUnorderedList).selectorListItem
      ) ||
      this.nested
    ) {
      this.setAttribute('slot', 'nested');
    } else {
      this.removeAttribute('slot');
    }

    // Show deprecation warning for nested lists without explicit type
    if (
      (this.getAttribute('slot') === 'nested' || this.nested) &&
      !this.type &&
      !this._hasWarnedAboutDeprecation &&
      process.env.NODE_ENV !== 'production'
    ) {
      // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
      console.warn(
        'Nested unordered lists without an explicit `type` attribute will default to ' +
          'square markers. This behavior is deprecated. Please explicitly set ' +
          '`type="square"` (or another marker type) for nested lists. ' +
          'In the next major release, nested lists will inherit the parent list\'s marker type.'
      );
      this._hasWarnedAboutDeprecation = true;
    }

    super.connectedCallback();
  }

  /**
   * Get the effective marker type, considering inheritance from parent
   */
  private _getMarkerType(): UnorderedListMarkerType {
    if (this.type) {
      return this.type;
    }

    // Check if nested and try to inherit from parent
    const isNested =
      this.getAttribute('slot') === 'nested' || this.nested;
    
    if (isNested) {
      // Try to get parent's type
      const parentList = this.closest(
        (this.constructor as typeof CDSUnorderedList).selectorUnorderedList
      ) as CDSUnorderedList | null;
      
      if (parentList?.type) {
        return parentList.type;
      }
      
      // Default to square for nested (backward compatible)
      return 'square';
    }

    // Default to hyphen for top-level
    return 'hyphen';
  }

  render() {
    const markerType = this._getMarkerType();
    const isNested =
      this.getAttribute('slot') === 'nested' || this.nested;

    const classes = classMap({
      [`${prefix}--list--unordered`]: true,
      [`${prefix}--list--nested`]: isNested,
      [`${prefix}--list--expressive`]: this.isExpressive,
      [`${prefix}--list--marker-${markerType}`]: markerType,
    });

    // Set custom marker CSS variable if needed
    const customStyle =
      markerType === 'custom' && this.customMarker
        ? {
            [`--${prefix}--list--marker-content`]: `'${this.customMarker}'`,
          }
        : {};

    return html`
      <ul
        class="${classes}"
        style="${Object.entries(customStyle)
          .map(([key, value]) => `${key}: ${value}`)
          .join('; ')}"
      >
        <slot></slot>
      </ul>
    `;
  }

  /**
   * A selector that will return list item.
   */
  static get selectorListItem() {
    return `${prefix}-list-item`;
  }

  /**
   * A selector that will return unordered list.
   */
  static get selectorUnorderedList() {
    return `${prefix}-unordered-list`;
  }

  static styles = styles;
}

export default CDSUnorderedList;
