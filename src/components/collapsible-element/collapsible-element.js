import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import eventedState from '../../globals/js/mixins/evented-state';
import getDuration from '../../globals/js/misc/motion-getDuration';

/**
 * Collapsible element.
 * @class CollapsibleElement
 * @extends CreateComponent
 * @extends EventedState
 * @param {HTMLElement} element The element working as a collapsible element.
 * @param {Object} [options] The component options.
 * @param {Element} [options.stateNode]
 *   The element that the CSS classes representing expanded/transient/collapsed states should be applied.
 * @param {string} [options.classExpanded] The CSS class for the expanded state.
 * @param {string} [options.classTransient] The CSS class for the transient state.
 */
class CollapsibleElement extends mixin(createComponent, eventedState) {
  /**
   * @param {string} state The new state.
   * @returns {boolean} `true` if the given `state` is different from current state.
   */
  shouldStateBeChanged(state) {
    const stateNode = this.options.stateNode || this.element;
    const expanded = Boolean(this.options.classExpanded && stateNode.classList.contains(this.options.classExpanded));
    return (state === 'expanded') !== expanded;
  }

  /**
   * Changes the expanded/collapsed state.
   * @private
   * @param {string} state The new state.
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(state, detail, callback) {
    const element = this.element;
    const stateNode = this.options.stateNode || element;
    const expanded = state === 'expanded';
    const w = element.ownerDocument.defaultView;

    const classTransient = this.options.classTransient;
    const classExpanded = this.options.classExpanded;

    const transitionEnd = () => {
      element.removeEventListener('transitionend', transitionEnd);
      if (classTransient) {
        stateNode.classList.remove(classTransient);
      }
      element.style.height = '';
      element.style.transitionDuration = '';
      callback();
    };

    if (classExpanded) {
      stateNode.classList.toggle(classExpanded, expanded);
    }
    if (classTransient) {
      stateNode.classList.add(classTransient);
    }

    w.requestAnimationFrame(() => {
      const height = this.element.scrollHeight;
      element.style.height = expanded ? '0px' : `${height}px`;

      w.requestAnimationFrame(() => {
        element.style.transitionDuration = `${getDuration(height, element.offsetWidth, 'scale', 'mechanical')}ms`;
        element.style.height = expanded ? `${height}px` : '0px';
        element.addEventListener('transitionend', transitionEnd);
      });
    });
  }

  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode CollapsibleElement.create .create()},
   * properties in this object are overriden for the instance being created.
   * @member CollapsibleElement.options
   * @property {string} [eventBeforeExpanded]
   *   The name of the custom event fired before this element is expanded.
   *   Cancellation of this event stops showing the element.
   * @property {string} [eventAfterExpanded]
   *   The name of the custom event telling that this element is sure expanded
   *   without being canceled by the event handler named by `eventBeforeExpanded` option (`collapsible-element-beingexpanded`).
   * @property {string} [eventBeforeCollapsed]
   *   The name of the custom event fired before this element is collapsed.
   *   Cancellation of this event stops hiding the element.
   * @property {string} [eventAfterCollapsed]
   *   The name of the custom event telling that this element is sure collapsed
   *   without being canceled by the event handler named by `eventBeforeCollapsed` option (`collapsible-element-beingcollapsed`).
   */
  static options = {
    eventBeforeExpanded: 'collapsible-element-beingexpanded',
    eventAfterExpanded: 'collapsible-element-expanded',
    eventBeforeCollapsed: 'collapsible-element-beingcollapsed',
    eventAfterCollapsed: 'collapsible-element-collapsed',
  };
}

export default CollapsibleElement;
