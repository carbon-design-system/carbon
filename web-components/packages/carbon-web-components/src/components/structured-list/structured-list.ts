/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import FocusMixin from '../../globals/mixins/focus';
import CDSStructuredListRow from './structured-list-row';
import styles from './structured-list.scss';

/**
 * Structured list wrapper.
 *
 * @element cds-structured-list
 */
@customElement(`${prefix}-structured-list`)
class CDSStructuredList extends FocusMixin(LitElement) {
  /**
   * The `name` attribute for the `<input>` for selection.
   * If present, this structured list will be a selectable one.
   */
  @property({ attribute: 'selection-name' })
  selectionName = '';

  /**
   * Specify if structured list is condensed, default is false
   */
  @property({ type: Boolean, reflect: true })
  condensed = false;

  /**
   * Specify if structured list is flush, default is false
   */
  @property({ type: Boolean, reflect: true })
  flush = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'table');
    }
    super.connectedCallback();
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('selectionName')) {
      // Propagate `selectionName` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof CDSStructuredList).selectorRowsWithHeader
        ),
        (elem) => {
          (elem as CDSStructuredListRow).selectionName = this.selectionName;
        }
      );
    }
    return true;
  }

  updated(changedProperties) {
    const attributes = ['condensed', 'flush'];
    attributes.forEach((attr) => {
      if (changedProperties.has(attr)) {
        // Propagate watched attribute to descendants until `:host-context()` gets supported in all major browsers
        forEach(
          this.querySelectorAll(
            (this.constructor as typeof CDSStructuredList)
              .selectorRowsWithHeader
          ),
          (elem) => {
            this[`${attr}`]
              ? elem.setAttribute(attr, '')
              : elem.removeAttribute(attr);
          }
        );
      }
    });
  }

  render() {
    const { condensed, flush, selectionName } = this;
    const classes = classMap({
      [`${prefix}--structured-list`]: true,
      [`${prefix}--structured-list--selection`]: Boolean(selectionName),
      [`${prefix}--structured-list--condensed`]: condensed,
      [`${prefix}--structured-list--flush`]: flush,
    });
    return html`
      <section id="section" class=${classes}><slot></slot></section>
    `;
  }

  /**
   * The CSS selector to find the rows, including header rows.
   */
  static selectorRowsWithHeader = `${prefix}-structured-list-row,${prefix}-structured-list-header-row`;
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSStructuredList;
