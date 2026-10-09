/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture } from '@open-wc/testing';
import '@carbon/web-components/es/components/feature-flags/index.js';
import '@carbon/web-components/es/components/popover/index.js';
import '@carbon/web-components/es/components/tooltip/index.js';
import '@carbon/web-components/es/components/toggle-tip/index.js';
import '@carbon/web-components/es/components/ai-label/index.js';
import '@carbon/web-components/es/components/slug/index.js';
import '@carbon/web-components/es/components/icon-button/index.js';
import '@carbon/web-components/es/components/copy-button/index.js';
import '@carbon/web-components/es/components/overflow-menu/index.js';
import '@carbon/web-components/es/components/dropdown/index.js';
import '@carbon/web-components/es/components/combo-box/index.js';
import '@carbon/web-components/es/components/multi-select/index.js';
import '@carbon/web-components/es/components/truncated-text/index.js';
import '@carbon/web-components/es/components/icon-indicator/index.js';
import '@carbon/web-components/es/components/shape-indicator/index.js';

/**
 * all components that resolve their auto-align default through `AutoAlignMixin`
 * must pass
 */
const TAGS = [
  {
    tag: 'cds-popover',
    children:
      '<button type="button">Trigger</button><cds-popover-content></cds-popover-content>',
  },
  {
    tag: 'cds-tooltip',
    children:
      '<button type="button">Trigger</button><cds-tooltip-content>Label</cds-tooltip-content>',
  },
  {
    tag: 'cds-definition-tooltip',
    children: '<span slot="definition">Definition</span>Term',
  },
  { tag: 'cds-toggletip', children: 'Label' },
  { tag: 'cds-ai-label' },
  { tag: 'cds-slug' },
  {
    tag: 'cds-icon-button',
    children: '<span slot="tooltip-content">Label</span>',
  },
  { tag: 'cds-copy-button', property: 'autoAlign' },
  { tag: 'cds-overflow-menu' },
  { tag: 'cds-dropdown' },
  { tag: 'cds-combo-box' },
  { tag: 'cds-multi-select' },
  { tag: 'cds-truncated-text', attributes: { value: 'Text' } },
  {
    tag: 'cds-icon-indicator',
    attributes: { kind: 'failed', label: 'Label' },
  },
  {
    tag: 'cds-shape-indicator',
    attributes: { kind: 'failed', label: 'Label' },
  },
];

const markup = ({ tag, attributes = {}, children = '' }, extra = '') => {
  const attrs = Object.entries(attributes)
    .map(([name, value]) => `${name}="${value}"`)
    .join(' ');
  return `<${tag} ${attrs} ${extra}>${children}</${tag}>`;
};

/**
 * Renders the element from markup, optionally inside a `<feature-flags>` scope
 * and with extra attributes on the element itself.
 */
const render = async (entry, { flag, attribute } = {}) => {
  const element = markup(entry, attribute);
  const root = await fixture(
    flag
      ? `<feature-flags ${flag}>${element}</feature-flags>`
      : `<div>${element}</div>`
  );
  const el = root.querySelector(entry.tag);
  await el.updateComplete;
  return el;
};

describe('AutoAlignMixin', () => {
  TAGS.forEach((entry) => {
    const { tag, property = 'autoalign' } = entry;

    describe(tag, () => {
      it('should default to false', async () => {
        const el = await render(entry);

        expect(el[property]).to.be.false;
        expect(el).to.not.have.attribute('autoalign');
      });

      it('should default to true with enable-v12-autoalign', async () => {
        const el = await render(entry, { flag: 'enable-v12-autoalign' });

        expect(el[property]).to.be.true;
      });

      it('should default to true with enable-v12-release', async () => {
        const el = await render(entry, { flag: 'enable-v12-release' });

        expect(el[property]).to.be.true;
      });

      it('should be enabled by the autoalign attribute', async () => {
        const el = await render(entry, { attribute: 'autoalign' });

        expect(el[property]).to.be.true;
      });

      it('should let the property opt out of the flag', async () => {
        const root = await fixture(
          '<feature-flags enable-v12-autoalign></feature-flags>'
        );
        const el = document.createElement(tag);
        Object.entries(entry.attributes ?? {}).forEach(([name, value]) => {
          el.setAttribute(name, value);
        });
        el.innerHTML = entry.children ?? '';
        el[property] = false;
        root.appendChild(el);
        await el.updateComplete;

        expect(el[property]).to.be.false;
        expect(el).to.not.have.attribute('autoalign');
      });

      it('should let autoalign="false" opt out of the flag', async () => {
        const el = await render(entry, {
          flag: 'enable-v12-autoalign',
          attribute: 'autoalign="false"',
        });

        expect(el[property]).to.be.false;
        // The attribute is dropped so that `[autoalign]` selectors stay accurate.
        expect(el).to.not.have.attribute('autoalign');
      });

      it('should turn off when autoalign="false" is set after connecting', async () => {
        const el = await render(entry, { flag: 'enable-v12-autoalign' });
        expect(el[property]).to.be.true;

        el.setAttribute('autoalign', 'false');
        await el.updateComplete;

        expect(el[property]).to.be.false;
        expect(el).to.not.have.attribute('autoalign');
      });

      it('should not keep autoalign="false" on an element that is already off', async () => {
        const el = await render(entry);

        el.setAttribute('autoalign', 'false');

        expect(el[property]).to.be.false;
        expect(el).to.not.have.attribute('autoalign');
      });
    });
  });
});
