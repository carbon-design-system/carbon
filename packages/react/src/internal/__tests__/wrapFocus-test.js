import wrapFocus from '../wrapFocus';

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('wrapFocus', () => {
  let node;
  let spyInnerModal;
  let spyButton0;
  let spyButton2;

  beforeEach(() => {
    node = document.createElement('div');
    node.tabIndex = '-1';
    node.innerHTML = `
      <button id="outer-preceding"></button>
      <span
        id="start-sentinel"
        tabIndex="0"
        role="link"
        class="bx--visually-hidden">
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
        class="bx--visually-hidden">
      </span>
      <button id="outer-following"></button>
      <div class="bx--tooltip" tabindex="0"></div>
    `;
    document.body.appendChild(node);
    spyInnerModal = jest.spyOn(node.querySelector('#inner-modal'), 'focus');
    spyButton0 = jest.spyOn(node.querySelector('#button-0'), 'focus');
    spyButton2 = jest.spyOn(node.querySelector('#button-2'), 'focus');
  });

  afterEach(() => {
    if (spyButton2) {
      spyButton2.mockRestore();
      spyButton2 = null;
    }
    if (spyButton0) {
      spyButton0.mockRestore();
      spyButton0 = null;
    }
    if (spyInnerModal) {
      spyInnerModal.mockRestore();
      spyInnerModal = null;
    }
    if (node) {
      node.parentNode.removeChild(node);
      node = null;
    }
  });

  it('runs forward focus-wrap when following outer node is focused on', () => {
    wrapFocus({
      bodyNode: node.querySelector('#inner-modal'),
      startSentinelNode: node.querySelector('#start-sentinel'),
      endSentinelNode: node.querySelector('#end-sentinel'),
      currentActiveNode: node.querySelector('#outer-following'),
      oldActiveNode: node.querySelector('#button-2'),
    });
    expect(spyButton0).toHaveBeenCalled();
  });

  it('runs forward focus-wrap when following focus sentinel is focused on', () => {
    wrapFocus({
      bodyNode: node.querySelector('#inner-modal'),
      startSentinelNode: node.querySelector('#start-sentinel'),
      endSentinelNode: node.querySelector('#end-sentinel'),
      currentActiveNode: node.querySelector('#end-sentinel'),
      oldActiveNode: node.querySelector('#button-2'),
    });
    expect(spyButton0).toHaveBeenCalled();
  });

  it('runs reverse focus-wrap when preceding outer node is focused on', () => {
    wrapFocus({
      bodyNode: node.querySelector('#inner-modal'),
      startSentinelNode: node.querySelector('#start-sentinel'),
      endSentinelNode: node.querySelector('#end-sentinel'),
      currentActiveNode: node.querySelector('#outer-preceding'),
      oldActiveNode: node.querySelector('#button-0'),
    });
    expect(spyButton2).toHaveBeenCalled();
  });

  it('runs reverse focus-wrap when preceding focus sentinel is focused on', () => {
    wrapFocus({
      bodyNode: node.querySelector('#inner-modal'),
      startSentinelNode: node.querySelector('#start-sentinel'),
      endSentinelNode: node.querySelector('#end-sentinel'),
      currentActiveNode: node.querySelector('#start-sentinel'),
      oldActiveNode: node.querySelector('#button-0'),
    });
    expect(spyButton2).toHaveBeenCalled();
  });

  it('does not run focus-wrap when a floating menu is focused on', () => {
    wrapFocus({
      bodyNode: node.querySelector('#inner-modal'),
      startSentinelNode: node.querySelector('#start-sentinel'),
      endSentinelNode: node.querySelector('#end-sentinel'),
      currentActiveNode: node.querySelector('.bx--tooltip'),
      oldActiveNode: node.querySelector('#button-2'),
    });
    expect(spyInnerModal).not.toHaveBeenCalled();
    expect(spyButton0).not.toHaveBeenCalled();
    expect(spyButton2).not.toHaveBeenCalled();
  });

  it('uses inner modal node as a escape hatch for focusing for forward focus-wrap', () => {
    node.querySelector(
      '#inner-modal'
    ).innerHTML = `<div id="dummy-old-active-node"></div>`;
    wrapFocus({
      bodyNode: node.querySelector('#inner-modal'),
      startSentinelNode: node.querySelector('#start-sentinel'),
      endSentinelNode: node.querySelector('#end-sentinel'),
      currentActiveNode: node.querySelector('#outer-following'),
      oldActiveNode: node.querySelector('#dummy-old-active-node'),
    });
    expect(spyInnerModal).toHaveBeenCalled();
  });

  it('uses inner modal node as a escape hatch for focusing for reverse focus-wrap', () => {
    node.querySelector(
      '#inner-modal'
    ).innerHTML = `<div id="dummy-old-active-node"></div>`;
    wrapFocus({
      bodyNode: node.querySelector('#inner-modal'),
      startSentinelNode: node.querySelector('#start-sentinel'),
      endSentinelNode: node.querySelector('#end-sentinel'),
      currentActiveNode: node.querySelector('#outer-preceding'),
      oldActiveNode: node.querySelector('#dummy-old-active-node'),
    });
    expect(spyInnerModal).toHaveBeenCalled();
  });
});
