import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import { initMenu, placeMenu } from '../../globals/js/misc/menu-placement';
import on from '../../globals/js/misc/on';

class Tooltip extends mixin(createComponent, initComponentBySearch, eventedState) {
  constructor(element, options) {
    super(element, options);

    this.tooltipTrigger = this.element;

    this.tooltip = this.tooltipTrigger.ownerDocument.querySelector(this.tooltipTrigger.dataset.tooltipTarget);

    this.menuPlacementScope = this.tooltipTrigger.ownerDocument.querySelector(this.options.selectorPlacementScope);

    initMenu(this.tooltipTrigger, this.tooltip, this.menuPlacementScope);

    this.resizeEvent = on(this.menuPlacementScope, 'resizeEvent', () => {
      placeMenu(this.tooltipTrigger, this.tooltip, this.options.objMenuOffset, this.options.tooltipDirection);
    });

    this.tooltipTrigger.addEventListener('mouseover', (event) => { this._handleHover(event, 'shown'); });
    this.tooltipTrigger.addEventListener('mouseout', (event) => { this._handleHover(event, 'hidden'); });

    this.tooltipTrigger.addEventListener('focus', (event) => { this._handleHover(event, 'shown'); });
    this.tooltipTrigger.addEventListener('blur', (event) => { this._handleHover(event, 'hidden'); });
  }

  /**
   * Checks to see if a direction is specified in the markup
   * and if so overrides the direction from this.options.
   * @private
   */
  _checkDirection() {
    if (this.tooltip.dataset.tooltipDirection) {
      this.options.tooltipDirection = this.tooltip.dataset.tooltipDirection;
    }
  }

  /**
   * Sets a class to position the tooltip caret correctly.
   * @private
   * @param {string} direction The direction the tooltip is positioned relative to the trigger.
   */
  _positionCaret(direction) {
    if (direction === 'left') {
      this.tooltip.classList.add('bx--tooltip-caret--right');
    }
    if (direction === 'top') {
      this.tooltip.classList.add('bx--tooltip-caret--bottom');
    }
    if (direction === 'right') {
      this.tooltip.classList.add('bx--tooltip-caret--left');
    }
    if (direction === 'bottom') {
      this.tooltip.classList.add('bx--tooltip-caret--top');
    }
  }
  /**
   * Changes the shown/hidden state.
   * @private
   * @param {string} state The new state.
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(state, detail, callback) {
    this.tooltip.classList.toggle('bx--tooltip--shown', state === 'shown');
    this._checkDirection();
    this._positionCaret(this.options.tooltipDirection);
    placeMenu(this.tooltipTrigger, this.tooltip, this.options.objMenuOffset, this.options.tooltipDirection);
    callback();
  }

  _handleHover(event, state) {
    this.changeState(state, {
      element: this.tooltipTrigger,
      optionMenu: this.optionMenu,
      evt: event,
    });
  }

  /**
   * Shows the tooltip.
   */
  show() {
    this.changeState('shown', {
      element: this.tooltipTrigger,
      optionMenu: this.optionMenu,
    });
  }

  /**
   * Hides the tooltip.
   */
  hide() {
    this.changeState('hidden', {
      element: this.tooltipTrigger,
      optionMenu: this.optionMenu,
    });
  }

  /**
   * Releases instance and any global event listeners.
   */
  release() {
    if (this.resizeEvent) {
      this.resizeEvent = this.resizeEvent.release();
    }
    super.release();
  }

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-tooltip-target]',
    selectorPlacementScope: 'body',
    eventBeforeShown: 'tooltip-beingshown',
    eventAfterShown: 'tooltip-shown',
    eventBeforeHidden: 'tooltip-beinghidden',
    eventAfterHidden: 'tooltip-hidden',
    objMenuOffset: { top: 10, left: 0 },
    tooltipDirection: 'bottom',
  };
}

export default Tooltip;
