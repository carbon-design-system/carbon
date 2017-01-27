import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import '../../../demo/polyfills/array-from';
import '../../../demo/polyfills/element-matches';
import '../../../demo/polyfills/object-assign';
import '../../../demo/polyfills/custom-event';
import toggleClass from '../../../demo/polyfills/toggle-class';
import eventMatches from '../../globals/js/misc/event-matches';

class InlineLeftNav extends mixin(createComponent, initComponentBySearch) {
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
    this.hookListItemsEvents();
  }

  hookListItemsEvents() {
    const leftNavList = this.element.querySelector(this.options.selectorLeftNavList);
    leftNavList.addEventListener('click', (evt) => {
      const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);
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
    });
    [...this.element.querySelectorAll(this.options.selectorLeftNavListItem)].forEach((item) => {
      item.addEventListener('keydown', (evt) => {
        const leftNavItemWithChildren = eventMatches(evt, this.options.selectorLeftNavListItemHasChildren);
        if (leftNavItemWithChildren && evt.which === 13) {
          this.handleNestedListClick(leftNavItemWithChildren, evt);
        }
      });
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
    const isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
    if (!('leftNavItemLink' in evt.target.dataset)) {
      toggleClass(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
    }
    const list = listItem.querySelector(this.options.selectorLeftNavNestedList);
    const listItems = [...list.querySelectorAll(this.options.selectorLeftNavNestedListItem)];
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
    // CSS Class Selectors
    classActiveLeftNavListItem: 'left-nav-list__item--active',
    classExpandedLeftNavListItem: 'left-nav-list__item--expanded',
  };
}

export default InlineLeftNav;
