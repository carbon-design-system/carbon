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
    this.focusIndex = 0;
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
    if (!toggleOpenNode) {
      throw new TypeError('Cannot find the trigger button.');
    }
    toggleOpenNode.classList.remove(this.options.classActiveTrigger);
    const leftNavContainer = this.element.querySelector(this.options.selectorLeftNav);
    if (!leftNavContainer) {
      throw new TypeError('Cannot find the nav.');
    }
    leftNavContainer.parentNode.setAttribute('aria-expanded', 'false');
    toggleOpenNode.removeAttribute('aria-expanded');
  }

  /**
   * Toggles the menu to open and close.
   */
  toggleMenu() {
    const leftNavContainer = this.element.querySelector(this.options.selectorLeftNav);
    if (!leftNavContainer) {
      throw new TypeError('Cannot find the nav.');
    }
    const element = leftNavContainer.parentNode;
    this.element.classList.toggle(this.options.classActiveLeftNav);
    const toggleOpenNode = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
    if (!toggleOpenNode) {
      throw new TypeError('Cannot find the trigger button.');
    }
    toggleOpenNode.classList.toggle(this.options.classActiveTrigger);
    if (element.getAttribute('aria-expanded') === 'false') {
      element.setAttribute('aria-expanded', 'true');
      toggleOpenNode.setAttribute('aria-expanded', 'true');
      this.focusIndex = 0;
    } else {
      element.setAttribute('aria-expanded', 'false');
      toggleOpenNode.removeAttribute('aria-expanded');
    }
  }

  onKeyDown(evt) {
    const leftNavContainer = document.querySelector('[data-left-nav]');
    if (!leftNavContainer) {
      throw new TypeError('Cannot find the nav.');
    }
    const navItems = [...leftNavContainer.getElementsByClassName('bx--parent-item__link')];

    const visibleNavItems = navItems.filter(item =>
      window.getComputedStyle(item.parentElement).display !== 'none',
    );

    const button = [...document.getElementsByClassName('bx--left-nav__trigger')];
    visibleNavItems.unshift(button[0]);

    switch (evt.which) {
      case 9: // tab
        if (evt.shiftKey) {
          if (this.focusIndex > 0) {
            this.focusIndex--;
          } else {
            this.closeMenu();
          }
        }

        if (!evt.shiftKey) {
          if (this.focusIndex < visibleNavItems.length - 1) {
            this.focusIndex++;
          } else {
            this.closeMenu();
          }
        }
        break;

      case 38: // arrow up
        if (this.focusIndex > 0) {
          this.focusIndex--;
        }
        visibleNavItems[this.focusIndex].focus();
        break;

      case 40: // arrow down
        if (this.focusIndex < visibleNavItems.length - 1) {
          this.focusIndex++;
        }
        visibleNavItems[this.focusIndex].focus();
        break;

      case 36: // home
        this.focusIndex = 1;
        visibleNavItems[this.focusIndex].focus();
        break;

      case 35: // end
        this.focusIndex = visibleNavItems.length - 1;
        visibleNavItems[this.focusIndex].focus();
        break;

      default:
        break;
    }
  }

  hookOpenActions() {
    const openBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
    if (!openBtn) {
      throw new TypeError('Cannot find the trigger button.');
    }
    // on btn click or enter press or space press
    openBtn.addEventListener('click', () => {
      this.toggleMenu();
    });

    // on esc press
    this.element.ownerDocument.addEventListener('keydown', (evt) => {
      if ((evt.which === 27) && this.element.classList.contains(this.options.classActiveLeftNav)) {
        openBtn.focus();
        this.closeMenu();
      } else {
        const toggleOpenNode = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
        if (!toggleOpenNode) {
          throw new TypeError('Cannot find the trigger button.');
        }
        if (toggleOpenNode.classList.contains(this.options.classActiveTrigger)) {
          this.onKeyDown = this.onKeyDown.bind(this);
          this.onKeyDown(evt);
        }
      }
    });
  }

  /**
   * Adds event listeners to list items
   */
  hookListItemsEvents() {
    const leftNavList = [...this.element.querySelectorAll(this.options.selectorLeftNavList)];
    leftNavList.forEach((list) => {
      // on mouse click
      list.addEventListener('click', (evt) => {
        const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);
        if (leftNavItem) this.addActiveListItem(leftNavItem);
      });
      // on enter press
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
    const toggleOpenNode = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
    if (!toggleOpenNode) {
      throw new TypeError('Cannot find the trigger button.');
    }
    const isToggleBtn = toggleOpenNode.contains(clickTarget);
    const isOpen = this.element.classList.contains(this.options.classActiveLeftNav);
    const unifiedHeader = this.element.ownerDocument.querySelector('[data-unified-header]');
    const isUnifiedHeader = unifiedHeader && unifiedHeader.contains(clickTarget);
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
