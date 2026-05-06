/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO: Investigate whether migrating `config/jest-config-carbon` to
// TypeScript, or another similar change, would eliminate the need for these
// types.
declare module '@jest/expect' {
  interface Matchers<R extends void | Promise<void>, T = unknown> {
    toHaveNoAxeViolations(): R;
    toHaveNoACViolations(label: string): R;
  }
}

declare global {
  namespace jest {
    interface Matchers<R = void, T = unknown> {
      toHaveNoAxeViolations(): R;
      toHaveNoACViolations(label: string): R;
    }
  }
}

export {};
