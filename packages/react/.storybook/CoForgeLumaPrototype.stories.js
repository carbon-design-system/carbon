/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { LumaApp } from '../../themes/examples/coforge-skin/app/LumaApp';

export default {
  title: 'CoForge/Luma prototype',
  tags: ['!autodocs'],
  parameters: {
    controls: { hideNoControlsWarning: true },
    chromatic: { disableSnapshot: true },
    layout: 'fullscreen',
  },
  globals: {
    coforgeSkin: 'on',
    backgrounds: { value: 'white' },
  },
};

export const App = () => <LumaApp />;
