/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixture, html, expect } from '@open-wc/testing';
import '@carbon/web-components/es/components/tearsheet/index.js';

const prefix = 'cds';
const blockClass = `${prefix}--tearsheet`;

describe('cds-tearsheet', () => {
  it('renders', async () => {
    const el = await fixture(html`<cds-tearsheet></cds-tearsheet>`);
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-tearsheet');
  });

  it('reflects open attribute', async () => {
    const el = await fixture(html`<cds-tearsheet open></cds-tearsheet>`);
    expect(el.open).to.be.true;
  });

  it('reflects variant attribute', async () => {
    const el = await fixture(
      html`<cds-tearsheet variant="narrow"></cds-tearsheet>`
    );
    expect(el.variant).to.equal('narrow');
  });

  it('defaults to wide variant', async () => {
    const el = await fixture(html`<cds-tearsheet></cds-tearsheet>`);
    expect(el.variant).to.equal('wide');
  });
});

describe('cds-tearsheet-header', () => {
  it('renders', async () => {
    const el = await fixture(
      html`<cds-tearsheet-header></cds-tearsheet-header>`
    );
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-tearsheet-header');
  });
});

describe('cds-tearsheet-body', () => {
  it('renders', async () => {
    const el = await fixture(html`<cds-tearsheet-body></cds-tearsheet-body>`);
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-tearsheet-body');
  });
});

describe('cds-tearsheet-footer', () => {
  it('renders', async () => {
    const el = await fixture(
      html`<cds-tearsheet-footer></cds-tearsheet-footer>`
    );
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-tearsheet-footer');
  });
});

describe('cds-tearsheet-stack', () => {
  it('renders', async () => {
    const el = await fixture(html`<cds-tearsheet-stack></cds-tearsheet-stack>`);
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-tearsheet-stack');
  });
});
