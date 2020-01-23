import TooltipDefinition from './tooltip--definition';

export default class TooltipIcon extends TooltipDefinition {
  /**
   * The component options.
   *
   * If `options` is specified in the constructor,
   * {@linkcode TooltipIcon.create .create()},
   * or {@linkcode TooltipIcon.init .init()},
   * properties in this object are overriden for the instance being
   * created and how {@linkcode TooltipIcon.init .init()} works.
   * @property {string} selectorInit The CSS selector to find text input UIs.
   */
  static get options() {
    console.log(
      Object.assign(Object.create(super.options), {
        selectorInit: '[data-tooltip-icon]',
      })
    );
    return Object.assign(Object.create(super.options), {
      selectorInit: '[data-tooltip-icon]',
    });
  }

  /**
   * The map associating DOM element and text input UI instance.
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();
}
