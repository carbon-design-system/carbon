/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/grid/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-grid', () => {
  it('should support a custom className on the outermost element', async () => {
    const el = await fixture(html`
      <cds-grid class="custom-class"></cds-grid>
    `);
    expect(el).to.have.class('custom-class');
  });

  it('should render children that are given', async () => {
    const el = await fixture(html`
      <cds-grid>
        <span id="test">Test</span>
      </cds-grid>
    `);
    const testNode = el.querySelector('#test');
    expect(testNode).to.exist;
  });

  it('should support setting the condensed attribute', async () => {
    const el = await fixture(html`<cds-grid condensed></cds-grid>`);
    expect(el).to.have.attribute('condensed');
    expect(el.condensed).to.be.true;
  });

  it('should support setting the full-width attribute', async () => {
    const el = await fixture(html`<cds-grid full-width></cds-grid>`);
    expect(el).to.have.attribute('full-width');
    expect(el.fullWidth).to.be.true;
  });

  it('should support setting the narrow attribute', async () => {
    const el = await fixture(html`<cds-grid narrow></cds-grid>`);
    expect(el).to.have.attribute('narrow');
    expect(el.narrow).to.be.true;
  });

  it('should support setting the align attribute as start', async () => {
    const el = await fixture(html`<cds-grid align="start"></cds-grid>`);
    expect(el).to.have.attribute('align', 'start');
    expect(el.align).to.equal('start');
  });

  it('should support setting the align attribute as end', async () => {
    const el = await fixture(html`<cds-grid align="end"></cds-grid>`);
    expect(el).to.have.attribute('align', 'end');
    expect(el.align).to.equal('end');
  });

  it('should support setting the with-row-gap attribute', async () => {
    const el = await fixture(html`<cds-grid with-row-gap></cds-grid>`);
    expect(el).to.have.attribute('with-row-gap');
    expect(el.withRowGap).to.be.true;
  });

  it('should not set the with-row-gap attribute when withRowGap is false', async () => {
    const el = await fixture(html`<cds-grid></cds-grid>`);
    el.withRowGap = false;
    await el.updateComplete;
    expect(el).to.not.have.attribute('with-row-gap');
    expect(el.withRowGap).to.be.false;
  });

  it('should not set the with-row-gap attribute when withRowGap is not set', async () => {
    const el = await fixture(html`<cds-grid></cds-grid>`);
    expect(el).to.not.have.attribute('with-row-gap');
    expect(el.withRowGap).to.be.false;
  });

  it('should support setting the with-row-gap attribute on subgrid', async () => {
    const el = await fixture(html`
      <cds-grid>
        <cds-grid with-row-gap></cds-grid>
      </cds-grid>
    `);
    const subgrid = el.querySelector(':scope > cds-grid');
    expect(subgrid).to.have.attribute('with-row-gap');
    expect(subgrid.withRowGap).to.be.true;
  });
});
