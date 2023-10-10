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
    if (process.env.STORYBOOK_USE_RTL === 'true') {
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

  // Does not include LTS message in UIShell elements to avoid overlaying
  const url = window.location.href.includes('ui-shell');

  return (
    <React.StrictMode>
      {!url && (
        <div
          style={{
            backgroundColor: 'black',
            width: 'auto',
            padding: '1rem',
            margin: '-1rem -1rem 0px -1rem',
          }}>
          <p style={{ color: 'white' }}>
            Carbon v10 is currently in maintenance mode, support is scheduled to
            end on September 30, 2024.
          </p>
        </div>
      )}

      <div
        className={id.toLowerCase()}
        data-floating-menu-container
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
