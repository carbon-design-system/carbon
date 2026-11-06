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

  it('should not report aria-busy when status is error', async () => {
    const el = await fixture(html`
      <cds-progress-bar value="50" status="error"></cds-progress-bar>
    `);
    const track = el.shadowRoot.querySelector('[role="progressbar"]');

    expect(track.getAttribute('aria-invalid')).to.equal('true');
    expect(track.getAttribute('aria-busy')).to.equal('false');
  });
});
