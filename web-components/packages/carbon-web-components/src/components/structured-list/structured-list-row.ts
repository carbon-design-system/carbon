/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, query, customElement, LitElement } from 'lit-element';
import CheckmarkFilled16 from '@carbon/icons/lib/checkmark--filled/16';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import RadioGroupManager, { NAVIGATION_DIRECTION, ManagedRadioButtonDelegate } from '../../globals/internal/radio-group-manager';
import styles from './structured-list.scss';

const { prefix } = settings;

/**
 * Map of navigation direction by key.
 */
const navigationDirectionForKey = {
  ArrowUp: NAVIGATION_DIRECTION.BACKWARD,
  Up: NAVIGATION_DIRECTION.BACKWARD, // IE
  ArrowDown: NAVIGATION_DIRECTION.FORWARD,
  Down: NAVIGATION_DIRECTION.FORWARD, // IE
};

/**
 * The interface for `RadioGroupManager` for structured list row.
 */
class StructuredListRowRadioButtonDelegate implements ManagedRadioButtonDelegate {
  /**
   * The structured list row to target.
   */
  private _row: BXStructuredListRow;

  constructor(row: BXStructuredListRow) {
    this._row = row;
  }

  get checked() {
    return this._row.selected;
  }

  set checked(checked) {
    this._row.selected = checked;
    this._row.tabIndex = checked ? 0 : -1;
  }

  get tabIndex() {
    return this._row.tabIndex;
  }

  set tabIndex(tabIndex) {
    this._row.tabIndex = tabIndex;
  }

  get name() {
    return this._row.selectionName;
  }

  compareDocumentPosition(other: StructuredListRowRadioButtonDelegate) {
    return this._row.compareDocumentPosition(other._row);
  }

  focus() {
    this._row.focus();
  }
}

/**
 * Structured list row.
 *
 * @element bx-structured-list-row
 */
@customElement(`${prefix}-structured-list-row`)
class BXStructuredListRow extends HostListenerMixin(LitElement) {
  /**
   * The radio group manager associated with the radio button.
   */
  private _manager: RadioGroupManager | null = null;

  /**
   * The interface for `RadioGroupManager` for structured list row.
   */
  private _radioButtonDelegate = new StructuredListRowRadioButtonDelegate(this);

  /**
   * The hidden radio button.
   */
  @query('#input')
  private _inputNode!: HTMLInputElement;

  /**
   * Handles `click` event on this element.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = () => {
    const { _inputNode: inputNode } = this;
    if (inputNode) {
      this.selected = true;
      if (this._manager) {
        this._manager.select(this._radioButtonDelegate);
      }
    }
  };

  /**
   * Handles `keydown` event on this element.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = (event: KeyboardEvent) => {
    const { _inputNode: inputNode } = this;
    const manager = this._manager;
    if (inputNode && manager) {
      const navigationDirection = navigationDirectionForKey[event.key];
      if (navigationDirection) {
        manager.select(manager.navigate(this._radioButtonDelegate, navigationDirection));
      }
      if (event.key === ' ' || event.key === 'Enter') {
        manager.select(this._radioButtonDelegate);
      }
    }
  };

  /**
   * `true` if this structured list row should be selectable and selected.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The `name` attribute for the `<input>` for selection.
   * If present, this structured list row will be a selectable one.
   */
  @property({ attribute: 'selection-name' })
  selectionName = '';

  /**
   * The `value` attribute for the `<input>` for selection.
   */
  @property({ attribute: 'selection-value' })
  selectionValue = '';

  /**
   * The content to put into the `<title>` attribute of the selection icon.
   */
  @property({ attribute: 'selection-icon-title' })
  selectionIconTitle = '';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'row');
    }
    super.connectedCallback();
    if (!this._manager) {
      this._manager = RadioGroupManager.get(this.getRootNode({ composed: true }) as Document);
      const { selectionName } = this;
      if (selectionName) {
        this._manager?.add(this._radioButtonDelegate);
      }
    }
  }

  disconnectedCallback() {
    if (this._manager) {
      this._manager.delete(this._radioButtonDelegate);
    }
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    const { _manager: manager, selectionName } = this;
    if (changedProperties.has('selectionName')) {
      if (manager) {
        manager.delete(this._radioButtonDelegate, changedProperties.get('selectionName'));
        if (selectionName) {
          manager.add(this._radioButtonDelegate);
        }
      }
      this.setAttribute(
        'tabindex',
        !selectionName || !manager || !manager.shouldBeFocusable(this._radioButtonDelegate) ? '-1' : '0'
      );
    }
  }

  render() {
    const { selected, selectionName, selectionValue, selectionIconTitle } = this;
    if (selectionName) {
      // "Selected" style with `.bx--structured-list-td` does not work somehow - Need investigation
      return html`
        <slot></slot>
        <input
          id="input"
          type="radio"
          class="${prefix}--structured-list-input"
          .checked=${selected}
          name=${selectionName}
          value=${ifDefined(selectionValue)}
        />
        <div class="${prefix}--structured-list-td ${prefix}--structured-list-cell">
          ${CheckmarkFilled16({
            class: `${prefix}--structured-list-svg`,
            title: selectionIconTitle,
          })}
        </div>
      `;
    }
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default BXStructuredListRow;
