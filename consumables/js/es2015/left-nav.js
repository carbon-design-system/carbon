import '../polyfills/array-from';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import toggleClass from '../polyfills/toggle-class';
import eventMatches from '../polyfills/event-matches';
import on from '../misc/on';

export default class LeftNav {
  /**
   * Left Navigation.
   * @implements Component
   * @param {HTMLElement} element The element working as a left navigation.
   * @param {Object} [options] The component options
   * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
   * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
   * @param {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
   * @param {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show and hide the left navigation.
   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @param {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
   * @param {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
   * @param {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
   * @param {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
   * @param {string} [options.selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
   * @param {string} [options.selectorLeftNavCurrentPage] The data attribute selector for the current section title in the left nav header.
   * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
   * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
   * @param {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
   * @param {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
   * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
   * @param {string} [options.classItemHasChildren] The class name for when a list item has children.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign({
      // Data Attribute selectors
      selectorLeftNav: '[data-left-nav]',
      selectorLeftNavList: '[data-left-nav-list]',
      selectorLeftNavNestedList: '[data-left-nav-nested-list]',
      selectorLeftNavToggle: '[data-left-nav-toggle]',
      selectorLeftNavListItem: '[data-left-nav-item]',
      selectorLeftNavListItemLink: '[data-left-nav-item-link]',
      selectorLeftNavNestedListItem: '[data-left-nav-nested-item]',
      selectorLeftNavArrowIcon: '[data-left-nav-icon]',
      selectorLeftNavFlyoutMenu: '[data-left-nav-flyout]',
      selectorLeftNavFlyoutItem: '[data-left-nav-flyout-item]',
      selectorLeftNavSection: '[data-left-nav-section]',
      selectorLeftNavCurrentSection: '[data-left-nav-current-section]',
      selectorLeftNavListItemHasChildren: '[data-left-nav-item-with-children]',
      selectorLeftNavListItemHasFlyout: '[data-left-nav-has-flyout]',
      selectorLeftNavAllListItems: '[data-left-nav-item], [data-left-nav-nested-item], [data-left-nav-flyout-item]',
      // CSS Class Selectors
      classActiveLeftNav: 'bx--left-nav--active',
      classActiveLeftNavListItem: 'bx--left-nav-list__item--active',
      classExpandedLeftNavListItem: 'bx--left-nav-list__item--expanded',
      classFlyoutDisplayed: 'bx--left-nav-list--flyout--displayed',
      classItemHasChildren: 'bx--left-nav-list__item--has-children',
    }, options);

    this.constructor.components.set(this.element, this);

    this.hookOpenActions();
    this.hookListItemsEvents();
    this.animateInNav();
    this.hDocumentClick = on(this.element.ownerDocument, 'click', (evt) => this.handleDocumentClick(evt));
  }

  /**
   * Instantiates a left navigation of the given element.
   * @param {HTMLElement} element The element working as the left navigation.
   * @param {Object} [options] The component options
   * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
   * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
   * @param {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
   * @param {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show and hide the left navigation.
   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @param {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
   * @param {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
   * @param {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
   * @param {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
   * @param {string} [options.selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
   * @param {string} [options.selectorLeftNavCurrentPage] The data attribute selector for the current section title in the left nav header.
   * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
   * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
   * @param {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
   * @param {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
   * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
   * @param {string} [options.classItemHasChildren] The class name for when a list item has children.
   */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
   * Instantiates a left navigation in the given node.
   * If the given element indicates that it's a left navigation (having `data-left-nav-container` attribute), instantiates it.
   * Otherwise, instantiates left navigation by searching for left navigation in the given node.
   * @param {Node} target The DOM node to instantiate left navigation in. Should be a document or an element.
   * @param {Object} [options] The component options
   * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
   * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
   * @param {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
   * @param {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show and hide the left navigation.
   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @param {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
   * @param {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
   * @param {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
   * @param {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
   * @param {string} [options.selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
   * @param {string} [options.selectorLeftNavCurrentPage] The data attribute selector for the current section title in the left nav header.
   * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
   * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
   * @param {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
   * @param {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
   * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
   * @param {string} [options.classItemHasChildren] The class name for when a list item has children.
   */
  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-left-nav-container]')].forEach(element => this.create(element, options));
    }
  }

  /**
   * Adds a animation delay to the list items as they appear on page load.
   */
  animateInNav() {
    let counter = 0.1;
    [... this.element.querySelectorAll(this.options.selectorLeftNavListItem)].forEach(item => {
      item.classList.add('animate');
      item.style.animationDelay = `${counter}s`;
      counter += 0.05;
    });
    setTimeout(() => {
      [... this.element.querySelectorAll(this.options.selectorLeftNavListItem)].forEach(item => {
        item.classList.remove('animate');
      });
    }, 1000);
  }

  /**
   * Adds event listeners for showing and hiding the left navigation
   */
  hookOpenActions() {
    const openCloseBtns = [... this.element.ownerDocument.querySelectorAll(this.options.selectorLeftNavToggle)];
    openCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.leftNavToggle === 'close') {
          this.element.tabIndex = '-1';
          this.element.classList.remove(this.options.classActiveLeftNav);
        } else if (btn.dataset.leftNavToggle === 'open') {
          this.element.tabIndex = '0';
          this.element.classList.add(this.options.classActiveLeftNav);
        }
      });
      btn.addEventListener('keypress', () => {
        if (btn.dataset.leftNavToggle === 'close') {
          this.element.classList.remove(this.options.classActiveLeftNav);
        } else if (btn.dataset.leftNavToggle === 'open') {
          this.element.tabIndex = '0';
          this.element.classList.add(this.options.classActiveLeftNav);
        }
      });
    });
    this.element.ownerDocument.addEventListener('keydown', (evt) => {
      if (evt.which === 27 && this.element.classList.contains(this.options.classActiveLeftNav)) {
        this.element.classList.remove(this.options.classActiveLeftNav);
      }
    });
  }

  /**
   * Adds event listeners to list items
   */
  hookListItemsEvents() {
    const leftNavList = this.element.querySelector(this.options.selectorLeftNavList);
    leftNavList.addEventListener('click', (evt) => {
      const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);
      if (leftNavItem) {
        const childItem = eventMatches(evt, this.options.selectorLeftNavNestedListItem);
        const hasChildren = eventMatches(evt, this.options.selectorLeftNavListItemHasChildren);
        const flyoutItem = eventMatches(evt, this.options.selectorLeftNavFlyoutItem);
        if (flyoutItem) {
          this.addActiveListItem(flyoutItem);
        } else if (childItem) {
          if (childItem.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
            const flyoutMenu = childItem.querySelector(this.options.selectorLeftNavFlyoutMenu);
            flyoutMenu.classList.toggle(this.options.classFlyoutDisplayed);
          } else {
            this.addActiveListItem(childItem);
          }
        } else if (hasChildren) {
          this.handleNestedListClick(leftNavItem);
        } else {
          this.addActiveListItem(leftNavItem);
        }
      }
    });
    leftNavList.addEventListener('keydown', (evt) => {
      if (evt.which === 13) {
        const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);
        if (leftNavItem) {
          const childItem = eventMatches(evt, this.options.selectorLeftNavNestedListItem);
          const hasChildren = eventMatches(evt, this.options.selectorLeftNavListItemHasChildren);
          const flyoutItem = eventMatches(evt, this.options.selectorLeftNavFlyoutItem);
          if (flyoutItem) {
            this.addActiveListItem(flyoutItem);
          } else if (childItem) {
            if (!childItem.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
              this.addActiveListItem(childItem);
            }
          } else if (hasChildren) {
            this.handleNestedListClick(leftNavItem);
          } else {
            this.addActiveListItem(leftNavItem);
          }
        }
      }
    });
    const flyouts = [... this.element.ownerDocument.querySelectorAll(this.options.selectorLeftNavListItemHasFlyout)];
    flyouts.forEach(flyout => {
      flyout.addEventListener('mouseenter', () => {
        flyout.querySelector(this.options.selectorLeftNavFlyoutMenu).style.top = `${flyout.offsetTop - this.element.querySelector(this.options.selectorLeftNav).scrollTop}px`;
        flyout.querySelector(this.options.selectorLeftNavFlyoutMenu).style.left = `${flyout.offsetLeft + Math.round(flyout.offsetWidth)}px`;
        flyout.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.add(this.options.classFlyoutDisplayed);
      });
      flyout.addEventListener('mouseleave', () => {
        flyout.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.remove(this.options.classFlyoutDisplayed);
      });
    });
  }

  /**
   * Hides all flyout menus.
   */
  hideAllFlyoutMenus() {
    const flyoutMenus = [... this.element.querySelectorAll(this.options.selectorLeftNavFlyoutMenu)];
    flyoutMenus.forEach(menu => {
      menu.classList.remove(this.options.classFlyoutDisplayed);
    });
  }

  /**
   * Sets a list item as active.
   * @param {Object} item The active list item.
   */
  addActiveListItem(item) {
    [...this.element.querySelectorAll(this.options.selectorLeftNavAllListItems)].forEach(currentItem => {
      if (!(item === currentItem)) {
        if (!currentItem.contains(item)) {
          currentItem.classList.remove(this.options.classActiveLeftNavListItem);
        } else {
          currentItem.classList.add(this.options.classActiveLeftNavListItem);
        }
      }
    });
    [...this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem)].forEach(currentItem => {
      if (!(item === currentItem)) {
        currentItem.classList.remove(this.options.classActiveLeftNavListItem);
      }
    });
    item.classList.add(this.options.classActiveLeftNavListItem);
    this.hideAllFlyoutMenus();
    this.element.classList.remove(this.options.classActiveLeftNav);
  }

  /**
   * Handles click on the document.
   * Closes the left navigation when document is clicked outside the left navigation.
   * @param {Event} event The event triggering this method.
   */
  handleDocumentClick(evt) {
    const clickTarget = evt.target;
    const isOfSelf = this.element.contains(clickTarget);
    const isToggleBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggle).contains(clickTarget);
    const isOpen = this.element.classList.contains(this.options.classActiveLeftNav);
    const isUnifiedHeader = this.element.ownerDocument.querySelector('[data-unified-header]').contains(clickTarget);
    const shouldClose = !isOfSelf && isOpen && !isToggleBtn && !isUnifiedHeader;
    const flyoutOpen = this.element.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.contains(this.options.classFlyoutDisplayed);
    if (isOfSelf && this.element.tagName === 'A') {
      evt.preventDefault();
    }
    if (shouldClose) {
      this.element.classList.remove(this.options.classActiveLeftNav);
    }
    if (flyoutOpen && !isOfSelf && isOpen) {
      this.element.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.remove(this.options.classFlyoutDisplayed);
    }
  }

  /**
   * Handles click on a list item that contains a nested list in the left navigation.
   * It hides all flyout menus and switches the tab-index on the list items based on whether or not the list is expanded.
   * @param {HTMLElement} listItem The list item that was clicked.
   * @param {Event} event The event triggering this method.
   */
  handleNestedListClick(listItem) {
    const isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
    this.hideAllFlyoutMenus();
    toggleClass(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
    const listItems = [... listItem.querySelectorAll(this.options.selectorLeftNavNestedListItem)];
    listItems.forEach(item => {
      if (isOpen) {
        item.querySelector(this.options.selectorLeftNavListItemLink).tabIndex = -1;
      } else {
        item.querySelector(this.options.selectorLeftNavListItemLink).tabIndex = 0;
      }
    });
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    this.constructor.components.delete(this.element);
  }
}

/**
* The component options.
 * @member {Object} LeftNav#options
 * @property {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
 * @property {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
 * @property {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
 * @property {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show and hide the left navigation.
 * @property {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
 * @property {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
 * @property {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
 * @property {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
 * @property {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
 * @property {string} [options.selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
 * @property {string} [options.selectorLeftNavCurrentPage] The data attribute selector for the current section title in the left nav header.
 * @property {string} [options.classActiveLeftNav] The class name for when a left nav is active.
 * @property {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
 * @property {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
 * @property {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
 * @property {string} [options.classActiveSection] The class name for an active section item in the left nav header.
 * @property {string} [options.classItemHasChildren] The class name for when a list item has children.
 */

/**
 * The map associating DOM element and left navigation instance.
 * @type {WeakMap}
 */
LeftNav.components = new WeakMap();
