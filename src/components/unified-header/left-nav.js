import warning from 'warning';
import { breakingChangesX } from '../../globals/js/feature-flags';
import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';
import removedComponent from '../removed-component';

let didWarnAboutDeprecation;

const toArray = arrayLike => Array.prototype.slice.call(arrayLike);

class LeftNav extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * Left Navigation.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a left navigation.
   * @param {Object} [options] The component options
   * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
   * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
   * @param {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
   * @param {string} [options.selectorLeftNavToggle]
   *   The data attribute selector for the button that will show and hide the left navigation.
   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @param {string} [options.selectorLeftNavNestedListItem]
   *   The data attribute selector for all nested list items in the left navigation.
   * @param {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
   * @param {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
   * @param {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
   * @param {string} [options.selectorLeftNavSection]
   *   The data attribute selector for the three sections in the header of the left nav.
   * @param {string} [options.selectorLeftNavCurrentPage]
   *   The data attribute selector for the current section title in the left nav header.
   * @param {string} [options.selectorLeftNavMainNavHidden] The CSS selector for the hidden main nav.
   * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
   * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
   * @param {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
   * @param {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
   * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
   * @param {string} [options.classItemHasChildren] The class name for when a list item has children.
   * @param {string} [options.classTaxonomyIcon] The class name for the taxonomy icon.
   */
  constructor(element, options) {
    super(element, options);
    if (__DEV__) {
      warning(
        didWarnAboutDeprecation,
        'The `LeftNav` component in `carbon-components` has been deprecated. It will be removed in the next major release.'
      );
      didWarnAboutDeprecation = true;
    }
    this.leftNavSectionActive = false;
    this.hookOpenActions();
    this.hookListSectionEvents();
    this.hookListItemsEvents();
    this.manage(
      on(this.element.ownerDocument, 'click', evt => {
        this.handleDocumentClick(evt);
      })
    );
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

  /**
   * Adds a transitional animation to the navSection
   */
  animateNavSection(selectedNav) {
    const selectedNavValue = selectedNav.dataset.leftNavSection;
    const selectedNavLink = selectedNav.querySelector(this.options.selectorLeftNavSectionLink);
    const leftNav = this.element.querySelector(this.options.selectorLeftNav);
    const leftNavSections = this.element.querySelector(this.options.selectorLeftNavSections);

    selectedNav.classList.remove(this.options.classNavSection);
    selectedNav.classList.remove(`${this.options.classNavSection}--${selectedNavValue}`);
    selectedNav.classList.add(this.options.classNavSectionTransition);
    if (leftNavSections.children[0] === selectedNav) {
      selectedNav.classList.add(`${this.options.classNavSectionTransition}--50`); // First child only move 50px
    } else {
      selectedNav.classList.add(`${this.options.classNavSectionTransition}--100`); // Second move 100px
    }
    selectedNav.setAttribute('data-left-nav-section', selectedNavValue);
    /* Not sure what trick more performant */
    setTimeout(() => {
      selectedNav.classList.add(`${this.options.classNavSectionTransition}--0`);
    }, 100); // Could probably use a promise here

    selectedNavLink.classList.remove(this.options.classNavSectionLink);
    selectedNavLink.classList.add(this.options.classNavHeaderTitle);
    selectedNavLink.setAttribute('data-left-nav-current-section-title', '');
    selectedNavLink.removeAttribute('data-left-nav-section-link');

    this.element.insertBefore(selectedNav, leftNav);
  }

  /**
   * Adds a transitional animation to the navigation items on nav section click
   */
  animateNavList(selectedNavTitle) {
    const currentLeftNavList = this.element.querySelector(
      `${this.options.selectorLeftNavList}:not(${this.options.selectorLeftNavMainNavHidden})`
    );
    const newLeftNavList = this.element.querySelector(`[data-left-nav-list=${selectedNavTitle}]`);
    const currentLeftNavItems = toArray(currentLeftNavList.querySelectorAll(this.options.selectorLeftNavListItem)).reverse();
    const newLeftNavItems = toArray(newLeftNavList.querySelectorAll(this.options.selectorLeftNavListItem));

    const fadeOutTime = 300;
    let counter = 0;
    const counterIteration = fadeOutTime / currentLeftNavItems.length; // Length of animation divided by number of items
    currentLeftNavItems.forEach(item => {
      item.setAttribute('tabIndex', '-1');
      setTimeout(() => {
        item.classList.add(this.options.classItemFade);
      }, counter);
      counter += counterIteration;
    });

    newLeftNavItems.forEach(item => {
      item.setAttribute('tabIndex', '0');
      item.classList.remove(this.options.classItemFade);
    });

    setTimeout(() => {
      currentLeftNavList.classList.add(this.options.classListHidden);
      currentLeftNavList.classList.add(this.options.classListTop);
      currentLeftNavList.setAttribute('aria-hidden', 'true');
      newLeftNavList.classList.remove(this.options.classListHidden);
      setTimeout(() => {
        newLeftNavList.classList.remove(this.options.classListTop);
      }, 100);
      newLeftNavList.setAttribute('aria-hidden', 'false');
    }, fadeOutTime + 100); // Wait for items to fade out.
  }

  hookOpenActions() {
    const openBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
    const closeBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleClose);

    this.manage(
      on(openBtn, 'click', () => {
        this.element.tabIndex = '0';
        this.toggleMenu();
      })
    );

    this.manage(
      on(openBtn, 'keydown', evt => {
        if (evt.which === 13) {
          this.element.tabIndex = '0';
          this.toggleMenu();
        }
      })
    );

    if (closeBtn) {
      this.manage(
        on(closeBtn, 'click', () => {
          this.element.tabIndex = '-1';
          this.closeMenu();
        })
      );

      this.manage(
        on(closeBtn, 'keydown', evt => {
          if (evt.which === 13) {
            this.element.tabIndex = '-1';
            this.closeMenu();
          }
        })
      );
    }

    this.manage(
      on(this.element.ownerDocument, 'keydown', evt => {
        if (evt.which === 27 && this.element.classList.contains(this.options.classActiveLeftNav)) {
          this.closeMenu();
        }
      })
    );
  }

  /**
   * Addes Event listeners to list sections
   */
  hookListSectionEvents() {
    const leftNavSections = this.element.querySelector(this.options.selectorLeftNavSections);
    this.manage(
      on(leftNavSections, 'click', evt => {
        this.handleSectionItemClick(evt, leftNavSections);
      })
    );

    this.manage(
      on(leftNavSections, 'keydown', evt => {
        if (evt.which === 13) {
          this.handleSectionItemClick(evt, leftNavSections);
          this.element.querySelector(this.options.selectorLeftNavCurrentSectionTitle).focus();
        }
      })
    );
  }

  /**
   * Adds event listeners to list items
   */
  hookListItemsEvents() {
    const leftNavList = toArray(this.element.querySelectorAll(this.options.selectorLeftNavList));
    leftNavList.forEach(list => {
      this.manage(
        on(list, 'click', evt => {
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
        })
      );
      this.manage(
        on(list, 'keydown', evt => {
          if (evt.which === 13) {
            const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);
            if (leftNavItem) {
              const childItem = eventMatches(evt, this.options.selectorLeftNavNestedListItem);
              const hasChildren = eventMatches(evt, this.options.selectorLeftNavListItemHasChildren);
              const flyoutItem = eventMatches(evt, this.options.selectorLeftNavFlyoutItem);
              const hasLinkItem = !(leftNavItem.querySelector(this.options.selectorLeftNavListItemLink) === undefined);
              if (flyoutItem) {
                this.addActiveListItem(flyoutItem);
              } else if (childItem) {
                if (!childItem.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
                  this.addActiveListItem(childItem);
                } else {
                  childItem.querySelector(this.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'false');
                  childItem.querySelector(this.options.selectorLeftNavFlyoutMenu).style.top = `${childItem.offsetTop -
                    this.element.querySelector(this.options.selectorLeftNav).scrollTop}px`;
                  childItem.querySelector(this.options.selectorLeftNavFlyoutMenu).style.left = `${childItem.offsetLeft +
                    Math.round(childItem.offsetWidth)}px`;
                }
              } else if (hasChildren) {
                this.handleNestedListClick(leftNavItem);
              } else if (hasLinkItem) {
                const link = leftNavItem.querySelector(this.options.selectorLeftNavListItemLink);
                link.click();
              } else {
                this.addActiveListItem(leftNavItem);
              }
            }
          }
        })
      );
    });
    const flyouts = toArray(this.element.ownerDocument.querySelectorAll(this.options.selectorLeftNavListItemHasFlyout));
    flyouts.forEach(flyout => {
      this.manage(
        on(flyout, 'mouseenter', () => {
          flyout.querySelector(this.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'false');
          // eslint-disable-next-line no-param-reassign
          flyout.querySelector(this.options.selectorLeftNavFlyoutMenu).style.top = `${flyout.offsetTop -
            this.element.querySelector(this.options.selectorLeftNav).scrollTop}px`;
          // eslint-disable-next-line no-param-reassign
          flyout.querySelector(this.options.selectorLeftNavFlyoutMenu).style.left = `${flyout.offsetLeft +
            Math.round(flyout.offsetWidth)}px`;
          flyout.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.toggle(this.options.classFlyoutDisplayed);
        })
      );
      this.manage(
        on(flyout, 'mouseleave', () => {
          flyout.querySelector(this.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'true');
          flyout.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.remove(this.options.classFlyoutDisplayed);
        })
      );
    });
  }

  /**
   * Hides all flyout menus.
   */
  hideAllFlyoutMenus() {
    const flyoutMenus = toArray(this.element.querySelectorAll(this.options.selectorLeftNavFlyoutMenu));
    flyoutMenus.forEach(menu => {
      menu.setAttribute('aria-hidden', 'true');
      menu.classList.remove(this.options.classFlyoutDisplayed);
    });
  }

  /**
   * Sets a list item as active.
   * @param {Object} item The active list item.
   */
  addActiveListItem(item) {
    toArray(this.element.querySelectorAll(this.options.selectorLeftNavAllListItems)).forEach(currentItem => {
      if (!(item === currentItem)) {
        if (!currentItem.contains(item)) {
          currentItem.classList.remove(this.options.classActiveLeftNavListItem);
        } else {
          currentItem.classList.add(this.options.classActiveLeftNavListItem);
        }
      }
    });
    toArray(this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem)).forEach(currentItem => {
      if (!(item === currentItem)) {
        currentItem.classList.remove(this.options.classActiveLeftNavListItem);
      }
    });
    item.classList.add(this.options.classActiveLeftNavListItem);
    this.closeMenu();
    this.hideAllFlyoutMenus();
    this.closeMenu();
  }

  /**
   * Handles click on the document.
   * Closes the left navigation when document is clicked outside the left navigation.
   * @param {Event} evt The event triggering this method.
   */
  handleDocumentClick(evt) {
    const clickTarget = evt.target;
    const isOfSelf = this.element.contains(clickTarget);
    const isToggleBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen).contains(clickTarget);
    const isOpen = this.element.classList.contains(this.options.classActiveLeftNav);
    const isUnifiedHeader = this.element.ownerDocument.querySelector('[data-unified-header]').contains(clickTarget);
    const shouldClose = !isOfSelf && isOpen && !isToggleBtn && !isUnifiedHeader;
    let flyoutOpen;
    if (this.element.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
      const leftnavFlyoutMenu = this.element.querySelector(this.options.selectorLeftNavFlyoutMenu);
      flyoutOpen = leftnavFlyoutMenu.classList.contains(this.options.classFlyoutDisplayed);
    }
    if (isOfSelf && this.element.tagName === 'A') {
      evt.preventDefault();
    }
    if (shouldClose) {
      this.closeMenu();
    }
    if (this.element.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
      if (flyoutOpen && !isOfSelf && isOpen) {
        this.element.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.remove(this.options.classFlyoutDisplayed);
      }
    }
  }

  /**
   * Handles click on a list item that contains a nested list in the left navigation.
   * It hides all flyout menus and switches the tab-index on the list items based on whether or not the list is expanded.
   * @param {HTMLElement} listItem The list item that was clicked.
   */
  handleNestedListClick(listItem) {
    const isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
    this.hideAllFlyoutMenus();
    listItem.classList.toggle(this.options.classExpandedLeftNavListItem, !isOpen);
    const listItems = toArray(listItem.querySelectorAll(this.options.selectorLeftNavNestedListItem));
    listItems.forEach(item => {
      if (isOpen) {
        listItem.querySelector(this.options.selectorLeftNavNestedList).setAttribute('aria-hidden', 'true');
        // eslint-disable-next-line no-param-reassign
        item.querySelector(this.options.selectorLeftNavListItemLink).tabIndex = -1;
      } else {
        listItem.querySelector(this.options.selectorLeftNavNestedList).setAttribute('aria-hidden', 'false');
        // eslint-disable-next-line no-param-reassign
        item.querySelector(this.options.selectorLeftNavListItemLink).tabIndex = 0;
      }
    });
  }

  handleSectionItemClick(evt, leftNavSections) {
    // Sorry
    const leftNavSectionItem = eventMatches(evt, this.options.selectorLeftNavSection);
    if (leftNavSectionItem) {
      // currently selected
      const selectedLeftNavSectionItem = this.element.querySelector(this.options.selectorLeftNavCurrentSection);
      const selectedLeftNavSectionItemTitle = selectedLeftNavSectionItem.querySelector(
        this.options.selectorLeftNavCurrentSectionTitle
      );
      const selectedLeftNavSectionItemIcon = this.element.querySelector(this.options.selectorLeftNavCurrentSectionIcon);
      const selectedLeftNavSectionItemUse = selectedLeftNavSectionItemIcon.querySelector('use');
      const selectedLeftNavSectionValue = selectedLeftNavSectionItem.dataset.leftNavCurrentSection;

      // clicked on item
      const leftNavSectionItemLink = leftNavSectionItem.querySelector(this.options.selectorLeftNavSectionLink);
      const leftNavSectionItemIcon = leftNavSectionItem.querySelector(this.options.selectorLeftNavSectionIcon);
      const leftNavSectionItemIconUse = leftNavSectionItemIcon.querySelector('use');
      const leftNavSectionValue = leftNavSectionItem.dataset.leftNavSection;

      if (this.leftNavSectionActive) {
        return;
      }
      this.leftNavSectionActive = true;

      const newLeftNavSectionItem = document.createElement('li');
      newLeftNavSectionItem.setAttribute('data-left-nav-section', selectedLeftNavSectionValue);
      newLeftNavSectionItem.classList.add(this.options.classNavSection);
      newLeftNavSectionItem.classList.add(`${this.options.classNavSection}--${selectedLeftNavSectionValue}`);

      const newLeftNavSectionItemAnchor = document.createElement('a');
      newLeftNavSectionItemAnchor.setAttribute('href', 'javascript:void(0)'); // eslint-disable-line no-script-url
      newLeftNavSectionItemAnchor.setAttribute('tabindex', 0);
      newLeftNavSectionItemAnchor.classList.add(this.options.classNavSectionAnchor);

      const newLeftNavSectionItemIcon = selectedLeftNavSectionItemIcon.cloneNode(true);
      // IE11 doesn't support classList on SVG, must revert to className
      newLeftNavSectionItemIcon.setAttribute('class', this.options.classTaxonomyIcon);
      newLeftNavSectionItemIcon.removeAttribute('data-left-nav-current-section-icon');
      newLeftNavSectionItemIcon.setAttribute('data-left-nav-section-icon', selectedLeftNavSectionValue);

      const newLeftNavSectionItemLink = document.createElement('span');
      newLeftNavSectionItemLink.setAttribute('data-left-nav-section-link', '');
      newLeftNavSectionItemLink.classList.add(this.options.classNavSectionLink);
      newLeftNavSectionItemLink.textContent = selectedLeftNavSectionItemTitle.textContent;

      this.animateNavSection(leftNavSectionItem);
      this.animateNavList(leftNavSectionValue);

      newLeftNavSectionItemAnchor.appendChild(newLeftNavSectionItemIcon);
      newLeftNavSectionItemAnchor.appendChild(newLeftNavSectionItemLink);
      newLeftNavSectionItem.appendChild(newLeftNavSectionItemAnchor);
      leftNavSections.insertBefore(newLeftNavSectionItem, leftNavSections.firstChild);

      setTimeout(() => {
        selectedLeftNavSectionItemTitle.textContent = leftNavSectionItemLink.textContent;
        selectedLeftNavSectionItem.setAttribute('data-left-nav-current-section', leftNavSectionValue);
        selectedLeftNavSectionItemIcon.setAttribute('data-left-nav-current-section-icon', leftNavSectionValue);
        selectedLeftNavSectionItemUse.setAttribute('xlink:href', leftNavSectionItemIconUse.getAttribute('xlink:href'));

        leftNavSectionItem.parentNode.removeChild(leftNavSectionItem); // Cant use .remove() because of IE11
        this.leftNavSectionActive = false;
      }, 450); // Wait for nav items to animate
    }
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
   * @property {string} [selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
   * @property {string} [selectorLeftNavToggle]
   *   The data attribute selector for the button that will show and hide the left navigation.
   * @property {string} [selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @property {string} [selectorLeftNavNestedListItem]
   *   The data attribute selector for all nested list items in the left navigation.
   * @property {string} [selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
   * @property {string} [selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
   * @property {string} [selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
   * @property {string} [selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
   * @property {string} [selectorLeftNavCurrentPage]
   *   The data attribute selector for the current section title in the left nav header.
   * @property {string} [selectorLeftNavMainNavHidden] The CSS selector for the hidden main nav.
   * @property {string} [classActiveLeftNav] The class name for when a left nav is active.
   * @property {string} [classActiveLeftNavListItem] The class name for when a left nav list item is active.
   * @property {string} [classExpandedLeftNavListItem] The class name for when a nested list is expanded.
   * @property {string} [classFlyoutDisplayed] The class name for when a flyout menu is displayed.
   * @property {string} [classActiveSection] The class name for an active section item in the left nav header.
   * @property {string} [classItemHasChildren] The class name for when a list item has children.
   * @property {string} [classTaxonomyIcon] The class name for the taxonomy icon.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-left-nav-container]',
      // Data Attribute selectors
      selectorLeftNav: '[data-left-nav]',
      selectorLeftNavList: '[data-left-nav-list]',
      selectorLeftNavNestedList: '[data-left-nav-nested-list]',
      selectorLeftNavToggleOpen: '[data-left-nav-toggle="open"]',
      selectorLeftNavToggleClose: '[data-left-nav-toggle="close"]',
      selectorLeftNavListItem: '[data-left-nav-item]',
      selectorLeftNavListItemLink: '[data-left-nav-item-link]',
      selectorLeftNavNestedListItem: '[data-left-nav-nested-item]',
      selectorLeftNavArrowIcon: '[data-left-nav-icon]',
      selectorLeftNavFlyoutMenu: '[data-left-nav-flyout]',
      selectorLeftNavFlyoutItem: '[data-left-nav-flyout-item]',
      selectorLeftNavSections: '[data-left-nav-sections]',
      selectorLeftNavSection: '[data-left-nav-section]',
      selectorLeftNavSectionLink: '[data-left-nav-section-link]',
      selectorLeftNavSectionIcon: '[data-left-nav-section-icon]',
      selectorLeftNavCurrentSection: '[data-left-nav-current-section]',
      selectorLeftNavCurrentSectionTitle: '[data-left-nav-current-section-title]',
      selectorLeftNavCurrentSectionIcon: '[data-left-nav-current-section-icon]',
      selectorLeftNavListItemHasChildren: '[data-left-nav-item-with-children]',
      selectorLeftNavListItemHasFlyout: '[data-left-nav-has-flyout]',
      selectorLeftNavAllListItems: '[data-left-nav-item], [data-left-nav-nested-item], [data-left-nav-flyout-item]',
      selectorLeftNavMainNavHidden: `.${prefix}--left-nav__main-nav--hidden`,
      // CSS Class Selectors
      classActiveTrigger: `${prefix}--left-nav__trigger--active`,
      classActiveLeftNav: `${prefix}--left-nav--active`,
      classActiveLeftNavListItem: `${prefix}--active-list-item`,
      classExpandedLeftNavListItem: `${prefix}--main-nav__parent-item--expanded`,
      classFlyoutDisplayed: `${prefix}--nested-list__flyout-menu--displayed`,
      classItemHasChildren: `${prefix}--main-nav__parent-item--has-children`,
      classNavSection: `${prefix}--left-nav__section`,
      classNavSectionTransition: `${prefix}--left-nav__section--transition`,
      classNavSectionAnchor: `${prefix}--left-nav__section--anchor`,
      classNavSectionLink: `${prefix}--left-nav__section--link`,
      classNavHeaderTitle: `${prefix}--left-nav__header--title`,
      classItemFade: `${prefix}--main-nav__parent-item--fade`,
      classItemHidden: `${prefix}--main-nav__parent-item--hidden`,
      classListHidden: `${prefix}--left-nav__main-nav--hidden`,
      classListTop: `${prefix}--left-nav__main-nav--top`,
      classTaxonomyIcon: `${prefix}--left-nav__section--taxonomy-icon`,
    };
  }

  /**
   * The map associating DOM element and left navigation instance.
   * @member LeftNav.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();
}

export default (!breakingChangesX ? LeftNav : removedComponent('LeftNav'));
