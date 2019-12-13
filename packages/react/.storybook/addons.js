/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@storybook/addon-storysource/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-a11y/register';

// Community addons
import 'storybook-readme/register';

if (process.env.CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES === 'true') {
  import('./addon-carbon-theme/register').catch(error => {
    console.error(error);
  });
}

// These options used by storybook often conflict with developer tools,
// conditional panels, or other things that get in the way of our workflow
localStorage.removeItem('@storybook/ui/store');
localStorage.removeItem('storybook-layout');
