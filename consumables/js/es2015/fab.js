import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-event';
import '../polyfills/element-matches';
import '../polyfills/object-assign';

class FabButton extends mixin(createComponent, initComponent) {
  /**
   * Floating action button.
   * @extends CreateComponent
   * @extends InitComponentByEvent
   * @param {HTMLElement} element The element working as a floting action button.
   */
  constructor(element) {
    super(element);
    element.addEventListener('click', (event) => { this.toggle(event); });
  }

  /**
   * A method called when this widget is created upon clicking.
   * @param {Event} event The event triggering the creation.
   */
  createdByEvent(event) {
    this.toggle(event);
  }

  /**
   * Toggles this floating action button.
   * @param {Event} event The event triggering this method.
   */
  toggle(event) {
    if (this.element.tagName === 'A') {
      event.preventDefault();
    }

    if (this.element.dataset.state === 'closed') {
      this.element.dataset.state = 'open';
    } else {
      this.element.dataset.state = 'closed';
    }
  }

  /**
   * Instantiates floating action button of the given element.
   * @param {HTMLElement} element The element.
   */
  static create(element) {
    return this.components.get(element) || new this(element);
  }

  /**
   * The map associating DOM element and floating action button instance.
   * @member FabButton.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode FabButton.create .create()}, or {@linkcode FabButton.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode FabButton.init .init()} works.
   * @member FabButton.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find floating action buttons.
   */
  static options = {
    selectorInit: '[data-fab]',
    initEventNames: ['click'],
  };
}

export default FabButton;
