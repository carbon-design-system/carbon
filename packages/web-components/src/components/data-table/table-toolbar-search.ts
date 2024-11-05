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
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { INPUT_SIZE } from '../text-input/text-input';
import CDSSearch from '../search/search';
import styles from './data-table.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Table toolbar search.
 *
 * @element cds-table-toolbar-search
 * @fires cds-search-input - The custom event fired after the search content is changed upon a user gesture.
 */
@customElement(`${prefix}-table-toolbar-search`)
class CDSTableToolbarSearch extends HostListenerMixin(CDSSearch) {
  @query('input')
  private _inputNode!: HTMLInputElement;

  /**
   * Handles user-initiated gestures for expanding the search box.
   */
  private async _handleUserInitiatedExpand() {
    this.expanded = true;
    await this.updateComplete;
    const { _inputNode: inputNode } = this;
    inputNode?.focus();
  }

  /**
   * Handles `focus` event handler on this element.
   */
  @HostListener('focusin')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocusIn() {
    this._handleUserInitiatedExpand();
  }

  /**
   * Handles `blur` event handler on this element.
   *
   * @param event The event.
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocusOut(event: FocusEvent) {
    if (
      !this.contains(event.relatedTarget as Node) &&
      !this.value &&
      !this.persistent
    ) {
      this.expanded = false;
    }
  }

  /**
   * Handles `click` event handler on the search box.
   */
  private _handleSearchClick() {
    this._handleUserInitiatedExpand();
  }

  /**
   * `true` if the search box should be expanded.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * `true` if the search box should be always be open.
   */
  @property({ type: Boolean, reflect: true })
  persistent = false;

  /**
   * The search box size.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.LARGE;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'search');
    }
    super.connectedCallback();
  }

  render() {
    const result = super.render();
    const {
      persistent,
      expanded,
      size,
      _handleSearchClick: handleSearchClick,
    } = this;
    const classes = classMap({
      [`${prefix}--search`]: true,
      [`${prefix}--search--${size}`]: size,
    });
    if (persistent) {
      this.expanded = true;
    }
    return html`
      <div
        class="${classes}"
        tabindex="${expanded ? '-1' : '0'}"
        @click="${handleSearchClick}">
        ${result}
      </div>
    `;
  }

  /**
   * The name of the custom event fired after the search content is changed upon a user gesture.
   */
  static get eventInput() {
    // The code uses on in `<cds-search>`, but definition is done also here for React event generation
    return `${prefix}-search-input`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSTableToolbarSearch;
