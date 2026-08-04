/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/chat-button/index.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';

describe('cds-chat-button', () => {
  it('should render slotted content', async () => {
    const el = await fixture(html`
      <cds-chat-button><span>Chat</span></cds-chat-button>
    `);

    expect(el.querySelector('span')).to.have.text('Chat');
  });

  it('should support a custom class on the host', async () => {
    const el = await fixture(html`
      <cds-chat-button class="custom-class">Chat</cds-chat-button>
    `);

    expect(el).to.have.class('custom-class');
  });

  it('should forward the disabled state to the button', async () => {
    const el = await fixture(html`
      <cds-chat-button disabled>Chat</cds-chat-button>
    `);
    const button = el.shadowRoot.querySelector('cds-button');

    expect(button).to.have.attribute('disabled');
  });

  it('should call the click handler', async () => {
    let clicked = false;
    const el = await fixture(html`
      <cds-chat-button
        @click=${() => {
          clicked = true;
        }}>
        Chat
      </cds-chat-button>
    `);
    const button = el.shadowRoot.querySelector('cds-button');

    button.click();

    expect(clicked).to.be.true;
  });

  describe('supports kind', () => {
    const kinds = ['primary', 'secondary', 'tertiary', 'ghost', 'danger'];

    kinds.forEach((kind) => {
      it(`kind="${kind}"`, async () => {
        const el = await fixture(html`
          <cds-chat-button kind="${kind}">Chat</cds-chat-button>
        `);
        const button = el.shadowRoot.querySelector('cds-button');

        expect(button).to.have.attribute('kind', kind);
      });
    });
  });

  describe('supports size', () => {
    const sizes = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`size="${size}"`, async () => {
        const el = await fixture(html`
          <cds-chat-button size="${size}">Chat</cds-chat-button>
        `);
        const button = el.shadowRoot.querySelector('cds-button');

        expect(button).to.have.attribute('size', size);
      });
    });

    it('should fall back to lg for an unsupported size', async () => {
      const el = await fixture(html`
        <cds-chat-button size="xl">Chat</cds-chat-button>
      `);
      const button = el.shadowRoot.querySelector('cds-button');

      expect(button).to.have.attribute('size', 'lg');
    });
  });

  it('should render as a quick action', async () => {
    const el = await fixture(html`
      <cds-chat-button is-quick-action>Chat</cds-chat-button>
    `);
    const button = el.shadowRoot.querySelector('cds-button');

    expect(button).to.have.attribute('kind', 'ghost');
    expect(button).to.have.attribute('size', 'sm');
    expect(button.getAttribute('button-class-name')).to.include(
      'cds--chat-btn--quick-action'
    );
  });

  it('should render a selected quick action', async () => {
    const el = await fixture(html`
      <cds-chat-button is-quick-action is-selected>Chat</cds-chat-button>
    `);
    const button = el.shadowRoot.querySelector('cds-button');

    expect(button.getAttribute('button-class-name')).to.include(
      'cds--chat-btn--quick-action--selected'
    );
  });

  it('should add the icon class when an icon is provided', async () => {
    const el = await fixture(html`
      <cds-chat-button>
        Chat
        <svg slot="icon" aria-hidden="true"></svg>
      </cds-chat-button>
    `);

    await waitUntil(() =>
      el.shadowRoot
        .querySelector('cds-button')
        .getAttribute('button-class-name')
        .includes('cds--chat-btn--with-icon')
    );

    const button = el.shadowRoot.querySelector('cds-button');
    expect(button.getAttribute('button-class-name')).to.include(
      'cds--chat-btn--with-icon'
    );
  });

  it('should be accessible', async () => {
    const el = await fixture(html` <cds-chat-button>Chat</cds-chat-button> `);

    await expect(el).to.be.accessible();
  });
});
