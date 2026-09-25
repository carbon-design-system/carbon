/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { signal } from '@lit-labs/signals';
import { prefix } from '../../globals/settings';

/**
 * Block class for tearsheet component
 */
export const blockClass = `${prefix}--tearsheet`;

interface TearsheetSignalType {
  hasCloseIcon: boolean;
  fullyCollapsed: boolean;
  disableHeaderCollapse: boolean;
  variant: 'wide' | 'narrow';
  isSm: boolean;
  open: boolean;
  hasAILabel: boolean;
  /** Whether any decorator (AI label or otherwise) is slotted */
  hasDecorator: boolean;
  uniqueId: string;
  /** Tooltip/aria label for the close button */
  closeIconDescription: string;
  /** Whether the close button should be hidden */
  hideCloseButton: boolean;
  /** Callback to close the tearsheet */
  onClose: (() => void) | null;
  /** CSS selector for the element that should receive focus on open (consumer override) */
  selectorPrimaryFocus: string;
  /** Title text from cds-tearsheet-header-content — used as aria-label fallback on the dialog */
  title: string;
}
export const defaultTearsheetSignal: TearsheetSignalType = {
  hasCloseIcon: true,
  fullyCollapsed: false,
  disableHeaderCollapse: false,
  variant: 'wide',
  isSm: false,
  open: false,
  hasAILabel: false,
  hasDecorator: false,
  uniqueId: '',
  closeIconDescription: 'Close',
  hideCloseButton: false,
  onClose: null,
  selectorPrimaryFocus: '',
  title: '',
};
export const tearsheetSignal = signal<TearsheetSignalType>(
  defaultTearsheetSignal
);

/**
 * Update one or more properties in the tearsheet signal
 */
export const updateTearsheetSignals = (
  updates: Partial<TearsheetSignalType>
) => {
  tearsheetSignal.set({
    ...tearsheetSignal.get(),
    ...updates,
  });
};

/**
 * Reset tearsheet signal to default values
 */
export const resetTearsheetSignal = () => {
  tearsheetSignal.set(defaultTearsheetSignal);
};
