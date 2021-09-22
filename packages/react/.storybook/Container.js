/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';
import './polyfills';

import React, { useEffect } from 'react';

function Container({ story, id }) {
  useEffect(() => {
    const originalDirection = document.documentElement.dir;
    if (process.env.CARBON_REACT_STORYBOOK_USE_RTL === 'true') {
      document.documentElement.dir = 'rtl';
    }
    return () => {
      if (originalDirection) {
        document.documentElement.dir = originalDirection;
      } else {
        document.documentElement.removeAttribute('dir');
      }
    };
  }, []);

  return (
    <React.StrictMode>
      <div
        className={id.toLowerCase()}
        data-floating-menu-container
        role="main"
        style={{
          padding: '3em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <div style={{ position: 'relative', width: '100%', zIndex: 0 }}>
          {story()}
        </div>
      </div>
    </React.StrictMode>
  );
}

export default Container;
