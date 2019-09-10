/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import { usePortalNode } from './usePortalNode';

/**
 * Provides an `announce` method that allows a user to queue up an assertive or
 * polite message to the user. This message is displayed in an `aria-live`
 * region with the appropriate mode and the message is set as its text content.
 * This `aria-live` region is the same for all components, so ordering of
 * messages sent is important.
 */
export function useAnnouncer() {
  const node = usePortalNode('carbon-announcer');
  const [mode, updateMode] = useState('polite');
  const [announcement, updateAnnouncement] = useState('');

  function announce(mode, message) {
    updateMode(mode);
    updateAnnouncement(message);
  }

  useEffect(() => {
    if (!node) {
      return;
    }

    if (!node.classList.contains('bx--visually-hidden')) {
      node.classList.add('bx--visually-hidden');
    }

    // In this effect, we'll need to setup the `#carbon-announcer` node with two
    // corresponding announcement nodes if they do not exist already. If they
    // already exist, then we can reuse them.
    let assertiveNode = node.querySelector('#carbon-assertive-announcement');
    if (!assertiveNode) {
      assertiveNode = document.createElement('div');
      assertiveNode.id = 'carbon-assertive-announcement';
      assertiveNode.setAttribute('aria-live', 'assertive');
      node.appendChild(assertiveNode);
    }

    let politeNode = node.querySelector('#carbon-polite-announcement');
    if (!politeNode) {
      politeNode = document.createElement('div');
      politeNode.id = 'carbon-polite-announcement';
      politeNode.setAttribute('aria-live', 'polite');
      node.appendChild(politeNode);
    }
  }, [node]);

  useEffect(() => {
    if (!node) {
      return;
    }

    // Each time the mode or announcement changes, we'll want to update the
    // message at that node.
    const assertiveNode = node.querySelector('#carbon-assertive-announcement');
    const politeNode = node.querySelector('#carbon-polite-announcement');
    const timeoutId = setTimeout(() => {
      if (mode === 'assertive' && assertiveNode.textContent !== announcement) {
        assertiveNode.textContent = announcement;
      }

      if (mode === 'polite' && politeNode.textContent !== announcement) {
        politeNode.textContent = announcement;
      }
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [node, mode, announcement]);

  return announce;
}

/**
 * Provides an announce method that will allow the user to queue up messages in
 * an `aria-live="assertive"` region
 */
export function useAssertiveAnnouncer() {
  const announce = useAnnouncer();
  return message => announce('assertive', message);
}

/**
 * Provides an announce method that will allow the user to queue up messages in
 * an `aria-live="polite"` region
 */
export function usePoliteAnnouncer() {
  const announce = useAnnouncer();
  return message => announce('polite', message);
}
