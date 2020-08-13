/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState } from 'react';

const _announcer = getAnnouncer();

export function useAnnouncer() {
  const announcerRef = useRef(_announcer);
  const [mode, setMode] = useState('assertive');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message === '') {
      return;
    }

    const { current: announcer } = announcerRef;
    const cancel = announcer.announce(mode, message);
    return () => {
      cancel();
    };
  }, [mode, message]);

  function announce(mode, message) {
    setMode(mode);
    setMessage(message);
  }

  return announce;
}

/**
 * Provides an announce method that will allow the user to queue up messages in
 * an `aria-live="assertive"` region
 */
export function useAssertiveAnnouncer() {
  const announce = useAnnouncer();
  return (message) => announce('assertive', message);
}

/**
 * Provides an announce method that will allow the user to queue up messages in
 * an `aria-live="polite"` region
 */
export function usePoliteAnnouncer() {
  const announce = useAnnouncer();
  return (message) => announce('polite', message);
}

function getAnnouncer() {
  let assertive = document.getElementById('carbon-assertive-announcer');
  if (!assertive) {
    assertive = document.createElement('div');
    assertive.id = 'carbon-assertive-announcer';
    assertive.classList.add('bx--visually-hidden');
    assertive.setAttribute('aria-live', 'assertive');

    document.body.appendChild(assertive);
  }

  let polite = document.getElementById('carbon-polite-announcer');
  if (!polite) {
    polite = document.createElement('div');
    polite.id = 'carbon-polite-announcer';
    polite.classList.add('bx--visually-hidden');
    polite.setAttribute('aria-live', 'polite');

    document.body.appendChild(polite);
  }

  return {
    announce(mode, message) {
      const timeoutId = setTimeout(() => {
        if (mode === 'assertive') {
          if (assertive.textContent !== message) {
            assertive.textContent = message;
          }
        } else if (mode === 'polite') {
          if (polite.textContent !== message) {
            polite.textContent = message;
          }
        }
      }, 300);

      return () => {
        clearTimeout(timeoutId);
      };
    },
  };
}
