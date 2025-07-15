/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { useDocumentLang } from '../useDocumentLang';

describe('useDocumentLang hook', () => {
  function TestComponent() {
    const lang = useDocumentLang();
    return <div data-testid="lang">{lang}</div>;
  }

  beforeEach(() => {
    document.documentElement.lang = '';
    // Override navigator.language via defineProperty since it's a getter
    Object.defineProperty(window.navigator, 'language', {
      value: 'en-GB',
      configurable: true,
    });
  });

  test('initial render shows fallback language', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('lang').textContent).toBe('en-GB');
  });

  test('updates when html lang attribute changes', async () => {
    render(<TestComponent />);
    expect(screen.getByTestId('lang').textContent).toBe('en-GB');

    // Use a single async act to wrap both the DOM mutation and microtask flush
    await act(async () => {
      // Mutate the lang attribute
      document.documentElement.lang = 'pt';
      // Allow the queued microtask (MutationObserver callback) to run
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(screen.getByTestId('lang').textContent).toBe('pt');
  });
});
