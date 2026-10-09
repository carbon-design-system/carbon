/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/coachmark/coachmark-beacon/index.js';
import { prefix } from '@carbon/web-components/es/globals/settings.js';

const blockClass = `${prefix}--coachmark-beacon`;

const defaultProps = {
  label: 'show information',
  id: 'coachmarkBeacon',
};

const template = (props = defaultProps) => html`
  <cds-coachmark-beacon label=${props.label}></cds-coachmark-beacon>
`;

describe('cds-coachmark-beacon', () => {
  it('should render a beacon', async () => {
    const beacon = await fixture(template({ ...defaultProps }));
    expect(beacon).to.exist;
    expect(beacon.tagName.toLowerCase()).to.equal('cds-coachmark-beacon');
  });

  it('has correct host classes', async () => {
    const el = await fixture(template({ ...defaultProps }));
    expect(el.classList.contains(blockClass)).to.be.true;
    expect(el.classList.contains(`${blockClass}-default`)).to.be.true;
  });

  it('applies className to the containing node', async () => {
    const beacon = await fixture(template({ ...defaultProps }));
    beacon.classList.add('test');
    expect(beacon.getAttribute('class')).to.include('test');
  });

  it('should render icon slot for the beacon', async () => {
    const beacon = await fixture(template({ ...defaultProps }));
    const iconSlot = beacon.shadowRoot?.querySelector('slot[name="icon"]');
    expect(iconSlot).to.exist;
  });

  it('toggles expanded state and dispatches event on click', async () => {
    const el = await fixture(template({ ...defaultProps }));

    const button = el.shadowRoot?.querySelector('cds-button');
    expect(button).to.exist;

    const eventPromise = oneEvent(el, 'cds-coachmark-beacon-clicked');

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
