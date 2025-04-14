/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import '@carbon/web-components/es/components/copy-button/index.js';

describe('cds-copy-button', function () {
  const iconDescription = 'Copy to clipboard';

  it('should add extra classes via button-class-name', async () => {
    const el = await fixture(html`
      <cds-copy-button
        button-class-name="extra-class"
        icon-description="${iconDescription}"></cds-copy-button>
    `);

    // Get the button element inside the shadow DOM of cds-copy
    const button = el.shadowRoot
      ?.querySelector('cds-copy')
      ?.shadowRoot?.querySelector('button');
    expect(button).to.have.class('extra-class');
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('should disable the button when disabled prop is set', async () => {
    const el = await fixture(html`
      <cds-copy-button
        disabled
        icon-description="${iconDescription}"></cds-copy-button>
    `);

    const button = el.shadowRoot
      ?.querySelector('cds-copy')
      ?.shadowRoot?.querySelector('button');
    // Check if the button has the 'disabled' attribute after the prop is set
    expect(button).to.have.attribute('disabled');
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('should trigger click handler on button click', async () => {
    let clicked = false;
    const el = await fixture(html`
      <cds-copy-button
        icon-description="${iconDescription}"
        @click=${() => {
          clicked = true;
        }}></cds-copy-button>
    `);

    const button = el.shadowRoot
      ?.querySelector('cds-copy')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    expect(clicked).to.be.true;
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('should show feedback for a limited time', async () => {
    const el = await fixture(html`
      <cds-copy-button
        feedback="Copied!"
        feedback-timeout="500"></cds-copy-button>
    `);

    const copy = el.shadowRoot.querySelector('cds-copy');
    await el.updateComplete;
    await copy.updateComplete;

    const button = copy.shadowRoot.querySelector('button');
    button.click();

    // Wait for the feedback tooltip to appear after the button is clicked
    await waitUntil(() => {
      const tooltip = copy.shadowRoot.querySelector('cds-tooltip-content');
      return tooltip?.textContent?.trim() === 'Copied!';
    }, 'Expected feedback tooltip to appear');

    await waitUntil(
      () => {
        const tooltip = copy.shadowRoot.querySelector('cds-tooltip-content');
        return tooltip?.textContent?.trim() !== 'Copied!';
      },
      'Expected feedback tooltip to disappear',
      { timeout: 3000 }
    );

    expect(el).shadowDom.to.equalSnapshot();
  });

  it('should render custom feedback message and clear it after timeout', async () => {
    const customFeedback = 'Custom feedback message';
    const el = await fixture(html`
      <cds-copy-button
        feedback="${customFeedback}"
        feedback-timeout="200"></cds-copy-button>
    `);

    const copyComponent = el.shadowRoot?.querySelector('cds-copy');
    await el.updateComplete;
    await copyComponent?.updateComplete;

    const button = copyComponent?.shadowRoot?.querySelector('button');
    button?.click();

    // Wait for the custom feedback message to appear
    await waitUntil(() => {
      const tooltip = copyComponent?.shadowRoot?.querySelector(
        'cds-tooltip-content'
      );
      return tooltip?.textContent?.trim() === customFeedback;
    }, 'Expected custom feedback to show');

    const tooltipContent = copyComponent?.shadowRoot?.querySelector(
      'cds-tooltip-content'
    );
    expect(tooltipContent?.textContent?.trim()).to.equal(customFeedback);

    await waitUntil(
      () => {
        const tooltip = copyComponent?.shadowRoot?.querySelector(
          'cds-tooltip-content'
        );
        return tooltip?.textContent?.trim() !== customFeedback;
      },
      'Expected custom feedback to disappear',
      { timeout: 3000 }
    );

    const tooltipAfter = copyComponent?.shadowRoot?.querySelector(
      'cds-tooltip-content'
    );
    expect(tooltipAfter?.textContent?.trim()).to.not.equal(customFeedback);

    expect(el).shadowDom.to.equalSnapshot();
  });

  it('should respect custom feedback-timeout prop', async () => {
    const customTimeout = 100;
    const el = await fixture(html`
      <cds-copy-button feedback-timeout="${customTimeout}"></cds-copy-button>
    `);

    const copyComponent = el.shadowRoot?.querySelector('cds-copy');
    await el.updateComplete;
    await copyComponent?.updateComplete;

    const button = copyComponent?.shadowRoot?.querySelector('button');
    button?.click();

    // Wait for the feedback to appear within the custom timeout
    await waitUntil(
      () => {
        const tooltip = copyComponent?.shadowRoot?.querySelector(
          'cds-tooltip-content'
        );
        return tooltip?.textContent?.trim() !== '';
      },
      'Expected feedback to appear',
      {
        timeout: customTimeout + 100,
      }
    );

    await waitUntil(
      () => {
        const tooltip = copyComponent?.shadowRoot?.querySelector(
          'cds-tooltip-content'
        );
        return tooltip?.textContent?.trim() === '';
      },
      `Expected feedback to disappear after ${customTimeout}ms`,
      {
        timeout: customTimeout + 300,
      }
    );

    expect(el).shadowDom.to.equalSnapshot();
  });
});
