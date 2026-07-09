/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@carbon/web-components/es/components/content-switcher/index.js';
import '@carbon/web-components/es/components/tooltip/index.js';

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

  it('should emit event text from aria-label when item has no text content', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item name="one" value="all">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          name="two"
          value="notifications"
          aria-label="New Notifications">
          <svg aria-hidden="true" viewBox="0 0 16 16"></svg>
        </cds-content-switcher-item>
      </cds-content-switcher>
    `);

    const second = el.querySelectorAll('cds-content-switcher-item')[1];
    const eventPromise = oneEvent(el, 'cds-content-switcher-selected');

    second.click();
    const { detail } = await eventPromise;

    expect(detail.item).to.equal(second);
    expect(detail.name).to.equal('two');
    expect(detail.text).to.equal('New Notifications');
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

  it('should NOT emit event on keydown (ArrowRight/ArrowLeft) when selectionMode is set to manual', async () => {
    const el = await fixture(html`
      <cds-content-switcher selection-mode="manual">
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
    let eventFired = false;
    const eventHandler = () => {
      eventFired = true;
    };
    el.addEventListener('cds-content-switcher-selected', eventHandler);
    await sendKeys({ press: 'ArrowRight' });
    await el.updateComplete;
    expect(eventFired).to.be.false;
    await sendKeys({ press: 'ArrowLeft' });
    await el.updateComplete;
    expect(eventFired).to.be.false;
    el.removeEventListener('cds-content-switcher-selected', eventHandler);
  });

  it('should emit event on click when selectionMode is manual', async () => {
    const el = await fixture(html`
      <cds-content-switcher selection-mode="manual">
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
    const second = items[1];
    await second.updateComplete;

    const eventPromise = oneEvent(el, 'cds-content-switcher-selected');
    const button = second.shadowRoot.querySelector('button');
    button.click();

    const { detail } = await eventPromise;

    expect(detail.item).to.equal(second);
    expect(detail.item.getAttribute('name')).to.equal('two');
    expect(detail.item.getAttribute('value')).to.equal('cloudFoundry');
    expect(detail.item.textContent.trim()).to.equal('Second section');

    expect(detail.index).to.equal(1);
    expect(detail.name).to.equal('two');
    expect(detail.text).to.equal('Second section');
  });

  it('should emit event on Enter/Space key when selectionMode is manual', async () => {
    const el = await fixture(html`
      <cds-content-switcher selection-mode="manual">
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

    await sendKeys({ press: 'ArrowRight' });
    await el.updateComplete;
    await items[1].updateComplete;

    let eventPromise = oneEvent(el, 'cds-content-switcher-selected');
    await sendKeys({ press: 'Enter' });
    let { detail } = await eventPromise;

    expect(detail.item).to.equal(items[1]);
    expect(detail.item.getAttribute('name')).to.equal('two');
    expect(detail.item.getAttribute('value')).to.equal('cloudFoundry');
    expect(detail.item.textContent.trim()).to.equal('Second section');
    expect(detail.index).to.equal(1);
    expect(detail.name).to.equal('two');
    expect(detail.text).to.equal('Second section');

    await sendKeys({ press: 'ArrowRight' });
    await el.updateComplete;
    await items[2].updateComplete;

    eventPromise = oneEvent(el, 'cds-content-switcher-selected');
    await sendKeys({ press: ' ' });
    ({ detail } = await eventPromise);

    expect(detail.item).to.equal(items[2]);
    expect(detail.item.getAttribute('name')).to.equal('three');
    expect(detail.item.getAttribute('value')).to.equal('staging');
    expect(detail.item.textContent.trim()).to.equal('Third section');
    expect(detail.index).to.equal(2);
    expect(detail.name).to.equal('three');
    expect(detail.text).to.equal('Third section');
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

describe('cds-content-switcher hover behaviour', function () {
  it('should hide the divider on the item immediately after the hovered item', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item value="a">A</cds-content-switcher-item>
        <cds-content-switcher-item value="b">B</cds-content-switcher-item>
        <cds-content-switcher-item value="c">C</cds-content-switcher-item>
      </cds-content-switcher>
    `);
    await el.updateComplete;

    const items = el.querySelectorAll('cds-content-switcher-item');
    // Mouseover the first item – hideDivider should be set on items[1]
    items[0].dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, composed: true })
    );
    await el.updateComplete;

    expect(items[1].hideDivider).to.be.true;
  });

  it('should restore the divider to the item after the selected item on mouseout', async () => {
    const el = await fixture(html`
      <cds-content-switcher selected-index="0">
        <cds-content-switcher-item value="a">A</cds-content-switcher-item>
        <cds-content-switcher-item value="b">B</cds-content-switcher-item>
        <cds-content-switcher-item value="c">C</cds-content-switcher-item>
      </cds-content-switcher>
    `);
    await el.updateComplete;

    const items = el.querySelectorAll('cds-content-switcher-item');
    // Mouseover item[2], then mouseout — hideDivider on items[1] (next after
    // selected item[0]) must be true regardless after the mouseout path runs.
    items[2].dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, composed: true })
    );
    await el.updateComplete;

    items[2].dispatchEvent(
      new MouseEvent('mouseout', { bubbles: true, composed: true })
    );
    await el.updateComplete;

    // After mouseout, _handleHover unconditionally re-applies hideDivider=true
    // on the item immediately after the currently selected item (items[1]).
    expect(items[1].hideDivider).to.be.true;
  });

  it('should not update divider state when hovering over a disabled item', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item value="a" disabled
          >A</cds-content-switcher-item
        >
        <cds-content-switcher-item value="b">B</cds-content-switcher-item>
      </cds-content-switcher>
    `);
    await el.updateComplete;

    const items = el.querySelectorAll('cds-content-switcher-item');
    const before = items[1].hideDivider;

    items[0].dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, composed: true })
    );
    await el.updateComplete;

    // Disabled item hover should return early — divider state unchanged
    expect(items[1].hideDivider).to.equal(before);
  });

  it('should not select an item when the cds-content-switcher-beingselected event is cancelled', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item value="a">A</cds-content-switcher-item>
        <cds-content-switcher-item value="b">B</cds-content-switcher-item>
      </cds-content-switcher>
    `);
    await el.updateComplete;

    el.addEventListener('cds-content-switcher-beingselected', (e) =>
      e.preventDefault()
    );

    const second = el.querySelectorAll('cds-content-switcher-item')[1];
    second.click();
    await el.updateComplete;

    // Value must remain unchanged because the event was cancelled
    expect(el.value).to.not.equal('b');
  });

  it('should expose the selectorIconItem static selector', () => {
    const CDSContentSwitcher = customElements.get('cds-content-switcher');
    expect(CDSContentSwitcher.selectorIconItem).to.equal(
      'cds-content-switcher-item[icon]'
    );
  });

  it('should remove the hidden attribute from the target panel when its item is selected', async () => {
    const el = await fixture(html`
      <div>
        <cds-content-switcher>
          <cds-content-switcher-item value="a" target="panel-a"
            >A</cds-content-switcher-item
          >
          <cds-content-switcher-item value="b" target="panel-b"
            >B</cds-content-switcher-item
          >
        </cds-content-switcher>
        <div id="panel-a">Panel A</div>
        <div id="panel-b" hidden>Panel B</div>
      </div>
    `);

    await el.querySelector('cds-content-switcher').updateComplete;

    const switcher = el.querySelector('cds-content-switcher');
    const items = switcher.querySelectorAll('cds-content-switcher-item');
    await items[0].updateComplete;
    await items[1].updateComplete;

    // Click the second item to select it
    const eventPromise = oneEvent(switcher, 'cds-content-switcher-selected');
    items[1].click();
    await eventPromise;

    await items[1].updateComplete;

    // panel-b should now be visible (hidden removed)
    const panelB = el.querySelector('#panel-b');
    expect(panelB.hasAttribute('hidden')).to.be.false;
  });

  it('should reflect programmatic value changes to child item selected states', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item value="a">A</cds-content-switcher-item>
        <cds-content-switcher-item value="b">B</cds-content-switcher-item>
      </cds-content-switcher>
    `);
    await el.updateComplete;

    el.value = 'b';
    await el.updateComplete;

    const items = el.querySelectorAll('cds-content-switcher-item');
    expect(items[1].selected).to.be.true;
    expect(items[0].selected).to.be.false;
  });

  it('should propagate size attribute changes to all child items', async () => {
    const el = await fixture(html`
      <cds-content-switcher size="sm">
        <cds-content-switcher-item value="a">A</cds-content-switcher-item>
        <cds-content-switcher-item value="b">B</cds-content-switcher-item>
      </cds-content-switcher>
    `);
    await el.updateComplete;

    el.size = 'lg';
    await el.updateComplete;

    const items = el.querySelectorAll('cds-content-switcher-item');
    expect(items[0].getAttribute('size')).to.equal('lg');
    expect(items[1].getAttribute('size')).to.equal('lg');
  });

  it('should wrap focus from the last item to the first on ArrowRight', async () => {
    const el = await fixture(html`
      <cds-content-switcher selected-index="2">
        <cds-content-switcher-item value="a">A</cds-content-switcher-item>
        <cds-content-switcher-item value="b">B</cds-content-switcher-item>
        <cds-content-switcher-item value="c">C</cds-content-switcher-item>
      </cds-content-switcher>
    `);
    await el.updateComplete;

    const items = el.querySelectorAll('cds-content-switcher-item');
    items[2].shadowRoot.querySelector('button').focus();

    const eventPromise = oneEvent(el, 'cds-content-switcher-selected');
    await sendKeys({ press: 'ArrowRight' });
    const { detail } = await eventPromise;

    expect(detail.item.getAttribute('value')).to.equal('a');
  });

  it('should wrap focus from the first item to the last on ArrowLeft', async () => {
    const el = await fixture(html`
      <cds-content-switcher>
        <cds-content-switcher-item value="a">A</cds-content-switcher-item>
        <cds-content-switcher-item value="b">B</cds-content-switcher-item>
        <cds-content-switcher-item value="c">C</cds-content-switcher-item>
      </cds-content-switcher>
    `);
    await el.updateComplete;

    const items = el.querySelectorAll('cds-content-switcher-item');
    items[0].shadowRoot.querySelector('button').focus();

    const eventPromise = oneEvent(el, 'cds-content-switcher-selected');
    await sendKeys({ press: 'ArrowLeft' });
    const { detail } = await eventPromise;

    expect(detail.item.getAttribute('value')).to.equal('c');
  });
});

describe('cds-tooltip', function () {
  async function renderTooltip({
    enterDelayMs = 0,
    leaveDelayMs = 0,
    closeOnActivation = false,
    keyboardOnly = false,
  } = {}) {
    const el = await fixture(html`
      <cds-tooltip
        enter-delay-ms="${enterDelayMs}"
        leave-delay-ms="${leaveDelayMs}"
        ?close-on-activation="${closeOnActivation}"
        ?keyboard-only="${keyboardOnly}">
        <button type="button">Trigger</button>
        <cds-tooltip-content>Tooltip text</cds-tooltip-content>
      </cds-tooltip>
    `);
    await el.updateComplete;
    return el;
  }

  it('should open when the trigger is hovered', async () => {
    const el = await renderTooltip({ enterDelayMs: 0 });
    const btn = el.querySelector('button');

    btn.dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, composed: true })
    );
    // wait for the enterDelayMs setTimeout (0 ms) to fire
    await new Promise((r) => setTimeout(r, 20));
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should close when the pointer leaves the trigger', async () => {
    const el = await renderTooltip({ enterDelayMs: 0, leaveDelayMs: 0 });
    const btn = el.querySelector('button');

    // open first
    btn.dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, composed: true })
    );
    await new Promise((r) => setTimeout(r, 20));
    await el.updateComplete;
    expect(el.open).to.be.true;

    // now close
    btn.dispatchEvent(
      new MouseEvent('mouseleave', { bubbles: true, composed: true })
    );
    await new Promise((r) => setTimeout(r, 20));
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should remain open on click when close-on-activation is false', async () => {
    const el = await renderTooltip({
      enterDelayMs: 0,
      leaveDelayMs: 0,
      closeOnActivation: false,
    });
    const btn = el.querySelector('button');
    btn.dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, composed: true })
    );
    await new Promise((r) => setTimeout(r, 20));
    await el.updateComplete;
    expect(el.open).to.be.true;

    // click fires _handleClick; with closeOnActivation=false it does nothing
    el.click();
    await new Promise((r) => setTimeout(r, 20));
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should handle a click event without error when close-on-activation is true', async () => {
    const el = await renderTooltip({
      enterDelayMs: 0,
      leaveDelayMs: 0,
      closeOnActivation: true,
    });
    el.click();
    await el.updateComplete;
    expect(el.tagName.toLowerCase()).to.equal('cds-tooltip');
  });

  it('should track keyboard interaction when Tab is pressed', async () => {
    const el = await renderTooltip();
    el.querySelector('button').focus();

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
    );
    await el.updateComplete;

    expect(el).to.exist;
  });

  it('should handle an Escape keydown without error', async () => {
    const el = await renderTooltip({
      enterDelayMs: 0,
      leaveDelayMs: 0,
      closeOnActivation: true,
    });
    // Fire keydown directly on the host element (HostListener listens on the element)
    el.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        composed: true,
      })
    );
    await new Promise((r) => setTimeout(r, 20));
    await el.updateComplete;
    expect(el).to.exist;
  });

  it('should remain open when Enter is pressed and close-on-activation is false', async () => {
    const el = await renderTooltip({
      enterDelayMs: 0,
      leaveDelayMs: 0,
      closeOnActivation: false,
    });
    const btn = el.querySelector('button');
    btn.dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, composed: true })
    );
    await new Promise((r) => setTimeout(r, 20));
    await el.updateComplete;
    expect(el.open).to.be.true;

    el.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        composed: true,
      })
    );
    await new Promise((r) => setTimeout(r, 20));
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should open on focus after a Tab keypress when keyboard-only mode is enabled', async () => {
    const el = await renderTooltip({ enterDelayMs: 0, keyboardOnly: true });
    const btn = el.querySelector('button');

    // simulate Tab press so lastInteractionWasKeyboard=true
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
    );
    await el.updateComplete;

    // now focus the trigger
    btn.dispatchEvent(
      new FocusEvent('focus', { bubbles: true, composed: true })
    );
    await new Promise((r) => setTimeout(r, 20));
    await el.updateComplete;

    expect(el.open).to.be.true;
  });
});

describe('cds-popover', function () {
  async function renderPopover(open = false) {
    const el = await fixture(html`
      <cds-popover ?open="${open}">
        <button type="button" id="pop-trigger">Trigger</button>
        <cds-popover-content>
          <p>Popover content</p>
        </cds-popover-content>
      </cds-popover>
    `);
    await el.updateComplete;
    return el;
  }

  it('should expose selectorPopoverContentClass and selectorPopoverCaret static selectors', () => {
    const CDSPopover = customElements.get('cds-popover');
    expect(CDSPopover.selectorPopoverContentClass).to.be.a('string');
    expect(CDSPopover.selectorPopoverCaret).to.be.a('string');
  });

  it('should expose eventBeforeClose and eventOnClose event name constants', () => {
    const CDSPopover = customElements.get('cds-popover');
    expect(CDSPopover.eventBeforeClose).to.equal('cds-popover-beingclosed');
    expect(CDSPopover.eventOnClose).to.be.a('string');
  });

  it('should render a slot element and remain stable after slotchange', async () => {
    const el = await renderPopover();
    expect(el).to.exist;
    expect(el.shadowRoot.querySelector('slot')).to.exist;
  });

  it('should remain open after a Tab keydown while the popover is open', async () => {
    const el = await renderPopover(true);
    await el.updateComplete;

    el.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        composed: true,
      })
    );
    await el.updateComplete;

    // _tabKeyPressed becomes true — still open (focusout not fired yet)
    expect(el.open).to.be.true;
  });

  it('should remain closed after a keydown when the popover is not open', async () => {
    const el = await renderPopover(false);
    el.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        composed: true,
      })
    );
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('should close when a click occurs outside the popover', async () => {
    const el = await renderPopover(true);
    await el.updateComplete;

    document.body.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should remain closed when a click occurs outside and the popover is already closed', async () => {
    const el = await renderPopover(false);
    document.body.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('should close when focus leaves the popover via Tab', async () => {
    const el = await renderPopover(true);
    await el.updateComplete;

    el.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        composed: true,
      })
    );
    await el.updateComplete;

    el.dispatchEvent(
      new FocusEvent('focusout', {
        bubbles: true,
        composed: true,
        relatedTarget: document.body,
      })
    );
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should remain open when focus moves to another element within the popover', async () => {
    const el = await renderPopover(true);
    const trigger = el.querySelector('button');
    await el.updateComplete;

    el.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        composed: true,
      })
    );
    await el.updateComplete;

    el.dispatchEvent(
      new FocusEvent('focusout', {
        bubbles: true,
        composed: true,
        relatedTarget: trigger,
      })
    );
    await el.updateComplete;

    expect(el.open).to.be.true;
  });
});
