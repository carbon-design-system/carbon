/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixture, html, expect } from '@open-wc/testing';
import '@carbon/web-components/es/components/user-avatar/index.js';

const prefix = 'cds';
const blockClass = `${prefix}--user-avatar`;

const defaultProps = {
  tooltipText: 'TW, Thomas J. Watson user profile',
  name: 'Thomas J. Watson',
  backgroundColor: 'order-1-cyan',
};

const template = (props = defaultProps) => html`
  <cds-user-avatar
    tooltip-text=${props.tooltipText}
    name=${props.name}
    background-color=${props.backgroundColor}
    size=${props.size}
    image=${props.image}
    image-description=${props.imageDescription}>
  </cds-user-avatar>
`;

const iconTemplate = (props = defaultProps) => html`
  <cds-user-avatar
    tooltip-text=${props.tooltipText}
    name=${props.name}
    background-color=${props.backgroundColor}
    size=${props.size}>
    <svg slot="rendericon" data-test-id="mock-icon" viewBox="0 0 32 32">
      <circle cx="16" cy="10" r="6"></circle>
      <path d="M16 18C10 18 4 22 4 26V28H28V26C28 22 22 18 16 18Z"></path>
    </svg>
  </cds-user-avatar>
`;

describe('cds-user-avatar', () => {
  it('should render a user avatar', async () => {
    const el = await fixture(template({ ...defaultProps }));
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-user-avatar');
  });

  it('should return a circle with background color', async () => {
    const el = await fixture(template({ ...defaultProps }));
    expect(el.getAttribute('background-color')).to.equal('order-1-cyan');
    const bgClass = el.shadowRoot?.querySelector(
      `.${blockClass}--order-1-cyan`
    );
    expect(bgClass).to.exist;
  });

  it('should return a circle with updated background color', async () => {
    const el = await fixture(
      template({ ...defaultProps, backgroundColor: 'order-3-green' })
    );
    expect(el.getAttribute('background-color')).to.equal('order-3-green');
    const bgClass = el.shadowRoot?.querySelector(
      `.${blockClass}--order-3-green`
    );
    expect(bgClass).to.exist;
  });

  it('applies className to the containing node', async () => {
    const el = await fixture(template({ ...defaultProps }));
    el.classList.add('test');
    expect(el.getAttribute('class')).to.include('test');
  });

  it('should return appropriately sized circle based on size prop', async () => {
    const el = await fixture(template({ ...defaultProps, size: 'md' }));
    const hasSizeClass = el.shadowRoot?.querySelector(`.${blockClass}--md`);
    expect(hasSizeClass).to.exist;
  });

  it('should render the initials when passed the name prop', async () => {
    const el = await fixture(template({ ...defaultProps }));
    await el.updateComplete;
    const initials = el.shadowRoot?.querySelector(`.${blockClass}`);
    expect(initials).to.exist;
    expect(initials?.textContent?.trim()).to.equal('TW');
  });

  it('should render the initials when simply passing two characters to the name prop', async () => {
    const el = await fixture(template({ ...defaultProps, name: 'DN' }));
    await el.updateComplete;
    const initials = el.shadowRoot?.querySelector(`.${blockClass}`);
    expect(initials).to.exist;
    expect(initials?.textContent?.trim()).to.equal('DN');
  });

  it('should render a tooltip when tooltipText is supplied', async () => {
    const el = await fixture(template({ ...defaultProps }));
    await el.updateComplete;
    const tooltipElement = el.shadowRoot?.querySelector(
      `.${blockClass}__tooltip`
    );
    expect(tooltipElement).to.exist;
  });

  it('should not render a tooltip when tooltipText is empty', async () => {
    const el = await fixture(template({ ...defaultProps, tooltipText: '' }));
    await el.updateComplete;
    const tooltipElement = el.shadowRoot?.querySelector(
      `.${blockClass}__tooltip`
    );
    expect(tooltipElement).to.be.null;
  });

  it('should render a slot for a custom icon', async () => {
    const el = await fixture(iconTemplate({ ...defaultProps, size: 'md' }));
    await el.updateComplete;
    const renderedSlot = el.shadowRoot?.querySelector(
      'slot[name="rendericon"]'
    );
    expect(renderedSlot).to.exist;
    const assignedNodes = renderedSlot.assignedNodes({ flatten: true });
    const svg = assignedNodes.find(
      (node) => node.nodeName.toLowerCase() === 'svg'
    );
    expect(svg).to.exist;
  });

  it('should render image for the avatar image', async () => {
    const el = await fixture(
      template({
        ...defaultProps,
        image: 'mock-image-path',
        imageDescription: 'test alt text',
      })
    );
    await el.updateComplete;
    const imagePath = el.shadowRoot?.querySelector('img')?.getAttribute('src');
    expect(typeof imagePath).to.equal('string');
  });
});
