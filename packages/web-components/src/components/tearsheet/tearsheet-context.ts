/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createContext } from '@lit/context';
import { prefix } from '../../globals/settings';

/**
 * Block class for tearsheet component
 */
export const blockClass = `${prefix}--tearsheet`;

/**
 * Per-instance state for a single cds-tearsheet.
 */
export interface TearsheetState {
  hasCloseIcon: boolean;
  fullyCollapsed: boolean;
  disableHeaderCollapse: boolean;
  variant: 'wide' | 'narrow';
  isSm: boolean;
  open: boolean;
  hasAILabel: boolean;
  /** Whether any decorator (AI label or otherwise) is slotted */
  hasDecorator: boolean;
  /** Tooltip/aria label for the close button */
  closeIconDescription: string;
  /** Whether the close button should be hidden */
  hideCloseButton: boolean;
  /** Callback to close the tearsheet */
  onClose: (() => void) | null;
  /** CSS selector for the element that should receive focus on open (consumer override) */
  selectorPrimaryFocus: string;
}

export const defaultTearsheetState: TearsheetState = {
  hasCloseIcon: true,
  fullyCollapsed: false,
  disableHeaderCollapse: false,
  variant: 'wide',
  isSm: false,
  open: false,
  hasAILabel: false,
  hasDecorator: false,
  closeIconDescription: 'Close',
  hideCloseButton: false,
  onClose: null,
  selectorPrimaryFocus: '',
};

/**
 * The value carried by the tearsheet context.
 *
 * `state`    — current snapshot, read by children inside render()
 * `setState` — partial-update function, called by children to write back
 */
export interface TearsheetContextValue {
  state: TearsheetState;
  setState: (patch: Partial<TearsheetState>) => void;
}

/**
 * Lit context key. Each cds-tearsheet creates a ContextProvider for this key,
 * so the scope is automatically per-instance — no uniqueId bookkeeping needed.
 */
export const tearsheetContext = createContext<TearsheetContextValue>(
  Symbol('tearsheet-context')
);
