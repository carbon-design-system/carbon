/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, describe, it, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './index';
import { prefix } from '../../globals/settings';
vi.mock('./_story-assets/headshot.jpg', () => 'mock-image-path');

const blockClass = `${prefix}--user-avatar`;

const defaultProps = {
  tooltipText: 'TW, Thomas J. Watson user profile',
  name: 'Thomas J. Watson',
  backgroundColor: 'order-1-cyan',
} as any;

const template = (props = defaultProps) => html`
  <c4p-user-avatar
    tooltip-text=${props.tooltipText}
    name=${props.name}
    background-color=${props.backgroundColor}
    size=${props.size}
    image=${props.image}
    imageDescription=${props.imageDescription}
  >
  </c4p-user-avatar>
`;

const iconTemplate = (props = defaultProps) => html`
  <c4p-user-avatar
    tooltip-text=${props.tooltipText}
    name=${props.name}
    background-color=${props.backgroundColor}
    size=${props.size}
    image=${props.image}
    imageDescription=${props.imageDescription}
  >
    <svg slot="rendericon" data-test-id="mock-icon" viewBox="0 0 32 32">
      <circle cx="16" cy="10" r="6"></circle>
      <path d="M16 18C10 18 4 22 4 26V28H28V26C28 22 22 18 16 18Z"></path>
    </svg>
  </c4p-user-avatar>
`;

describe('c4p-user-avatar', () => {
  it('should render a user avatar', async () => {
    const userAvatar = await fixture(template({ ...defaultProps }));
    expect(userAvatar).toBeDefined();
  });

  it('should return a circle with background color', async () => {
    const userAvatar = await fixture(template({ ...defaultProps }));
    expect(userAvatar).toBeDefined();
    expect(userAvatar.getAttribute('background-color')).toBe('order-1-cyan');
    const bgClass = userAvatar?.shadowRoot?.querySelectorAll(
      `.${blockClass}--order-1-cyan`
    )?.[0];
    expect(bgClass).toBeDefined();
  });

  it('should return a circle with updated background color', async () => {
    const userAvatar = await fixture(
      template({ ...defaultProps, backgroundColor: 'order-3-green' })
    );
    expect(userAvatar).toBeDefined();
    expect(userAvatar.getAttribute('background-color')).toBe('order-3-green');
    const bgClass = userAvatar?.shadowRoot?.querySelectorAll(
      `.${blockClass}--order-3-green`
    )?.[0];
    expect(bgClass).toBeDefined();
  });

  it('applies className to the containing node', async () => {
    const customClass = 'test';
    const userAvatar = await fixture(template({ ...defaultProps }));
    userAvatar.classList.add(customClass);
    expect(userAvatar.getAttribute('class')).to.include(customClass);
  });

  it('should return appropriately size circle based on size prop', async () => {
    const userAvatar = await fixture(template({ ...defaultProps, size: 'md' }));
    const hasSizeClass = userAvatar?.shadowRoot?.querySelectorAll(
      `.${blockClass}--md`
    )?.[0];
    // expect the element is present
    expect(hasSizeClass).toBeDefined();
  });

  it('should render the initials when passed the name prop', async () => {
    const userAvatar = await fixture(template({ ...defaultProps }));

    const initials = userAvatar?.shadowRoot?.querySelectorAll(
      `.${blockClass}`
    )?.[0];
    expect(initials).to.exist;
    expect(initials?.textContent).to.equal('TW');
  });

  it('should render the initials when simply passing two names to the name prop', async () => {
    const userAvatar = await fixture(template({ ...defaultProps, name: 'DN' }));
    const initials = userAvatar?.shadowRoot?.querySelectorAll(
      `.${blockClass}`
    )?.[0];
    expect(initials).to.exist;
    expect(initials?.textContent).to.equal('DN');
  });

  it('should render a tooltip if the tooltipText is supplied', async () => {
    const userAvatar = await fixture(template({ ...defaultProps }));
    const tooltipElement = userAvatar?.shadowRoot?.querySelectorAll(
      `.${blockClass}__tooltip`
    )?.[0];
    expect(tooltipElement).to.exist;
  });

  it('should render a tooltip if the tooltipText is supplied', async () => {
    const userAvatar = await fixture(
      template({ ...defaultProps, tooltipText: '' })
    );
    const tooltipElement = userAvatar?.shadowRoot?.querySelectorAll(
      `${blockClass}__tooltip`
    )?.[0];
    expect(tooltipElement).to.not.exist;
  });

  it('should return an icon for the avatar image', async () => {
    const userAvatar = await fixture(
      iconTemplate({ ...defaultProps, size: 'md' })
    );
    const renderedSVG = userAvatar?.shadowRoot?.querySelector(
      'slot[name="rendericon"]'
    ) as HTMLSlotElement;
    expect(renderedSVG).to.exist;
    const assignedNodes = renderedSVG.assignedNodes({ flatten: true });
    const svg = assignedNodes.find(
      (node) => node.nodeName.toLowerCase() === 'svg'
    ) as SVGElement;
    expect(svg).to.exist;
  });

  it('should render image for the avatar image', async () => {
    const userAvatar = await fixture(
      template({
        ...defaultProps,
        image: 'mock-image-path',
        imageDescription: 'test alt text',
      })
    );
    const imagePath = userAvatar?.shadowRoot
      ?.querySelector('img')
      ?.getAttribute('src');
    expect(typeof imagePath).toBe('string');
  });
});
