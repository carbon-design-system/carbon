/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, describe, it } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './index';
import { prefix } from '../../../globals/settings';
import CDSCoachmarkTagline from './coachmark-tagline';

const blockClass = `${prefix}--coachmark-tagline`;

const defaultProps = {
  title: 'This is a tagline',
  closeIconDescription: 'Close',
  open: false,
} as any;

const template = (props = defaultProps) => html`
  <c4p-coachmark-tagline
    title=${props.title}
    close-icon-description=${props.closeIconDescription}
    ?open=${props.open}
  >
  </c4p-coachmark-tagline>
`;

describe('c4p-coachmark-tagline', () => {
  it('should render a tagline', async () => {
    const tagline = await fixture(template({ ...defaultProps }));
    expect(tagline).toBeDefined();
  });

  it('renders with correct title', async () => {
    const el = (await fixture(
      template({ ...defaultProps })
    )) as CDSCoachmarkTagline;

    expect(el.title).to.equal('This is a tagline');

    const titleElement = el.shadowRoot!.querySelector(`.${blockClass}__cta`);
    expect(titleElement).to.exist;
    expect(titleElement!.textContent).to.include('This is a tagline');
  });

  it('has correct host classes', async () => {
    const el = await fixture(template({ ...defaultProps }));

    expect(el.classList.contains(blockClass)).to.be.true;
  });

  it('applies className to the containing node', async () => {
    const customClass = 'test';
    const tagline = await fixture(template({ ...defaultProps }));
    tagline.classList.add(customClass);
    expect(tagline.getAttribute('class')).to.include(customClass);
  });

  it('should render idea icon', async () => {
    const tagline = await fixture(template({ ...defaultProps }));
    const svg = tagline?.shadowRoot?.querySelector('svg');
    expect(svg).to.exist;
  });

  it('should render close button', async () => {
    const tagline = await fixture(template({ ...defaultProps }));
    const closeButton = tagline?.shadowRoot?.querySelector(
      `.${blockClass}--close-btn`
    );
    expect(closeButton).to.exist;
  });

  it('dispatches close event when close button is clicked', async () => {
    const el = (await fixture(
      template({ ...defaultProps })
    )) as CDSCoachmarkTagline;

    const closeButton = el.shadowRoot!.querySelector<HTMLElement>(
      `.${blockClass}--close-btn`
    )!;

    const eventPromise = oneEvent(el, 'c4p-coachmark-tagline-close');

    closeButton.click();

    const event = await eventPromise;
    expect(event).to.exist;
  });

  it('dispatches cta-click event when CTA button is clicked', async () => {
    const el = (await fixture(
      template({ ...defaultProps })
    )) as CDSCoachmarkTagline;

    const ctaButton = el.shadowRoot!.querySelector<HTMLElement>(
      `.${blockClass}__cta`
    )!;

    const eventPromise = oneEvent(el, 'c4p-coachmark-tagline-cta-click');

    ctaButton.click();

    const event = await eventPromise;
    expect(event).to.exist;
    expect(event.detail.originalEvent).to.exist;
  });

  it('reflects open attribute when open is true', async () => {
    const el = (await fixture(
      template({ ...defaultProps, open: true })
    )) as CDSCoachmarkTagline;

    await el.updateComplete;

    expect(el.hasAttribute('open')).to.be.true;
    expect(el.open).to.be.true;
  });

  it('updates open property', async () => {
    const el = (await fixture(
      template({ ...defaultProps })
    )) as CDSCoachmarkTagline;

    expect(el.open).to.be.false;

    el.open = true;
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('dispatches cta-dblclick event when CTA button is double-clicked', async () => {
    const el = (await fixture(
      template({ ...defaultProps })
    )) as CDSCoachmarkTagline;

    const ctaButton = el.shadowRoot!.querySelector<HTMLElement>(
      `.${blockClass}__cta`
    )!;

    const eventPromise = oneEvent(el, 'c4p-coachmark-tagline-cta-dblclick');

    ctaButton.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

    const event = await eventPromise;
    expect(event).to.exist;
    expect(event.detail.originalEvent).to.exist;
  });

  it('updates closeIconDescription property', async () => {
    const el = (await fixture(
      template({ ...defaultProps })
    )) as CDSCoachmarkTagline;

    expect(el.closeIconDescription).to.equal('Close');

    el.closeIconDescription = 'Close dialog';
    await el.updateComplete;

    expect(el.closeIconDescription).to.equal('Close dialog');
  });

  it('updates title property', async () => {
    const el = (await fixture(
      template({ ...defaultProps })
    )) as CDSCoachmarkTagline;

    const newTitle = 'Updated title';
    el.title = newTitle;
    await el.updateComplete;

    expect(el.title).to.equal(newTitle);

    const ctaButton = el.shadowRoot!.querySelector(`.${blockClass}__cta`);
    expect(ctaButton!.textContent).to.include(newTitle);
  });
});
