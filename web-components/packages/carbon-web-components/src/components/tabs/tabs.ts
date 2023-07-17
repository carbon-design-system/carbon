/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { forEach } from '../../globals/internal/collection-helpers';
import ChevronRight16 from '@carbon/icons/lib/chevron--right/16';
import ChevronLeft16 from '@carbon/icons/lib/chevron--left/16';
import CDSContentSwitcher, {
  NAVIGATION_DIRECTION,
} from '../content-switcher/content-switcher';
import { TABS_KEYBOARD_ACTION, TABS_TYPE } from './defs';
import CDSTab from './tab';
import styles from './tabs.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { NAVIGATION_DIRECTION, TABS_KEYBOARD_ACTION, TABS_TYPE };

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
  // @ts-ignore: TS thinks this method is not referred to
  private _currentIndex: number = 0;

  /**
   * Total number of tabs in the component
   */
  private _totalTabs: number = 0;

  /**
   * `true` if the tablist is scrollable
   */
  // @ts-ignore: TS thinks this method is not referred to
  private _isScrollable: boolean = false;

  /**
   * The DOM element for the tablist.
   */
  private tablist: Element | null = null;

  /**
   * The width of the overflow scroll buttons.
   */
  private BUTTON_WIDTH = 44;

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
  protected _navigate(
    direction: number,
    { immediate = true }: { immediate?: boolean } = {}
  ) {
    const { selectorItem, selectorItemHighlighted, selectorItemSelected } = this
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

    if (immediate) {
      this._handleUserInitiatedSelectItem(nextItem as CDSTab);
    } else {
      forEach(this.querySelectorAll(selectorItem), (item) => {
        (item as CDSTab)[immediate ? 'selected' : 'highlighted'] =
          nextItem === item;
      });
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

  @HostListener('click')
  protected _handleClick(event: MouseEvent) {
    super._handleClick(event);
  }

  @HostListener('keydown')
  protected _handleKeydown(event: KeyboardEvent) {
    const { key } = event;
    const action = (this.constructor as typeof CDSTabs).getAction(key);
    const enabledTabs = this.querySelectorAll(`${prefix}-tab:not([disabled])`);
    switch (action) {
      case TABS_KEYBOARD_ACTION.HOME:
        {
          const [firstEnabledTab] = enabledTabs;
          firstEnabledTab.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          });
          this._handleUserInitiatedSelectItem(firstEnabledTab as CDSTab);
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
          this._handleUserInitiatedSelectItem(lastEnabledTab as CDSTab);
          this.requestUpdate();
        }
        break;
      case TABS_KEYBOARD_ACTION.NAVIGATING:
        {
          const direction = NAVIGATION_DIRECTION[key];
          if (direction) {
            this._navigate(direction);
          }
        }
        break;
      default:
        break;
    }
  }

  /**
   * Handles click on overflow scroll buttons.
   *
   * @param _ Event object
   * @param [options] The options.
   * @param [options.direction] `-1` to scroll forward, `1` to scroll backward.
   */
  protected _handleScrollButtonClick(_, { direction }) {
    if (!this.tablist) {
      return;
    }
    const { scrollLeft, clientWidth, scrollWidth } =
      this._contentContainerNode!;
    switch (direction) {
      case -1:
        this._contentContainerNode!.scrollLeft = Math.max(
          scrollLeft - (scrollWidth / this._totalTabs) * 1.5,
          0
        );
        break;
      case 1:
        this._contentContainerNode!.scrollLeft =
          Math.min(
            scrollLeft + (scrollWidth / this._totalTabs) * 1.5,
            scrollWidth - clientWidth
          ) + 1;
        break;
      default:
        break;
    }
  }

  _handleSlotchange() {
    const { selectorItemSelected } = this.constructor as typeof CDSTabs;
    const selectedItem = this.querySelector(selectorItemSelected);
    const nextItem = this._getNextItem(selectedItem as CDSTab, 1);

    // Specifies child `<cds-tab>` to hide its divider instead of using CSS,
    // until `:host-context()` gets supported in all major browsers
    (nextItem as CDSTab).hideDivider = true;
  }

  protected _selectionDidChange(itemToSelect: CDSTab) {
    super._selectionDidChange(itemToSelect);
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
   * The left-hand sentinel to track intersection with the host element.
   * If they intersect, the left-hand paginator button should be hidden.
   */
  @query(`.${prefix}--sub-content-left`)
  private _intersectionLeftSentinelNode?: HTMLElement;

  /**
   * The right-hand sentinel to track intersection with the host element.
   * If they intersect, the right-hand paginator button should be hidden.
   */
  @query(`.${prefix}--sub-content-right`)
  private _intersectionRightSentinelNode?: HTMLElement;

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
   * `true` if left-hand scroll intersection sentinel intersects with the host element.
   * In this condition, the left-hand paginator button should be hidden.
   */
  @state()
  private _isIntersectionLeftTrackerInContent = true;

  /**
   * `true` if right-hand scroll intersection sentinel intersects with the host element.
   * In this condition, the right-hand paginator button should be hidden.
   */
  @state()
  private _isIntersectionRightTrackerInContent = true;

  /**
   * The observer for the intersection of left-side content edge.
   */
  private _observerIntersection: IntersectionObserver | null = null;

  /**
   * The intersection observer callback for the scrolling container.
   *
   * @param records The intersection observer records.
   */
  private _observeIntersectionContainer = (records) => {
    const {
      _intersectionLeftSentinelNode: intersectionLeftSentinelNode,
      _intersectionRightSentinelNode: intersectionRightSentinelNode,
    } = this;

    records.forEach(({ isIntersecting, target }) => {
      if (target === intersectionLeftSentinelNode) {
        this._isIntersectionLeftTrackerInContent = isIntersecting;
      }
      if (target === intersectionRightSentinelNode) {
        this._isIntersectionRightTrackerInContent = isIntersecting;
      }
    });
  };

  /**
   * Cleans-up and creats the intersection observer for the scrolling container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new intersection observer.
   */
  private _cleanAndCreateIntersectionObserverContainer({
    create,
  }: { create?: boolean } = {}) {
    const {
      _intersectionLeftSentinelNode: intersectionLeftSentinelNode,
      _intersectionRightSentinelNode: intersectionRightSentinelNode,
    } = this;

    if (this._observerIntersection) {
      this._observerIntersection.disconnect();
      this._observerIntersection = null;
    }

    if (create) {
      this._observerIntersection = new IntersectionObserver(
        this._observeIntersectionContainer,
        {
          root: this,
          threshold: 0,
        }
      );

      if (intersectionLeftSentinelNode) {
        this._observerIntersection.observe(intersectionLeftSentinelNode);
      }
      if (intersectionRightSentinelNode) {
        this._observerIntersection.observe(intersectionRightSentinelNode);
      }
    }
  }

  disconnectedCallback() {
    this._cleanAndCreateIntersectionObserverContainer();
    super.disconnectedCallback();
  }

  shouldUpdate(changedProperties) {
    super.shouldUpdate(changedProperties);
    if (this.tablist) {
      const { clientWidth, scrollWidth } = this.tablist;
      this._isScrollable = scrollWidth > clientWidth;
    }
    const { selectorItem } = this.constructor as typeof CDSTabs;
    if (changedProperties.has('type')) {
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        this._totalTabs++;
        (elem as CDSTab).type = this.type;
      });
    }
    return true;
  }

  firstUpdated() {
    const { selectorTablist } = this.constructor as typeof CDSTabs;
    const tablist = this.shadowRoot!.querySelector(selectorTablist)!;
    this.tablist = tablist;
    this._cleanAndCreateIntersectionObserverContainer({ create: true });
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      const tab = this.querySelector(
        `${prefix}-tab[value="${this.value}"]`
      ) as HTMLElement;
      if (tab) {
        const { width: tabWidth } = tab?.getBoundingClientRect() ?? {};
        const start = tab.offsetLeft ?? 0;
        const end = tab.offsetLeft + tabWidth;

        // The start and end of the visible area of the tablist
        const visibleStart = this.tablist!.scrollLeft + this.BUTTON_WIDTH;
        const visibleEnd =
          this.tablist!.scrollLeft +
          this.tablist!.clientWidth -
          this.BUTTON_WIDTH;

        // The beginning of the tab is clipped and not visible
        if (start < visibleStart) {
          this.tablist!.scrollLeft = start - this.BUTTON_WIDTH;
        }

        // The end of the tab is clipped and not visible
        if (end > visibleEnd) {
          this.tablist!.scrollLeft =
            end + this.BUTTON_WIDTH - this.tablist!.clientWidth;
        }
      }
    }

    if (changedProperties.has('_currentScrollPosition')) {
      if (this._contentNode) {
        this._contentNode.style.insetInlineStart = `-${this._currentScrollPosition}px`;
      }
    }
  }

  render() {
    const {
      _isIntersectionLeftTrackerInContent: isIntersectionLeftTrackerInContent,
      _isIntersectionRightTrackerInContent: isIntersectionRightTrackerInContent,
      _assistiveStatusText: assistiveStatusText,
      _handleSlotchange: handleSlotchange,
    } = this;

    const previousButtonClasses = classMap({
      [`${prefix}--tab--overflow-nav-button`]: true,
      [`${prefix}--tabs__nav-caret-left`]: true,
      [`${prefix}--tab--overflow-nav-button--previous`]: true,
      [`${prefix}--tab--overflow-nav-button--hidden`]:
        isIntersectionLeftTrackerInContent,
    });
    const nextButtonClasses = classMap({
      [`${prefix}--tab--overflow-nav-button`]: true,
      [`${prefix}--tabs__nav-caret-right`]: true,
      [`${prefix}--tab--overflow-nav-button--next`]: true,
      [`${prefix}--tab--overflow-nav-button--hidden`]:
        isIntersectionRightTrackerInContent,
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
        ${ChevronLeft16()}
      </button>

      <div class="${prefix}--tabs-nav-content-container">
        <div class="${prefix}--tabs-nav-content">
          <div class="${prefix}--tabs-nav">
            <div id="tablist" role="tablist" class="${prefix}--tab--list">
              <div class="${prefix}--sub-content-left"></div>
              <slot @slotchange=${handleSlotchange}></slot>
              <div class="${prefix}--sub-content-right"></div>
            </div>
          </div>
        </div>
      </div>

      <button
        part="next-button"
        tabindex="-1"
        aria-hidden="true"
        class="${nextButtonClasses}"
        @click=${(_) =>
          this._handleScrollButtonClick(_, {
            direction: NAVIGATION_DIRECTION.Right,
          })}>
        ${ChevronRight16()}
      </button>
      <div
        class="${prefix}--assistive-text"
        role="status"
        aria-live="assertive"
        aria-relevant="additions text">
        ${assistiveStatusText}
      </div>
    `;
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
   * @returns A action for dropdown for the given key symbol.
   */
  static getAction(key: string) {
    if (key === 'Home') {
      return TABS_KEYBOARD_ACTION.HOME;
    }
    if (key === 'End') {
      return TABS_KEYBOARD_ACTION.END;
    }
    if (key in NAVIGATION_DIRECTION) {
      return TABS_KEYBOARD_ACTION.NAVIGATING;
    }
    return TABS_KEYBOARD_ACTION.NONE;
  }
}
