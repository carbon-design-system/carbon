import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentByEvent from '../../globals/js/mixins/init-component-by-event';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import FloatingMenu from '../floating-menu/floating-menu';
import getLaunchingDetails from '../../globals/js/misc/get-launching-details';

class Tooltip extends mixin(createComponent, initComponentByEvent, eventedShowHideState) {
  /**
   * Tooltip.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   */
  constructor(element, options) {
    super(element, options);
    ['mouseover', 'mouseout', 'focus', 'blur', 'touchleave', 'touchcancel'].forEach(name => {
      this.element.addEventListener(name, event => {
        this._handleHover(event);
      });
    });
  }

  /**
   * A method called when this widget is created upon events.
   * @param {Event} event The event triggering the creation.
   */
  createdByEvent(event) {
    this._handleHover(event);
  }

  /**
   * Changes the shown/hidden state.
   * @param {string} state The new state.
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   // */
  changeState(state, detail, callback) {
    if (!this.tooltip) {
      const tooltip = this.element.ownerDocument.querySelector(this.element.getAttribute(this.options.attribTooltipTarget));
      if (!tooltip) {
        throw new Error('Cannot find the target tooltip.');
      }

      // Lazily create a component instance for tooltip
      this.tooltip = FloatingMenu.create(tooltip, {
        refNode: this.element,
        classShown: this.options.classShown,
        offset: this.options.objMenuOffset,
      });
      this.children.push(this.tooltip);
    }

    // Delegates the action of changing state to the tooltip.
    // (And thus the before/after shown/hidden events are fired from the tooltip)
    this.tooltip.changeState(state, Object.assign(detail, { delegatorNode: this.element }), callback);
  }

  /**
   * Handles hover/focus events.
   * @param {Event} event The event.
   * @private
   */
  _handleHover(event) {
    const state = {
      mouseover: 'shown',
      mouseout: 'hidden',
      focus: 'shown',
      blur: 'hidden',
      touchleave: 'hidden',
      touchcancel: 'hidden',
    }[event.type];
    this.changeState(state, getLaunchingDetails(event));
  }

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-tooltip-trigger]',
    classShown: 'bx--tooltip--shown',
    attribTooltipTarget: 'data-tooltip-target',
    objMenuOffset: { top: 10, left: 0 },
    initEventNames: ['mouseover', 'focus'],
  };
}

export default Tooltip;
