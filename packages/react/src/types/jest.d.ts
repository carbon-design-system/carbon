/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module '@jest/expect' {
  interface Matchers<R extends void | Promise<void>, T = unknown> {
    toHaveNoAxeViolations(): Promise<void>;
  }
}

declare global {
  namespace jest {
    interface Matchers<R = void, T = unknown> {
      toHaveNoAxeViolations(): Promise<void>;
    }
  }
}

export {};
