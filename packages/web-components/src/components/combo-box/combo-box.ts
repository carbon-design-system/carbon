/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { TemplateResult, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import Close16 from '@carbon/icons/es/close/16.js';
import { findIndex, forEach } from '../../globals/internal/collection-helpers';
import CDSDropdown, { DROPDOWN_KEYBOARD_ACTION } from '../dropdown/dropdown';
import CDSComboBoxItem from './combo-box-item';
import { iconLoader } from '../../globals/internal/icon-loader';
import styles from './combo-box.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { ifDefined } from 'lit/directives/if-defined.js';
import ifNonEmpty from '../../globals/directives/if-non-empty';

export { DROPDOWN_DIRECTION, DROPDOWN_SIZE } from '../dropdown/dropdown';

/**
 * Combo box.
 *
 * @element cds-combo-box
 * @fires cds-combo-box-beingselected
 *   The custom event fired before a combo box item is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires cds-combo-box-beingtoggled
 *   The custom event fired before the open state of this combo box is toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated toggling.
 * @fires cds-combo-box-selected - The custom event fired after a combo box item is selected upon a user gesture.
 * @fires cds-combo-box-toggled - The custom event fired after the open state of this combo box is toggled upon a user gesture.
 */
@customElement(`${prefix}-combo-box`)
class CDSComboBox extends CDSDropdown {
  /**
   * The text content that should be set to the `<input>` for filtering.
   */
  protected _filterInputValue = '';

  protected _originalItems: CDSComboBoxItem[] = [];

  protected _shouldTriggerBeFocusable = false;

  /**
   * The `<input>` for filtering.
   */
  @query('input')
  private _filterInputNode!: HTMLInputElement;

  /**
   * The menu containing all selectable items.
   */
  @query('#menu-body')
  private _itemMenu!: HTMLElement;

  /**
   * The selection button.
   */
  @query('#selection-button')
  private _selectionButtonNode!: HTMLElement;

  /**
   * @param item A combo box item.
   * @returns `true` if the given combo box item matches the query text user types.
   */
  protected _testItemWithQueryText(item: CDSComboBoxItem): boolean {
    const raw = this._filterInputNode?.value ?? '';
    const inputValue = raw.trim().toLowerCase();

    if (typeof this.shouldFilterItem === 'function') {
      return this.shouldFilterItem({ item, inputValue });
    }

    if (typeof this.itemMatches === 'function') {
      return this.itemMatches(item, inputValue);
    }

    return this._defaultItemMatches(item, inputValue);
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();
    // capture direct light-DOM children only, in author/source order
    this._originalItems = Array.from(
      this.querySelectorAll(
        ':scope > ' + (this.constructor as typeof CDSComboBox).selectorItem
      )
    ) as CDSComboBoxItem[];
  }

  /**
   * The default item matching callback.
   *
   * @param item The combo box item.
   * @param queryText The query text user types.
   * @returns `true` if the given combo box item matches the given query text.
   */
  protected _defaultItemMatches(
    item: CDSComboBoxItem,
    queryText: string
  ): boolean {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      item.textContent!.toLowerCase().indexOf(queryText.toLowerCase()) >= 0
    );
  }

  /**
   * Handles `input` event on the `<input>` for filtering.
   */
  protected async _handleInput() {
    if (this._filterInputValue.length !== 0) {
      this.setAttribute('isClosable', '');
    } else {
      this.removeAttribute('isClosable');
    }

    // lazy-init original list if not set
    if (!this._originalItems || this._originalItems.length === 0) {
      this._originalItems = Array.from(
        this.querySelectorAll(
          (this.constructor as typeof CDSComboBox).selectorItem
        )
      ) as CDSComboBoxItem[];
    }

    const raw = this._filterInputNode?.value ?? '';
    const hasInput = Boolean(raw);
    const visible = hasInput
      ? this._originalItems.filter((it) => this._testItemWithQueryText(it))
      : [...this._originalItems];

    // Rebuild the visible menu, preserving element instances
    // assume `visible` is defined as an array of CDSComboBoxItem that matched
    if (this._itemMenu) {
      // remove any current item nodes inside the menu
      const existing = Array.from(
        this._itemMenu.querySelectorAll(
          (this.constructor as typeof CDSComboBox).selectorItem
        )
      );
      existing.forEach((n) => n.remove());

      // append visible nodes in the original author order
      const visibleSet = new Set(visible);
      this._originalItems.forEach((node) => {
        if (visibleSet.has(node)) {
          this._itemMenu.appendChild(node);
        }
      });
    }

    // highlight first visible item
    visible.forEach((node, i) => {
      node.highlighted = i === 0;
    });

    // preserve input selection/focus across update
    const inputNode = this._filterInputNode;
    const selStart = inputNode?.selectionStart ?? 0;
    const selEnd = inputNode?.selectionEnd ?? 0;

    this._filterInputValue = raw;
    this.open = true;
    this.requestUpdate();

    await this.updateComplete;

    if (inputNode) {
      inputNode.focus();
      try {
        inputNode.setSelectionRange(selStart, selEnd);
      } catch (e) {
        // ignore selection failure on some platforms
      }
    }
  }

  protected _handleClickInner(event: MouseEvent) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
    const { target } = event as any;
    if (this._selectionButtonNode?.contains(target)) {
      this._handleUserInitiatedClearInput();
    } else {
      super._handleClickInner(event);
    }
  }

  protected _handleKeypressInner(event: KeyboardEvent) {
    const { key } = event;
    const action = (this.constructor as typeof CDSDropdown).getAction(key);
    const { TRIGGERING } = DROPDOWN_KEYBOARD_ACTION;
    if (
      this._selectionButtonNode?.contains(event.target as Node) &&
      // Space key should be handled by `<input>` unless "clear selection" button has focus
      (action === TRIGGERING || key === ' ')
    ) {
      this._handleUserInitiatedClearInput();
    } else {
      super._handleKeypressInner(event);
    }
  }

  /**
   * Handles user-initiated clearing the `<input>` for filtering.
   */
  protected _handleUserInitiatedClearInput() {
    forEach(
      this.querySelectorAll(
        (this.constructor as typeof CDSComboBox).selectorItem
      ),
      (item) => {
        (item as CDSComboBoxItem).highlighted = false;
      }
    );
    this._filterInputValue = '';
    this._filterInputNode.focus();
    this._handleUserInitiatedSelectItem();
  }

  protected _handleUserInitiatedSelectItem(item?: CDSComboBoxItem) {
    if (item && !this._selectionShouldChange(item)) {
      // Escape hatch for `shouldUpdate()` logic that updates `._filterInputValue()` when selection changes,
      // given we want to update the `<input>` and close the dropdown even if selection doesn't update.
      // Use case:
      // 1. Select the 2nd item in combo box drop down
      // 2. Type some text in the `<input>`
      // 3. Re-select the 2nd item in combo box drop down,
      //    the `<input>` has to updated with the 2nd item and the dropdown should be closed,
      //    even if there is no change in the selected value
      this._filterInputValue = item.textContent || '';
      this.open = false;
      this.requestUpdate();
    }
    super._handleUserInitiatedSelectItem(item);
  }

  protected _selectionDidChange(itemToSelect?: CDSComboBoxItem) {
    this.value = !itemToSelect ? '' : itemToSelect.value;
    forEach(
      this.querySelectorAll(
        (this.constructor as typeof CDSDropdown).selectorItemSelected
      ),
      (item) => {
        (item as CDSComboBoxItem).selected = false;
        item.setAttribute('aria-selected', 'false');
      }
    );
    if (itemToSelect) {
      itemToSelect.selected = true;
      itemToSelect.setAttribute('aria-selected', 'true');
    }
    this._handleUserInitiatedToggle(false);
  }

  protected _renderLabel(): TemplateResult {
    const {
      disabled,
      inputLabel,
      label,
      open,
      readOnly,
      value,
      _activeDescendant: activeDescendant,
      _filterInputValue: filterInputValue,
      _handleInput: handleInput,
    } = this;

    const inputClasses = classMap({
      [`${prefix}--text-input`]: true,
      [`${prefix}--text-input--empty`]: !value,
    });

    let activeDescendantFallback: string | undefined;
    if (open && !activeDescendant) {
      const constructor = this.constructor as typeof CDSDropdown;
      const items = this.querySelectorAll(constructor.selectorItem);
      activeDescendantFallback = items[0]?.id;
    }

    return html`
      <input
        id="trigger-button"
        class="${inputClasses}"
        ?disabled=${disabled}
        placeholder="${label}"
        .value=${filterInputValue}
        role="combobox"
        aria-label="${ifNonEmpty(inputLabel)}"
        aria-controls="menu-body"
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-expanded="${String(open)}"
        aria-activedescendant="${ifDefined(
          open ? (activeDescendant ?? activeDescendantFallback) : ''
        )}"
        ?readonly=${readOnly}
        @input=${handleInput} />
    `;
  }

  // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20071
  protected _renderFollowingLabel(): TemplateResult | void {
    const { clearSelectionLabel, _filterInputValue: filterInputValue } = this;

    if (filterInputValue.length != 0) {
      this.setAttribute('isClosable', '');
    } else {
      this.removeAttribute('isClosable');
    }

    return filterInputValue.length === 0
      ? undefined
      : html`
          <div
            id="selection-button"
            role="button"
            class="${prefix}--list-box__selection"
            tabindex="0"
            title="${clearSelectionLabel}">
            ${iconLoader(Close16, { 'aria-label': clearSelectionLabel })}
          </div>
        `;
  }

  /**
   * The `aria-label` attribute for the icon to clear selection.
   */
  @property({ attribute: 'clear-selection-label' })
  clearSelectionLabel = 'Clear selection';

  /**
   * The `aria-label` attribute for the `<input>` for filtering.
   */
  @property({ attribute: 'input-label' })
  inputLabel = '';

  /**
   * The custom item matching callback.
   */
  @property({ attribute: false })
  itemMatches!: (item: CDSComboBoxItem, queryText: string) => boolean;

  @property({ attribute: false })
  shouldFilterItem?: (opts: {
    item: CDSComboBoxItem;
    inputValue: string;
  }) => boolean;

  shouldUpdate(changedProperties) {
    super.shouldUpdate(changedProperties);
    const { _selectedItemContent: selectedItemContent } = this;
    if (selectedItemContent && changedProperties.has('value')) {
      this._filterInputValue = selectedItemContent?.textContent || '';
    }
    return true;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { _listBoxNode: listBoxNode } = this;
    if (listBoxNode) {
      listBoxNode.classList.add(`${prefix}--combo-box`);
    }
  }

  // For combo box, open/selection with space key is disabled given the input box should take it over
  static TRIGGER_KEYS = new Set(['Enter']);

  /**
   * A selector that will return highlighted items.
   */
  static get selectorItemHighlighted() {
    return `${prefix}-combo-box-item[highlighted]`;
  }

  /**
   * A selector that will return combo box items.
   */
  static get selectorItem() {
    return `${prefix}-combo-box-item`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${prefix}-combo-box-item[selected]`;
  }

  /**
   * The name of the custom event fired before this combo box item is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this combo box item.
   */
  static get eventBeforeToggle() {
    return `${prefix}-combo-box-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this combo box item is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${prefix}-combo-box-toggled`;
  }

  /**
   * The name of the custom event fired before a combo box item is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-combo-box-beingselected`;
  }

  /**
   * The name of the custom event fired after a a combo box item is selected upon a user gesture.
   */
  static get eventSelect() {
    return `${prefix}-combo-box-selected`;
  }

  static styles = styles;
}

export default CDSComboBox;
