/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

export enum Statuses {
  NotStarted = 'not started',
  InProgress = 'in progress',
  Completed = 'completed',
  Error = 'error',
  Disabled = 'disabled',
}

export type Status =
  | Statuses.NotStarted
  | Statuses.InProgress
  | Statuses.Completed
  | Statuses.Error
  | Statuses.Disabled;
