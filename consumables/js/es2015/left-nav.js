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
    this.focusIndex = -1;
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
    if (leftNavContainer.getAttribute('aria-expanded') === 'false') {
      leftNavContainer.setAttribute('aria-expanded', 'true');
      toggleOpenNode.setAttribute('aria-expanded', 'true');
      toggleOpenNode.setAttribute('aria-label', 'Close Navigation');
      // this.element.ownerDocument.addEventListener('keydown', this.onKeyDown);
    } else {
      leftNavContainer.setAttribute('aria-expanded', 'false');
      toggleOpenNode.removeAttribute('aria-expanded');
      toggleOpenNode.setAttribute('aria-label', 'Navigation');
      // this.element.ownerDocument.removeEventListener('keydown', this.onKeyDown);
    }
  }

  onKeyDown (evt, newThis) {
    console.log('========== hitting start of on key down function ========');
    var activeElement = document.activeElement;
    const leftNavContainer = document.querySelector('[data-left-nav]');
    var navItems = leftNavContainer.getElementsByClassName('bx--parent-item__link');
    // const hasFocus = document.querySelector(':focus');
    // hasFocus.classList.add('focus');
    console.log (navItems);
    console.log('2 '+navItems[2]);

      switch (evt.which) {
        case 38: // arrow up
          newThis.focusIndex--;
          navItems[newThis.focusIndex].focus();
          break;

        case 40: // arrow down
          newThis.focusIndex++;
          navItems[newThis.focusIndex].focus();
          break;

        case 36: // home
          navItems[0].focus();
          break;

        case 35: // end
          navItems[navItems.length-1].focus();
          break;
      }
  }

  hookOpenActions() {
    const openBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
    // on btn click or enter press or space press
    openBtn.addEventListener('click', () => {
      this.toggleMenu();
    });

    // on esc press
    this.element.ownerDocument.addEventListener('keydown', (evt) => {
      if ((evt.which === 27) && this.element.classList.contains(this.options.classActiveLeftNav)) {
        this.closeMenu();
      }
      else {
        console.log('keypress');
        const toggleOpen = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
        if(toggleOpen.classList.contains(this.options.classActiveTrigger)) {
          console.log('>>>>>>> toggle is open <<<<<<<<');
          this.onKeyDown(evt, this);
        }
      }
    });

    //up and down keys
    // console.log("what is options selector Left Nav: ", this.options.selectorLeftNav);
    // console.log("left nav container?: ", this.options.selectorInit);
    //
    // const navContainer = this.element.ownerDocument.querySelector(this.options.selectorInit);
    // console.log('what is nav container? ', navContainer);
    // this.element.ownerDocument.addEventListener('keydown', (evt) => {
    //   //check if toggle is open
    //   console.log('keeeeey is dooooown');
    //   // const toggleOpen = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
    //   // if(toggleOpen) {
    //   //   console.log('>>>>>>> toggle is open <<<<<<<<');
    //   //   this.onKeyDown(evt);
    //   // }
    // });

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
