/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/popover/index.js';

describe('cds-popover', function () {
  it('should support a custom class', async () => {
    const el = await fixture(
      html`<cds-popover class="test-class"></cds-popover>`
    );
    expect(el.classList.contains('test-class')).to.be.true;
  });

  it('should forward additional attributes on the outermost element', async () => {
    const el = await fixture(html`
      <cds-popover data-testid="test-id"></cds-popover>
    `);

    expect(el).to.have.attribute('data-testid', 'test-id');
  });
});
describe('cds-popover-content', function () {
  it('should support a custom class', async () => {
    const el = await fixture(
      html`<cds-popover-content class="test-class"></cds-popover-content>`
    );
    expect(el.classList.contains('test-class')).to.be.true;
  });

  it('should forward additional attributes on the outermost element', async () => {
    const el = await fixture(html`
      <cds-popover-content data-testid="test-id"></cds-popover-content>
    `);

    expect(el).to.have.attribute('data-testid', 'test-id');
  });

  it('should have 6px caret height and 12px caret width', async () => {
    const el = await fixture(html`
      <cds-popover open align="bottom">
        <button type="button">Test</button>
        <cds-popover-content></cds-popover-content>
      </cds-popover>
    `);

    await el.updateComplete;

    const caret = el
      .querySelector(`cds-popover-content`)
      .shadowRoot?.querySelector('.cds--popover-caret');
    const after = getComputedStyle(caret, '::after');
    expect(after.width).to.equal('12px');
    expect(after.height).to.equal('6px');
  });

  it('should respect tabTip attribute', async () => {
    const el = await fixture(html`
        <cds-popover tabTip open></cds-popover>
          <button type="button">Test</button
          ><cds-popover-content></cds-popover-content
        ></cds-popover>
      `);
    await el.updateComplete;

    const content = el.shadowRoot?.querySelector('[part="popover-container"]');

    const classList = content?.classList || [];
    expect(
      Array.from(classList).some((cls) => cls.includes('--popover--tab-tip'))
    ).to.be.true;
  });

  it('should respect border attribute', async () => {
    const el = await fixture(html`
        <cds-popover border open></cds-popover>
          <button type="button">Test</button
          ><cds-popover-content></cds-popover-content
        ></cds-popover>
      `);
    await el.updateComplete;

    const content = el.shadowRoot?.querySelector('[part="popover-container"]');

    const classList = content?.classList || [];
    expect(
      Array.from(classList).some((cls) => cls.includes('--popover--border'))
    ).to.be.true;
  });

  it('should respect backgroundToken attribute', async () => {
    const el = await fixture(html`
        <cds-popover backgroundToken="background"></cds-popover>
          <button type="button">Test</button
          ><cds-popover-content></cds-popover-content
        ></cds-popover>
      `);
    await el.updateComplete;

    const content = el.shadowRoot?.querySelector('[part="popover-container"]');

    const classList = content?.classList || [];
    expect(
      Array.from(classList).some((cls) =>
        cls.includes('--popover--background-token__background')
      )
    ).to.be.true;
  });

  it('should not add background token class when backgroundToken is "layer"', async () => {
    const el = await fixture(html`
        <cds-popover backgroundToken="layer"></cds-popover>
          <button type="button">Test</button
          ><cds-popover-content></cds-popover-content
        ></cds-popover>
      `);
    await el.updateComplete;

    const content = el.shadowRoot?.querySelector('[part="popover-container"]');

    const classList = content?.classList || [];
    expect(
      Array.from(classList).some((cls) =>
        cls.includes('--popover--background-token__background')
      )
    ).to.be.false;
  });

  it('should not add background token class when highContrast is true', async () => {
    const el = await fixture(html`
        <cds-popover backgroundToken="background" highContrast></cds-popover>
          <button type="button">Test</button
          ><cds-popover-content></cds-popover-content
        ></cds-popover>
      `);
    await el.updateComplete;

    const content = el.shadowRoot?.querySelector('[part="popover-container"]');

    const classList = content?.classList || [];
    expect(
      Array.from(classList).some((cls) =>
        cls.includes('--popover--background-token__background')
      )
    ).to.be.false;
  });

  it('should respect dropShadow attribute', async () => {
    const el = await fixture(html`
        <cds-popover dropShadow></cds-popover>
          <button type="button">Test</button
          ><cds-popover-content></cds-popover-content
        ></cds-popover>
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

  it('should respect caret attribute', async () => {
    const el = await fixture(html`
        <cds-popover caret></cds-popover>
          <button type="button">Test</button
          ><cds-popover-content></cds-popover-content
        ></cds-popover>
      `);
    await el.updateComplete;

    const content = el.shadowRoot?.querySelector('[part="popover-container"]');

    const classList = content?.classList || [];
    expect(
      Array.from(classList).some((cls) => cls.includes('--popover--caret'))
    ).to.be.true;
  });

  it('should respect highContrast attribute', async () => {
    const el = await fixture(html`
        <cds-popover highContrast></cds-popover>
          <button type="button">Test</button
          ><cds-popover-content></cds-popover-content
        ></cds-popover>
      `);
    await el.updateComplete;

    const content = el.shadowRoot?.querySelector('[part="popover-container"]');

    const classList = content?.classList || [];
    expect(
      Array.from(classList).some((cls) =>
        cls.includes('--popover--high-contrast')
      )
    ).to.be.true;
  });

  it('should only allow bottom-start or bottom-end alignments for tabTip variant ', async () => {
    const el = await fixture(html`
        <cds-popover tabTip open align="bottom"></cds-popover>
          <button type="button">Test</button
          ><cds-popover-content></cds-popover-content
        ></cds-popover>
      `);
    await el.updateComplete;
    expect(el.getAttribute('align')).to.be.oneOf([
      'bottom-start',
      'bottom-end',
    ]);
  });

  it('tabTip should not close when interacting with form elements inside the content', async () => {
    const el = await fixture(html`
      <cds-popover tabTip open>
        <button type="button">Test</button>
        <cds-popover-content>
          <div>
            <cds-form-item>
              <cds-radio-button-group
                legend-text="Row height 1"
                name="radio-button-group-1"
                value="small"
                orientation="vertical">
                <cds-radio-button
                  label-text="Small"
                  value="small"
                  id="radio-small"></cds-radio-button>
                <cds-radio-button
                  label-text="Large"
                  value="large"
                  id="radio-large"></cds-radio-button>
              </cds-radio-button-group>
            </cds-form-item>
            <hr />
            <cds-checkbox-group legend-text="Edit columns">
              <cds-checkbox
                label-text="Name"
                id="checkbox-label-1"></cds-checkbox>
              <cds-checkbox
                label-text="Type"
                id="checkbox-label-2"></cds-checkbox>
              <cds-checkbox
                label-text="Location"
                id="checkbox-label-3"></cds-checkbox>
            </cds-checkbox-group>
          </div>
        </cds-popover-content>
      </cds-popover>
    `);

    await el.updateComplete;

    const slotElements = el
      .querySelector('cds-popover-content')
      .shadowRoot.querySelector('slot');
    const container = slotElements.assignedElements()[0];

    const radioLarge = container.querySelector('cds-radio-button#radio-large');
    radioLarge.click();
    await el.updateComplete;

    const checkbox = container.querySelector('cds-checkbox#checkbox-label-2');
    checkbox.click();
    await el.updateComplete;

    expect(el.hasAttribute('open')).to.be.true;
  });

  it('only adds the tab-tip button class to a slotted <button>', async () => {
    const el_button = await fixture(html`
      <cds-popover tabTip open>
        <button type="button">Test</button>
        <cds-popover-content></cds-popover-content>
      </cds-popover>
    `);

    await el_button.updateComplete;

    const btn = el_button.querySelector('button');
    expect(
      Array.from(btn.classList).some((c) =>
        c.includes('--popover--tab-tip__button')
      )
    ).to.be.true;

    const el_icon_button = await fixture(html`
      <cds-popover tabTip open>
        <cds-icon-button type="button">Test</cds-icon-button>
        <cds-popover-content></cds-popover-content>
      </cds-popover>
    `);

    await el_icon_button.updateComplete;

    const iconButton = el_icon_button.querySelector('cds-icon-button');

    expect(
      Array.from(iconButton.classList).some((c) =>
        c.includes('--popover--tab-tip__button')
      )
    ).to.be.false;
  });
});
describe('cds-popover outside click', () => {
  it('does not close when clicking the trigger button', async () => {
    const el = await fixture(html`
      <cds-popover open>
        <button id="trigger" type="button">Test</button>
        <cds-popover-content></cds-popover-content>
      </cds-popover>
    `);

    await el.updateComplete;
    expect(el.hasAttribute('open')).to.be.true;

    const trigger = el.querySelector('#trigger');
    trigger.click();

    await el.updateComplete;
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('does not close when clicking the popover content', async () => {
    const el = await fixture(html`
      <cds-popover open>
        <button type="button">Test</button>
        <cds-popover-content>
          <div>Content</div>
        </cds-popover-content>
      </cds-popover>
    `);

    await el.updateComplete;
    expect(el.hasAttribute('open')).to.be.true;

    const content = el
      .querySelector('cds-popover-content')
      .shadowRoot?.querySelector('.cds--popover-content');

    content.click();

    await el.updateComplete;
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('closes on outside click', async () => {
    const el = await fixture(html`
      <div>
        <cds-popover open id="popover">
          <button type="button">Test</button>
          <cds-popover-content></cds-popover-content>
        </cds-popover>
        <button id="outside"></button>
      </div>
    `);

    await el.updateComplete;
    const popover = el.querySelector('#popover');
    const outside = el.querySelector('#outside');
    expect(popover.hasAttribute('open')).to.be.true;

    outside.click();
    await el.updateComplete;
    expect(popover.hasAttribute('open')).to.be.false;
  });
});
