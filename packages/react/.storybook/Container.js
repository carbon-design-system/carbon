/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';
import './polyfills';
import PackageInfo from './../package.json';

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
            fontSize: '1rem',
            width: 'auto',
            padding: '1rem',
            margin: '-1rem -1rem 0px -1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
          }}>
          <p style={{ color: 'white' }}>
            carbon-components-react@7.x is in maintenance mode, support is
            scheduled to end on September 30, 2024.
          </p>
          <a
            style={{ textDecoration: 'none' }}
            href="https://github.com/carbon-design-system/carbon/blob/main/docs/release-schedule.md"
            target="_blank">
            Release schedule
          </a>
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
