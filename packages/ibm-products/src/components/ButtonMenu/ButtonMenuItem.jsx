/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import { pkg } from '../../settings';

// Carbon and package components we use.
import { OverflowMenuItem } from '@carbon/react';

const componentName = 'ButtonMenuItem';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * A menu item to include in a button menu component. This component has the
 * same props and behaviors as carbon OverflowMenuItem.
 */
export let ButtonMenuItem = React.forwardRef((props, ref) => (
  <OverflowMenuItem {...props} ref={ref} />
));

// Return a placeholder if not released and not enabled by feature flag
ButtonMenuItem = pkg.checkComponentEnabled(ButtonMenuItem, componentName);

ButtonMenuItem.propTypes = OverflowMenuItem.propTypes;
