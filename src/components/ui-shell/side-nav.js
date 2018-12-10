import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';

class SideNav extends mixin(createComponent, initComponentBySearch) {
  /**
   * The map associating DOM element and copy button UI instance.
   * @member SideNav.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode SideNav.create .create()}, or {@linkcode SideNav.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode SideNav.init .init()} works.
   * @member SideNav.options
   * @type {Object}
   * @property {string} selectorInit The data attribute to find side navs.
   */
  static options /* #__PURE_CLASS_PROPERTY__ */ = {
    selectorInit: '[data-side-nav]',
  };
}

export default SideNav;
