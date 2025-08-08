/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@carbon/web-components/es/components/content-switcher/index.js';

describe('cds-content-switcher', function () {
  it('should apply selectedIndex correctly', async () => {
    const el = await fixture(html`
      <cds-content-switcher selectedIndex="2">
        <cds-content-switcher-item name="one" text="First section" value="all">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          name="two"
          text="Second section"
          value="cloudFoundry">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          name="three"
          text="Third section"
          value="staging">
          Third section
        </cds-content-switcher-item>
      </cds-content-switcher>
    `);

    await el.updateComplete;
    const items = el.querySelectorAll('cds-content-switcher-item');
    const selectedItem = items[2];
    await selectedItem.updateComplete;

    expect(selectedItem.hasAttribute('selected')).to.be.true;
    expect(selectedItem.getAttribute('tabindex')).to.equal('0');
  });

  it('should emit event on click with matching details (parity with React onChange)', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item name="one" text="First section" value="all">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          name="two"
          text="Second section"
          value="cloudFoundry">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          name="three"
          text="Third section"
          value="staging">
          Third section
        </cds-content-switcher-item>
      </cds-content-switcher>
    `);

    const second = el.querySelectorAll('cds-content-switcher-item')[1];
    const eventPromise = oneEvent(el, 'cds-content-switcher-selected');

    second.click();
    const { detail } = await eventPromise;

    expect(detail.item).to.equal(second);
    expect(detail.item.getAttribute('name')).to.equal('two');
    expect(detail.item.getAttribute('value')).to.equal('cloudFoundry');
    expect(detail.item.textContent.trim()).to.equal('Second section');
  });

  it('should emit event on keydown (ArrowRight/ArrowLeft)', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item name="one" text="First section" value="all">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          name="two"
          text="Second section"
          value="cloudFoundry">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          name="three"
          text="Third section"
          value="staging">
          Third section
        </cds-content-switcher-item>
      </cds-content-switcher>
    `);

    await el.updateComplete;
    const items = el.querySelectorAll('cds-content-switcher-item');
    const button = items[0].shadowRoot.querySelector('button');
    button.focus();

    const eventRightPromise = oneEvent(el, 'cds-content-switcher-selected');
    await sendKeys({ press: 'ArrowRight' });
    const eventRight = await eventRightPromise;

    await eventRight.detail.item.updateComplete;
    expect(eventRight.detail.item.getAttribute('name')).to.equal('two');
    expect(eventRight.detail.item.getAttribute('value')).to.equal(
      'cloudFoundry'
    );

    const eventLeftPromise = oneEvent(el, 'cds-content-switcher-selected');
    await sendKeys({ press: 'ArrowLeft' });
    const eventLeft = await eventLeftPromise;

    await eventLeft.detail.item.updateComplete;
    expect(eventLeft.detail.item.getAttribute('name')).to.equal('one');
    expect(eventLeft.detail.item.getAttribute('value')).to.equal('all');
  });

  it('should support size attribute', async () => {
    const el = await fixture(html`
      <cds-content-switcher size="lg">
        <cds-content-switcher-item
          text="Section"
          value="default"></cds-content-switcher-item>
      </cds-content-switcher>
    `);

    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('should apply lowContrast attribute', async () => {
    const el = await fixture(html`
      <cds-content-switcher lowContrast>
        <cds-content-switcher-item
          text="Section"
          value="lowContrastValue"></cds-content-switcher-item>
      </cds-content-switcher>
    `);

    expect(el.hasAttribute('lowContrast')).to.be.true;
  });

  it('should apply iconOnly mode automatically if all items have icon attribute', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item
          icon
          text="Icon 1"
          value="icon1"></cds-content-switcher-item>
        <cds-content-switcher-item
          icon
          text="Icon 2"
          value="icon2"></cds-content-switcher-item>
        <cds-content-switcher-item
          icon
          text="Icon 3"
          value="icon3"></cds-content-switcher-item>
      </cds-content-switcher>
    `);

    expect(el.hasAttribute('icon')).to.be.true;
  });

  it('should allow disabling items via attribute', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item
          text="Section 1"
          value="enabled"></cds-content-switcher-item>
        <cds-content-switcher-item
          text="Section 2"
          value="disabled"
          disabled></cds-content-switcher-item>
      </cds-content-switcher>
    `);

    const disabledItem = el.querySelectorAll('cds-content-switcher-item')[1];
    expect(disabledItem.hasAttribute('disabled')).to.be.true;
  });
});
