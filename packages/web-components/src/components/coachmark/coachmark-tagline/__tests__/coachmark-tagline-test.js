/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/coachmark/coachmark-tagline/index.js';
import { prefix } from '@carbon/web-components/es/globals/settings.js';

const blockClass = `${prefix}--coachmark-tagline`;

const defaultProps = {
  title: 'This is a tagline',
  closeIconDescription: 'Close',
  open: false,
};

const template = (props = defaultProps) => html`
  <cds-coachmark-tagline
    title=${props.title}
    close-icon-description=${props.closeIconDescription}
    ?open=${props.open}></cds-coachmark-tagline>
`;

describe('cds-coachmark-tagline', () => {
  it('should render a tagline', async () => {
    const tagline = await fixture(template({ ...defaultProps }));
    expect(tagline).to.exist;
    expect(tagline.tagName.toLowerCase()).to.equal('cds-coachmark-tagline');
  });

  it('renders with correct title', async () => {
    const el = await fixture(template({ ...defaultProps }));
    expect(el.title).to.equal('This is a tagline');
    const titleElement = el.shadowRoot?.querySelector(`.${blockClass}__cta`);
    expect(titleElement).to.exist;
    expect(titleElement.textContent).to.include('This is a tagline');
  });

  it('has correct host classes', async () => {
    const el = await fixture(template({ ...defaultProps }));
    expect(el.classList.contains(blockClass)).to.be.true;
  });

  it('applies className to the containing node', async () => {
    const tagline = await fixture(template({ ...defaultProps }));
    tagline.classList.add('test');
    expect(tagline.getAttribute('class')).to.include('test');
  });

  it('should render idea icon', async () => {
    const tagline = await fixture(template({ ...defaultProps }));
    const svg = tagline.shadowRoot?.querySelector('svg');
    expect(svg).to.exist;
  });

  it('should render close button', async () => {
    const tagline = await fixture(template({ ...defaultProps }));
    const closeButton = tagline.shadowRoot?.querySelector(
      `.${blockClass}--close-btn`
    );
    expect(closeButton).to.exist;
  });

  it('dispatches close event when close button is clicked', async () => {
    const el = await fixture(template({ ...defaultProps }));
    const closeButton = el.shadowRoot?.querySelector(
      `.${blockClass}--close-btn`
    );
    expect(closeButton).to.exist;

    const eventPromise = oneEvent(el, 'cds-coachmark-tagline-close');
    closeButton.click();

    const event = await eventPromise;
    expect(event).to.exist;
  });

  it('dispatches cta-click event when CTA button is clicked', async () => {
    const el = await fixture(template({ ...defaultProps }));
    const ctaButton = el.shadowRoot?.querySelector(`.${blockClass}__cta`);
    expect(ctaButton).to.exist;

    const eventPromise = oneEvent(el, 'cds-coachmark-tagline-cta-click');
    ctaButton.click();

    const event = await eventPromise;
    expect(event).to.exist;
    expect(event.detail.originalEvent).to.exist;
  });

  it('reflects open attribute when open is true', async () => {
    const el = await fixture(template({ ...defaultProps, open: true }));
    await el.updateComplete;

    expect(el.hasAttribute('open')).to.be.true;
    expect(el.open).to.be.true;
  });

  it('applies is-open class when isOpen is true', async () => {
    const el = await fixture(template({ ...defaultProps }));
    el.open = true;
    await el.updateComplete;

    expect(el.classList.contains(`${blockClass}--open`)).to.be.true;
  });

  it('sets correct aria-expanded attribute on CTA button', async () => {
    const el = await fixture(template({ ...defaultProps }));
    const ctaButton = el.shadowRoot?.querySelector(`.${blockClass}__cta`);
    expect(ctaButton).to.exist;

    const eventPromise = oneEvent(el, 'cds-coachmark-tagline-cta-click');
    ctaButton.click();
    await eventPromise;
    expect(el.open).to.be.false;
  });

  it('updates open property', async () => {
    const el = await fixture(template({ ...defaultProps }));
    expect(el.open).to.be.false;

    el.open = true;
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('dispatches cta-dblclick event when CTA button is double-clicked', async () => {
    const el = await fixture(template({ ...defaultProps }));
    const ctaButton = el.shadowRoot?.querySelector(`.${blockClass}__cta`);
    expect(ctaButton).to.exist;

    const eventPromise = oneEvent(el, 'cds-coachmark-tagline-cta-dblclick');
    ctaButton.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

    const event = await eventPromise;
    expect(event).to.exist;
    expect(event.detail.originalEvent).to.exist;
  });

  it('updates closeIconDescription property', async () => {
    const el = await fixture(template({ ...defaultProps }));
    expect(el.closeIconDescription).to.equal('Close');

    el.closeIconDescription = 'Close dialog';
    await el.updateComplete;

    expect(el.closeIconDescription).to.equal('Close dialog');
  });

  it('updates title property', async () => {
    const el = await fixture(template({ ...defaultProps }));
    const newTitle = 'Updated title';
    el.title = newTitle;
    await el.updateComplete;

    expect(el.title).to.equal(newTitle);
    const ctaButton = el.shadowRoot?.querySelector(`.${blockClass}__cta`);
    expect(ctaButton.textContent).to.include(newTitle);
  });
});
