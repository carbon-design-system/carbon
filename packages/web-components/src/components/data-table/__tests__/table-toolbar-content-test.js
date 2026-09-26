/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

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

  it('should preserve an explicitly set child size', async () => {
    const el = await fixture(html`
      <cds-table-toolbar-content size="xl">
        <cds-tag size="sm">Tag</cds-tag>
        <cds-multi-select size="sm"></cds-multi-select>
      </cds-table-toolbar-content>
    `);

    await el.updateComplete;

    const tag = el.querySelector('cds-tag');
    const multiSelect = el.querySelector('cds-multi-select');

    expect(tag?.getAttribute('size')).to.equal('sm');
    expect(multiSelect?.getAttribute('size')).to.equal('sm');
  });

  it('should update sizes previously set by the toolbar', async () => {
    const el = await fixture(html`
      <cds-table-toolbar-content size="xl">
        <cds-button></cds-button>
      </cds-table-toolbar-content>
    `);

    await el.updateComplete;

    const button = el.querySelector('cds-button');
    expect(button?.getAttribute('size')).to.equal('lg');

    el.setAttribute('size', 'xs');
    await el.updateComplete;

    expect(button?.getAttribute('size')).to.equal('xs');
  });
});
