import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-search';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import toggleClass from '../polyfills/toggle-class';
import eventMatches from '../polyfills/event-matches';

class InlineLeftNav extends mixin(createComponent, initComponent) {
  /**
   * Spinner indicating loading state.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a spinner.
   * @param {Object} options The component options.
   */
  constructor(element, options) {
    super(element, options);
    this.constructor.components.set(this.element, this);

    this.keepOpen =
    this.element.dataset.keepOpen === undefined
      ? this.options.keepOpen
      : Boolean(this.element.dataset.keepOpen);

    this.hookListItemsEvents();
  }

  hookListItemsEvents = () => {
    this.element.addEventListener('click', (evt) => {
      const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);
      const collapseEl = eventMatches(evt, this.options.selectorLeftNavCollapse);
      const collapsedBar = eventMatches(evt, `.${this.options.classLeftNavCollapsed}`);

      if (leftNavItem) {
        const childItem = eventMatches(evt, this.options.selectorLeftNavNestedListItem);
        const hasChildren = leftNavItem.classList.contains('left-nav-list__item--has-children');
        if (childItem) {
          this.addActiveListItem(childItem);
        } else if (hasChildren) {
          this.handleNestedListClick(leftNavItem, evt);
        } else {
          this.addActiveListItem(leftNavItem);
        }
      }

      if (collapseEl || collapsedBar) {
        evt.preventDefault();
        this.toggleLeftNav();
      }
    });

    this.element.addEventListener('keydown', (evt) => {
      const leftNavItemWithChildren = eventMatches(evt, this.options.selectorLeftNavListItemHasChildren);
      const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);

      if (leftNavItemWithChildren && evt.which === 13) {
        this.handleNestedListClick(leftNavItemWithChildren, evt);
      } else if (leftNavItem && evt.which === 13) {
        this.addActiveListItem(leftNavItem);
      }
    });
  }

  addActiveListItem(item) {
    [...this.element.querySelectorAll(this.options.selectorLeftNavListItem)].forEach((currentItem) => {
      if (!(item === currentItem)) {
        currentItem.classList.remove(this.options.classActiveLeftNavListItem);
      }
    });
    [...this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem)].forEach((currentItem) => {
      if (!(item === currentItem)) {
        currentItem.classList.remove(this.options.classActiveLeftNavListItem);
      }
    });
    item.classList.add(this.options.classActiveLeftNavListItem);
  }

  /**
   * Handles click on a list item that contains a nested list in the left navigation.
   * The nested list is expanded and the icon is rotated.
   * @param {HTMLElement} listItem The list item that was clicked.
   * @param {Event} event The event triggering this method.
   */
  handleNestedListClick(listItem, evt) {
    const allNestedItems = [...document.querySelectorAll(this.options.selectorLeftNavListItemHasChildren)];
    const isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
    const list = listItem.querySelector(this.options.selectorLeftNavNestedList);
    const listItems = [...list.querySelectorAll(this.options.selectorLeftNavNestedListItem)];

    if (!this.keepOpen) {
      allNestedItems.forEach((currentItem) => {
        if (currentItem !== listItem) {
          toggleClass(currentItem, this.options.classExpandedLeftNavListItem, false);
        }
      });
    }

    if (!('inlineLeftNavItemLink' in evt.target.dataset)) {
      toggleClass(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
    }

    listItems.forEach((item) => {
      if (isOpen) {
        // eslint-disable-next-line no-param-reassign
        item.querySelector(this.options.selectorLeftNavListItemLink).tabIndex = -1;
      } else {
        // eslint-disable-next-line no-param-reassign
        item.querySelector(this.options.selectorLeftNavListItemLink).tabIndex = 0;
      }
    });
  }

  toggleLeftNav = () => {
    const collapsed = this.element.dataset.collapsed === 'true';
    const eventStart = new CustomEvent(this.options.eventBeforeLeftNavToggled, {
      bubbles: true,
      cancelable: true,
      detail: { collapsed: !collapsed }, // shows where the toggle is going, not where it is
    });

    if (this.element.dispatchEvent(eventStart)) {
      if (!collapsed) {
        this.element.dataset.collapsed = true;
        this.element.classList.add(this.options.classLeftNavCollapsing);

        window.setTimeout(() => {
          this.element.classList.remove(this.options.classLeftNavCollapsing);
          this.element.classList.add(this.options.classLeftNavCollapsed);
          this.element.dispatchEvent(new CustomEvent(this.options.eventAfterLeftNavToggled, {
            bubbles: true,
            cancelable: true,
            detail: { collapsed: true },
          }));
        }, 250);
      } else {
        this.element.dataset.collapsed = false;
        this.element.classList.remove(this.options.classLeftNavCollapsed);
        this.element.classList.add(this.options.classLeftNavExpanding);

        window.setTimeout(() => {
          this.element.classList.remove(this.options.classLeftNavExpanding);
          this.element.dispatchEvent(new CustomEvent(this.options.eventAfterLeftNavToggled, {
            bubbles: true,
            cancelable: true,
            detail: { collapsed: false },
          }));
        }, 250);
      }
    }
  }

  /**
   * The map associating DOM element and spinner instance.
   * @member InlineLeftNav.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode InlineLeftNav.create .create()}, or {@linkcode InlineLeftNav.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode InlineLeftNav.init .init()} works.
   * @member InlineLeftNav.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find inline left navs.
   */
  static options = {
    selectorInit: '[data-inline-left-nav]',
    // Data Attribute selectors
    selectorLeftNavList: '[data-inline-left-nav-list]',
    selectorLeftNavNestedList: '[data-inline-left-nav-nested-list]',
    selectorLeftNavListItem: '[data-inline-left-nav-item]',
    selectorLeftNavListItemLink: '[data-inline-left-nav-item-link]',
    selectorLeftNavNestedListItem: '[data-inline-left-nav-nested-item]',
    selectorLeftNavListItemHasChildren: '[data-inline-left-nav-with-children]',
    selectorLeftNavCollapse: '[data-inline-left-nav-collapse]',
    // CSS Class Selectors
    classActiveLeftNavListItem: 'left-nav-list__item--active',
    classExpandedLeftNavListItem: 'left-nav-list__item--expanded',
    classLeftNavCollapsing: 'bx--inline-left-nav--collapsing',
    classLeftNavCollapsed: 'bx--inline-left-nav--collapsed',
    classLeftNavExpanding: 'bx--inline-left-nav--expanding',
    // Event
    eventBeforeLeftNavToggled: 'left-nav-beingtoggled',
    eventAfterLeftNavToggled: 'left-nav-toggled',
    // Option
    keepOpen: false,
  };
}

export default InlineLeftNav;
