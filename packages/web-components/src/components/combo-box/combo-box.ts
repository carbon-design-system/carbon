/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { TemplateResult, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import Close16 from '@carbon/icons/es/close/16.js';
import { forEach } from '../../globals/internal/collection-helpers';
import CDSDropdown, { DROPDOWN_KEYBOARD_ACTION } from '../dropdown/dropdown';
import CDSComboBoxItem from './combo-box-item';
import { iconLoader } from '../../globals/internal/icon-loader';
import styles from './combo-box.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { ifDefined } from 'lit/directives/if-defined.js';
import ifNonEmpty from '../../globals/directives/if-non-empty';

export { DROPDOWN_DIRECTION, DROPDOWN_SIZE } from '../dropdown/dropdown';

type ShouldFilterItem = (input: {
  item: CDSComboBoxItem;
  itemToString: (item: CDSComboBoxItem) => string;
  inputValue: string | null;
}) => boolean;

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

  protected _shouldTriggerBeFocusable = false;

  /**
   * The `<input>` for filtering.
   */
  @query('input')
  private _filterInputNode!: HTMLInputElement;

  protected get _supportsMenuInputFiltering() {
    return true;
  }

  protected get _menuInputNode(): HTMLInputElement | null {
    return this._filterInputNode ?? null;
  }

  protected _clearMenuInputFiltering() {
    this._handleUserInitiatedClearInput();
  }

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
  protected _testItemWithQueryText(item) {
    return (this.itemMatches || this._defaultItemMatches)(
      item,
      this._filterInputNode.value
    );
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      item.textContent!.toLowerCase().indexOf(queryText.toLowerCase()) >= 0
    );
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.typeahead) {
      this.shouldFilterItem = true;
      this.setAttribute('should-filter-item', '');
    }
  }

  /**
   * Handles `input` event on the `<input>` for filtering.
   */
  protected _handleInput(event: InputEvent) {
    const rawQueryText = this._filterInputNode.value;
    const queryText = rawQueryText.trim().toLowerCase();

    if (rawQueryText.length !== 0) {
      this.setAttribute('isClosable', '');
    } else {
      this.removeAttribute('isClosable');
    }

    const items = this.querySelectorAll(
      (this.constructor as typeof CDSComboBox).selectorItem
    );

    const firstMatchIndex = this._filterItems(items, queryText, rawQueryText);
    if (firstMatchIndex !== -1) {
      const highlightedItem = items[firstMatchIndex];
      if (highlightedItem) {
        this._scrollItemIntoView(highlightedItem as HTMLElement);
      }

      if (this.typeahead && event?.inputType?.startsWith('insert')) {
        const suggestedItem = highlightedItem.textContent?.trim() ?? '';
        if (
          suggestedItem.toLowerCase().startsWith(rawQueryText.toLowerCase()) &&
          suggestedItem.length > rawQueryText.length
        ) {
          const suggestionText =
            rawQueryText + suggestedItem.slice(rawQueryText.length);

          this._filterInputNode.value = suggestionText;
          this._filterInputNode.setSelectionRange(
            rawQueryText.length,
            suggestionText.length
          );

          this._filterInputValue = suggestionText;
          this.open = true;
          this.requestUpdate();
          return;
        }
      }
    }
    this._filterInputValue = rawQueryText;
    this.open = true;
    this.requestUpdate();
  }

  // removes the autocomplete suggestion
  protected _removeAutoCompleteSuggestion() {
    if (!this._filterInputNode) return;
    const { selectionStart, selectionEnd, value } = this._filterInputNode;
    if (selectionStart && selectionEnd && selectionEnd > selectionStart) {
      const cleanInput = value.slice(0, selectionStart);
      this._filterInputNode.value = cleanInput;
      this._filterInputNode.setSelectionRange(
        cleanInput.length,
        cleanInput.length
      );
      return;
    }
  }

  // Applies filtering/highlighting to all slotted items.
  protected _filterItems(
    items: NodeListOf<Element>,
    queryText: string,
    rawQueryText: string
  ): number {
    let firstMatchIndex = -1;
    const hasQuery = Boolean(queryText);
    forEach(items, (item, i) => {
      const comboItem = item as CDSComboBoxItem;
      const index = i ?? -1;
      if (!hasQuery) {
        (comboItem as HTMLElement).style.display = '';
        comboItem.highlighted = false;
        return;
      }
      const matches = this.typeahead
        ? (comboItem.textContent || '').toLowerCase().startsWith(queryText)
        : (comboItem.textContent || '').toLowerCase().includes(queryText);
      const filterFunction =
        typeof this.shouldFilterItem === 'function'
          ? this.shouldFilterItem
          : null;
      const shouldApplyBuiltInFilter =
        filterFunction === null && hasQuery && this.shouldFilterItem === true;
      const itemToString = (value: CDSComboBoxItem) => value.textContent || '';
      const filterInputValue = rawQueryText.length === 0 ? null : rawQueryText;
      const passesFilter = filterFunction
        ? filterFunction({
            item: comboItem,
            itemToString,
            inputValue: filterInputValue,
          })
        : shouldApplyBuiltInFilter
          ? matches
          : true;
      const highlightMatch = filterFunction !== null ? passesFilter : matches;
      if (highlightMatch && firstMatchIndex === -1) {
        firstMatchIndex = index;
      }
      if (filterFunction || shouldApplyBuiltInFilter) {
        (comboItem as HTMLElement).style.display = passesFilter ? '' : 'none';
      } else {
        (comboItem as HTMLElement).style.display = '';
      }
      comboItem.highlighted = index === firstMatchIndex && !comboItem.disabled;
    });
    return firstMatchIndex;
  }

  protected _handleMouseoverInner(event: MouseEvent) {
    const item = this._getDropdownItemFromEvent(event);
    if (!item?.hasAttribute('selected')) {
      return;
    }

    super._handleMouseoverInner(event);
  }

  protected _handleMouseleaveInner(event: MouseEvent) {
    const isFiltering = Boolean(this._filterInputNode?.value.length);
    if (isFiltering) {
      return;
    }

    super._handleMouseleaveInner(event);
  }

  protected _scrollItemIntoView(item: HTMLElement) {
    if (!this._itemMenu) {
      return;
    }
    const menuRect = this._itemMenu.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    if (!menuRect || !itemRect) {
      return;
    }
    const menuBottom = menuRect.top + this._itemMenu.clientHeight;
    const isWithinViewport =
      menuRect.top <= itemRect.top && itemRect.bottom <= menuBottom;
    if (isWithinViewport) {
      return;
    }
    const scrollTop = itemRect.top - menuRect.top;
    const scrollBottom = itemRect.bottom - menuRect.bottom;
    this._itemMenu.scrollTop +=
      Math.abs(scrollTop) < Math.abs(scrollBottom) ? scrollTop : scrollBottom;
  }

  // Clear the query and selection when Escape is pressed.
  protected _handleInputKeydown(event: KeyboardEvent) {
    // remove the autocomplete suggestion when navigating away from the suggested item
    if (
      this.typeahead &&
      (event.key === 'ArrowDown' || event.key === 'ArrowUp')
    ) {
      this._removeAutoCompleteSuggestion();
    }
    if (event.key !== 'Escape') {
      return;
    }
    if (!this._filterInputNode) {
      return;
    }
    if (this._filterInputNode.value || this.value) {
      this._handleUserInitiatedClearInput();
    }
  }

  protected _handleClickInner(event: MouseEvent) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
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
    this._resetFilteredItems();
    this._filterInputValue = '';
    if (this._filterInputNode) {
      this._filterInputNode.value = '';
      this._filterInputNode.focus();
    }

    this._handleUserInitiatedSelectItem();
    this.requestUpdate();
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

    if (this.typeahead && this._filterInputNode) {
      this._filterInputValue = itemToSelect?.textContent?.trim() ?? '';

      const length = this._filterInputValue.length;
      this._filterInputNode.setSelectionRange(length, length);
    }
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
      _handleInputKeydown: handleInputKeydown,
    } = this;

    const inputClasses = classMap({
      [`${prefix}--text-input`]: true,
      [`${prefix}--text-input--empty`]: !value,
      [`${prefix}--text-input--highlighted-outline`]: this._hasHighlightedItem,
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
        @input=${handleInput}
        @keydown=${handleInputKeydown} />
    `;
  }

  protected get _hasHighlightedItem() {
    return (
      this.open &&
      Boolean(
        this.querySelector(
          (this.constructor as typeof CDSComboBox).selectorItemHighlighted
        )
      )
    );
  }

  // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
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

  /**
   * Provide custom filtering behavior. This attribute will be ignored if
   * `typeahead` is enabled and will default to `true`
   */
  @property({
    attribute: 'should-filter-item',
    converter: {
      fromAttribute: (value) => value !== null,
    },
  })
  shouldFilterItem: boolean | ShouldFilterItem = false;

  /**
   * **Experimental**: will enable autocomplete and typeahead for the input field
   */
  @property({ type: Boolean })
  typeahead = false;

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
    if (changedProperties.has('open')) {
      if (this.open && this._filterInputNode) {
        this._handleInput(changedProperties);
      } else if (!this.open) {
        // remove the autocomplete suggestion when closing the combobox
        this._removeAutoCompleteSuggestion();
        this._resetFilteredItems();
        if (this._filterInputNode.value == '') {
          this.value = '';
        }
      }
    }
    const { _listBoxNode: listBoxNode } = this;
    if (listBoxNode) {
      listBoxNode.classList.add(`${prefix}--combo-box`);
    }
  }

  // Restores the full list when the query is cleared or the menu closes.
  protected _resetFilteredItems() {
    const items = this.querySelectorAll(
      (this.constructor as typeof CDSComboBox).selectorItem
    );
    forEach(items, (item) => {
      const comboItem = item as CDSComboBoxItem;
      (comboItem as HTMLElement).style.display = '';
      comboItem.highlighted = false;
    });
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
