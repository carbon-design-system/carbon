/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/tooltip/index.js';
import '@carbon/web-components/es/components/feature-flags/index.js';
import { fixture, html, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

describe('cds-tooltip', () => {
  it('should support a custom class', async () => {
    const el = await fixture(
      html`<cds-tooltip class="test-class"
        ><cds-tooltip-content>test</cds-tooltip-content></cds-tooltip
      >`
    );
    expect(el.classList.contains('test-class')).to.be.true;
  });

  it('should forward additional attributes on the outermost element', async () => {
    const el = await fixture(html`
      <cds-tooltip data-testid="test-id"
        ><cds-tooltip-content>test</cds-tooltip-content></cds-tooltip
      >
    `);

    expect(el).to.have.attribute('data-testid', 'test-id');
  });

  it('should support initially showing the tooltip with `defaultOpen`', async () => {
    const el = await fixture(html`
      <cds-tooltip defaultOpen>
        <button role="button" aria-labelledby="content"></button>
        <cds-tooltip-content id="content">
          Options
        </cds-tooltip-content></cds-tooltip
      >
    `);

    const content = el.querySelector('cds-tooltip-content');
    expect(content).to.have.attribute('open');

    const popoverContent = content.shadowRoot.querySelector(
      '.cds--popover-content'
    );
    const caret = content.shadowRoot.querySelector('.cds--popover-caret');
    expect(getComputedStyle(popoverContent).display).to.not.equal('none');
    expect(getComputedStyle(caret).display).to.not.equal('none');
  });

  it('should close when item is activated and `closeOnActivation`', async () => {
    const el = await fixture(html`
      <cds-tooltip closeOnActivation defaultOpen leave-delay-ms="100">
        <button role="button" aria-labelledby="content"></button>
        <cds-tooltip-content id="content">
          Options
        </cds-tooltip-content></cds-tooltip
      >
    `);

    const content = el.querySelector('cds-tooltip-content');
    expect(content).to.have.attribute('open');

    const popoverContent = content.shadowRoot.querySelector(
      '.cds--popover-content'
    );
    const caret = content.shadowRoot.querySelector('.cds--popover-caret');
    expect(getComputedStyle(popoverContent).display).to.not.equal('none');
    expect(getComputedStyle(caret).display).to.not.equal('none');

    // click the button
    const button = el.querySelector('button');
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    await el.updateComplete;

    expect(content).to.not.have.attribute('open');
    expect(getComputedStyle(popoverContent).display).to.equal('none');
    expect(getComputedStyle(caret).display).to.equal('none');
  });

  const keyboardTemplate = ({
    closeOnActivation = false,
    defaultOpen = false,
    enterDelayMs = 0,
    leaveDelayMs = 0,
  } = {}) => {
    return html`
      <cds-tooltip
        .closeOnActivation=${closeOnActivation}
        .defaultOpen=${defaultOpen}
        enter-delay-ms=${enterDelayMs}
        leave-delay-ms=${leaveDelayMs}>
        <button type="button" aria-labelledby="content">Trigger</button>
        <cds-tooltip-content id="content">Tooltip text</cds-tooltip-content>
      </cds-tooltip>
    `;
  };

  [false, true].forEach((closeOnActivation) => {
    describe(`with closeOnActivation=${closeOnActivation}`, () => {
      it('should dismiss a nested tooltip before its parent popover on Escape', async () => {
        const popover = await fixture(html`
          <cds-popover open>
            <button type="button">Popover trigger</button>
            <cds-popover-content>
              ${keyboardTemplate({ closeOnActivation })}
            </cds-popover-content>
          </cds-popover>
        `);
        const tooltip = popover.querySelector('cds-tooltip');
        const button = tooltip.querySelector('button');

        button.focus();
        await new Promise((resolve) =>
          setTimeout(resolve, tooltip.enterDelayMs)
        );
        await tooltip.updateComplete;
        expect(tooltip.open).to.be.true;

        await sendKeys({ press: 'Escape' });
        await tooltip.updateComplete;
        await popover.updateComplete;

        expect(tooltip.open).to.be.false;
        expect(popover).to.have.attribute('open');

        await sendKeys({ press: 'Escape' });
        await popover.updateComplete;

        expect(popover).to.not.have.attribute('open');
      });

      ['focus', 'hover'].forEach((interaction) => {
        it(`should close immediately on Escape after ${interaction}`, async () => {
          const tooltip = await fixture(
            keyboardTemplate({ closeOnActivation, leaveDelayMs: 1000 })
          );
          const button = tooltip.querySelector('button');
          const content = tooltip.querySelector('cds-tooltip-content');

          if (interaction === 'focus') {
            button.focus();
          } else {
            button.dispatchEvent(
              new MouseEvent('mouseover', { bubbles: true })
            );
          }
          await new Promise((resolve) =>
            setTimeout(resolve, tooltip.enterDelayMs)
          );
          await tooltip.updateComplete;
          expect(content).to.have.attribute('open');

          if (interaction === 'hover') {
            expect(document.activeElement).to.equal(document.body);
          }
          document.activeElement.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
          );

          expect(tooltip.open).to.be.false;
          await tooltip.updateComplete;
          expect(content).to.not.have.attribute('open');
          if (interaction === 'focus') {
            expect(document.activeElement).to.equal(button);
          }
        });
      });

      [
        { name: 'Enter', key: 'Enter' },
        { name: 'Space', key: ' ' },
      ].forEach(({ name, key }) => {
        it(`should ${closeOnActivation ? 'close' : 'remain open'} on ${name}`, async () => {
          const tooltip = await fixture(
            keyboardTemplate({ closeOnActivation, defaultOpen: true })
          );
          const content = tooltip.querySelector('cds-tooltip-content');
          expect(content).to.have.attribute('open');

          tooltip
            .querySelector('button')
            .dispatchEvent(
              new KeyboardEvent('keydown', { key, bubbles: true })
            );
          await new Promise((resolve) =>
            setTimeout(resolve, tooltip.leaveDelayMs)
          );
          await tooltip.updateComplete;

          expect(content.hasAttribute('open')).to.equal(!closeOnActivation);
        });
      });
    });
  });

  it('should cancel a pending opening when Escape is pressed', async () => {
    const tooltip = await fixture(keyboardTemplate({ enterDelayMs: 50 }));
    const button = tooltip.querySelector('button');
    button.focus();

    button.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    await new Promise((resolve) => setTimeout(resolve, tooltip.enterDelayMs));
    await tooltip.updateComplete;

    expect(tooltip.querySelector('cds-tooltip-content')).to.not.have.attribute(
      'open'
    );
    expect(document.activeElement).to.equal(button);
  });

  it('should reopen on focus after dismissal with Escape', async () => {
    const tooltip = await fixture(keyboardTemplate());
    const button = tooltip.querySelector('button');
    button.focus();
    await new Promise((resolve) => setTimeout(resolve, tooltip.enterDelayMs));
    await tooltip.updateComplete;
    expect(tooltip.open).to.be.true;

    button.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    await tooltip.updateComplete;
    expect(tooltip.open).to.be.false;

    button.blur();
    button.focus();
    await new Promise((resolve) => setTimeout(resolve, tooltip.enterDelayMs));
    await tooltip.updateComplete;

    expect(tooltip.querySelector('cds-tooltip-content')).to.have.attribute(
      'open'
    );
  });

  it('should open when trigger button is focused and close when out of focus', async () => {
    const el = await fixture(html`
      <cds-tooltip enter-delay-ms="100" leave-delay-ms="300">
        <button role="button" aria-labelledby="content"></button>
        <cds-tooltip-content id="content">
          Options
        </cds-tooltip-content></cds-tooltip
      >
    `);
    const button = el.querySelector('button');
    const content = el.querySelector('cds-tooltip-content');
    const popoverContent = content.shadowRoot.querySelector(
      '.cds--popover-content'
    );
    const caret = content.shadowRoot.querySelector('.cds--popover-caret');

    // tooltip should render as closed
    expect(content).to.not.have.attribute('open');
    expect(getComputedStyle(popoverContent).display).to.equal('none');
    expect(getComputedStyle(caret).display).to.equal('none');

    // tooltip should open after enter-delay-ms
    button.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 100));
    await el.updateComplete;

    expect(content).to.have.attribute('open');
    expect(getComputedStyle(popoverContent).display).to.not.equal('none');
    expect(getComputedStyle(caret).display).to.not.equal('none');

    // tooltip should close after leave-delay-ms
    button.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await el.updateComplete;

    expect(content).to.not.have.attribute('open');
    expect(getComputedStyle(popoverContent).display).to.equal('none');
    expect(getComputedStyle(caret).display).to.equal('none');
  });

  it('should render with highContrast by default', async () => {
    const el = await fixture(html`
      <cds-tooltip defaultOpen>
        <button role="button" aria-labelledby="content"></button>
        <cds-tooltip-content id="content">
          Options
        </cds-tooltip-content></cds-tooltip
      >
    `);

    expect(el).to.have.attribute('highContrast');
  });

  it('should respect dropShadow attribute', async () => {
    const el = await fixture(html`
      <cds-tooltip dropShadow>
        <button role="button" aria-labelledby="content"></button>
        <cds-tooltip-content id="content">
          Options
        </cds-tooltip-content></cds-tooltip
      >
    `);
    await el.updateComplete;

    const content = el.shadowRoot?.querySelector('[part="popover-container"]');
    const classList = content?.classList || [];
    expect(
      Array.from(classList).some((cls) =>
        cls.includes('--popover--drop-shadow')
      )
    ).to.be.true;
  });

  it('should pass `align`, `caret`, `autoalign`, `dropShadow`, attributes to the tooltip content', async () => {
    const el = await fixture(html`
      <cds-tooltip align="top" caret autoalign dropShadow>
        <button role="button" aria-labelledby="content"></button>
        <cds-tooltip-content id="content"> Options </cds-tooltip-content>
      </cds-tooltip>
    `);

    const content = el.querySelector('cds-tooltip-content');

    expect(content).to.exist;
    expect(content.align).to.equal('top');
    expect(content.caret).to.be.true;
    expect(content.dropShadow).to.be.true;
    expect(content.highContrast).to.be.true;
    expect(content.autoalign).to.be.true;
  });

  it('should default autoalign to true with enable-v12-release', async () => {
    const featureFlag = await fixture(html`
      <feature-flags enable-v12-release="true">
        <cds-tooltip>
          <button role="button" aria-labelledby="content"></button>
          <cds-tooltip-content id="content"> Options </cds-tooltip-content>
        </cds-tooltip>
      </feature-flags>
    `);
    const el = featureFlag.querySelector('cds-tooltip');

    await el.updateComplete;

    expect(el.autoalign).to.be.true;
    expect(el.querySelector('cds-tooltip-content').autoalign).to.be.true;
  });

  it('should keep autoalign disabled when set to false with enable-v12-release', async () => {
    const featureFlag = await fixture(html`
      <feature-flags enable-v12-release="true">
        <cds-tooltip .autoalign=${false}>
          <button role="button" aria-labelledby="content"></button>
          <cds-tooltip-content id="content"> Options </cds-tooltip-content>
        </cds-tooltip>
      </feature-flags>
    `);
    const el = featureFlag.querySelector('cds-tooltip');

    await el.updateComplete;

    expect(el.autoalign).to.be.false;
    expect(el).to.not.have.attribute('autoalign');
    expect(el.querySelector('cds-tooltip-content').autoalign).to.not.be.true;
  });
});

describe('cds-tooltip-content', () => {
  it('should support a custom class', async () => {
    const el = await fixture(
      html`<cds-tooltip
        ><cds-tooltip-content class="test-class"
          >test</cds-tooltip-content
        ></cds-tooltip
      >`
    );
    expect(
      el.querySelector('cds-tooltip-content').classList.contains('test-class')
    ).to.be.true;
  });

  it('should forward additional attributes on the outermost element', async () => {
    const el = await fixture(html`
      <cds-tooltip
        ><cds-tooltip-content data-testid="test-id"
          >test</cds-tooltip-content
        ></cds-tooltip
      >
    `);

    expect(el.querySelector('cds-tooltip-content')).to.have.attribute(
      'data-testid',
      'test-id'
    );
  });

  it('should add tooltip-content class to popover-content', async () => {
    const el = await fixture(html`
      <cds-tooltip><cds-tooltip-content>test</cds-tooltip-content></cds-tooltip>
    `);
    const popoverContent = el
      .querySelector('cds-tooltip-content')
      .shadowRoot.querySelector('.cds--popover-content');

    expect(popoverContent.classList.contains('cds--tooltip-content')).to.be
      .true;
  });
});
