/**
 * @jest-environment jsdom
 */

import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import '@carbon/web-components/es/components/icon/index.js';
import Add16 from '@carbon/icons/es/add/16.js';

describe('cds-icon', function () {
  it('should render an empty icon', async function () {
    const el = await fixture(html`<cds-icon></cds-icon>`);

    // Should render a slot when no icon is provided
    expect(el.shadowRoot.children.length).to.equal(1);
    expect(el.shadowRoot.querySelector('slot')).to.exist;
  });

  it('should render a Carbon icon', async function () {
    const el = await fixture(html`<cds-icon .icon=${Add16}></cds-icon>`);

    const svg = el.shadowRoot.querySelector('svg');
    expect(svg).to.exist;
  });

  it('should render custom SVG content', async function () {
    const el = await fixture(html`
      <cds-icon>
        <svg width="16" height="16">
          <circle cx="8" cy="8" r="4" fill="currentColor" />
        </svg>
      </cds-icon>
    `);

    const svg = el.querySelector('svg');
    expect(svg).to.exist;
    expect(svg.querySelector('circle')).to.exist;
  });

  it('should apply custom classes', async function () {
    const el = await fixture(
      html`<cds-icon .icon=${Add16} class="custom-class"></cds-icon>`
    );

    const svg = el.shadowRoot.querySelector('svg');
    expect(svg.classList.contains('custom-class')).to.be.true;
  });
});
