import mixin from '../misc/mixin';
import createCoponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-search';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import eventMatches from '../polyfills/event-matches';
import on from '../misc/on';

class LeftNav extends mixin(createCoponent, initComponent) {
  /**
   * Left Navigation.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a left navigation.
   * @param {Object} [options] The component options
   * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
   * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
   * @param {string} [options.selectorLeftNavToggle]
   *   The data attribute selector for the button that will show and hide the left navigation.
   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @param {string} [options.selectorLeftNavCurrentPage]
   *   The data attribute selector for the current section title in the left nav header.
   * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
   * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
   * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
   */
  constructor(element, options) {
    super(element, options);
    this.leftNavSectionActive = false;
    this.hookOpenActions();
    this.hookListItemsEvents();
    this.hDocumentClick = on(this.element.ownerDocument, 'click', (evt) => { this.handleDocumentClick(evt); });
  }

  /**
   * Closes the menu.
   */
  closeMenu() {
    this.element.classList.remove(this.options.classActiveLeftNav);
    const toggleOpenNode = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
    toggleOpenNode.classList.remove(this.options.classActiveTrigger);
    this.element.querySelector(this.options.selectorLeftNav).parentNode.setAttribute('aria-expanded', 'false');
  }

  /**
   * Toggles the menu to open and close.
   */
  toggleMenu() {
    const leftNavContainer = this.element.querySelector(this.options.selectorLeftNav).parentNode;
    this.element.classList.toggle(this.options.classActiveLeftNav);
    const toggleOpenNode = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
    toggleOpenNode.classList.toggle(this.options.classActiveTrigger);
    if (leftNavContainer.getAttribute('aria-expanded') === 'false') leftNavContainer.setAttribute('aria-expanded', 'true');
    else leftNavContainer.setAttribute('aria-expanded', 'false');
  }

  hookOpenActions() {
    const openBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
    const closeBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleClose);

    openBtn.addEventListener('click', () => {
      this.element.tabIndex = '0';
      this.toggleMenu();
    });

    openBtn.addEventListener('keydown', (evt) => {
      if (evt.which === 13) {
        this.element.tabIndex = '0';
        this.toggleMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.element.tabIndex = '-1';
        this.closeMenu();
      });

      closeBtn.addEventListener('keydown', (evt) => {
        if (evt.which === 13) {
          this.element.tabIndex = '-1';
          this.closeMenu();
        }
      });
    }

    this.element.ownerDocument.addEventListener('keydown', (evt) => {
      if ((evt.which === 27) && this.element.classList.contains(this.options.classActiveLeftNav)) {
        this.closeMenu();
      }
    });
  }

  /**
   * Adds event listeners to list items
   */
  hookListItemsEvents() {
    const leftNavList = [...this.element.querySelectorAll(this.options.selectorLeftNavList)];
    leftNavList.forEach((list) => {
      list.addEventListener('click', (evt) => {
        const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);
        if (leftNavItem) this.addActiveListItem(leftNavItem);
      });
      list.addEventListener('keydown', (evt) => {
        if (evt.which === 13) {
          const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);
          if (leftNavItem) this.addActiveListItem(leftNavItem);
        }
      });
    });
  }

  /**
   * Sets a list item as active.
   * @param {Object} item The active list item.
   */
  addActiveListItem(item) {
    [...this.element.querySelectorAll(this.options.selectorLeftNavListItem)].forEach((currentItem) => {
      if (!(item === currentItem)) {
        if (!currentItem.contains(item)) {
          currentItem.classList.remove(this.options.classActiveLeftNavListItem);
        } else {
          currentItem.classList.add(this.options.classActiveLeftNavListItem);
        }
      }
    });

    item.classList.add(this.options.classActiveLeftNavListItem);
    this.closeMenu();
  }

  /**
   * Handles click on the document.
   * Closes the left navigation when document is clicked outside the left navigation.
   * @param {Event} event The event triggering this method.
   */
  handleDocumentClick(evt) {
    const clickTarget = evt.target;
    const isOfSelf = this.element.contains(clickTarget);
    const isToggleBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen).contains(clickTarget);
    const isOpen = this.element.classList.contains(this.options.classActiveLeftNav);
    const isUnifiedHeader = this.element.ownerDocument.querySelector('[data-unified-header]').contains(clickTarget);
    const shouldClose = !isOfSelf && isOpen && !isToggleBtn && !isUnifiedHeader;

    if (isOfSelf && this.element.tagName === 'A') {
      evt.preventDefault();
    }
    if (shouldClose) {
      this.closeMenu();
    }
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    super.release();
  }

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode LeftNav.create .create()}, or {@linkcode LeftNav.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode LeftNav.init .init()} works.
   * @member LeftNav.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find left nav containers.
   * @property {string} [selectorLeftNav] The data attribute selector for the nav element in the left nav container.
   * @property {string} [selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
   * @property {string} [selectorLeftNavToggle]
   *   The data attribute selector for the button that will show and hide the left navigation.
   * @property {string} [selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @property {string} [selectorLeftNavCurrentPage]
   *   The data attribute selector for the current section title in the left nav header.
   * @property {string} [classActiveLeftNav] The class name for when a left nav is active.
   * @property {string} [classActiveLeftNavListItem] The class name for when a left nav list item is active.
   * @property {string} [classActiveSection] The class name for an active section item in the left nav header.
   */
  static options = {
    selectorInit: '[data-left-nav-container]',
    // Data Attribute selectors
    selectorLeftNav: '[data-left-nav]',
    selectorLeftNavList: '[data-left-nav-list]',
    selectorLeftNavToggleOpen: '[data-left-nav-toggle="open"]',
    selectorLeftNavToggleClose: '[data-left-nav-toggle="close"]',
    selectorLeftNavListItem: '[data-left-nav-item]',
    selectorLeftNavListItemLink: '[data-left-nav-item-link]',
    // CSS Class Selectors
    classActiveTrigger: 'bx--left-nav__trigger--active',
    classActiveLeftNav: 'bx--left-nav--active',
    classActiveLeftNavListItem: 'bx--active-list-item',
    classItemFade: 'bx--main-nav__parent-item--fade',
    classItemHidden: 'bx--main-nav__parent-item--hidden',
    classListHidden: 'bx--left-nav__main-nav--hidden',
    classListTop: 'bx--left-nav__main-nav--top',
  };

  /**
   * The map associating DOM element and left navigation instance.
   * @member LeftNav.components
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default LeftNav;