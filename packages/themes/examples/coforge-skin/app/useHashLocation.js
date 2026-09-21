/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';

export function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [pathname, queryString = ''] = raw.split('?');
  return {
    pathname: pathname || '/',
    query: new URLSearchParams(queryString),
  };
}

export function useHashLocation() {
  const [loc, setLoc] = useState(() =>
    typeof window === 'undefined'
      ? { pathname: '/', query: new URLSearchParams() }
      : parseHash()
  );

  useEffect(() => {
    const sync = () => setLoc(parseHash());
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return loc;
}

export function href(path) {
  return `#${path}`;
}
