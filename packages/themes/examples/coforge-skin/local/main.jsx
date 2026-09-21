/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../../../react/src/feature-flags';
import './styles.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalTheme } from '../app/carbon';
import { LumaApp } from '../app/LumaApp';

document.documentElement.setAttribute('data-coforge-skin', 'on');
document.documentElement.setAttribute('data-carbon-theme', 'white');

const root = document.getElementById('root');
createRoot(root).render(
  <GlobalTheme theme="white">
    <LumaApp />
  </GlobalTheme>
);
