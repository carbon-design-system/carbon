import '../polyfills/array-from';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import toggleClass from '../polyfills/toggle-class';
import eventMatches from '../polyfills/event-matches';

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
      // CSS Class Selectors
      classActiveLeftNav: 'left-nav--active',
      classActiveLeftNavListItem: 'left-nav-list__item--active',
      classExpandedLeftNavListItem: 'left-nav-list__item--expanded',
      classFlyoutDisplayed: 'left-nav-list--flyout--displayed',
      classItemHasChildren: 'left-nav-list__item--has-children',
    }, options);

    this.constructor.components.set(this.element, this);

    // this.hookSectionSwitcher();
    this.hookOpenActions();
    this.hookListItemsEvents();
    // this.addArrowsToNestedLists();
    this.element.querySelector(this.options.selectorLeftNavList).classList.add('left-nav-list--slide-down');
    this.element.ownerDocument.addEventListener('click', (evt) => this.handleDocumentClick(evt));
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
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.tabs !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-left-nav-container]')].forEach(element => this.create(element, options));
    }
  }

  /**
   * Adds arrow icons to nested lists
   */
  // addArrowsToNestedLists() {
  //   const leftNavListItems = [... this.element.querySelectorAll(this.options.selectorLeftNavListItem)];
  //   leftNavListItems.forEach(item => {
  //     if (item.classList.contains(this.options.classItemHasChildren)) {
  //       const chevron = this.element.ownerDocument.createElement('div');
  //       chevron.classList.add('left-nav-list__item-icon');
  //       chevron.setAttribute('data-left-nav-icon', true);
  //       chevron.innerHTML = `
  //         <svg class="icon">
  //           <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v4/img/sprite.svg#support--chevron-down"></use>
  //         </svg>
  //       `;
  //       const link = item.querySelector('a');
  //       link.appendChild(chevron);
  //     }
  //   });
  //   const leftNavNestedListItems = [... this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem)];
  //   leftNavNestedListItems.forEach(item => {
  //     if (item.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
  //       const chevron = this.element.ownerDocument.createElement('div');
  //       chevron.classList.add('left-nav-list--flyout--arrow');
  //       chevron.innerHTML = `
  //         <svg class="left-nav-list--flyout--arrow-icon">
  //           <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v4/img/sprite.svg#service--chevron"></use>
  //         </svg>
  //       `;
  //       const link = item.querySelector('a');
  //       link.appendChild(chevron);
  //     }
  //   });
  // }

  /**
   * Adds event listeners for showing and hiding the left navigation
   */
  hookOpenActions() {
    const openCloseBtns = [... this.element.ownerDocument.querySelectorAll(this.options.selectorLeftNavToggle)];
    openCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.leftNavToggle === 'close') {
          this.element.classList.remove(this.options.classActiveLeftNav);
        } else if (btn.dataset.leftNavToggle === 'open') {
          this.element.classList.add(this.options.classActiveLeftNav);
        }
      });
    });
  }

  /**
   * Adds event listeners for switching between the three sections in the left navigation header
   */
  // hookSectionSwitcher() {
  //   const sections = [... this.element.ownerDocument.querySelectorAll(this.options.selectorLeftNavSection)];
  //   const leftNavList = this.element.querySelector(this.options.selectorLeftNavList);
  //   sections.forEach(section => {
  //     section.addEventListener('click', (evt) => {
  //       leftNavList.classList.add('left-nav-list--slide-up');
  //     });
  //   });
  // }

  /**
   * Adds event listeners to list items
   */
  hookListItemsEvents() {
    const leftNavList = this.element.querySelector(this.options.selectorLeftNavList);
    leftNavList.addEventListener('click', (evt) => {
      const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);
      const flyoutItem = eventMatches(evt, this.options.selectorLeftNavFlyoutItem);
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
      if (flyoutItem) {
        [...this.element.querySelectorAll(this.options.selectorLeftNavFlyoutItem)].forEach(currentItem => {
          if (!(flyoutItem === currentItem)) {
            currentItem.classList.remove(this.options.classActiveLeftNavListItem);
          }
        });
        flyoutItem.classList.add(this.options.classActiveLeftNavListItem);
        this.element.classList.toggle(this.options.classActiveLeftNav);
      }
    });
  }

  /**
   * Sets a list item as active.
   * @param {Object} item The active list item.
   */
  addActiveListItem(item) {
    [...this.element.querySelectorAll(this.options.selectorLeftNavListItem)].forEach(currentItem => {
      if (!(item === currentItem)) {
        currentItem.classList.remove(this.options.classActiveLeftNavListItem);
      }
    });
    item.classList.add(this.options.classActiveLeftNavListItem);
    const flyoutMenuItems = [... this.element.querySelectorAll(this.options.selectorLeftNavFlyoutItem)];
    flyoutMenuItems.forEach(flyoutItem => {
      flyoutItem.classList.remove(this.options.classActiveLeftNavListItem);
    });
    if (item.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
      const flyoutMenu = item.querySelector(this.options.selectorLeftNavFlyoutMenu);
      flyoutMenu.classList.toggle(this.options.classFlyoutDisplayed);
    } else {
      this.hideAllFlyoutMenus();
      this.element.classList.toggle(this.options.classActiveLeftNav);
    }
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
   * Handles click on the document.
   * Closes the left navigation when document is clicked outside the left navigation.
   * @param {Event} event The event triggering this method.
   */
  handleDocumentClick(evt) {
    const clickTarget = evt.target;
    const isOfSelf = this.element.contains(clickTarget);
    const isToggleBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggle).contains(clickTarget);
    const isOpen = this.element.classList.contains(this.options.classActiveLeftNav);
    const shouldClose = !isOfSelf && isOpen && !isToggleBtn;
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
   * The nested list is expanded and the icon is rotated.
   * @param {HTMLElement} listItem The list item that was clicked.
   * @param {Event} event The event triggering this method.
   */
  handleNestedListClick(listItem, evt) {
    const isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
    const flyoutMenus = [... this.element.querySelectorAll(this.options.selectorLeftNavFlyoutMenu)];
    flyoutMenus.forEach(menu => {
      menu.classList.remove(this.options.classFlyoutDisplayed);
    });
    if (!('leftNavItemLink' in evt.target.dataset)) {
      toggleClass(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
    }
  }

  release() {
    if (this.handleDocumentClick) {
      this.element.ownerDocument.removeEventListener('click', (evt) => this.handleDocumentClick(evt));
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
