import debounce from 'lodash.debounce';
import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-search';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import on from '../misc/on';

class DetailPageHeader extends mixin(createComponent, initComponent) {
  /**
   * The Detail Page Header.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a page header.
   * @param {Object} [options] The component options.
   */
  constructor(element, options) {
    super(element, options);

    // Debounce scroll event calls to handleScroll
    const debouncedScroll = debounce(this.handleScroll.bind(this), 50);

    this.hScroll = on(this.element.ownerDocument.defaultView, 'scroll', debouncedScroll);
  }

  /**
   * Adds class to header based on users position on the page
   */
  handleScroll() {
    if (this.element.ownerDocument.defaultView.scrollY > 101) {
      this.element.classList.add(this.options.slideUp);
    } else {
      this.element.classList.remove(this.options.slideUp);
    }
  }

  /**
   * Cleans up stuffs specific to this widget.
   */
  release() {
    this.hScroll.release();
    super.release();
  }

  /**
   * The map associating DOM element and detail page header instance.
   * @member DetailPageHeader.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode DetailPageHeader.create .create()}, or {@linkcode DetailPageHeader.init .init()},
   * properties in this object are overriden for the instance being created
   * and how {@linkcode DetailPageHeader.init .init()} works.
   * @member DetailPageHeader.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find detail page headers.
   */
  static options = {
    slideUp: 'bx--detail-page-header--with-tabs--animated-slide-up',
    selectorInit: '[data-detail-page-header]',
  };
}

export default DetailPageHeader;
