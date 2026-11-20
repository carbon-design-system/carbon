/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { wrapFocus, wrapFocusWithoutSentinels } from '../wrapFocus';

describe('wrapFocus', () => {
  let node: HTMLDivElement;
  let spyInnerModal: ReturnType<typeof jest.spyOn>;
  let spyButton0: ReturnType<typeof jest.spyOn>;
  let spyButton2: ReturnType<typeof jest.spyOn>;

  const getElement = (selector: string) => {
    const element = node.querySelector(selector);

    if (element instanceof HTMLElement) return element;

    throw new Error(`Expected an element matching ${selector}.`);
  };

  beforeEach(() => {
    node = document.createElement('div');
    node.tabIndex = -1;
    node.innerHTML = `
      <button id="outer-preceding"></button>
      <span
        id="start-sentinel"
        tabIndex="0"
        role="link"
        class="cds--visually-hidden">
      </span>
      <div id="inner-modal" tabindex="-1">
        <button id="button-0">Button 0</button>
        <button id="button-1">Button 1</button>
        <button id="button-2">Button 2</button>
      </div>
      <span
        id="end-sentinel"
        tabIndex="0"
        role="link"
        class="cds--visually-hidden">
      </span>
      <button id="outer-following"></button>
      <div class="cds--tooltip" tabindex="0"></div>
    `;
    document.body.appendChild(node);

    spyInnerModal = jest.spyOn(getElement('#inner-modal'), 'focus');
    spyButton0 = jest.spyOn(getElement('#button-0'), 'focus');
    spyButton2 = jest.spyOn(getElement('#button-2'), 'focus');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    node.remove();
  });

  it('runs forward focus-wrap when following outer node is focused on', () => {
    wrapFocus({
      bodyNode: getElement('#inner-modal'),
      startTrapNode: getElement('#start-sentinel'),
      endTrapNode: getElement('#end-sentinel'),
      currentActiveNode: getElement('#outer-following'),
      oldActiveNode: getElement('#button-2'),
    });
    expect(spyButton0).toHaveBeenCalled();
  });

  it('runs forward focus-wrap when following focus sentinel is focused on', () => {
    wrapFocus({
      bodyNode: getElement('#inner-modal'),
      startTrapNode: getElement('#start-sentinel'),
      endTrapNode: getElement('#end-sentinel'),
      currentActiveNode: getElement('#end-sentinel'),
      oldActiveNode: getElement('#button-2'),
    });
    expect(spyButton0).toHaveBeenCalled();
  });

  it('runs reverse focus-wrap when preceding outer node is focused on', () => {
    wrapFocus({
      bodyNode: getElement('#inner-modal'),
      startTrapNode: getElement('#start-sentinel'),
      endTrapNode: getElement('#end-sentinel'),
      currentActiveNode: getElement('#outer-preceding'),
      oldActiveNode: getElement('#button-0'),
    });
    expect(spyButton2).toHaveBeenCalled();
  });

  it('runs reverse focus-wrap when preceding focus sentinel is focused on', () => {
    wrapFocus({
      bodyNode: getElement('#inner-modal'),
      startTrapNode: getElement('#start-sentinel'),
      endTrapNode: getElement('#end-sentinel'),
      currentActiveNode: getElement('#start-sentinel'),
      oldActiveNode: getElement('#button-0'),
    });
    expect(spyButton2).toHaveBeenCalled();
  });

  it('does not run focus-wrap when a floating menu is focused on', () => {
    wrapFocus({
      bodyNode: getElement('#inner-modal'),
      startTrapNode: getElement('#start-sentinel'),
      endTrapNode: getElement('#end-sentinel'),
      currentActiveNode: getElement('.cds--tooltip'),
      oldActiveNode: getElement('#button-2'),
    });
    expect(spyInnerModal).not.toHaveBeenCalled();
    expect(spyButton0).not.toHaveBeenCalled();
    expect(spyButton2).not.toHaveBeenCalled();
  });

  it('respects prefix overrides when checking floating menus', () => {
    const tooltip = getElement('.cds--tooltip');
    tooltip.className = 'bx--tooltip';
    wrapFocus({
      bodyNode: getElement('#inner-modal'),
      startTrapNode: getElement('#start-sentinel'),
      endTrapNode: getElement('#end-sentinel'),
      currentActiveNode: tooltip,
      oldActiveNode: getElement('#button-2'),
      prefix: 'bx',
    });
    expect(spyInnerModal).not.toHaveBeenCalled();
    expect(spyButton0).not.toHaveBeenCalled();
    expect(spyButton2).not.toHaveBeenCalled();
  });

  it('uses inner modal node as a escape hatch for focusing for forward focus-wrap', () => {
    getElement('#inner-modal').innerHTML =
      `<div id="dummy-old-active-node"></div>`;
    wrapFocus({
      bodyNode: getElement('#inner-modal'),
      startTrapNode: getElement('#start-sentinel'),
      endTrapNode: getElement('#end-sentinel'),
      currentActiveNode: getElement('#outer-following'),
      oldActiveNode: getElement('#dummy-old-active-node'),
    });
    expect(spyInnerModal).toHaveBeenCalled();
  });

  it('uses inner modal node as a escape hatch for focusing for reverse focus-wrap', () => {
    getElement('#inner-modal').innerHTML =
      `<div id="dummy-old-active-node"></div>`;
    wrapFocus({
      bodyNode: getElement('#inner-modal'),
      startTrapNode: getElement('#start-sentinel'),
      endTrapNode: getElement('#end-sentinel'),
      currentActiveNode: getElement('#outer-preceding'),
      oldActiveNode: getElement('#dummy-old-active-node'),
    });
    expect(spyInnerModal).toHaveBeenCalled();
  });
});

describe('wrapFocusWithoutSentinels', () => {
  let container: HTMLDivElement;
  let button1: HTMLButtonElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <button id="button-0">Button 0</button>
      <button id="button-1">Button 1</button>
    `;
    document.body.appendChild(container);
    const element = container.querySelector('#button-1');

    if (!(element instanceof HTMLButtonElement)) {
      throw new Error('Expected the second button in the container.');
    }

    button1 = element;
  });

  afterEach(() => {
    container.remove();
  });

  it('should not throw an error when called during keydown event', () => {
    const event = new KeyboardEvent('keydown', { key: 'Tab' });

    expect(() =>
      wrapFocusWithoutSentinels({
        containerNode: container,
        currentActiveNode: button1,
        event,
      })
    ).not.toThrow();
  });

  it('should throw an error when called during unsupported event', () => {
    const event = new FocusEvent('focusin');
    const originalEnv = process.env.NODE_ENV;

    process.env.NODE_ENV = 'development';

    expect(() =>
      wrapFocusWithoutSentinels({
        containerNode: container,
        currentActiveNode: button1,
        // @ts-expect-error: Pass a focus event to test unsupported event
        // handling.
        event,
      })
    ).toThrow(
      /^Error: wrapFocusWithoutSentinels\(\.\.\.\) called in unsupported focusin event\.\s+Call wrapFocusWithoutSentinels\(\.\.\.\) from onKeyDown instead\.$/
    );

    process.env.NODE_ENV = originalEnv;
  });
});
