/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

jest.useFakeTimers();

describe('useAnnouncer', () => {
  let React;
  let act;
  let render;
  let cleanup;
  let useAnnouncer;

  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    act = require('react-dom/test-utils').act;
    render = require('../test-helpers').render;
    cleanup = require('../test-helpers').cleanup;
    useAnnouncer = require('../useAnnouncer').useAnnouncer;
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('should create a live region region for each aria-live mode', () => {
    function Component() {
      useAnnouncer();
      return null;
    }

    act(() => {
      render(<Component />);
    });

    jest.runAllTimers();

    expect(document.querySelector('[aria-live="polite"]')).toBeInstanceOf(
      HTMLDivElement
    );
    expect(document.querySelector('[aria-live="assertive"]')).toBeInstanceOf(
      HTMLDivElement
    );
  });

  it('should update a live region for the given mode and announcement', () => {
    const testMessage = 'test message';

    function Component({ mode, message, testId }) {
      const announce = useAnnouncer();
      return (
        <button data-test-id={testId} onClick={() => announce(mode, message)}>
          Announce
        </button>
      );
    }

    let testId = 'announce-id-1';
    act(() => {
      render(<Component mode="polite" message={testMessage} testId={testId} />);
    });

    let button = document.querySelector(`[data-test-id="${testId}"]`);
    button.click();

    jest.runAllTimers();

    const politeRegion = document.querySelector('[aria-live="polite"]');
    expect(politeRegion.textContent).toEqual(testMessage);

    testId = 'announce-id-2';
    act(() => {
      render(
        <Component mode="assertive" message={testMessage} testId={testId} />
      );
    });

    button = document.querySelector(`[data-test-id="${testId}"]`);
    button.click();

    jest.runAllTimers();

    const assertiveRegion = document.querySelector('[aria-live="assertive"]');
    expect(assertiveRegion.textContent).toEqual(testMessage);
  });
});
