import warning from 'warning';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventMatches from '../../globals/js/misc/event-matches';
import toggleClass from '../../globals/js/misc/svg-toggle-class';

let didWarnAboutDeprecation = false;

class InteriorLeftNav extends mixin(createComponent, initComponentBySearch) {
  /**
   * Interior left nav.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an interior left nav.
   * @param {Object} options The component options.
   */
  constructor(element, options) {
    super(element, options);
    this.constructor.components.set(this.element, this);

    this.keepOpen = this.element.dataset.keepOpen === undefined ? this.options.keepOpen : Boolean(this.element.dataset.keepOpen);

    this.hookListItemsEvents();
    if (__DEV__) {
      warning(
        didWarnAboutDeprecation,
        'Accessing the `interior-left-nav` component from the' +
          '`carbon-components` package is deprecated. Use the' +
          '`carbon-addons-bluemix` package instead.'
      );
      didWarnAboutDeprecation = true;
    }
  }

  hookListItemsEvents = () => {
    this.element.addEventListener('click', evt => {
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

    this.element.addEventListener('keydown', evt => {
      const leftNavItemWithChildren = eventMatches(evt, this.options.selectorLeftNavListItemHasChildren);
      const leftNavItem = eventMatches(evt, this.options.selectorLeftNavListItem);

      if (leftNavItemWithChildren && evt.which === 13) {
        this.handleNestedListClick(leftNavItemWithChildren, evt);
      } else if (leftNavItem && evt.which === 13) {
        this.addActiveListItem(leftNavItem);
      }
    });
  };

  addActiveListItem(item) {
    [...this.element.querySelectorAll(this.options.selectorLeftNavListItem)].forEach(currentItem => {
      if (!(item === currentItem)) {
        currentItem.classList.remove(this.options.classActiveLeftNavListItem);
      }
    });
    [...this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem)].forEach(currentItem => {
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
    const allNestedItems = [...this.element.querySelectorAll(this.options.selectorLeftNavListItemHasChildren)];
    const isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
    const list = listItem.querySelector(this.options.selectorLeftNavNestedList);
    const listItems = [...list.querySelectorAll(this.options.selectorLeftNavNestedListItem)];

    if (!this.keepOpen) {
      allNestedItems.forEach(currentItem => {
        if (currentItem !== listItem) {
          toggleClass(currentItem, this.options.classExpandedLeftNavListItem, false);
        }
      });
    }

    if (!('InteriorLeftNavItemLink' in evt.target.dataset)) {
      toggleClass(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
    }

    // a11y
    listItems.forEach(item => {
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
      const svgTitle = this.element.querySelector(this.options.selectorLeftNavArrowTitle);
      if (!collapsed) {
        this.element.dataset.collapsed = true;
        this.element.classList.add(this.options.classLeftNavCollapsing);
        if (svgTitle) {
          svgTitle.textContent = this.options.expandTitle;
        }
        window.setTimeout(() => {
          this.element.classList.remove(this.options.classLeftNavCollapsing);
          this.element.classList.add(this.options.classLeftNavCollapsed);
          this.element.dispatchEvent(
            new CustomEvent(this.options.eventAfterLeftNavToggled, {
              bubbles: true,
              cancelable: true,
              detail: { collapsed: true },
            })
          );
        }, 250);
      } else {
        this.element.dataset.collapsed = false;
        this.element.classList.remove(this.options.classLeftNavCollapsed);
        this.element.classList.add(this.options.classLeftNavExpanding);
        if (svgTitle) {
          svgTitle.textContent = this.options.collapsePane;
        }
        window.setTimeout(() => {
          this.element.classList.remove(this.options.classLeftNavExpanding);
          this.element.dispatchEvent(
            new CustomEvent(this.options.eventAfterLeftNavToggled, {
              bubbles: true,
              cancelable: true,
              detail: { collapsed: false },
            })
          );
        }, 250);
      }
    }
  };

  /**
   * The map associating DOM element and spinner instance.
   * @member InteriorLeftNav.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode InteriorLeftNav.create .create()}, or {@linkcode InteriorLeftNav.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode InteriorLeftNav.init .init()} works.
   * @member InteriorLeftNav.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find interior left navs.
   */
  static options = {
    selectorInit: '[data-interior-left-nav]',
    // Data Attribute selectors
    selectorLeftNavList: '[data-interior-left-nav-list]',
    selectorLeftNavNestedList: '[data-interior-left-nav-nested-list]',
    selectorLeftNavListItem: '[data-interior-left-nav-item]',
    selectorLeftNavListItemLink: '[data-interior-left-nav-item-link]',
    selectorLeftNavNestedListItem: '[data-interior-left-nav-nested-item]',
    selectorLeftNavListItemHasChildren: '[data-interior-left-nav-with-children]',
    selectorLeftNavCollapse: '[data-interior-left-nav-collapse]',
    selectorLeftNavArrowTitle: '[data-interior-left-nav-arrow] title',
    // CSS Class Selectors
    classActiveLeftNavListItem: 'left-nav-list__item--active',
    classExpandedLeftNavListItem: 'left-nav-list__item--expanded',
    classLeftNavCollapsing: 'bx--interior-left-nav--collapsing',
    classLeftNavCollapsed: 'bx--interior-left-nav--collapsed',
    classLeftNavExpanding: 'bx--interior-left-nav--expanding',
    // Event
    eventBeforeLeftNavToggled: 'left-nav-beingtoggled',
    eventAfterLeftNavToggled: 'left-nav-toggled',
    // Option
    expandTitle: 'Expand nav pane',
    collapseTitle: 'Collapse nav pane',
    keepOpen: false,
  };
}

export default InteriorLeftNav;
