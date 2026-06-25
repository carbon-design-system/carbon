/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { render, TemplateResult } from 'lit';
import './index';
import CDSAboutModal, { blockClass } from './about-modal';
import { carbonPrefix } from '../../globals/settings';

const logo = html`
  <img
    src="./_story-assets/example-logo.svg"
    alt="Example product or service logo"
    style="max-width: 6rem"
  />
`;
const additionalInfo = html`
  <p class="c4p__footer-label">Powered by</p>
  <img
    src="./_story-assets/ansible-logo.png"
    alt="Grafana"
    class="c4p__footer--tech-logo"
  />
  <img
    src="./_story-assets/ansible-logo.png"
    alt="Ansible"
    class="c4p__footer--tech-logo"
  />
  <img
    src="./_story-assets/js-logo.png"
    alt="JavaScript"
    class="c4p__footer--tech-logo"
  />
`;
const content = html`This Web site contains proprietary notices and copyright
information, the terms of which must be observed and followed. Please see the
tab entitled 'Copyright and trademark information' for related information. IBM
grants you a non-exclusive, non-transferable, limited permission to access and
display the Web pages within this site as a customer or potential customer of
IBM provided you comply with these Terms of Use, and all copyright, trademark,
and other proprietary notices remain intact.`;
const links: TemplateResult[] = [];
const index = 3;
for (let i = 0; i < index; i++) {
  const link = html`<cds-link href="#"> Link action </cds-link>`;
  links.push(link);
}
const defaultProps = {
  closeIconDescription: 'close',
  copyrightText: 'Copyright © IBM Corp. 2020, 2023',
  logo: logo,
  title: 'IBM Product name',
  version: 'Version 0.0.0',
  additionalInfo: additionalInfo,
  content: content,
  links: links,
};
const template = (props = defaultProps) => html`
  <c4p-about-modal
    open
    closeIconDescription=${props.closeIconDescription}
    copyrightText=${props.copyrightText}
    .logo=${props.logo}
    .title=${props.title}
    .version=${props.version}
    .additionalInfo=${props.additionalInfo}
    .content=${props.content}
    .links=${props.links}
    aria-label="label"
  >
  </c4p-about-modal>
`;

describe('c4p-about-modal', () => {
  it('should render about modal', async () => {
    const element = render(template(), document.body);
    expect(element).toBeDefined();
  });

  it('renders a title', async () => {
    const element: CDSAboutModal = await fixture(template());
    expect(element.title).toBe(defaultProps.title);
    const headingElement = element.shadowRoot?.querySelector(
      `${carbonPrefix}-modal-heading`
    );
    expect(headingElement).toBeTruthy();
    expect(headingElement?.shadowRoot).toBeTruthy();
    const slot = headingElement?.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
    const assignedNodes = slot?.assignedNodes({ flatten: true }) ?? [];
    const slottedText = assignedNodes
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent?.trim())
      .join('');
    expect(slottedText).toBe(defaultProps.title);
  });
  it('renders version', async () => {
    const element: CDSAboutModal = await fixture(template());
    expect(element.version).toBe(defaultProps.version);
    const modalBody = element.shadowRoot?.querySelector(
      `${carbonPrefix}-modal-body`
    );
    expect(modalBody).toBeTruthy();
    expect(modalBody?.shadowRoot).toBeTruthy();
    const slot = modalBody?.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
    const assignedElements = slot?.assignedElements({ flatten: true }) ?? [];
    const modalVersion = assignedElements
      .map((el) => el.querySelector(`.${blockClass}__version`))
      .find((el) => el !== null);
    expect(modalVersion).toBeTruthy();
    expect(modalVersion?.textContent?.trim()).toBe(defaultProps.version);
  });
  it('renders copyright text', async () => {
    const element: CDSAboutModal = await fixture(template());
    expect(element.copyrightText).toBe(defaultProps.copyrightText);
    const modalBody = element.shadowRoot?.querySelector(
      `${carbonPrefix}-modal-body`
    );
    expect(modalBody).toBeTruthy();
    expect(modalBody?.shadowRoot).toBeTruthy();
    const slot = modalBody?.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
    const assignedElements = slot?.assignedElements({ flatten: true }) ?? [];
    const modalCopyRight = assignedElements
      .map((el) => el.querySelector(`.${blockClass}__copyright-text`))
      .find((el) => el !== null);
    expect(modalCopyRight).toBeTruthy();
    expect(modalCopyRight?.textContent?.trim()).toBe(
      defaultProps.copyrightText
    );
  });
  it('renders links', async () => {
    const element: CDSAboutModal = await fixture(template());
    const modalBody = element.shadowRoot?.querySelector(
      `${carbonPrefix}-modal-body`
    );
    expect(modalBody).toBeTruthy();
    expect(modalBody?.shadowRoot).toBeTruthy();
    const slot = modalBody?.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
    const assignedElements = slot?.assignedElements({ flatten: true }) ?? [];
    if (element.links.length > 0) {
      const modalLinkContainer = assignedElements
        .map((el) => el.querySelector(`.${blockClass}__links-container`))
        .find((el) => el !== null);
      expect(modalLinkContainer).toBeTruthy();
      const links = modalLinkContainer?.querySelectorAll(
        `${carbonPrefix}-link`
      );
      expect(links?.length == element?.links.length).toBeTruthy();
    }
  });
  it('renders additional info', async () => {
    const element: CDSAboutModal = await fixture(template());
    if (element.additionalInfo) {
      const modalFooter = element.shadowRoot?.querySelector(
        `${carbonPrefix}-modal-footer`
      );
      expect(modalFooter).toBeTruthy();
    }
  });
  it('closes modal on clicking close button', async () => {
    const element: CDSAboutModal = await fixture(template());
    const modalClose = element.shadowRoot?.querySelector(
      `${carbonPrefix}-modal-close-button`
    );
    expect(modalClose).toBeTruthy();
    expect(element.open).toBe(true);
    (modalClose as HTMLElement)?.click();
    expect(element.open).toBe(false);
  });
  it('Scrollable body with overflowing content', async () => {
    const element: CDSAboutModal = await fixture(template());
    const container = element.shadowRoot?.querySelector(
      `${carbonPrefix}-modal-body`
    ) as HTMLElement;
    // Simulate overflow: content fits
    Object.defineProperty(container, 'scrollHeight', {
      value: 200,
      configurable: true,
    });
    Object.defineProperty(container, 'clientHeight', {
      value: 100,
      configurable: true,
    });
    // Manually call _checkOverflow to force the overflow check
    element['_checkOverflow']();
    await element.updateComplete;
    expect(
      container.classList.contains(`${carbonPrefix}--modal-scroll-content`)
    ).toBe(true);
  });
  it('No scrollable body if content fits', async () => {
    const element: CDSAboutModal = await fixture(template());
    const container = element.shadowRoot?.querySelector(
      `${carbonPrefix}-modal-body`
    ) as HTMLElement;
    // Simulate non-overflow: content fits
    Object.defineProperty(container, 'scrollHeight', {
      value: 100,
      configurable: true,
    });
    Object.defineProperty(container, 'clientHeight', {
      value: 200,
      configurable: true,
    });
    // Manually call _checkOverflow to force the overflow check
    element['_checkOverflow']();
    await element.updateComplete;

    expect(
      container.classList.contains('c4p--about-modal-scroll-content')
    ).toBe(false);
  });
});
