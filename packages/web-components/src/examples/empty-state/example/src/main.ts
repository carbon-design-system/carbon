/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import web component definitions from @carbon/web-components
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/data-table/index.js';
import '@carbon/web-components/es/components/link/index.js';
import '@carbon/web-components/es/components/tile/index.js';
import '@carbon/web-components/es/components/tooltip/index.js';
import '@carbon/web-components/es/components/ui-shell/index.js';

// Register the recipe custom elements
import './components/empty-state';
import './components/no-data-empty-state';
import './components/error-empty-state';
import './components/not-found-empty-state';
import './components/notifications-empty-state';
import './components/unauthorized-empty-state';
import './components/no-tags-empty-state';

// Register preview custom elements
import './preview-components/empty-state-with-isometric-illustration';
import './preview-components/empty-state-with-pictogram-illustration';
import './preview-components/empty-state-unit';
import './preview-components/empty-state-preview';
import './preview-components/no-data-empty-state-preview';
import './preview-components/error-empty-state-preview';
import './preview-components/not-found-empty-state-preview';
import './preview-components/notifications-empty-state-preview';
import './preview-components/unauthorized-empty-state-preview';
import './preview-components/no-tags-empty-state-preview';
