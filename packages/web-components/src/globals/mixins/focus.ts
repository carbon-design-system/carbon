/**
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { selectorTabbable } from '../settings';

/**
 * @param Base The base class.
 * @returns A mix-in implementing `.focus()` method that focuses on the first focusable element in the shadow DOM.
 */
const FocusMixin = <T extends Constructor<HTMLElement>>(
  Base: T
): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): {
    focus(): void;
  };
} & T => {
  return class extends Base {
    /**
     * Focuses on the first focusable element in the shadow DOM.
     */
    focus() {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      if (this.shadowRoot!.delegatesFocus) {
        super.focus();
      } else {
        const delegateTarget =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          this.shadowRoot!.querySelector(selectorTabbable) ||
          this.querySelector(selectorTabbable);
        if (delegateTarget) {
          (delegateTarget as HTMLElement).focus();
        } else {
          super.focus();
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
};

export default FocusMixin;
