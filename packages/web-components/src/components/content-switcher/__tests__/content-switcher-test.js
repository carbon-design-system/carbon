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
      <cds-content-switcher selected-index="2">
        <cds-content-switcher-item name="one" value="all">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item name="two" value="cloudFoundry">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item name="three" value="staging">
          Third section
        </cds-content-switcher-item>
      </cds-content-switcher>
    `);

    await el.updateComplete;
    const items = el.querySelectorAll('cds-content-switcher-item');
    const selectedItem = items[2];
    await selectedItem.updateComplete;

    expect(selectedItem.hasAttribute('selected')).to.be.true;

    const btn = selectedItem.shadowRoot.querySelector('button');
    expect(btn.getAttribute('tabindex')).to.equal('0');

    const btn0 = items[0].shadowRoot.querySelector('button');
    const btn1 = items[1].shadowRoot.querySelector('button');
    expect(btn0.getAttribute('tabindex')).to.equal('-1');
    expect(btn1.getAttribute('tabindex')).to.equal('-1');
  });

  // parity with React onChange
  it('should emit event on click with matching details', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item name="one" value="all">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item name="two" value="cloudFoundry">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item name="three" value="staging">
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

    expect(detail.index).to.equal(1);
    expect(detail.name).to.equal('two');
    expect(detail.text).to.equal('Second section');
  });

  it('should emit event on keydown (ArrowRight/ArrowLeft)', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item name="one" value="all">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item name="two" value="cloudFoundry">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item name="three" value="staging">
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
        <cds-content-switcher-item value="default"
          >Section</cds-content-switcher-item
        >
      </cds-content-switcher>
    `);

    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('should apply low-contrast attribute', async () => {
    const el = await fixture(html`
      <cds-content-switcher low-contrast>
        <cds-content-switcher-item value="lowContrastValue"
          >Section</cds-content-switcher-item
        >
      </cds-content-switcher>
    `);

    expect(el.hasAttribute('low-contrast')).to.be.true;
  });

  it('should apply iconOnly mode automatically if all items have icon attribute', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item icon value="icon1"
          >Icon 1</cds-content-switcher-item
        >
        <cds-content-switcher-item icon value="icon2"
          >Icon 2</cds-content-switcher-item
        >
        <cds-content-switcher-item icon value="icon3"
          >Icon 3</cds-content-switcher-item
        >
      </cds-content-switcher>
    `);

    expect(el.hasAttribute('icon')).to.be.true;
  });

  it('should allow disabling items via attribute', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item value="enabled"
          >Section 1</cds-content-switcher-item
        >
        <cds-content-switcher-item value="disabled" disabled
          >Section 2</cds-content-switcher-item
        >
      </cds-content-switcher>
    `);

    const disabledItem = el.querySelectorAll('cds-content-switcher-item')[1];
    expect(disabledItem.hasAttribute('disabled')).to.be.true;
  });

  it('should set parent content-switcher as disabled when a child item becomes disabled', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item value="a">A</cds-content-switcher-item>
        <cds-content-switcher-item value="b" disabled
          >B</cds-content-switcher-item
        >
      </cds-content-switcher>
    `);

    await el.updateComplete;
    const disabledItem = el.querySelectorAll('cds-content-switcher-item')[1];
    await disabledItem.updateComplete;

    expect(el.hasAttribute('disabled')).to.be.true;
  });
});
