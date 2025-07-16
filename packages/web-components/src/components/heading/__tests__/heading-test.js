/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/heading/index.js';

describe('cds-heading', function () {
  it('should begin with an <h1> tag', async () => {
    const el = await fixture(html`<cds-heading>test</cds-heading>`);
    await expect(el).dom.to.equalSnapshot();

    expect(el.tagName.toLowerCase()).to.equal('cds-heading');
    expect(el.shadowRoot.querySelector('h1')).to.exist;
  });

  it('should increment heading levels as you nest sections', async () => {
    const el = await fixture(
      html`<div>
        <cds-heading>h1</cds-heading
        ><cds-section>
          <cds-heading>h2</cds-heading>
          <cds-section>
            <cds-heading>h3</cds-heading>
            <cds-section>
              <cds-heading>h4</cds-heading>
              <cds-section>
                <cds-heading>h5</cds-heading>
                <cds-section>
                  <cds-heading>h6</cds-heading>
                </cds-section>
              </cds-section>
            </cds-section>
          </cds-section>
        </cds-section>
      </div>`
    );
    await expect(el).dom.to.equalSnapshot();

    const levels = [1, 2, 3, 4, 5, 6];
    const headings = el.querySelectorAll('cds-heading');

    headings.forEach((heading, index) => {
      const level = levels[index];
      expect(heading.shadowRoot.querySelector(`h${level}`)).to.exist;
    });
  });

  it('should override heading levels when specifying the level of a section', async () => {
    const el = await fixture(
      html`<div>
        <cds-heading>h1</cds-heading>
        <cds-section level="4">
          <cds-heading>h4</cds-heading>
          <cds-section>
            <cds-heading>h5</cds-heading>
            <cds-section level="2">
              <cds-heading>h2</cds-heading>
            </cds-section>
          </cds-section>
        </cds-section>
      </div>`
    );
    await expect(el).dom.to.equalSnapshot();

    const levels = [1, 4, 5, 2];
    const headings = el.querySelectorAll('cds-heading');

    headings.forEach((heading, index) => {
      const level = levels[index];
      expect(heading.shadowRoot.querySelector(`h${level}`)).to.exist;
    });
  });

  it('should stop increment heading levels past level 6', async () => {
    const el = await fixture(
      html`<div>
        <cds-heading>h1</cds-heading
        ><cds-section>
          <cds-heading>h2</cds-heading>
          <cds-section>
            <cds-heading>h3</cds-heading>
            <cds-section>
              <cds-heading>h4</cds-heading>
              <cds-section>
                <cds-heading>h5</cds-heading>
                <cds-section>
                  <cds-heading>h6</cds-heading>
                  <cds-section>
                    <cds-heading data-testid="max">max</cds-heading>
                  </cds-section>
                </cds-section>
              </cds-section>
            </cds-section>
          </cds-section>
        </cds-section>
      </div>`
    );
    await expect(el).dom.to.equalSnapshot();

    const maxHeading = el.querySelector('[data-testid="max"]');

    expect(maxHeading.shadowRoot.querySelector('h6')).to.exist;
  });

  describe('Component API', () => {
    it('should pass through all attributes for <cds-section>', async () => {
      const el = await fixture(html`
        <cds-section data-testid="test">test</cds-section>
      `);
      await expect(el).dom.to.equalSnapshot();
      expect(el.getAttribute('data-testid')).to.equal('test');
    });

    // TODO: cds-section `as` attribute is not yet available
    xit('should use the `as` attribute to change the element in <cds-section>', async () => {
      const el = await fixture(html`
        <cds-section as="article">test</cds-section>
      `);
      expect(el.shadowRoot.querySelector('article')).to.exist;
    });

    it('should pass through all attributes for <cds-heading>', async () => {
      const el = await fixture(html`
        <cds-heading data-testid="test">test</cds-heading>
      `);
      await expect(el).dom.to.equalSnapshot();
      expect(el.getAttribute('data-testid')).to.equal('test');
    });
  });
});
