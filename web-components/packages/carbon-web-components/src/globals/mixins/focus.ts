/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { selectorTabbable } from '../settings';

/**
 * @param Base The base class.
 * @returns A mix-in implementing `.focus()` method that focuses on the first focusable element in the shadow DOM.
 */
const FocusMixin = <T extends Constructor<HTMLElement>>(Base: T) =>
  class extends Base {
    /**
     * Focuses on the first focusable element in the shadow DOM.
     */
    focus() {
      // @ts-ignore: Until `delegatesFocus` is added to `ShadowRoot` definition
      if (this.shadowRoot!.delegatesFocus) {
        super.focus();
      } else {
        const delegateTarget = this.shadowRoot!.querySelector(selectorTabbable) || this.querySelector(selectorTabbable);
        if (delegateTarget) {
          (delegateTarget as HTMLElement).focus();
        } else {
          super.focus();
        }
      }
    }
  };

export default FocusMixin;
