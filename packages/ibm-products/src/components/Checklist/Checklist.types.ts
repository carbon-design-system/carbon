/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum Themes {
  light = 'light',
  dark = 'dark',
}

export type Theme = Themes.light | Themes.dark;

export enum Kinds {
  unchecked = 'unchecked',
  indeterminate = 'indeterminate',
  checked = 'checked',
  disabled = 'disabled',
  error = 'error',
}

export type Kind =
  | Kinds.unchecked
  | Kinds.indeterminate
  | Kinds.checked
  | Kinds.disabled
  | Kinds.error;
