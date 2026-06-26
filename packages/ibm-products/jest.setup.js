/**
 * Copyright IBM Corp. 2021, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ibm-products specific Jest setupFiles.
 * Runs BEFORE the test framework is installed.
 * Adds global mocks and config that ibm-products components need beyond
 * what jest-config-carbon/setup/setup.js already provides.
 */

import settings from './src/global/js/package-settings';

const { _silenceWarnings, setAllComponents } = settings;

// Enable all components and silence canary warnings during tests
_silenceWarnings(true);
setAllComponents(true);

global.__DEV__ = true;

// Tell React this is a test environment so act() warnings are suppressed.
// Must be set here (setupFiles, before the framework) so it applies to passive
// mount effects that fire outside of explicit act() calls.
global.IS_REACT_ACT_ENVIRONMENT = true;

if (global.window) {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    root: null,
    rootMargin: '',
    thresholds: [],
    disconnect: () => null,
    observe: () => null,
    takeRecords: () => [],
    unobserve: () => null,
  }));
}

if (global.HTMLElement) {
  HTMLCanvasElement.prototype.getContext = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  Element.prototype.scrollBy = jest.fn();
  window.scrollBy = jest.fn();
}

// jsdom does not support the second argument to getComputedStyle; mock it so
// components that pass a pseudo-element string do not cause errors.
const oldGetComputedStyle = global.getComputedStyle;
global.getComputedStyle = jest.fn((elt) => oldGetComputedStyle(elt));
