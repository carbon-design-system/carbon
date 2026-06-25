/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, describe, it } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './index';
import { prefix } from '../../../globals/settings';
import CDSCoachmarkBeacon from './coachmark-beacon';

const blockClass = `${prefix}--coachmark-beacon`;

const defaultProps = {
  label: 'show information',
  id: 'coachmarkBeacon',
} as any;

const template = (props = defaultProps) => html`
  <c4p-coachmark-beacon
    label=${props.label}
    @c4p-coachmark-beacon-clicked=${(e: CustomEvent) => {
      console.log('Beacon clicked!', e.detail.expanded);
    }}
  >
  </c4p-coachmark-beacon>
`;

describe('c4p-coachmark-beacon', () => {
  it('should render a beacon', async () => {
    const beacon = await fixture(template({ ...defaultProps }));
    expect(beacon).toBeDefined();
  });

  it('has correct host classes', async () => {
    const el = await fixture(template({ ...defaultProps }));

    expect(el.classList.contains(blockClass)).to.be.true;
    expect(el.classList.contains(`${blockClass}-default`)).to.be.true;
  });

  it('applies className to the containing node', async () => {
    const customClass = 'test';
    const beacon = await fixture(template({ ...defaultProps }));
    beacon.classList.add(customClass);
    expect(beacon.getAttribute('class')).to.include(customClass);
  });

  it('should render icon for the beacon', async () => {
    const beacon = await fixture(template({ ...defaultProps }));
    const renderedSVG = beacon?.shadowRoot?.querySelector(
      'slot[name="icon"]'
    ) as HTMLSlotElement;
    expect(renderedSVG).to.exist;
    const assignedNodes = renderedSVG.assignedNodes({ flatten: true });
    const svg = assignedNodes.find(
      (node) => node.nodeName.toLowerCase() === 'svg'
    ) as SVGElement;
    expect(svg).to.exist;
  });

  it('toggles expanded state and dispatches event on click', async () => {
    const el = (await fixture(
      template({ ...defaultProps })
    )) as CDSCoachmarkBeacon;

    const button = el.shadowRoot!.querySelector<HTMLElement>('cds-button')!;

    const eventPromise = oneEvent(el, 'c4p-coachmark-beacon-clicked');

    button.click();

    const event = await eventPromise;
    expect(event).to.exist;
    expect(event.detail.expanded).to.be.true;

    expect(el.hasAttribute('expanded')).to.be.true;

    expect(button.getAttribute('aria-expanded')).to.equal('true');

    // simulate an outside click
    document.body.click();

    await el.updateComplete;

    expect(el.hasAttribute('expanded')).to.be.false;
    expect(button.getAttribute('aria-expanded')).to.equal('false');
  });
});
