/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import { forEach } from '../../globals/internal/collection-helpers';
import FocusMixin from '../../globals/mixins/focus';
import BXStructuredListRow from './structured-list-row';
import styles from './structured-list.scss';

const { prefix } = settings;

/**
 * Structured list wrapper.
 *
 * @element bx-structured-list
 */
@customElement(`${prefix}-structured-list`)
class BXStructuredList extends FocusMixin(LitElement) {
  /**
   * The `name` attribute for the `<input>` for selection.
   * If present, this structured list will be a selectable one.
   */
  @property({ attribute: 'selection-name' })
  selectionName = '';

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'table');
    }
    super.connectedCallback();
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('selectionName')) {
      // Propagate `selectionName` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(this.querySelectorAll((this.constructor as typeof BXStructuredList).selectorRowsWithHeader), (elem) => {
        (elem as BXStructuredListRow).selectionName = this.selectionName;
      });
    }
    return true;
  }

  render() {
    const { selectionName } = this;
    const classes = classMap({
      [`${prefix}--structured-list`]: true,
      [`${prefix}--structured-list--selection`]: Boolean(selectionName),
    });
    return html` <section id="section" class=${classes}><slot></slot></section> `;
  }

  /**
   * The CSS selector to find the rows, including header rows.
   */
  static selectorRowsWithHeader = `${prefix}-structured-list-row,${prefix}-structured-list-header-row`;

  static styles = styles;
}

export default BXStructuredList;
