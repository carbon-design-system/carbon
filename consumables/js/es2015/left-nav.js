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
   * @param {Object} [options] The component options.selectorL   * @param {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show the left navigation on mobile.
   * @param {string} [options.selectorLeftNavDimmer] The data attribute selector that will add a dimmer to the rest of the content when the left navigation is displayed on mobile.
   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @param {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
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
      selectorLeftNavDimmer: '[data-left-nav-dimmer]',
      selectorLeftNavListItem: '[data-left-nav-item]',
      selectorLeftNavListItemLink: '[data-left-nav-item-link]',
      selectorLeftNavNestedListItem: '[data-left-nav-nested-item]',
      selectorLeftNavListItemWithChildren: '.left-nav-list__item.left-nav-list__item--has-children',
      selectorLeftNavListItemWithoutChildren: '.left-nav-list__item:not(.left-nav-list__item--has-children)',
      selectorLeftNavArrowIcon: '[data-left-nav-icon]',
      // CSS Class Selectors
      classActiveLeftNav: 'left-nav--active',
      classActiveLeftNavListItem: 'left-nav-list__item--active',
      classExpandedLeftNavListItem: 'left-nav-list__item--expanded',
      classItemHasChildren: 'left-nav-list__item--has-children',
      classIconDisplayed: 'left-nav-list__item-icon--displayed',
      classIconActive: 'left-nav-list__item-icon--active',
      classDimmerVisible: 'left-nav-dimmer--visible',
    }, options);

    this.constructor.components.set(this.element, this);

    this.hookOpenActions();
    this.hookListItemsEvents();
    // this.addArrowsToNestedLists();
    this.element.ownerDocument.addEventListener('click', (evt) => this.handleDocumentClick(evt));
  }

  /**
   * Instantiates a left navigation of the given element.
   * @param {HTMLElement} element The element working as the left navigation.
   * @param {Object} [options] The component options.selectorL   * @param {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show the left navigation on mobile.
   * @param {string} [options.selectorLeftNavDimmer] The data attribute selector that will add a dimmer to the rest of the content when the left navigation is displayed on mobile.
   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @param {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
   */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
   * Instantiates a left navigation in the given node.
   * If the given element indicates that it's a left navigation (having `data-left-nav` attribute), instantiates it.
   * Otherwise, instantiates left navigation by searching for left navigation in the given node.
   * @param {Node} target The DOM node to instantiate left navigation in. Should be a document or an element.
   * @param {Object} [options] The component options.selectorL   * @param {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show the left navigation on mobile.
   * @param {string} [options.selectorLeftNavDimmer] The data attribute selector that will add a dimmer to the rest of the content when the left navigation is displayed on mobile.
   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @param {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
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
  addArrowsToNestedLists() {
    const leftNavListItems = [... this.element.querySelectorAll(this.options.selectorLeftNavListItem)];
    leftNavListItems.forEach(item => {
      if (item.classList.contains(this.options.classItemHasChildren)) {
        const chevron = document.createElement('div');
        chevron.classList.add('left-nav-list__item-icon');
        chevron.setAttribute('data-left-nav-icon', true);
        chevron.innerHTML = `
          <svg class="icon">
            <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v4/img/sprite.svg#support--chevron-down"></use>
          </svg>
        `;
        const link = item.querySelector('a');
        link.appendChild(chevron);
      }
    });
    const leftNavNestedListItems = [... this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem)];
    leftNavNestedListItems.forEach(item => {
      if (item.querySelector('[data-left-nav-flyout]')) {
        const chevron = document.createElement('div');
        chevron.classList.add('left-nav-list--flyout--arrow');
        chevron.innerHTML = `
        <svg class="left-nav-list--flyout--arrow-icon">
          <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v4/img/sprite.svg#service--chevron"></use>
        </svg>
        `;
        const link = item.querySelector('a');
        link.appendChild(chevron);
      }
    });
  }

  /**
   * Adds event listeners for showing the left navigation on mobile
   */
  hookOpenActions() {
    const headerHamburger = document.querySelector('[data-left-nav-toggle]');
    headerHamburger.addEventListener('click', () => {
      this.element.classList.toggle('left-nav--active');
      // this.toggleLeftNav();
    });
  }

  /**
   * Adds event listeners to list items
   */
  hookListItemsEvents() {
    const leftNavList = this.element.querySelector(this.options.selectorLeftNavList);

    leftNavList.addEventListener('click', (evt) => {
      const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);
      const leftNavNestedListItem = eventMatches(evt, this.options.selectorLeftNavNestedListItem);
      const leftNavFlyoutListItem = eventMatches(evt, '[data-left-nav-flyout-item]');

      if (leftNavItem) {
        if (leftNavItem.classList.contains(this.options.classItemHasChildren)) {
          this.handleNestedListClick(leftNavItem, evt);
        } else {
          this.addActiveListItem(evt);
        }
      }

      if (leftNavNestedListItem) {
        this.addActiveListItem(evt);
      }

      if (leftNavFlyoutListItem) {
        const isMobile = (window.outerWidth < 600);
        leftNavFlyoutListItem.parentElement.parentElement.classList.add('left-nav-list__item--active');
        if (isMobile) {
          this.toggleLeftNav();
        } else {
          leftNavFlyoutListItem.parentElement.classList.remove('left-nav-list--flyout--displayed');
        }
      }
    });

    // const leftNavNestedListItems = [... this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem)];
  }

  /**
   * Toggles the visibility of the left nav and dimmer
   */
  toggleLeftNav() {
    const leftNavList = this.element.querySelector(this.options.selectorLeftNav);
    const leftNavDimmer = this.element.querySelector(this.options.selectorLeftNavDimmer);
    const isOpen = leftNavList.classList.contains(this.options.classActiveLeftNav);
    const leftNavToggle = document.querySelector('[data-left-nav-toggle]');
    const demoContainer = document.querySelector('.global-header__demo-container');
    demoContainer.classList.toggle('slide-out');
    toggleClass(leftNavList, this.options.classActiveLeftNav, !isOpen);
    toggleClass(leftNavDimmer, this.options.classDimmerVisible, !isOpen);
    toggleClass(leftNavToggle, 'active', !isOpen);
  }

  /**
   * Sets a list item as active by redirecting to the specific function based on whether the item is a single item or if it is part of a nested itemHasChildren.
   */
  addActiveListItem(evt) {
    const itemHasChildren = eventMatches(evt, this.options.selectorLeftNavListItemWithChildren);
    const itemWithoutChildren = eventMatches(evt, this.options.selectorLeftNavListItemWithoutChildren);
    const flyoutMenus = [... this.element.querySelectorAll('[data-left-nav-flyout]')];
    flyoutMenus.forEach(menu => {
      menu.classList.remove('left-nav-list--flyout--displayed');
    });

    if (itemHasChildren) {
      this.addActiveNestedListItem(evt);
    }

    if (itemWithoutChildren) {
      this.addActiveSingleListItem(itemWithoutChildren);
    }
  }

  /**
   * Sets a list item in a nested list as active.
   */
  addActiveNestedListItem(evt) {
    const childItem = eventMatches(evt, this.options.selectorLeftNavNestedListItem);
    const item = evt.target;
    if (childItem.querySelector('[data-left-nav-flyout]')) {
      const flyoutMenu = childItem.querySelector('[data-left-nav-flyout]');
      flyoutMenu.classList.toggle('left-nav-list--flyout--displayed');
    }
    [... this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem)].forEach(currentItem => {
      if (childItem !== currentItem) {
        const currentIcon = currentItem.parentElement.parentElement.querySelector('[data-left-nav-icon]');
        currentItem.classList.remove(this.options.classActiveLeftNavListItem);
        if (currentItem.querySelector('[data-left-nav-flyout]')) {
          const flyoutMenu = currentItem.querySelector('[data-left-nav-flyout]');
          flyoutMenu.classList.remove('left-nav-list--flyout--displayed');
        }
        currentIcon.classList.remove(this.options.classIconActive);
      }
    });
    const arrowIcon = childItem.parentElement.parentElement.querySelector('[data-left-nav-icon]');
    arrowIcon.classList.add(this.options.classIconActive);
    item.classList.add(this.options.classActiveLeftNavListItem);
    childItem.classList.add(this.options.classActiveLeftNavListItem);
    const isMobile = (window.outerWidth < 600);
    if (isMobile) {
      this.toggleLeftNav();
    }
  }

  /**
   * Sets a single list item without a nested list as active.
   * @param {Object} item The active list item.
   */
  addActiveSingleListItem(item) {
    [...this.element.querySelectorAll(this.options.selectorLeftNavListItemWithoutChildren)].forEach(currentItem => {
      if (item !== currentItem) {
        currentItem.classList.remove(this.options.classActiveLeftNavListItem);
      }
    });
    item.classList.add(this.options.classActiveLeftNavListItem);
  }

  /**
   * Handles click on the document.
   * Closes the left navigation on mobile screens when document is clicked outside the left navigation.
   * @param {Event} event The event triggering this method.
   */
  handleDocumentClick(evt) {
    const clickTarget = evt.target;
    const leftNavList = this.element.querySelector(this.options.selectorLeftNav);
    const leftNavToggle = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggle);
    if (leftNavList && leftNavToggle) {
      const isOfSelf = leftNavList.contains(clickTarget);
      const isToggle = leftNavToggle.contains(clickTarget);
      const isOpen = leftNavList.classList.contains(this.options.classActiveLeftNav);
      const isMobile = (window.outerWidth < 600);
      const shouldClose = !isOfSelf && !isToggle && isOpen && isMobile;
      const flyoutOpen = this.element.querySelector('[data-left-nav-flyout]').classList.contains('left-nav-list--flyout--displayed');
      if (isOfSelf && leftNavList.tagName === 'A') {
        evt.preventDefault();
      }
      if (shouldClose) {
        this.toggleLeftNav();
      }
      if (flyoutOpen && !isOfSelf && !isToggle && isOpen) {
        this.element.querySelector('[data-left-nav-flyout]').classList.remove('left-nav-list--flyout--displayed');
      }
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
    const flyoutMenus = [... this.element.querySelectorAll('[data-left-nav-flyout]')];
    flyoutMenus.forEach(menu => {
      menu.classList.remove('left-nav-list--flyout--displayed');
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
 * @property {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show the left navigation on mobile.
 * @property {string} [options.selectorLeftNavDimmer] The data attribute selector that will add a dimmer to the rest of the content when the left navigation is displayed on mobile.
 * @property {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
 * @property {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
 */

/**
 * The map associating DOM element and left navigation instance.
 * @type {WeakMap}
 */
LeftNav.components = new WeakMap();
