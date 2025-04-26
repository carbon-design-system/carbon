/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/copy-button/index.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';

describe('CopyButton', () => {
  it('should set tabIndex if one is passed via props', async () => {
    const el = await fixture(html`
      <cds-copy-button tabindex="2" icon-description="Copy to clipboard">
      </cds-copy-button>
    `);
    expect(el.getAttribute('tabindex')).to.equal('2');
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('should add extra classes via passed button-class-name', async () => {
    const el = await fixture(html`
      <cds-copy-button
        button-class-name="extra-class"
        icon-description="Copy to clipboard">
      </cds-copy-button>
    `);

    const button = el.shadowRoot
      ?.querySelector('cds-copy')
      ?.shadowRoot?.querySelector('button');
    expect(button).to.have.class('extra-class');
    expect(el).shadowDom.to.equalSnapshot();
  });
});

describe('Button props', () => {
  it('should disable button if disabled prop is passed', async () => {
    const el = await fixture(html`
      <cds-copy-button disabled icon-description="Copy to clipboard">
      </cds-copy-button>
    `);

    const button = el.shadowRoot
      ?.querySelector('cds-copy')
      ?.shadowRoot?.querySelector('button');
    expect(button).to.have.attribute('disabled');
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('should call the click handler', async () => {
    let clicked = false;
    const el = await fixture(html`
      <cds-copy-button
        icon-description="Copy to clipboard"
        @click=${() => {
          clicked = true;
        }}>
      </cds-copy-button>
    `);

    const button = el.shadowRoot
      ?.querySelector('cds-copy')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    expect(clicked).to.be.true;
    expect(el).shadowDom.to.equalSnapshot();
  });
});

describe('Feedback', () => {
  it('should make the feedback visible for a limited amount of time', async () => {
    const el = await fixture(html`
      <cds-copy-button feedback="Copied!" feedback-timeout="500">
      </cds-copy-button>
    `);

    const copy = el.shadowRoot.querySelector('cds-copy');
    await el.updateComplete;
    await copy.updateComplete;

    const button = copy.shadowRoot.querySelector('button');
    button.click();

    await waitUntil(() => {
      const tooltip = copy.shadowRoot.querySelector('cds-tooltip-content');
      return tooltip?.textContent?.trim() === 'Copied!';
    });

    await waitUntil(
      () => {
        const tooltip = copy.shadowRoot.querySelector('cds-tooltip-content');
        return tooltip?.textContent?.trim() !== 'Copied!';
      },
      'Expected feedback to disappear',
      { timeout: 3000 }
    );
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('should be able to specify the feedback message', async () => {
    const customFeedback = 'Custom feedback message';
    const el = await fixture(html`
      <cds-copy-button feedback="${customFeedback}" feedback-timeout="200">
      </cds-copy-button>
    `);

    const copyComponent = el.shadowRoot?.querySelector('cds-copy');
    await el.updateComplete;
    await copyComponent?.updateComplete;

    const button = copyComponent?.shadowRoot?.querySelector('button');
    button?.click();

    await waitUntil(() => {
      const tooltip = copyComponent?.shadowRoot?.querySelector(
        'cds-tooltip-content'
      );
      return tooltip?.textContent?.trim() === customFeedback;
    });

    expect(
      copyComponent?.shadowRoot
        ?.querySelector('cds-tooltip-content')
        ?.textContent?.trim()
    ).to.equal(customFeedback);

    await waitUntil(
      () => {
        const tooltip = copyComponent?.shadowRoot?.querySelector(
          'cds-tooltip-content'
        );
        return tooltip?.textContent?.trim() !== customFeedback;
      },
      'Expected feedback to disappear',
      { timeout: 3000 }
    );

    expect(
      copyComponent?.shadowRoot
        ?.querySelector('cds-tooltip-content')
        ?.textContent?.trim()
    ).to.not.equal(customFeedback);
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('should allow users to override default feedback timeout via prop', async () => {
    const customTimeout = 100;
    const el = await fixture(html`
      <cds-copy-button feedback-timeout="${customTimeout}"> </cds-copy-button>
    `);

    const copyComponent = el.shadowRoot?.querySelector('cds-copy');
    await el.updateComplete;
    await copyComponent?.updateComplete;

    const button = copyComponent?.shadowRoot?.querySelector('button');
    button?.click();

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
