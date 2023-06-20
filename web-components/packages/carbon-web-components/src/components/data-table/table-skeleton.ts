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
import styles from './data-table.scss';

/**
 * Data table skeleton
 *
 * @element cds-table-skeleton
 */
@customElement(`${prefix}-table-skeleton`)
class CDSTableSkeleton extends LitElement {
  /**
   * Optionally specify the displayed headers
   */
  @property()
  private headers: string[] = [];

  /**
   * Optionally specify whether you want the Skeleton to be rendered as a compact DataTable
   */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /**
   * Specify the number of columns that you want to render in the skeleton state
   */
  @property({ type: Number, reflect: true, attribute: 'column-count' })
  columnCount = 5;

  /**
   * Specify the number of rows that you want to render in the skeleton state
   */
  @property({ type: Number, reflect: true, attribute: 'row-count' })
  rowCount = 5;

  /**
   * Specify if the table header should be rendered as part of the skeleton.
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-header' })
  showHeader = true;

  /**
   * Specify if the table toolbar should be rendered as part of the skeleton.
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-toolbar' })
  showToolbar = true;

  /**
   *  true to add useZebraStyles striping.
   */
  @property({ type: Boolean, reflect: true })
  zebra = false;

  /**
   * @returns The header
   */
  protected _renderHeader() {
    const { showHeader } = this;
    return !showHeader
      ? undefined
      : html`
          <div class="${prefix}--skeleton ${prefix}--data-table-container">
            <div class="${prefix}--data-table-header">
              <div class="${prefix}--data-table-header__title"></div>
              <div class="${prefix}--data-table-header__description"></div>
            </div>
          </div>
        `;
  }

  /**
   * @returns The header
   */
  protected _renderToolbar() {
    const { showToolbar } = this;
    return !showToolbar
      ? undefined
      : html`
          <section class="${prefix}--table-toolbar">
            <div class="${prefix}--toolbar-content">
              <span
                class="${prefix}--skeleton ${prefix}--btn ${prefix}--btn--sm"></span>
            </div>
          </section>
        `;
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'table');
    }
    super.connectedCallback();
  }

  updated() {
    if (this.headers.length) {
      this.columnCount = this.headers.length;
    } else {
      this.headers = Array(this.columnCount).fill('');
    }
  }

  render() {
    const { compact, columnCount, headers, rowCount, zebra } = this;
    const classes = classMap({
      [`${prefix}--skeleton`]: true,
      [`${prefix}--data-table`]: true,
      [`${prefix}--data-table--compact`]: compact,
      [`${prefix}--data-table--zebra`]: zebra,
    });
    return html`
      ${this._renderHeader()} ${this._renderToolbar()}

      <table class="${classes}">
        <thead>
          <tr>
            ${Array.from(new Array(columnCount)).map(
              (_, index) =>
                html`
                  <th>
                    <div class="${prefix}--table-header-label">
                      ${headers[index]}
                    </div>
                  </th>
                `
            )}
          </tr>
        </thead>
        <tbody>
          ${Array.from(new Array(rowCount)).map(
            (_) =>
              html`
                <tr>
                  ${Array.from(new Array(columnCount)).map(
                    (_) =>
                      html`
                        <td>
                          <span></span>
                        </td>
                      `
                  )}
                </tr>
              `
          )}
        </tbody>
      </table>
    `;
  }

  static styles = styles;
}

export default CDSTableSkeleton;
