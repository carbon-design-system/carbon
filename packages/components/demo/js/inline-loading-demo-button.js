import mixin from '../../src/globals/js/misc/mixin';
import createComponent from '../../src/globals/js/mixins/create-component';
import initComponentBySearch from '../../src/globals/js/mixins/init-component-by-search';
import handles from '../../src/globals/js/mixins/handles';
import on from '../../src/globals/js/misc/on';
import InlineLoading from '../../src/components/inline-loading/inline-loading';

class InlineLoadingDemoButton extends mixin(
  createComponent,
  initComponentBySearch,
  handles
) {
  /**
   * The button for inline loading demo.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as the button for inline loading demo.
   */
  constructor(element) {
    super(element);
    this.manage(
      on(element, 'click', event => {
        this.toggle(event);
      })
    );
    const targetElem = element.ownerDocument.querySelector(
      this.options.selectorTarget
    );
    if (targetElem) {
      this.state = InlineLoading.states.ACTIVE;
      this.target = InlineLoading.create(targetElem).setState(this.state);
    }
  }

  /**
   * Toggles the state of inline loading component.
   */
  toggle() {
    if (this.target) {
      this.state =
        this.state === InlineLoading.states.ACTIVE
          ? InlineLoading.states.FINISHED
          : InlineLoading.states.ACTIVE;
      this.target.setState(this.state);
    }
  }

  /**
   * The map associating DOM element and the instance.
   * @member InlineLoadingDemoButton.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode InlineLoadingDemoButton.create .create()},
   * or {@linkcode InlineLoadingDemoButton.init .init()},
   * properties in this object are overriden for the instance being create
   * and how {@linkcode InlineLoadingDemoButton.init .init()} works.
   * @member InlineLoadingDemoButton.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find the button for inline loading demo.
   * @property {string} selectorTarget The CSS selector to find the target `InlineLoading` component.
   */
  static options = {
    selectorInit: '[data-inline-loading-demo-button]',
    selectorTarget: '[data-inline-loading]',
  };
}

export default InlineLoadingDemoButton;
