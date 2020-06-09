/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function (ToMix) {
  /**
   * Mix-in class to manage events associated with states.
   * @class EventedState
   */
  class EventedState extends ToMix {
    /* eslint-disable jsdoc/check-param-names */
    /**
     * The internal implementation for {@link EventedState#changeState `.changeState()`}, performing actual change in state.
     * @param {string} [state] The new state. Can be an omitted, which means toggling.
     * @param {object} [detail]
     *   The object that should be put to event details that is fired before/after changing state.
     *   Can have a `group` property, which specifies what state to be changed.
     * @param {EventedState~changeStateCallback} callback The callback called once changing state is finished or is canceled.
     * @private
     */
    _changeState() {
      throw new Error(
        '_changeState() should be overriden to perform actual change in state.'
      );
    }

    /**
     * Changes the state of this component.
     * @param {string} [state] The new state. Can be an omitted, which means toggling.
     * @param {object} [detail]
     *   The object that should be put to event details that is fired before/after changing state.
     *   Can have a `group` property, which specifies what state to be changed.
     * @param {EventedState~changeStateCallback} [callback] The callback called once changing state is finished or is canceled.
     */
    changeState(...args) {
      const state = typeof args[0] === 'string' ? args.shift() : undefined;
      const detail =
        Object(args[0]) === args[0] && typeof args[0] !== 'function'
          ? args.shift()
          : undefined;
      const callback = typeof args[0] === 'function' ? args.shift() : undefined;

      if (
        typeof this.shouldStateBeChanged === 'function' &&
        !this.shouldStateBeChanged(state, detail)
      ) {
        if (callback) {
          callback(null, true);
        }
        return;
      }

      const data = {
        group: detail && detail.group,
        state,
      };

      const eventNameSuffix = [data.group, state]
        .filter(Boolean)
        .join('-')
        .split('-') // Group or state may contain hyphen
        .map((item) => item[0].toUpperCase() + item.substr(1))
        .join('');

      const eventStart = new CustomEvent(
        this.options[`eventBefore${eventNameSuffix}`],
        {
          bubbles: true,
          cancelable: true,
          detail,
        }
      );

      const fireOnNode = (detail && detail.delegatorNode) || this.element;
      const canceled = !fireOnNode.dispatchEvent(eventStart);

      if (canceled) {
        if (callback) {
          const error = new Error(
            `Changing state (${JSON.stringify(data)}) has been canceled.`
          );
          error.canceled = true;
          callback(error);
        }
      } else {
        const changeStateArgs = [state, detail].filter(Boolean);
        this._changeState(...changeStateArgs, () => {
          fireOnNode.dispatchEvent(
            new CustomEvent(this.options[`eventAfter${eventNameSuffix}`], {
              bubbles: true,
              cancelable: true,
              detail,
            })
          );
          if (callback) {
            callback();
          }
        });
      }
    }
    /* eslint-enable jsdoc/check-param-names */

    /**
     * Tests if change in state should happen or not.
     * Classes inheriting {@link EventedState `EventedState`} should override this function.
     * @function EventedState#shouldStateBeChanged
     * @param {string} [state] The new state. Can be an omitted, which means toggling.
     * @param {object} [detail]
     *   The object that should be put to event details that is fired before/after changing state.
     *   Can have a `group` property, which specifies what state to be changed.
     * @returns {boolean}
     *   `false` if change in state shouldn't happen, e.g. when the given new state is the same as the current one.
     */
  }

  /**
   * The callback called once changing state is finished or is canceled.
   * @callback EventedState~changeStateCallback
   * @param {Error} error
   *   An error object with `true` in its `canceled` property if changing state is canceled.
   *   Cancellation happens if the handler of a custom event, that is fired before changing state happens,
   *   calls `.preventDefault()` against the event.
   * @param {boolean} keptState
   *   `true` if the call to {@link EventedState#changeState `.changeState()`} didn't cause actual change in state.
   */

  return EventedState;
}
