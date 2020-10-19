/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';

// Minimal implementation of `deferComponentRender` from:
// https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export function deferComponentRender(WrappedComponent) {
  function DeferredRender(props) {
    // We defer rendering on the client but not the server
    const [shouldRender, setShouldRender] = useState(!canUseDOM);

    useEffect(() => {
      let frameId = window.requestAnimationFrame(() => {
        frameId = window.requestAnimationFrame(() => {
          setShouldRender(true);
        });
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }, []);

    if (shouldRender) {
      return <WrappedComponent {...props} />;
    }

    return null;
  }

  return DeferredRender;
}
