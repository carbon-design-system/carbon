/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/data-table/index.js';
import '@carbon/web-components/es/components/multi-select/index.js';
import '@carbon/web-components/es/components/overflow-menu/index.js';
import '@carbon/web-components/es/components/tag/index.js';

describe('cds-table-toolbar-content', () => {
  it('should set tabindex when batch actions are active', async () => {
    const el = await fixture(html`
      <cds-table-toolbar-content has-batch-actions>
        <cds-button></cds-button>
      </cds-table-toolbar-content>
    `);

    await el.updateComplete;

    expect(el.getAttribute('tabindex')).to.equal('-1');
  });

  it('should propagate normalized size to children', async () => {
    const el = await fixture(html`
      <cds-table-toolbar-content size="xl">
        <cds-button></cds-button>
      </cds-table-toolbar-content>
    `);

    await el.updateComplete;

    const button = el.querySelector('cds-button');
    expect(button?.getAttribute('size')).to.equal('lg');
  });

  it('should propagate `xs` size to children without normalizing to `sm`', async () => {
    const el = await fixture(html`
      <cds-table-toolbar-content size="xs">
        <cds-button></cds-button>
      </cds-table-toolbar-content>
    `);

    await el.updateComplete;

    const button = el.querySelector('cds-button');
    expect(button?.getAttribute('size')).to.equal('xs');
  });

  ['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
    it(`should preserve tag and multi-select sizes in a ${size} toolbar`, async () => {
      const el = await fixture(html`
        <cds-table-toolbar size=${size}>
          <cds-table-toolbar-content>
            <cds-tag size="sm">Small tag</cds-tag>
            <cds-tag>Default tag</cds-tag>
            <cds-tag size="lg">Large tag</cds-tag>
            <cds-multi-select size="sm">
              <cds-multi-select-item value="one" selected>
                Option 1
              </cds-multi-select-item>
            </cds-multi-select>
          </cds-table-toolbar-content>
        </cds-table-toolbar>
      `);
      const content = el.querySelector('cds-table-toolbar-content');
      const tags = [...el.querySelectorAll('cds-tag')];
      const multiSelect = el.querySelector('cds-multi-select');
      await content.updateComplete;
      await Promise.all(tags.map((tag) => tag.updateComplete));
      await multiSelect.updateComplete;

      expect(tags.map((tag) => tag.size)).to.deep.equal(['sm', 'md', 'lg']);
      expect(
        tags.map((tag) => tag.getBoundingClientRect().height)
      ).to.deep.equal([18, 24, 32]);
      expect(multiSelect.size).to.equal('sm');
      expect(
        multiSelect.shadowRoot
          .querySelector('.cds--tag')
          .getBoundingClientRect().height
      ).to.equal(18);

      el.size = size === 'xs' ? 'xl' : 'xs';
      await el.updateComplete;
      await content.updateComplete;

      expect(tags.map((tag) => tag.size)).to.deep.equal(['sm', 'md', 'lg']);
      expect(
        tags.map((tag) => tag.getBoundingClientRect().height)
      ).to.deep.equal([18, 24, 32]);
      expect(multiSelect.size).to.equal('sm');
    });
  });

  it('should resize toolbar actions after they reflect their default sizes', async () => {
    const el = await fixture(html`
      <cds-table-toolbar-content>
        <cds-button>Button</cds-button>
        <cds-table-toolbar-search></cds-table-toolbar-search>
        <cds-overflow-menu></cds-overflow-menu>
      </cds-table-toolbar-content>
    `);
    const actions = [...el.children];
    await Promise.all(actions.map((action) => action.updateComplete));
    expect(el.querySelector('cds-button').size).to.equal('lg');

    for (const [size, expectedSize] of [
      ['xs', 'xs'],
      ['md', 'lg'],
      ['sm', 'sm'],
      ['xl', 'lg'],
    ]) {
      el.size = size;
      await el.updateComplete;
      await Promise.all(actions.map((action) => action.updateComplete));

      actions.forEach((action) => {
        expect(action.getAttribute('size')).to.equal(expectedSize);
      });
    }
  });
});
