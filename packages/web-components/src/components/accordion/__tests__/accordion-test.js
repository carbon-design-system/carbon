/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, fixture, expect } from '@open-wc/testing';
import '@carbon/web-components/es/components/accordion/index.js';

describe('cds-accordion', function () {
  it('should render with minimum attributes', async () => {
    const el = await fixture(html`<cds-accordion></cds-accordion>`);

    await expect(el).dom.to.equalSnapshot();
  });
});
