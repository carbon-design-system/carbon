/**
 * @jest-environment node
 */

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defineTest, applyTransform } = require('jscodeshift/dist/testUtils');
const transform = require('../enable-v12-release');

defineTest(__dirname, 'enable-v12-release');
defineTest(__dirname, 'enable-v12-release', null, 'enable-v12-release-aliased');

it('does not change an application with the v12 release flag enabled', () => {
  const source = `
    import { FeatureFlags } from '@carbon/react';
    import { createRoot } from 'react-dom/client';
    import App from './App';

    const root = createRoot(document.getElementById('root'));
    root.render(
      <FeatureFlags enableV12Release>
        <App />
      </FeatureFlags>
    );
  `;

  expect(applyTransform(transform, {}, { source })).toBe('');
});
