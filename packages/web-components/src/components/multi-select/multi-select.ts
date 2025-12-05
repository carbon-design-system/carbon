/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, PropertyValues, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import Close16 from '@carbon/icons/es/close/16.js';
import { filter, forEach } from '../../globals/internal/collection-helpers';
import CDSDropdown, {
  DROPDOWN_KEYBOARD_ACTION,
  DROPDOWN_TYPE,
} from '../dropdown/dropdown';
import { iconLoader } from '../../globals/internal/icon-loader';
import { SELECTION_FEEDBACK_OPTION } from './defs';
import CDSMultiSelectItem from './multi-select-item';
import styles from './multi-select.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export {
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
  DROPDOWN_DIRECTION,
} from '../dropdown/dropdown';

export { SELECTION_FEEDBACK_OPTION };

/**
 * Multi select.
 *
 * @element cds-multi-select
 * @fires cds-multi-select-beingselected
 *   The custom event fired before a multi select item is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires cds-multi-select-selected - The custom event fired after a multi select item is selected upon a user gesture.
 * @fires cds-multi-select-beingtoggled
 *   The custom event fired before the open state of this multi select is toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated toggling.
 * @fires cds-multi-select-toggled
 *   The custom event fired after the open state of this multi select is toggled upon a user gesture.
 */
@customElement(`${prefix}-multi-select`)
class CDSMultiSelect extends CDSDropdown {
  @property({ type: Boolean })
  filterable;

  /**
   * The count of selected items.
   */
  private _selectedItemsCount = 0;

  /**
   * The clear button.
   */
  @query('#clear-button')
  private _clearButtonNode!: HTMLElement;

  /**
   * The selection button.
   */
  @query('#selection-button')
  private _selectionButtonNode!: HTMLElement;

  /**
   * The `<input>` for filtering.
   */
  @query('input')
  private _filterInputNode!: HTMLInputElement;

  protected get _supportsMenuInputFiltering() {
    return Boolean(this.filterable);
  }

  protected willUpdate(changedProperties: PropertyValues) {
    this._shouldTriggerBeFocusable = !this.filterable;
    super.willUpdate(changedProperties);
  }

  protected get _menuInputNode(): HTMLInputElement | null {
    return this.filterable ? (this._filterInputNode ?? null) : null;
  }

  protected _clearMenuInputFiltering() {
    if (this.filterable) {
      this._handleUserInitiatedClearInput();
    }
  }

  protected _shouldClearMenuInputOnEscape({
    menuOpen,
    isInputTarget,
  }: {
    event: KeyboardEvent;
    menuOpen: boolean;
    isInputTarget: boolean;
  }) {
    if (!menuOpen) {
      return true;
    }

    if (!isInputTarget) {
      return false;
    }

    return Boolean(this._filterInputNode?.value);
  }

  /**
   * The trigger button.
   */
  @query(`.${prefix}--list-box__field`)
  private _triggerNode!: HTMLElement;

  protected _selectionShouldChange(itemToSelect?: CDSMultiSelectItem) {
    // If we are selecting an item, assumes we always toggle
    return Boolean(this.value || itemToSelect);
  }

  protected _selectionDidChange(itemToSelect?: CDSMultiSelectItem) {
    const allItems = Array.from(
      this.querySelectorAll(
        (this.constructor as typeof CDSMultiSelect).selectorItem
      )
    ) as CDSMultiSelectItem[];

    // clicked "select all" when it was indeterminate
    if (itemToSelect?.isSelectAll && itemToSelect.indeterminate) {
      allItems.forEach((i) => {
        i.selected = false;
        i.indeterminate = false;
      });
      this.value = '';
      return;
    }

    if (itemToSelect) {
      // clicked select all
      if (itemToSelect.isSelectAll) {
        const items = this.filterable
          ? Array.from(
              this.querySelectorAll(
                (this.constructor as typeof CDSMultiSelect).selectorItemResults
              )
            )
          : allItems;
        items.forEach((i) => {
          if (
            !(i as CDSMultiSelectItem).isSelectAll &&
            !(i as CDSMultiSelectItem).disabled
          ) {
            (i as CDSMultiSelectItem).selected = !itemToSelect.selected;
          }
          (i as CDSMultiSelectItem).indeterminate = false;
        });
        itemToSelect.selected = !itemToSelect.selected;
        // clicked regular item
      } else {
        itemToSelect.selected = !itemToSelect.selected;
      }
    } else {
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof CDSMultiSelect).selectorItemSelected
        ),
        (item) => {
          (item as CDSMultiSelectItem).selected = false;
        }
      );
      this._handleUserInitiatedToggle(false);
    }
    if (this.selectAll) this._computeSelectAllState();
    // Change in `.selected` hasn't been reflected to the corresponding attribute yet
    this.value = filter(
      this.querySelectorAll(
        (this.constructor as typeof CDSMultiSelect).selectorItem
      ),
      (item) => (item as CDSMultiSelectItem).selected
    )
      .map((item) => (item as CDSMultiSelectItem).value)
      .join(',');
  }

  // Keep the menu open for individual selections, close only when clearing.

  protected _shouldCloseAfterSelection(item?: CDSMultiSelectItem) {
    return !item;
  }

  protected _handleClickInner(event: MouseEvent) {
    const clickedItem = (event.target as HTMLElement).closest(
      `${prefix}-multi-select-item`
    ) as CDSMultiSelectItem | null;
    if (
      this._selectionButtonNode?.contains(event.target as Node) &&
      !this.readOnly
    ) {
      this._handleUserInitiatedSelectItem();
      if (this.filterable) {
        this._filterInputNode.focus();
      } else {
        this._triggerNode.focus();
      }
    } else if (clickedItem && !clickedItem.hasAttribute('disabled')) {
      // Handle focus highlight
      const allItems = this.querySelectorAll(`${prefix}-multi-select-item`);
      allItems.forEach((el) => el.removeAttribute('highlighted'));
      clickedItem.setAttribute('highlighted', '');
      this._handleUserInitiatedSelectItem(clickedItem);
      this.setAttribute('item-clicked', '');
      if (this.filterable) {
        this._filterInputNode.focus();
      }
    } else if (this._clearButtonNode?.contains(event.target as Node)) {
      this._handleUserInitiatedClearInput();
    } else if (
      !(event.target as HTMLElement)?.matches(
        (this.constructor as typeof CDSMultiSelect).aiLabelItem
      ) &&
      // remove reference to slug in v12
      !(event.target as HTMLElement)?.matches(
        (this.constructor as typeof CDSMultiSelect).slugItem
      )
    ) {
      super._handleClickInner(event);
      if (this.filterable) {
        this._filterInputNode.focus();
      }
    }
  }

  /**
   * Handler for the `keypress` event, ensures filter still works upon entering space
   */
  protected _handleKeypressInner(event: KeyboardEvent) {
    const { key } = event;
    const action = (this.constructor as typeof CDSDropdown).getAction(key);
    const { TRIGGERING } = DROPDOWN_KEYBOARD_ACTION;

    if (
      this._clearButtonNode?.contains(event.target as Node) &&
      // Space key should be handled by `<input>` unless "clear selection" button has focus
      (action === TRIGGERING || key === ' ')
    ) {
      this._handleUserInitiatedClearInput();
    } else if (this._selectionButtonNode?.contains(event.target as Node)) {
      this._handleUserInitiatedSelectItem();
      this.open = true;
      if (this.filterable) {
        this._filterInputNode.focus();
      } else {
        this._triggerNode.focus();
      }
    } else if (this.filterable) {
      this._handleKeypressInnerFlterable(event);
    } else {
      super._handleKeypressInner(event);
    }
  }

  protected _handleMouseoverInner(event: MouseEvent) {
    const item = this._getDropdownItemFromEvent(event);
    const isFiltering =
      this.filterable && Boolean(this._filterInputNode?.value.length);

    if (
      !item ||
      isFiltering ||
      !item.hasAttribute('selected') ||
      !item.hasAttribute('highlighted')
    ) {
      return;
    }

    super._handleMouseoverInner(event);
  }

  protected _handleMouseleaveInner(event: MouseEvent) {
    const constructor = this.constructor as typeof CDSMultiSelect;
    const isFiltering =
      this.filterable && Boolean(this._filterInputNode?.value.length);
    const highlightedItem = this.querySelector(
      constructor.selectorItemHighlighted
    ) as CDSMultiSelectItem | null;

    if (isFiltering || highlightedItem?.hasAttribute('selected')) {
      return;
    }

    super._handleMouseleaveInner(event);
  }

  /**
   * Special andler for the `keypress` event, ensures space selection for filterable
   * variation is disabled
   */

  protected _handleKeypressInnerFlterable(event: KeyboardEvent) {
    const { key } = event;
    const action = (this.constructor as typeof CDSDropdown).getAction(key);
    if (!this.open) {
      switch (action) {
        case DROPDOWN_KEYBOARD_ACTION.TRIGGERING:
          this._handleUserInitiatedToggle(true);
          break;
        default:
          break;
      }
    } else {
      switch (key) {
        case 'Enter':
          {
            const constructor = this.constructor as typeof CDSDropdown;
            const highlightedItem = this.querySelector(
              constructor.selectorItemHighlighted
            ) as CDSMultiSelectItem;
            if (highlightedItem) {
              this._handleUserInitiatedSelectItem(highlightedItem);
            } else {
              this._handleUserInitiatedToggle(false);
            }
          }
          break;
        default:
          break;
      }
    }
  }

  protected _renderTitleLabel() {
    const {
      clearSelectionDescription,
      clearSelectionText,
      disabled,
      hideLabel,
      titleText,
      _selectedItemsCount: selectedItemsCount,
      _slotTitleTextNode: slotTitleTextNode,
      _handleSlotchangeLabelText: handleSlotchangeLabelText,
    } = this;

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: disabled,
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    const hasTitleText =
      titleText ||
      (slotTitleTextNode && slotTitleTextNode.assignedNodes().length > 0);

    return html`
      <label
        part="title-text"
        class="${labelClasses}"
        ?hidden="${!hasTitleText}">
        <slot name="title-text" @slotchange="${handleSlotchangeLabelText}"
          >${titleText}</slot
        >
        ${selectedItemsCount > 0
          ? html`
              <span class="${prefix}--visually-hidden">
                ${clearSelectionDescription} ${selectedItemsCount},
                ${clearSelectionText}
              </span>
            `
          : null}
      </label>
    `;
  }

  protected _renderPrecedingLabel() {
    const {
      disabled,
      readOnly,
      clearSelectionLabel,
      _selectedItemsCount: selectedItemsCount,
    } = this;

    const selectionButtonClasses = classMap({
      [`${prefix}--list-box__selection`]: true,
      [`${prefix}--list-box__selection--multi`]: true,
      [`${prefix}--tag`]: true,
      [`${prefix}--tag--filter`]: true,
      [`${prefix}--tag--high-contrast`]: true,
      [`${prefix}--tag--disabled`]: disabled,
    });
    return selectedItemsCount === 0
      ? undefined
      : html`
          <div
            id="selection-button"
            role="button"
            class="${selectionButtonClasses}"
            tabindex="-1"
            aria-disabled=${readOnly}
            title="${clearSelectionLabel}">
            ${selectedItemsCount}
            ${iconLoader(Close16, {
              'aria-label': clearSelectionLabel,
              class: `${prefix}--tag__close-icon`,
            })}
          </div>
        `;
  }

  /**
    @returns The main content of the trigger button.
   */
  protected _renderLabel(): TemplateResult {
    const { label, value, _selectedItemContent: selectedItemContent } = this;

    const inputClasses = classMap({
      [`${prefix}--text-input`]: true,
      [`${prefix}--text-input--empty`]: !value,
    });

    return !this.filterable
      ? html`
          <span id="trigger-label" class="${prefix}--list-box__label"
            >${selectedItemContent || label}</span
          >
        `
      : html`
          <input
            id="trigger-label"
            class="${inputClasses}"
            placeholder="${label}"
            role="combobox"
            aria-controls="menu-body"
            aria-expanded="${String(this.open)}"
            aria-autocomplete="list"
            @input="${this._handleInput}" />
        `;
  }

  // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
  protected _renderFollowingLabel(): TemplateResult | void {
    const { clearSelectionLabel, _filterInputNode: filterInputNode } = this;
    return filterInputNode &&
      filterInputNode.value.length > 0 &&
      this.filterable
      ? html`
          <div
            id="clear-button"
            role="button"
            class="${prefix}--list-box__selection"
            tabindex="0"
            title="${clearSelectionLabel}">
            ${iconLoader(Close16, { 'aria-label': clearSelectionLabel })}
          </div>
        `
      : undefined;
  }

  /**
   * Handles `input` event on the `<input>` for filtering.
   */
  protected _handleInput() {
    const items = this.querySelectorAll(
      (this.constructor as typeof CDSMultiSelect).selectorItem
    );
    const inputValue = this._filterInputNode.value.toLocaleLowerCase();
    this.toggleAttribute('has-value', inputValue.length > 0);

    if (!this.open) {
      this.open = true;
    }

    forEach(items, (item) => {
      // always show the selectAll item
      if ((item as CDSMultiSelectItem).isSelectAll) {
        item.removeAttribute('filtered');
        return;
      }
      const itemValue = (item as HTMLElement).innerText.toLocaleLowerCase();

      if (!itemValue.includes(inputValue)) {
        (item as CDSMultiSelectItem).setAttribute('filtered', '');
        (item as CDSMultiSelectItem).removeAttribute('highlighted');
      } else {
        (item as CDSMultiSelectItem).removeAttribute('filtered');
      }
    });

    this.requestUpdate();

    if (this.selectAll) {
      const selectAllItem = this.querySelector(
        `${prefix}-multi-select-item[is-select-all]`
      ) as CDSMultiSelectItem;
      if (selectAllItem) {
        const visible = Array.from(
          this.querySelectorAll(
            (this.constructor as typeof CDSMultiSelect).selectorItemResults
          )
        ) as CDSMultiSelectItem[];
        const actionable = visible.filter((i) => !i.isSelectAll && !i.disabled);
        if (actionable.length === 0) {
          selectAllItem.setAttribute('filtered', '');
        } else {
          selectAllItem.removeAttribute('filtered');
          this._computeSelectAllState();
        }
      }
    }

    const constructor = this.constructor as typeof CDSMultiSelect;
    const visibleItems = Array.from(
      this.querySelectorAll(constructor.selectorItemResults)
    ) as CDSMultiSelectItem[];

    if (visibleItems.length > 0) {
      visibleItems.forEach((i) => i.removeAttribute('highlighted'));
      this.setAttribute('item-clicked', '');
      const first = visibleItems[0] as HTMLElement;
      first.setAttribute('highlighted', '');
      first.focus();
    } else {
      this._filterInputNode.focus();
    }
  }

  /**
   * Navigate through dropdown items.
   *
   * @param direction `-1` to navigate backward, `1` to navigate forward.
   */
  protected _navigate(direction: number) {
    super._navigate(direction);
    if (this.filterable) {
      this.setAttribute('item-clicked', '');
    } else {
      this._triggerNode.classList.add('no-focus-style');
    }
  }

  /**
   * Handles user-initiated clearing the `<input>` for filtering.
   */
  protected _handleUserInitiatedClearInput() {
    const constructor = this.constructor as typeof CDSMultiSelect;
    const items = this.querySelectorAll(constructor.selectorItemFiltered);
    this._filterInputNode.value = '';
    this.open = true;
    this._filterInputNode.focus();
    forEach(items, (item) => {
      (item as CDSMultiSelectItem).removeAttribute('filtered');
    });
    this._filterInputNode.dispatchEvent(
      new Event('input', { bubbles: true, composed: true })
    );
  }

  /**
   * The `aria-label` attribute for the icon to clear selection.
   */
  @property({ attribute: 'clear-selection-label' })
  clearSelectionLabel = '';

  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  @property({ attribute: 'clear-selection-description' })
  clearSelectionDescription = 'Total items selected: ';

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  @property({ attribute: 'clear-selection-text' })
  clearSelectionText = 'To clear selection, press Delete or Backspace.';

  /**
   * Specify the locale of the control. Used for the default compareItems used for sorting the list of items in the control.
   */
  @property()
  locale = 'en';

  /**
   * Enables rendering of a “Select all” multi-select-item
   */
  @property({ type: Boolean, reflect: true, attribute: 'select-all' })
  selectAll = false;

  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at it's position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  @property({ attribute: 'selection-feedback' })
  selectionFeedback = SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN;

  /**
   * The CSS class list for multi-select listbox
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  protected get _classes(): any {
    const {
      disabled,
      size,
      type,
      invalid,
      readOnly,
      open,
      warn,
      _selectedItemsCount: selectedItemsCount,
    } = this;
    const inline = type === DROPDOWN_TYPE.INLINE;

    return classMap({
      [`${prefix}--multi-select`]: true,
      [`${prefix}--list-box`]: true,
      [`${prefix}--list-box--disabled`]: disabled,
      [`${prefix}--list-box--inline`]: inline,
      [`${prefix}--list-box--expanded`]: open,
      [`${prefix}--list-box--${size}`]: size,
      [`${prefix}--multi-select--invalid`]: invalid,
      [`${prefix}--multi-select--warn`]: warn,
      [`${prefix}--multi-select--inline`]: inline,
      [`${prefix}--multi-select--readonly`]: readOnly,
      [`${prefix}--multi-select--selected`]: selectedItemsCount > 0,
      [`${prefix}--list-box__wrapper--decorator`]: this._hasAILabel, // inherited from CDSDropdown
      [`${prefix}--multi-select--selectall`]: this.selectAll,
    });
  }

  protected compareItems = (itemA, itemB, { locale }) => {
    itemA.localeCompare(itemB, locale, { numeric: true });
  };

  protected sortItems = (
    menuItems: NodeList,
    { values, compareItems, locale = 'en' }
  ) => {
    const menuItemsArray = Array.from(menuItems);

    const sortedArray = menuItemsArray.sort((itemA, itemB) => {
      const hasItemA = values.includes((itemA as HTMLInputElement).value);
      const hasItemB = values.includes((itemB as HTMLInputElement).value);

      // Prefer whichever item is in the `value` array first
      if (hasItemA && !hasItemB) {
        return -1;
      }

      if (hasItemB && !hasItemA) {
        return 1;
      }

      return compareItems(
        (itemA as HTMLInputElement).value,
        (itemB as HTMLInputElement).value,
        {
          locale,
        }
      );
    });

    return sortedArray;
  };

  shouldUpdate(changedProperties) {
    const { selectorItem, aiLabelItem, slugItem } = this
      .constructor as typeof CDSMultiSelect;
    const aiLabel =
      this.querySelector(aiLabelItem) || this.querySelector(slugItem);
    const items = this.querySelectorAll(selectorItem);

    const { value, locale } = this;
    const values = !value ? [] : value.split(',');

    if (changedProperties.has('size')) {
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        (elem as CDSMultiSelectItem).size = this.size;
      });
    }
    if (changedProperties.has('value')) {
      // Updates selection beforehand because our rendering logic for `<cds-multi-select>` looks for selected items via `qSA()`
      forEach(items, (elem) => {
        (elem as CDSMultiSelectItem).selected =
          values.indexOf((elem as CDSMultiSelectItem).value) >= 0;
      });
      this._selectedItemsCount = filter(
        items,
        (elem) =>
          values.indexOf((elem as CDSMultiSelectItem).value) >= 0 &&
          !(elem as CDSMultiSelectItem).isSelectAll
      ).length;

      if (this.selectionFeedback === SELECTION_FEEDBACK_OPTION.TOP) {
        const sortedMenuItems = this.sortItems(items, {
          values,
          compareItems: this.compareItems,
          locale,
        });

        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
        aiLabel ? sortedMenuItems.unshift(aiLabel as Node) : '';
        // @todo remove typecast once we've updated to Typescript.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        (this as any).replaceChildren(...sortedMenuItems);
      }
    }
    if (changedProperties.has('open')) {
      if (
        this.selectionFeedback === SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN
      ) {
        const sortedMenuItems = this.sortItems(items, {
          values,
          compareItems: this.compareItems,
          locale,
        });

        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
        aiLabel ? sortedMenuItems.unshift(aiLabel as Node) : '';
        // @todo remove typecast once we've updated to Typescript.
        sortedMenuItems.forEach((item) => {
          this.appendChild(item);
        });
      }
    }
    return true;
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('open') && this.open) {
      const selectedItems = Array.from(
        this.querySelectorAll(`${prefix}-multi-select-item[selected]`)
      ) as CDSMultiSelectItem[];

      if (selectedItems.length > 0) {
        let itemToFocus: HTMLElement | null = null;
        if (this.selectAll) {
          itemToFocus = this.querySelector(
            `${prefix}-multi-select-item[is-select-all]`
          ) as CDSMultiSelectItem;
        }
        if (!itemToFocus) {
          itemToFocus = selectedItems[0] as HTMLElement;
        }
        this.setAttribute('item-clicked', '');
        itemToFocus.focus();
        itemToFocus.setAttribute('highlighted', '');
      } else {
        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
        this.filterable
          ? this._filterInputNode.focus()
          : this._triggerNode.focus();
      }
    }
    // reorder items so that select all is always at the top of the list
    if (this.selectAll && changedProperties.has('open') && this.open) {
      const items = Array.from(
        this.querySelectorAll('cds-multi-select-item')
      ) as CDSMultiSelectItem[];

      const selectAllItem = items.find((i) => i.isSelectAll);
      if (selectAllItem) {
        this.appendChild(selectAllItem);
        items
          .filter((i) => i !== selectAllItem)
          .forEach((i) => this.appendChild(i));
      }
    }

    // flush the top of the first element
    Array.from(this.querySelectorAll('cds-multi-select-item')).forEach(
      (item, index) => {
        if (index === 0 && !item.hasAttribute('is-select-all')) {
          item.setAttribute('flush-top', '');
        } else if (index === 1 && this.selectAll) {
          item.setAttribute('flush-top', '');
        } else {
          item.removeAttribute('flush-top');
        }
      }
    );

    if (changedProperties.has('open') && !this.open) {
      this._triggerNode.classList.remove('no-focus-style');
      this.removeAttribute('item-clicked');
    }
  }

  firstUpdated(changedProperties) {
    super.firstUpdated?.(changedProperties);

    // whenever more items are added/removed, recompute the state of the select all option
    if (!this.selectAll) return;
    const defaultSlot =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      this.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;
    defaultSlot.addEventListener('slotchange', () =>
      this._computeSelectAllState()
    );
  }

  /**
   * Computes the state of the select all option and sets it to either
   * 'selected' or 'indeterminate'
   */
  private _computeSelectAllState() {
    if (!this.selectAll) return;

    const allItems = Array.from(
      this.querySelectorAll(
        (this.constructor as typeof CDSMultiSelect).selectorItem
      )
    ) as CDSMultiSelectItem[];
    const selectAllItem = allItems.find((i) => i.isSelectAll);
    if (!selectAllItem || selectAllItem.hasAttribute('filtered')) {
      return;
    }

    const enabledItems = allItems
      .filter((i) => !i.isSelectAll && !i.disabled)
      .filter((i) => !this.filterable || !i.hasAttribute('filtered'));
    const selectedCount = enabledItems.filter((i) => i.selected).length;
    const allSelected = selectedCount === enabledItems.length;

    selectAllItem.selected = allSelected;
    selectAllItem.indeterminate = selectedCount > 0 && !allSelected;
  }

  connectedCallback() {
    super.connectedCallback();
    /**
     * Detect if multi-select already has initially selected items
     */
    this.value = filter(
      this.querySelectorAll(
        (this.constructor as typeof CDSMultiSelect).selectorItem
      ),
      (item) => (item as CDSMultiSelectItem).hasAttribute('selected')
    )
      .map((item) => (item as CDSMultiSelectItem).getAttribute('value'))
      .join(',');
  }

  /**
   * A selector that will return menu body.
   */
  static get selectorMenuBody() {
    return `div[part="menu-body"]`;
  }

  /**
   * A selector that will return highlighted items.
   */
  static get selectorItemHighlighted() {
    return `${prefix}-multi-select-item[highlighted]`;
  }

  /**
   * A selector that will return multi select items.
   * We use a separate property from `.itemTagName` due to the nature in difference of tag name vs. selector.
   */
  static get selectorItem() {
    return `${prefix}-multi-select-item`;
  }

  /**
   * A selector that will return remaining items after a filter.
   */
  static get selectorItemFiltered() {
    return `${prefix}-multi-select-item[filtered]`;
  }

  /**
   * A selector that will return remaining items after a filter.
   */
  static get selectorItemResults() {
    return `${prefix}-multi-select-item:not([filtered])`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${prefix}-multi-select-item[selected]`;
  }

  /**
   * The name of the custom event fired before this multi select item is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this multi select item.
   */
  static get eventBeforeToggle() {
    return `${prefix}-multi-select-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this multi select item is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${prefix}-multi-select-toggled`;
  }

  /**
   * The name of the custom event fired before a multi select item is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-multi-select-beingselected`;
  }

  /**
   * The name of the custom event fired after a a multi select item is selected upon a user gesture.
   */
  static get eventSelect() {
    return `${prefix}-multi-select-selected`;
  }

  static styles = styles;
}

export default CDSMultiSelect;
