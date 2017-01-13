import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-search';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import toggleClass from '../polyfills/toggle-class';

class Loading extends mixin(createComponent, initComponent) {
  /**
   * Spinner indicating loading state.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a spinner.
   * @param {Object} [options] The component options.
   * @param {boolean} [options.active] `true` if this spinner should roll.
   */
  constructor(element, options) {
    super(element, options);

    this.active = this.options.active;

    // Initialize spinner
    this.set(this.active);
  }

  /**
   * Sets active/inactive state.
   * @param {boolean} active `true` if this spinner should roll.
   */
  set(active) {
    if (typeof active !== 'boolean') {
      throw new TypeError('set expects a boolean.');
    }

    this.active = active;
    toggleClass(this.element, 'bx--loading--stop', !this.active);

    return this;
  }

  /**
   * Toggles active/inactive state.
   * @param {boolean} active `true` if this spinner should roll.
   */
  toggle() {
    return this.set(!this.active);
  }

  /**
   * @returns {boolean} `true` if this spinner is rolling roll.
   */
  isActive() {
    return this.active;
  }

  /**
   * The map associating DOM element and spinner instance.
   * @member Loading.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode Loading.create .create()}, or {@linkcode Loading.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Loading.init .init()} works.
   * @member Loading.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find spinners.
   */
  static options = {
    selectorInit: '[data-loading]',
    active: true,
  };
}

export default Loading;
