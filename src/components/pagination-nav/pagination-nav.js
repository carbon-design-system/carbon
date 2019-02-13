/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import InitComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';

class PaginationNav extends mixin(createComponent, InitComponentBySearch, handles) {
  /**
   * Pagination Nav component
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a pagination nav.
   */
  constructor(element, options) {
    super(element, options);
    this.element.addEventListener('click', evt => this.handleClick(evt));
    this.selectorPageElementArray = this.element.querySelectorAll(this.options.selectorPageElement);
    this.totalPages = this.selectorPageElementArray.length;
    this.currentIndex = 0;
    this.selectorPageDirectionArray = this.element.querySelectorAll(this.options.selectorPageDirection);
    this.selectorPageSelect = this.element.querySelector(this.options.selectorPageSelect);
    if (this.selectorPageSelect) {
      this.selectorPageSelect.addEventListener('change', evt => this.handleSelectChange(evt));
    }
  }

  /**
   * Toggle active state on click
   */
  handleClick = evt => {
    this.selectorPageElementArray.forEach((element, index) => {
      if (element.classList.contains(this.options.classActive)) {
        this.currentIndex = index;
      }
    });
    if (evt.target.matches(this.options.selectorPageElement)) {
      this.currentIndex = Array.prototype.indexOf.call(this.selectorPageElementArray, evt.target);
      this.setActivePage();
    }
    if (evt.target.matches(this.options.selectorPageDirection)) {
      if (evt.target.dataset.pageDirection === 'previous') {
        if (this.currentIndex === -1) {
          this.currentIndex = this.totalPages - 1;
        } else {
          this.currentIndex -= 1;
        }
        this.setActivePage();
      }
      if (evt.target.dataset.pageDirection === 'next') {
        if (this.currentIndex === -1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex += 1;
        }
        this.setActivePage();
      }
    }
  };

  /**
   * Set active state of page element
   */
  setActivePage = () => {
    const selectorPageTarget = this.selectorPageElementArray[this.currentIndex];
    this.selectorPageElementArray.forEach(element => {
      element.classList.remove(this.options.classActive, this.options.classDisabled);
      element.disabled = false;
    });
    selectorPageTarget.classList.add(this.options.classActive, this.options.classDisabled);
    selectorPageTarget.disabled = true;
    if (this.selectorPageDirectionArray.length) {
      if (this.currentIndex <= 0) {
        this.selectorPageDirectionArray[0].disabled = true;
        this.selectorPageDirectionArray[0].classList.add(this.options.classDisabled);
        this.selectorPageDirectionArray[0].blur();
      } else {
        this.selectorPageDirectionArray[0].disabled = false;
        this.selectorPageDirectionArray[0].classList.remove(this.options.classDisabled);
      }
      if (this.currentIndex >= this.totalPages - 1) {
        this.selectorPageDirectionArray[1].disabled = true;
        this.selectorPageDirectionArray[1].classList.add(this.options.classDisabled);
        this.selectorPageDirectionArray[1].blur();
      } else {
        this.selectorPageDirectionArray[1].disabled = false;
        this.selectorPageDirectionArray[1].classList.remove(this.options.classDisabled);
      }
    }
    if (this.selectorPageSelect) {
      this.selectorPageSelect.classList.remove(this.options.classActive);
      this.selectorPageSelect.value = '';
    }
  };

  /**
   * Handle select menu on change
   */
  handleSelectChange = evt => {
    this.currentIndex = -1;
    this.selectorPageElementArray.forEach(element => {
      element.classList.remove(this.options.classActive, this.options.classDisabled);
      element.disabled = false;
    });
    this.selectorPageDirectionArray.forEach(element => {
      element.classList.remove(this.options.classActive, this.options.classDisabled);
      element.disabled = false;
    });
    evt.target.classList.add(this.options.classActive);
  };

  /**
   * The map associating DOM element and pagination nav instance.
   * @member PaginationNav.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode PaginationNav.create .create()},
   * or {@linkcode PaginationNav.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode PaginationNav.init .init()} works.
   * @member PaginationNav.options
   * @type {Object}
   * @property {string} selectorInit The data attribute to find pagination nav.
   * @property {string} selectorPageElement The data attribute to find page element.
   * @property {string} selectorPageDirection The data attribute to find page change element.
   * @property {string} selectorPageSelect The data attribute to find page select element.
   * @property {string} [classActive] The CSS class for page's selected state.
   * @property {string} [classDisabled] The CSS class for page's disabled state.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-pagination-nav]',
      selectorPageElement: '[data-page]',
      selectorPageDirection: '[data-page-direction]',
      selectorPageSelect: '[data-page-select]',
      classActive: `${prefix}--pagination-nav__page--active`,
      classDisabled: `${prefix}--pagination-nav__page--disabled`,
    };
  }
}

export default PaginationNav;
