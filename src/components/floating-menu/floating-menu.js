import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import trackBlur from '../../globals/js/mixins/track-blur';
import getLaunchingDetails from '../../globals/js/misc/get-launching-details';
import optimizedResize from '../../globals/js/misc/resize';

class FloatingMenu extends mixin(createComponent, eventedShowHideState, trackBlur) {
  /**
   * Floating menu.
   * @extends CreateComponent
   * @extends EventedShowHideState
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorContainer] The CSS selector to find the container to put this menu in.
   * @param {string} [options.attribDirection] The attribute name to specify menu placement direction (top/right/bottom/left).
   * @param {string} [options.classShown] The CSS class for shown state, for the menu.
   * @param {string} [options.classRefShown] The CSS class for shown state, for the trigger button.
   * @param {string} [options.eventBeforeShown]
   *   The name of the custom event fired before this menu is shown.
   *   Cancellation of this event stops hiding the menu.
   * @param {string} [options.eventAfterShown]
   *   The name of the custom event telling that menu is sure shown
   *   without being canceled by the event handler named by `eventBeforeShown` option (`floating-menu-beingshown`).
   * @param {string} [options.eventBeforeHidden]
   *   The name of the custom event fired before this menu is hidden.
   *   Cancellation of this event stops hiding the menu.
   * @param {string} [options.eventAfterHidden]
   *   The name of the custom event telling that menu is sure hidden
   *   without being canceled by the event handler named by `eventBeforeHidden` option (`floating-menu-beinghidden`).
   * @param {Element} [options.refNode] The launching element of the menu. Used for calculating the geometry of the menu.
   * @param {Object} [options.offset] The offset to adjust the geometry of the menu. Should have `top`/`left` properties.
   */
  constructor(element, options) {
    super(element, options);
    const attribDirectionValue = this.element.getAttribute(this.options.attribDirection);
    if (!this.options.direction) {
      this.options.direction = attribDirectionValue || 'bottom';
    }
    if (!attribDirectionValue) {
      // Update attribute for styling
      this.element.setAttribute(this.options.attribDirection, this.options.direction);
    }
  }

  /**
   * Focuses back on the trigger button if this component loses focus.
   */
  handleBlur(event) {
    if (this.element.classList.contains(this.options.classShown)) {
      this.changeState('hidden', getLaunchingDetails(event));
      if (this.element.contains(event.relatedTarget) && event.target !== this.options.refNode) {
        this.options.refNode.focus();
      }
    }
  }

  /**
   * @private
   * @returns {Element} The element that this menu should be placed to.
   */
  _getContainer() {
    return this.element.closest(this.options.selectorContainer) || this.element.ownerDocument.body;
  }

  /**
   * @private
   * @returns {Object} The menu position, with `top` and `left` properties.
   */
  _getPos() {
    const element = this.element;
    const { refNode, offset, direction } = this.options;

    if (!refNode) {
      throw new Error('Cannot find the refernce node for positioning floating menu.');
    }

    const scroll = refNode.ownerDocument.defaultView.pageYOffset;

    const { left: refLeft, top: refTop, right: refRight, bottom: refBottom } = refNode.getBoundingClientRect();

    const { width: menuWidth, height: menuHeight } = element.getBoundingClientRect();

    const refCenterHorizontal = (refLeft + refRight) / 2;
    const refCenterVertical = (refTop + refBottom) / 2;

    return {
      left: () => ({
        left: refLeft - menuWidth - offset.left,
        top: refCenterVertical - menuHeight / 2 + scroll + offset.top,
      }),
      top: () => ({
        left: refCenterHorizontal - menuWidth / 2 + offset.left,
        top: refTop - menuHeight + scroll - offset.top,
      }),
      right: () => ({
        left: refRight + offset.left,
        top: refCenterVertical - menuHeight / 2 + scroll + offset.top,
      }),
      bottom: () => ({
        left: refCenterHorizontal - menuWidth / 2 + offset.left,
        top: refBottom + scroll + offset.top,
      }),
    }[direction]();
  }

  /**
   * Sees if the computed style is what this floating menu expects.
   * @private
   */
  _testStyles() {
    if (!this.options.debugStyle) {
      return;
    }
    const element = this.element;
    const computedStyle = element.ownerDocument.defaultView.getComputedStyle(element);
    const styles = {
      position: 'absolute',
      right: 'auto',
      margin: 0,
    };
    Object.keys(styles).forEach(key => {
      const expected = typeof styles[key] === 'number' ? parseFloat(styles[key]) : styles[key];
      const actual = computedStyle.getPropertyValue(key);
      if (expected !== actual) {
        // eslint-disable-next-line no-console
        console.warn(`Floating menu component expects ${key}: ${styles[key]} style.`);
      }
    });
  }

  /**
   * Places the menu.
   * @private
   */
  _place() {
    const element = this.element;
    const { left, top } = this._getPos();
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
    this._testStyles();
  }

  /**
   * @param {string} state The new state.
   * @returns {boolean} `true` of the current state is different from the given new state.
   */
  shouldStateBeChanged(state) {
    return (
      (state === 'shown' || state === 'hidden') &&
      state !== (this.element.classList.contains(this.options.classShown) ? 'shown' : 'hidden')
    );
  }

  /**
   * Changes the shown/hidden state.
   * @private
   * @param {string} state The new state.
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(state, detail, callback) {
    const shown = state === 'shown';
    const { refNode, classShown, classRefShown } = this.options;
    this.element.classList.toggle(classShown, shown);
    if (classRefShown) {
      refNode.classList.toggle(classRefShown, shown);
    }
    if (state === 'shown') {
      if (!this.hResize) {
        this.hResize = optimizedResize.add(() => {
          this._place();
        });
      }
      this._getContainer().appendChild(this.element);
      this._place();
      (this.element.querySelector(this.options.selectorPrimaryFocus) || this.element).focus();
    }
    if (state === 'hidden' && this.hResize) {
      this.hResize.release();
      this.hResize = null;
    }
    callback();
  }

  release() {
    if (this.hResize) {
      this.hResize.release();
      this.hResize = null;
    }
    super.release();
  }

  static options = {
    selectorContainer: '[data-floating-menu-container]',
    selectorPrimaryFocus: '[data-floating-menu-primary-focus]',
    attribDirection: 'data-floating-menu-direction',
    classShown: '', // Should be provided from options arg in constructor
    classRefShown: '', // Should be provided from options arg in constructor
    eventBeforeShown: 'floating-menu-beingshown',
    eventAfterShown: 'floating-menu-shown',
    eventBeforeHidden: 'floating-menu-beinghidden',
    eventAfterHidden: 'floating-menu-hidden',
    refNode: null, // Should be provided from options arg in constructor
    offset: {
      left: 0,
      top: 0,
    },
  };

  static components = new WeakMap();
}

export default FloatingMenu;
