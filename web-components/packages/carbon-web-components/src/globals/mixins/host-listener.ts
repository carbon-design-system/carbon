/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import on from 'carbon-components/es/globals/js/misc/on';
import Handle from '../internal/handle';

/**
 * The format for the event name used by `@HostListener` decorator.
 */
const EVENT_NAME_FORMAT = /^((document|window|parentRoot|shadowRoot):)?([\w-]+)$/;

/**
 * @param Base The base class.
 * @returns A mix-in that sets up and cleans up event listeners defined by `@HostListener` decorator.
 */
const HostListenerMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  /**
   * A mix-in class that sets up and cleans up event listeners defined by `@HostListener` decorator.
   */
  class HostListenerMixinImpl extends Base {
    /**
     * The list of handles managed by this mix-in.
     *
     * @private
     */
    _handles: Set<Handle> = new Set(); // Not using TypeScript `private` due to: microsoft/TypeScript#17744

    connectedCallback() {
      // @ts-ignore: Until `connectedCallback` is added to `HTMLElement` definition
      super.connectedCallback();
      const hostListeners = (this.constructor as typeof HostListenerMixinImpl)._hostListeners;
      Object.keys(hostListeners).forEach((listenerName) => {
        Object.keys(hostListeners[listenerName]).forEach((type) => {
          // Parses `document:click`/`window:click` format
          const tokens = EVENT_NAME_FORMAT.exec(type);
          if (!tokens) {
            throw new Error(`Could not parse the event name: ${listenerName}`);
          }
          const [, , targetName, unprefixedType] = tokens;
          const target: EventTarget =
            {
              document: this.ownerDocument,
              window: this.ownerDocument!.defaultView,
              parentRoot: this.getRootNode(),
              shadowRoot: this.shadowRoot,
            }[targetName] || this;

          const { options } = hostListeners[listenerName][type];

          this._handles.add(
            on(
              target,
              ((this.constructor as typeof Base)[unprefixedType] ?? unprefixedType) as keyof HTMLElementEventMap,
              this[listenerName],
              options
            )
          );
        });
      });
    }

    disconnectedCallback() {
      this._handles.forEach((handle) => {
        handle.release();
        this._handles.delete(handle);
      });
      // @ts-ignore: Until `disconnectedCallback` is added to `HTMLElement` definition
      super.disconnectedCallback();
    }

    /**
     * The map, keyed by method name, of event listeners that should be attached to host element or host document.
     *
     * @private
     */
    static _hostListeners: {
      [listenerName: string]: {
        [type: string]: {
          options?: boolean | AddEventListenerOptions;
        };
      };
    } = {}; // Not using TypeScript `private` due to: microsoft/TypeScript#17744
  }

  return HostListenerMixinImpl;
};

export default HostListenerMixin;
