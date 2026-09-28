/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { signal, Signal } from '@lit-labs/signals';
import { prefix } from '../../globals/settings';

// ---------------------------------------------------------------------------
// Element → uniqueId registry
// ---------------------------------------------------------------------------
// WeakMap so entries are GC'd automatically when the element is removed.
// uniqueId is never reflected to the DOM — this is the sole lookup path.

const _tearsheetRegistry = new WeakMap<Element, string>();

/**
 * Called by cds-tearsheet in connectedCallback to publish its uniqueId.
 */
export const registerTearsheetElement = (el: Element, id: string): void => {
  _tearsheetRegistry.set(el, id);
};

/**
 * Called by cds-tearsheet in disconnectedCallback to clean up.
 */
export const unregisterTearsheetElement = (el: Element): void => {
  _tearsheetRegistry.delete(el);
};

/**
 * Called by every child component in connectedCallback.
 * Uses closest() for a single native ancestor walk, then looks the host up
 * in the WeakMap — no string attribute in the DOM, no public property needed.
 */
export const getParentTearsheetId = (child: Element): string => {
  const host = child.closest(`${prefix}-tearsheet`);
  return (host !== null && _tearsheetRegistry.get(host)) || '';
};

/**
 * Block class for tearsheet component
 */
export const blockClass = `${prefix}--tearsheet`;

/**
 * Per-instance state for a single cds-tearsheet.
 * Never shared between instances — each instance owns its own Signal<TearsheetState>
 * stored in the tearsheetSignals map, keyed by uniqueId.
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
 * Registry of per-instance signals, keyed by uniqueId.
 *
 * Each cds-tearsheet registers its own Signal<TearsheetState> here.
 * Child components call getTearsheetSignal(uniqueId) to get the exact
 * signal for their parent — SignalWatcher then subscribes only to that
 * one signal, so a collapse in tearsheet-2 never re-renders tearsheet-1's
 * children.
 */
const tearsheetSignalRegistry = new Map<string, Signal.State<TearsheetState>>();

/**
 * Register a new signal for a tearsheet instance.
 * Called by cds-tearsheet on firstUpdated with initial state.
 */
export const registerTearsheetSignal = (
  uniqueId: string,
  initialState?: Partial<TearsheetState>
): void => {
  if (!tearsheetSignalRegistry.has(uniqueId)) {
    tearsheetSignalRegistry.set(
      uniqueId,
      signal<TearsheetState>({ ...defaultTearsheetState, ...initialState })
    );
  }
};

/**
 * Get the Signal<TearsheetState> for a specific instance.
 * Child components call .get() on the returned signal inside render() so
 * SignalWatcher tracks only that instance's signal.
 * Returns a no-op signal with defaults if the instance isn't registered yet.
 */
export const getTearsheetSignal = (
  uniqueId: string
): Signal.State<TearsheetState> => {
  if (!tearsheetSignalRegistry.has(uniqueId)) {
    // Return a standalone default signal — won't be written to by anyone,
    // harmless for components that connect before their parent tearsheet.
    return signal<TearsheetState>({ ...defaultTearsheetState });
  }
  return tearsheetSignalRegistry.get(uniqueId) as Signal.State<TearsheetState>;
};

/**
 * Read the current state for a specific instance.
 * Convenience wrapper — does NOT subscribe (no SignalWatcher tracking).
 * Use getTearsheetSignal(id).get() inside render() to subscribe.
 */
export const getTearsheetState = (uniqueId: string): TearsheetState =>
  getTearsheetSignal(uniqueId).get();

/**
 * Write a partial update into the state signal for a specific instance.
 */
export const updateTearsheetState = (
  uniqueId: string,
  updates: Partial<TearsheetState>
): void => {
  const sig = getTearsheetSignal(uniqueId);
  sig.set({ ...sig.get(), ...updates });
};

/**
 * Remove the signal for a specific instance (call on disconnectedCallback).
 */
export const removeTearsheetState = (uniqueId: string): void => {
  tearsheetSignalRegistry.delete(uniqueId);
};
