/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Guard against hydration issues/SSR
const isBrowser = typeof document !== 'undefined';

// Used to cache the lang value and prevent unecessary updates
let currentLang = isBrowser ? document.documentElement.lang : '';
let updateScheduled = false;

// So a single MutationObserver can be reused
type Subscriber = (lang: string) => void;
let subscribers: Subscriber[] = [];
let observerInitialized = false;

/**
 * Internal callback for MutationObserver to dispatch lang changes.
 * debounced into a microtask, and avoiding redundant notifications.
 */
function handleMutations() {
  if (!isBrowser) return;

  if (updateScheduled) return;
  updateScheduled = true;

  queueMicrotask(() => {
    updateScheduled = false;
    const newLang = document.documentElement.lang;

    // There's no need to notify if the lang hasn't changed
    if (newLang === currentLang) return;

    currentLang = newLang;
    for (const callback of subscribers) {
      callback(newLang);
    }
  });
}

/**
 * Initializes a shared MutationObserver for the <html> lang attribute.
 */
function initObserver() {
  if (!isBrowser || observerInitialized) return;
  observerInitialized = true;

  const observer = new MutationObserver(handleMutations);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
}

/**
 * Retrieves the current document language. Falls back to the browser's
 * `navigator.language` if the `<html>` lang attribute is empty.
 *
 * @returns {string} The current document language code.
 */
export function getDocumentLang(): string {
  return isBrowser
    ? document.documentElement.lang || window.navigator.language || ''
    : '';
}

/**
 * Subscribes to changes on the `<html>` element's `lang` attribute.
 * Uses a shared MutationObserver under the hood to watch for attribute
 * mutations.
 *
 * @param {Subscriber} callback - Invoked with the new language code whenever
 * it changes.
 * @returns {() => void} A function that, when called, removes this subscription
 */
export function subscribeDocumentLangChange(callback: Subscriber): () => void {
  if (!isBrowser) return () => {};

  if (!observerInitialized) {
    initObserver();
  }

  subscribers.push(callback);

  return () => {
    subscribers = subscribers.filter((cb) => cb !== callback);

    if (subscribers.length === 0) {
      observerInitialized = false;
    }
  };
}
