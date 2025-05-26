/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getDocumentLang, subscribeDocumentLangChange } from '../documentLang';

describe('documentLang', () => {
  beforeEach(() => {
    document.documentElement.lang = '';
    // Override navigator.language via defineProperty since it's a getter
    Object.defineProperty(window.navigator, 'language', {
      value: 'en-US',
      configurable: true,
    });
  });

  test('getDocumentLang returns html lang when set', () => {
    document.documentElement.lang = 'fr';
    expect(getDocumentLang()).toBe('fr');
  });

  test('getDocumentLang falls back to navigator.language', () => {
    expect(getDocumentLang()).toBe('en-US');
  });

  test('subscribeDocumentLangChange notifies callback on change', async () => {
    const callback = jest.fn();
    const unsubscribe = subscribeDocumentLangChange(callback);

    document.documentElement.lang = 'es';

    // flush the microtask queued from the mutation
    await new Promise((r) => setTimeout(r, 0));

    expect(callback).toHaveBeenCalledWith('es');
    unsubscribe();
  });

  test('subscribeDocumentLangChange unsubscribe prevents further notifications', async () => {
    const callback = jest.fn();
    const unsubscribe = subscribeDocumentLangChange(callback);
    unsubscribe();

    document.documentElement.lang = 'de';

    // flush the microtask queued from the mutation
    await new Promise((r) => setTimeout(r, 0));

    expect(callback).not.toHaveBeenCalled();
  });
});
