/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/progress-bar/index.js';

describe('cds-progress-bar', () => {
  it('should update the bar transform when progress changes', async () => {
    const el = await fixture(html`
      <cds-progress-bar max="200" value="50"></cds-progress-bar>
    `);
    const bar = el.shadowRoot.querySelector('.cds--progress-bar__bar');

    expect(el._bar).to.exist;
    expect(el._bar).to.equal(bar);
    expect(bar.style.transform).to.equal('scaleX(0.25)');

    el.value = 100;
    await el.updateComplete;
    expect(bar.style.transform).to.equal('scaleX(0.5)');

    el.status = 'finished';
    await el.updateComplete;
    expect(bar.style.transform).to.equal('none');
  });
});
