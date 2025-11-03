/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SyntheticEvent } from 'react';

/**
 * Composes multiple event handler functions into a single event handler. The
 * composed handler calls each provided function sequentially with the event and
 * any additional arguments. If any handler calls `event.preventDefault()`,
 * further handlers are skipped.
 *
 * @param handlers - An array of event handler functions.
 * @returns A composite event handler.
 */
export const composeEventHandlers =
  <E extends SyntheticEvent = SyntheticEvent>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    handlers: (((event: E, ...args: any[]) => void) | undefined)[]
  ) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  (event: E, ...args: any[]) => {
    for (const handler of handlers) {
      if (event.defaultPrevented) {
        break;
      }

      if (typeof handler === 'function') {
        handler(event, ...args);
      }
    }
  };
