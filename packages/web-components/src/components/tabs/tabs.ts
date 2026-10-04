/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TemplateResult, html } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { forEach } from '../../globals/internal/collection-helpers';
import ChevronLeft16 from '@carbon/icons/es/chevron--left/16.js';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16.js';
import CDSContentSwitcher, {
  type ContentSwitcherSelectionInteractionType,
  NAVIGATION_DIRECTION,
} from '../content-switcher/content-switcher';
import {
  VERTICAL_NAVIGATION_DIRECTION,
  TABS_ICON_SIZE,
  TABS_KEYBOARD_ACTION,
  TABS_TYPE,
  TABS_SIZE,
} from './defs';
import CDSTab from './tab';
import styles from './tabs.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export {
  NAVIGATION_DIRECTION,
  VERTICAL_NAVIGATION_DIRECTION,
  TABS_ICON_SIZE,
  TABS_KEYBOARD_ACTION,
  TABS_TYPE,
  TABS_SIZE,
};

/**
 * Tabs.
 *
 * @element cds-tabs
 * @fires cds-tabs-beingselected
 *   The custom event fired before a tab is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires cds-tabs-selected - The custom event fired after a a tab is selected upon a user gesture.
 */
@customElement(`${prefix}-tabs`)
export default class CDSTabs extends HostListenerMixin(CDSContentSwitcher) {
  /**
   * The latest status of this dropdown, for screen reader to accounce.
   */
  private _assistiveStatusText?: string;

  /**
   * The currently selected index
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: TS thinks this method is not referred to
  private _currentIndex = 0;

  /**
   * Total number of tabs in the component
   */
  private _totalTabs = 0;

  /**
   * `true` if the tablist is scrollable
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: TS thinks this method is not referred to
  private _isScrollable = false;

  /**
   * The DOM element for the tablist.
   */
  private tablist: Element | null = null;

  /**
   * The width of the overflow scroll buttons.
   */
  private BUTTON_WIDTH = 44;

  /**
   * Propagates the layout size token to the host and all child tabs.
   */
  private _syncSizeToTabs() {
    if (this.type === TABS_TYPE.CONTAINED || this.vertical) {
      const rawSize = this.getAttribute('size') as TABS_SIZE | null;
      const size =
        rawSize === TABS_SIZE.EXTRA_LARGE && !this.vertical
          ? TABS_SIZE.LARGE
          : rawSize;

      if (size) {
        const value = `var(--${prefix}-layout-size-height-${size})`;
        this.style.setProperty(`--${prefix}-layout-size-height`, value);
        this.querySelectorAll(`${prefix}-tab`).forEach((tab) => {
          (tab as HTMLElement).style.setProperty(
            `--${prefix}-layout-size-height`,
            value
          );
        });
      } else {
        this.style.removeProperty(`--${prefix}-layout-size-height`);
        this.querySelectorAll(`${prefix}-tab`).forEach((tab) => {
          (tab as HTMLElement).style.removeProperty(
            `--${prefix}-layout-size-height`
          );
        });
      }
    }
  }

  /**
   * Navigates through tabs.
   *
   * @param direction `-1` to navigate backward, `1` to navigate forward.
   * @param [options] The options.
   * @param [options.immediate]
   *   Defaults to `true`
   *   `true` to make it "immediate selection change" mode, which does:
   *
   *   Starts with the selected item
   *   Going prev/next item immediately changes the selection
   */
  protected _navigate(direction: number) {
    const immediate = this.selectionMode === 'automatic';
    const { selectorItemHighlighted, selectorItemSelected } = this
      .constructor as typeof CDSTabs;
    const nextItem = this._getNextItem(
      this.querySelector(
        immediate ? selectorItemSelected : selectorItemHighlighted
      ) as CDSTab,
      direction
    );
    if (!nextItem) {
      return;
    }
    this._handleUserInitiatedSelectItem(nextItem as CDSTab, 'keyboard');
    if (!immediate) {
      this.resetHighlighted(nextItem as CDSTab);
    }

    // Using `{ block: 'nearest' }` to prevent scrolling unless scrolling is absolutely necessary.
    // `scrollIntoViewOptions` seems to work in latest Safari despite of MDN/caniuse table.
    // IE falls back to the old behavior.
    nextItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });

    const nextItemText = nextItem.textContent;
    if (nextItemText) {
      this._assistiveStatusText = nextItemText;
    }
    this._currentIndex += direction;
    this.requestUpdate();
  }

  /**
   * Resets the highlighted state of all tabs, setting only the specified tab as highlighted.
   *
   * @param nextItem The tab item to be highlighted. If provided, only this item will be highlighted.
   *   If null or undefined, all tabs will have their highlighted state set to false.
   */
  protected resetHighlighted(nextItem?: CDSTab | null) {
    const { selectorItem } = this.constructor as typeof CDSTabs;
    forEach(this.querySelectorAll(selectorItem), (item) => {
      (item as CDSTab)['highlighted'] = nextItem === item;
    });
  }

  /**
   * Resets the selected state of all tabs, setting only the specified tab as selected.
   *
   * @param nextItem The tab item to be selected. If provided, only this item will be selected.
   *   If null or undefined, all tabs will have their selected state set to false.
   */
  protected resetSelected(nextItem?: CDSTab | null) {
    const { selectorItem } = this.constructor as typeof CDSTabs;
    forEach(this.querySelectorAll(selectorItem), (item) => {
      (item as CDSTab)['selected'] = nextItem === item;
    });
  }

  @HostListener('click')
  protected _handleClick(event: MouseEvent) {
    super._handleClick(event);
    const currentItem = this._getCurrentItem(event.target as HTMLElement);
    if (currentItem) {
      this.resetHighlighted(currentItem as CDSTab);
    }
  }

  @HostListener('keydown')
  protected _handleKeydown(event: KeyboardEvent) {
    const { key } = event;
    const { selectorItemEnabled } = this.constructor as typeof CDSTabs;
    const action = (this.constructor as typeof CDSTabs).getAction(
      key,
      this.vertical
    );
    const enabledTabs = this.querySelectorAll(selectorItemEnabled);
    switch (action) {
      case TABS_KEYBOARD_ACTION.HOME:
        {
          const [firstEnabledTab] = enabledTabs;
          firstEnabledTab.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          });
          if (this.selectionMode === 'manual') {
            this.resetHighlighted(firstEnabledTab as CDSTab);
          }
          this._handleUserInitiatedSelectItem(
            firstEnabledTab as CDSTab,
            this.selectionMode !== 'manual' ? 'activation' : 'keyboard'
          );
          this.requestUpdate();
        }
        break;
      case TABS_KEYBOARD_ACTION.END:
        {
          const lastEnabledTab = enabledTabs[enabledTabs.length - 1];
          lastEnabledTab.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          });
          if (this.selectionMode === 'manual') {
            this.resetHighlighted(lastEnabledTab as CDSTab);
          }
          this._handleUserInitiatedSelectItem(
            lastEnabledTab as CDSTab,
            this.selectionMode !== 'manual' ? 'activation' : 'keyboard'
          );
          this.requestUpdate();
        }
        break;
      case TABS_KEYBOARD_ACTION.NAVIGATING:
        {
          event.preventDefault();
          // Get direction based on orientation
          const direction = this.vertical
            ? VERTICAL_NAVIGATION_DIRECTION[key]
            : NAVIGATION_DIRECTION[key];
          if (direction) {
            this._navigate(direction);
          }
        }
        break;
      case TABS_KEYBOARD_ACTION.ACTIVATING:
        {
          const focusedTab: CDSTab | null = this.querySelector(
            `${prefix}-tab[highlighted]`
          );
          if (focusedTab) {
            this._handleUserInitiatedSelectItem(
              focusedTab as CDSTab,
              'activation'
            );
            this.requestUpdate();
          }
        }
        break;
      default:
        break;
    }
  }

  @HostListener('cds-tab-closed')
  protected _handleTabClosed(event: CustomEvent) {
    const {
      selectorItem,
      selectorItemEnabled,
      selectorItemSelected,
      selectorItemHighlighted,
    } = this.constructor as typeof CDSTabs;
    const { index } = event.detail;
    const allTabs = this.querySelectorAll<CDSTab>(selectorItem);
    const enabledTabsBeforeRemoval =
      this.querySelectorAll<CDSTab>(selectorItemEnabled);
    const indexInEnabledTabs = Array.from(enabledTabsBeforeRemoval).indexOf(
      allTabs[index]
    );
    const activeItem = this.querySelector<CDSTab>(selectorItemSelected);
    const activeItemId = activeItem?.id;
    const highlightedItem = this.querySelector<CDSTab>(selectorItemHighlighted);
    const highlightedItemId = highlightedItem?.id;
    requestAnimationFrame(() => {
      const enabledTabs = Array.from(
        this.querySelectorAll<CDSTab>(selectorItemEnabled)
      );

      const tabWithActiveId = enabledTabs.find(
        (tab) => tab.id === activeItemId
      );
      const tabWithHighlightedId = enabledTabs.find(
        (tab) => tab.id === highlightedItemId
      );
      const nextHighlightedIndex =
        !tabWithActiveId && !tabWithHighlightedId && indexInEnabledTabs - 1 >= 0
          ? indexInEnabledTabs - 1
          : 0;
      if (enabledTabs.length > 0) {
        const nextSelectedItem = tabWithActiveId || enabledTabs[0];
        const nextHighlightedItem =
          tabWithHighlightedId || enabledTabs[nextHighlightedIndex];
        this.resetSelected(nextSelectedItem);
        this.resetHighlighted(nextHighlightedItem);
        this.value = nextSelectedItem.value;

        nextHighlightedItem.shadowRoot
          ?.querySelector<HTMLElement>(
            `.${prefix}--tabs__nav-link--dismissable`
          )
          ?.focus();
        nextHighlightedItem.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        });
      } else {
        this.value = '';
        return;
      }
    });
  }

  /**
   * Handles click on overflow scroll buttons.
   *
   * @param _ Event object
   * @param [options] The options.
   * @param [options.direction] `-1` to scroll backward, `1` to scroll forward.
   */
  protected _handleScrollButtonClick(_, { direction }) {
    const container = this._contentContainerNode;
    if (!this.tablist || !container) {
      return;
    }
    const { scrollLeft, clientWidth, scrollWidth } = container;
    const scrollSign = getComputedStyle(container).direction === 'rtl' ? -1 : 1;
    const scrollPosition = Math.max(0, scrollLeft * scrollSign);
    switch (direction) {
      case -1:
        container.scrollLeft =
          scrollSign *
          Math.max(scrollPosition - (scrollWidth / this._totalTabs) * 1.5, 0);
        break;
      case 1:
        container.scrollLeft =
          scrollSign *
          (Math.min(
            scrollPosition + (scrollWidth / this._totalTabs) * 1.5,
            scrollWidth - clientWidth
          ) +
            1);
        break;
      default:
        break;
    }
  }

  private _syncSecondaryLabels() {
    const hasSecondaryLabels = Array.from(
      this.querySelectorAll(`${prefix}-tab`)
    ).some((tab) => tab.hasAttribute('secondary-label'));
    if (hasSecondaryLabels) {
      this.setAttribute('has-secondary-labels', '');
    } else {
      this.removeAttribute('has-secondary-labels');
    }
  }

  _handleSlotchange() {
    // Call super to preserve content-switcher slot handling
    super._handleSlotchange?.();
    const { selectorItemSelected } = this.constructor as typeof CDSTabs;
    const selectedItem = this.querySelector(selectorItemSelected);
    const nextItem = this._getNextItem(selectedItem as CDSTab, 1);

    // Specifies child `<cds-tab>` to hide its divider instead of using CSS,
    // until `:host-context()` gets supported in all major browsers
    if (nextItem) {
      (nextItem as CDSTab).hideDivider = true;
    }

    // Set vertical attribute on all tabs if this tabs component is vertical
    this._updateTabsVerticalAttribute();
    this._syncSecondaryLabels();
    this._updateTabsState();
    this._syncSizeToTabs();
  }

  /**
   * Updates the vertical attribute on all child tabs based on the vertical property.
   */
  private _updateTabsVerticalAttribute() {
    const { selectorItem } = this.constructor as typeof CDSTabs;
    forEach(this.querySelectorAll(selectorItem), (tab) => {
      if (this.vertical) {
        (tab as CDSTab).setAttribute('vertical', '');
      } else {
        (tab as CDSTab).removeAttribute('vertical');
      }
    });
  }

  protected _selectionDidChange(
    itemToSelect: CDSTab,
    interactionType?: ContentSwitcherSelectionInteractionType
  ) {
    super._selectionDidChange(itemToSelect, interactionType);
    this._assistiveStatusText = this.selectedItemAssistiveText;
  }

  /**
   * The scrolling container.
   */
  @query(`.${prefix}--tabs-nav-content-container`)
  private _contentContainerNode?: HTMLElement;

  /**
   * The scrolling content.
   */
  @query(`.${prefix}--tabs-nav-content`)
  private _contentNode?: HTMLElement;

  /**
   * The current scroll position.
   */
  @state()
  private _currentScrollPosition = 0;

  /**
   * An assistive text for screen reader to announce, telling the open state.
   */
  @property({ attribute: 'selecting-items-assistive-text' })
  selectingItemsAssistiveText =
    'Selecting items. Use up and down arrow keys to navigate.';

  /**
   * An assistive text for screen reader to announce, telling that an item is selected.
   */
  @property({ attribute: 'selected-item-assistive-text' })
  selectedItemAssistiveText = 'Selected an item.';

  /**
   * The content of the trigger button for narrow mode.
   */
  @property({ attribute: 'trigger-content' })
  triggerContent = '';

  /**
   * Tabs type.
   */
  @property({ reflect: true })
  type = TABS_TYPE.REGULAR;

  /**
   * `true` if the tabs are in vertical orientation.
   * This is automatically set by `cds-tabs-vertical`.
   */
  @property({ type: Boolean })
  vertical = false;
  /**
   * Whether the rendered Tab children should be dismissable.
   */
  @property({ type: Boolean, reflect: true })
  dismissable;

  /**
   * Specify the size of the tabs.
   *
   * Supports `sm` and `md` for line tabs.
   * Supports `sm`, `md`, and `lg` for contained tabs.
   * Supports `xl` only when `vertical` is set; otherwise `xl` falls back to `lg`.
   */
  @property({ reflect: true })
  // @ts-expect-error - TABS_SIZE extends CONTENT_SWITCHER_SIZE with additional 'md' value
  declare size: TABS_SIZE;

  /**
   * Specify the icon size used by icon-only tabs.
   */
  @property({ attribute: 'icon-size', reflect: true })
  iconSize?: TABS_ICON_SIZE;

  /**
   * Used for tabs within a grid, this makes it so tabs span the full container width and have the same width. Only available on contained tabs with <9 children
   */
  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @state()
  private _isAtStart = true;

  @state()
  private _isAtEnd = true;

  private _resizeObserver: ResizeObserver | null = null;

  private _updateScrollButtonVisibility = () => {
    const container = this._contentContainerNode;
    if (!container) {
      return;
    }
    const scrollSign = getComputedStyle(container).direction === 'rtl' ? -1 : 1;
    const position = container.scrollLeft * scrollSign;
    const maxScroll = container.scrollWidth - container.clientWidth;
    // Scroll dimensions are rounded, while tab widths can be fractional.
    this._isAtStart = position <= 1;
    this._isAtEnd = maxScroll - position <= 1;
  };

  private _observeSize() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = new ResizeObserver(
      this._updateScrollButtonVisibility
    );
    if (this._contentContainerNode) {
      this._resizeObserver.observe(this._contentContainerNode);
    }
    if (this.tablist) {
      this._resizeObserver.observe(this.tablist);
    }
    this._updateScrollButtonVisibility();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated) {
      this._observeSize();
    }
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    super.disconnectedCallback();
  }

  shouldUpdate(changedProperties) {
    super.shouldUpdate(changedProperties);
    if (this.tablist) {
      const { clientWidth, scrollWidth } = this.tablist;
      this._isScrollable = scrollWidth > clientWidth;
    }
    const { selectorItem } = this.constructor as typeof CDSTabs;
    if (
      changedProperties.has('type') ||
      changedProperties.has('iconSize') ||
      changedProperties.has('size')
    ) {
      this._totalTabs = 0;
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        this._totalTabs++;
        (elem as CDSTab).type = this.type;
        (elem as CDSTab).iconSize = this.iconSize;
      });
    }
    return true;
  }

  firstUpdated() {
    // Call super to run content-switcher init logic (initial selection)
    super.firstUpdated();
    this._tabInitialLoad();
    this._observeSize();
    this._syncSecondaryLabels();
    this._syncSizeToTabs();
  }

  updated(changedProperties) {
    // Call super to keep selection/value in sync
    super.updated?.(changedProperties);
    if (changedProperties.has('size') || changedProperties.has('type')) {
      this._syncSizeToTabs();
    }

    if (changedProperties.has('vertical')) {
      this._updateTabsVerticalAttribute();
    }

    if (changedProperties.has('value')) {
      const tab = this.querySelector(
        `${prefix}-tab[value="${this.value}"]`
      ) as HTMLElement;
      if (tab) {
        const { width: tabWidth } = tab?.getBoundingClientRect() ?? {};
        const start = tab.offsetLeft ?? 0;
        const end = tab.offsetLeft + tabWidth;

        // The start and end of the visible area of the tablist
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        const visibleStart = this.tablist!.scrollLeft + this.BUTTON_WIDTH;
        const visibleEnd =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          this.tablist!.scrollLeft +
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          this.tablist!.clientWidth -
          this.BUTTON_WIDTH;

        // The beginning of the tab is clipped and not visible
        if (start < visibleStart) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          this.tablist!.scrollLeft = start - this.BUTTON_WIDTH;
        }

        // The end of the tab is clipped and not visible
        if (end > visibleEnd) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          this.tablist!.scrollLeft =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
            end + this.BUTTON_WIDTH - this.tablist!.clientWidth;
        }
      }
    }

    if (changedProperties.has('_currentScrollPosition')) {
      if (this._contentNode) {
        this._contentNode.style.insetInlineStart = `-${this._currentScrollPosition}px`;
      }
    }

    if (changedProperties.has('dismissable')) {
      this._updateTabsState();
    }
  }

  /**
   * Render the previous button if tablist is wider than container.
   */
  protected renderPreviousButton(): TemplateResult | null {
    const previousButtonClasses = classMap({
      [`${prefix}--tab--overflow-nav-button`]: true,
      [`${prefix}--tabs__nav-caret-left`]: true,
      [`${prefix}--tab--overflow-nav-button--previous`]: true,
      [`${prefix}--tab--overflow-nav-button--hidden`]: this._isAtStart,
    });
    return html`
      <button
        part="prev-button"
        tabindex="-1"
        aria-hidden="true"
        class="${previousButtonClasses}"
        @click=${(_) =>
          this._handleScrollButtonClick(_, {
            direction: NAVIGATION_DIRECTION.Left,
          })}>
        ${iconLoader(ChevronLeft16)}
      </button>
    `;
  }

  /**
   * Render the next button if tablist is wider than container.
   */
  protected renderNextButton(): TemplateResult | null {
    const nextButtonClasses = classMap({
      [`${prefix}--tab--overflow-nav-button`]: true,
      [`${prefix}--tabs__nav-caret-right`]: true,
      [`${prefix}--tab--overflow-nav-button--next`]: true,
      [`${prefix}--tab--overflow-nav-button--hidden`]: this._isAtEnd,
    });
    return html`
      <button
        part="next-button"
        tabindex="-1"
        aria-hidden="true"
        class="${nextButtonClasses}"
        @click=${(_) =>
          this._handleScrollButtonClick(_, {
            direction: NAVIGATION_DIRECTION.Right,
          })}>
        ${iconLoader(ChevronRight16)}
      </button>
    `;
  }

  render() {
    const {
      _assistiveStatusText: assistiveStatusText,
      _handleSlotchange: handleSlotchange,
    } = this;

    return html`
      ${this.renderPreviousButton()}
      <div
        class="${prefix}--tabs-nav-content-container"
        @scroll=${this._updateScrollButtonVisibility}>
        <div class="${prefix}--tabs-nav-content">
          <div class="${prefix}--tabs-nav">
            <div id="tablist" role="tablist" class="${prefix}--tab--list">
              <slot @slotchange=${handleSlotchange}></slot>
            </div>
          </div>
        </div>
      </div>
      ${this.renderNextButton()}
      <div
        class="${prefix}--assistive-text"
        role="status"
        aria-live="assertive"
        aria-relevant="additions text">
        ${assistiveStatusText}
      </div>
    `;
  }

  protected _updateTabsState() {
    const { selectorItem } = this.constructor as typeof CDSTabs;
    const tabs = this.querySelectorAll<CDSTab>(selectorItem);
    tabs.forEach((tab, index) => {
      tab._dismissable = this.dismissable;
      tab._index = index;
    });
  }

  protected _tabInitialLoad() {
    const { selectorTablist, selectorItemEnabled } = this
      .constructor as typeof CDSTabs;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    const tablist = this.shadowRoot!.querySelector(selectorTablist)!;
    this.tablist = tablist;
    if (this.selectionMode === 'manual') {
      const items = this.querySelectorAll<CDSTab>(selectorItemEnabled);
      // Highlight the consumer-selected tab if present, else the first enabled
      // tab, so it becomes the manual navigation target. Selection itself is
      // owned by the consumer-aware base init; do not force it here.
      const highlighted =
        Array.from(items).find((tab) => tab.selected) ?? items[0] ?? null;
      if (highlighted) {
        highlighted.highlighted = true;
      }
    }
  }

  /**
   * Symbols of keys that triggers opening/closing menu and selecting/deselecting menu item.
   */
  static TRIGGER_KEYS = new Set([' ', 'Enter']);

  /**
   * A selector that will return tabs.
   */
  static get selectorItem() {
    return `${prefix}-tab`;
  }

  /**
   * A selector that will return enabled tabs.
   */
  static get selectorItemEnabled() {
    return `${prefix}-tab:not([disabled])`;
  }

  /**
   * A selector that will return highlighted tabs.
   */
  static get selectorItemHighlighted() {
    return `${prefix}-tab[highlighted]`;
  }

  /**
   * A selector that will return selected tabs.
   */
  static get selectorItemSelected() {
    return `${prefix}-tab[selected]`;
  }

  /**
   * A selector that returns the tablist
   */
  static get selectorTablist() {
    return `.${prefix}--tab--list`;
  }

  /**
   * The name of the custom event fired before a tab is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-tabs-beingselected`;
  }

  /**
   * The name of the custom event fired after a a tab is selected upon a user gesture.
   */
  static get eventSelect() {
    return `${prefix}-tabs-selected`;
  }

  static styles = styles;

  /**
   * @param key The key symbol.
   * @param isVertical Whether the tabs are in vertical orientation.
   * @returns A action for tabs for the given key symbol.
   */
  static getAction(key: string, isVertical = false) {
    if (key === 'Home') {
      return TABS_KEYBOARD_ACTION.HOME;
    }
    if (key === 'End') {
      return TABS_KEYBOARD_ACTION.END;
    }
    // Check for navigation keys based on orientation
    const navigationKeys = isVertical
      ? VERTICAL_NAVIGATION_DIRECTION
      : NAVIGATION_DIRECTION;
    if (key in navigationKeys) {
      return TABS_KEYBOARD_ACTION.NAVIGATING;
    }
    if (key === 'Enter' || key === ' ') {
      return TABS_KEYBOARD_ACTION.ACTIVATING;
    }
    return TABS_KEYBOARD_ACTION.NONE;
  }
}
