/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/tree-view/index.js';
import '@carbon/web-components/es/components/feature-flags/index.js';
import { aTimeout, expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';

const longLabel = 'Application development and integration solutions';
const getText = (node) =>
  node.shadowRoot.querySelector('.cds--tree-node__label__text');
const getTooltip = (node) => node.shadowRoot.querySelector('cds-tooltip');
const getLabel = (node) => node.shadowRoot.querySelector('#label');
const getTooltipSurface = (node) =>
  getTooltip(node)
    ?.querySelector('cds-tooltip-content')
    ?.shadowRoot.querySelector('.cds--tooltip-content');

function getDeepActiveElement() {
  let activeElement = document.activeElement;
  while (activeElement?.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}

function getDeepElementFromPoint(x, y) {
  let element = document.elementFromPoint(x, y);
  while (element?.shadowRoot) {
    const nestedElement = element.shadowRoot.elementFromPoint(x, y);
    if (!nestedElement || nestedElement === element) {
      break;
    }
    element = nestedElement;
  }
  return element;
}

async function createTree(content, size = 'sm') {
  const wrapper = await fixture(html`
    <div>
      <cds-tree-view label="Tree" size=${size}>${content}</cds-tree-view>
    </div>
  `);
  wrapper.style.inlineSize = '160px';
  const nodes = [...wrapper.querySelectorAll('cds-tree-node')];
  await Promise.all(nodes.map((node) => node.updateComplete));
  await waitUntil(() => getText(nodes[0])?.clientWidth > 0);
  return { wrapper, nodes };
}

function hoverLabel(node) {
  getLabel(node).dispatchEvent(new MouseEvent('mouseenter'));
}

describe('cds-tree-view label truncation', () => {
  afterEach(async () => {
    await sendMouse({ type: 'move', position: [0, 0] });
  });

  for (const size of ['sm', 'xs']) {
    for (const withLinks of [false, true]) {
      it(`should truncate leaf and parent labels with size ${size}, links=${withLinks}`, async () => {
        const { wrapper, nodes } = await createTree(
          html`
            <cds-tree-node
              label=${longLabel}
              .href=${withLinks ? '#leaf' : undefined}>
              <svg slot="icon" width="16" height="16"></svg>
            </cds-tree-node>
            <cds-tree-node
              label=${longLabel}
              .href=${withLinks ? '#parent' : undefined}
              is-expanded>
              <svg slot="icon" width="16" height="16"></svg>
              <cds-tree-node
                label=${longLabel}
                .href=${withLinks ? '#child' : undefined}></cds-tree-node>
            </cds-tree-node>
          `,
          size
        );

        wrapper.style.inlineSize = '800px';
        await waitUntil(() => nodes.every((node) => !getTooltip(node)));
        const fittedRows = nodes.map((node) => ({
          height: getLabel(node).getBoundingClientRect().height,
          textStart: getText(node).getBoundingClientRect().x,
          iconStart: node
            .querySelector('[slot="icon"]')
            ?.getBoundingClientRect().x,
        }));
        wrapper.style.inlineSize = '160px';
        await waitUntil(() => nodes.every((node) => getTooltip(node)));

        for (const [index, node] of nodes.entries()) {
          const text = getText(node);
          expect(getLabel(node).getBoundingClientRect().height).to.equal(
            fittedRows[index].height
          );
          expect(text.getBoundingClientRect().x).to.equal(
            fittedRows[index].textStart
          );
          const icon = node.querySelector('[slot="icon"]');
          if (icon) {
            expect(icon.getBoundingClientRect().x).to.equal(
              fittedRows[index].iconStart
            );
          }
          expect(text.textContent.trim()).to.equal(longLabel);
          expect(text.scrollWidth).to.be.greaterThan(text.clientWidth);
          expect(getComputedStyle(text).textOverflow).to.equal('ellipsis');
          expect(getComputedStyle(text).whiteSpace).to.equal('nowrap');
          expect(node.shadowRoot.querySelector('button')).to.not.exist;

          const trigger = withLinks ? node.shadowRoot.querySelector('a') : node;
          if (node === nodes[0]) {
            trigger.focus();
          } else {
            await sendKeys({ press: 'ArrowDown' });
          }
          await waitUntil(() => getTooltip(node)?.open);
          expect(getTooltip(node).autoalign).to.be.true;
          expect(
            withLinks ? node.shadowRoot.activeElement : document.activeElement
          ).to.equal(trigger);
          await sendKeys({ press: 'Escape' });
          expect(!!getTooltip(node)?.open).to.be.false;
        }
      });
    }
  }

  it('should keep fitting labels closed on hover and focus', async () => {
    const {
      nodes: [node],
    } = await createTree(html`<cds-tree-node label="Short"></cds-tree-node>`);
    hoverLabel(node);
    node.focus();
    await aTimeout(150);
    expect(getTooltip(node)).to.not.exist;
    expect(getLabel(node).getBoundingClientRect().height).to.equal(32);
    expect(node).to.have.attribute('aria-label', 'Short');
  });

  for (const withLinks of [false, true]) {
    it(`should preserve focus when clicking the tooltip, links=${withLinks}`, async () => {
      let clicks = 0;
      const {
        nodes: [node],
      } = await createTree(
        html`<cds-tree-node
          label=${longLabel}
          .href=${withLinks ? '#target' : undefined}
          .onClick=${(event) => {
            event.preventDefault();
            clicks++;
          }}></cds-tree-node>`
      );
      const trigger = withLinks ? node.shadowRoot.querySelector('a') : node;
      trigger.focus();
      await waitUntil(() => getTooltip(node)?.open);
      await waitUntil(
        () =>
          getComputedStyle(getTooltipSurface(node)).position === 'fixed' &&
          getComputedStyle(getTooltipSurface(node)).visibility === 'visible'
      );
      const surface = getTooltipSurface(node);
      let position;
      let previousBounds;
      // Positioning can still change after the tooltip first becomes visible.
      await waitUntil(() => {
        const rect = surface.getBoundingClientRect();
        const bounds = [rect.x, rect.y, rect.width, rect.height].join(',');
        const stable = bounds === previousBounds;
        previousBounds = bounds;
        position = [
          Math.round(rect.x + rect.width / 2),
          Math.round(rect.y + rect.height / 2),
        ];
        return stable && getDeepElementFromPoint(...position) === surface;
      });
      let tooltipClicked = false;
      surface.addEventListener(
        'mousedown',
        () => {
          tooltipClicked = true;
        },
        { once: true }
      );
      await sendMouse({
        type: 'click',
        position,
      });

      expect(tooltipClicked).to.be.true;
      expect(getDeepActiveElement() === trigger).to.be.true;
      if (withLinks) {
        expect(clicks).to.equal(0);
      }
      expect(node.selected).to.be.false;
      await sendKeys({ press: 'Escape' });
      expect(getTooltip(node).open).to.be.false;
    });
  }

  it('should respond to resizing without replacing the focused link', async () => {
    const {
      wrapper,
      nodes: [node],
    } = await createTree(
      html`<cds-tree-node href="#target" label=${longLabel}></cds-tree-node>`
    );
    const link = node.shadowRoot.querySelector('a');
    link.focus();
    await waitUntil(() => getTooltip(node)?.open);

    wrapper.style.inlineSize = '800px';
    await waitUntil(() => !getTooltip(node));
    expect(getTooltip(node)).to.not.exist;
    expect(node.shadowRoot.activeElement).to.equal(link);
    expect(node.shadowRoot.querySelector('a')).to.equal(link);

    wrapper.style.inlineSize = '160px';
    await waitUntil(() => getTooltip(node)?.open);
    expect(node.shadowRoot.activeElement).to.equal(link);
  });

  it('should remeasure when the label changes', async () => {
    const {
      nodes: [node],
    } = await createTree(html`<cds-tree-node label="Short"></cds-tree-node>`);
    node.focus();
    node.label = longLabel;
    await waitUntil(() => getTooltip(node)?.open);
    expect(
      getTooltip(node).querySelector('cds-tooltip-content').textContent.trim()
    ).to.equal(longLabel);

    node.label = 'Short';
    await waitUntil(() => !getTooltip(node)?.open);
    expect(document.activeElement).to.equal(node);
  });

  it('should preserve the leave delay when resizing a truncated label', async () => {
    const {
      wrapper,
      nodes: [node],
    } = await createTree(
      html`<cds-tree-node label=${longLabel}></cds-tree-node>`
    );
    hoverLabel(node);
    await waitUntil(() => getTooltip(node)?.open);

    getLabel(node).dispatchEvent(new MouseEvent('mouseleave'));
    wrapper.style.inlineSize = '159px';
    await aTimeout(120);
    expect(getTooltip(node).open).to.be.true;
    await waitUntil(() => !getTooltip(node).open);
  });

  it('should close when resizing makes the label fit during the leave delay', async () => {
    const {
      wrapper,
      nodes: [node],
    } = await createTree(
      html`<cds-tree-node label=${longLabel}></cds-tree-node>`
    );
    hoverLabel(node);
    await waitUntil(() => getTooltip(node)?.open);

    getLabel(node).dispatchEvent(new MouseEvent('mouseleave'));
    wrapper.style.inlineSize = '800px';
    await waitUntil(() => !getTooltip(node));
    expect(getText(node).scrollWidth).to.be.at.most(getText(node).clientWidth);
  });

  it('should open while resizing without changing truncation', async () => {
    const {
      wrapper,
      nodes: [node],
    } = await createTree(
      html`<cds-tree-node label=${longLabel}></cds-tree-node>`
    );
    await waitUntil(() => getTooltip(node));
    getTooltip(node).enterDelayMs = 150;
    node.focus();

    for (const width of [159, 158, 157, 156]) {
      await aTimeout(60);
      wrapper.style.inlineSize = `${width}px`;
    }
    expect(getTooltip(node).open).to.be.true;
  });

  it('should keep the tooltip visible near the bottom of the viewport', async () => {
    const {
      wrapper,
      nodes: [node],
    } = await createTree(
      html`<cds-tree-node label=${longLabel}></cds-tree-node>`
    );
    wrapper.style.position = 'fixed';
    wrapper.style.insetBlockEnd = '0';
    wrapper.style.insetInlineStart = '0';
    node.focus();
    await waitUntil(() => getTooltip(node)?.open);
    await waitUntil(() => {
      const surface = getTooltipSurface(node);
      const rect = surface.getBoundingClientRect();
      return (
        getComputedStyle(surface).position === 'fixed' &&
        getComputedStyle(surface).visibility === 'visible' &&
        rect.height > 0 &&
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight
      );
    });
  });

  it('should reveal an unbroken label and remain open over the tooltip', async () => {
    const {
      nodes: [node],
    } = await createTree(
      html`<cds-tree-node
        label="AnUnbrokenLabelThatIsWiderThanTheTree"></cds-tree-node>`
    );
    const labelRect = getLabel(node).getBoundingClientRect();
    await sendMouse({
      type: 'move',
      position: [Math.round(labelRect.x + 50), Math.round(labelRect.y + 10)],
    });
    await waitUntil(() => getTooltip(node)?.open);

    const content = getTooltip(node).querySelector('cds-tooltip-content');
    const surface = content.shadowRoot.querySelector('.cds--tooltip-content');
    await waitUntil(() => getComputedStyle(surface).position === 'fixed');
    const rect = surface.getBoundingClientRect();
    expect(rect.width).to.be.greaterThan(labelRect.width);
    expect(rect.height).to.be.greaterThan(0);
    await sendMouse({
      type: 'move',
      position: [Math.round(rect.x + 10), Math.round(rect.y + 10)],
    });
    await aTimeout(350);
    expect(getTooltip(node)?.open).to.be.true;

    await sendKeys({ press: 'Escape' });
    expect(!!getTooltip(node)?.open).to.be.false;
    await aTimeout(150);
    expect(!!getTooltip(node)?.open).to.be.false;
  });

  it('should cancel a pending tooltip opening on Escape', async () => {
    const {
      nodes: [node],
    } = await createTree(
      html`<cds-tree-node label=${longLabel}></cds-tree-node>`
    );
    await waitUntil(() => getTooltip(node));
    node.focus();
    node.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        composed: true,
      })
    );
    await aTimeout(150);
    expect(getTooltip(node).open).to.be.false;
    expect(document.activeElement).to.equal(node);
  });

  it('should preserve selection, expansion and arrow-key navigation', async () => {
    const {
      wrapper,
      nodes: [parent, child, next],
    } = await createTree(html`
      <cds-tree-node label=${longLabel}>
        <cds-tree-node label=${longLabel}></cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Next"></cds-tree-node>
    `);
    let selected = 0;
    let toggled = 0;
    parent.addEventListener('cds-tree-node-selected', (event) => {
      expect(event.detail).to.deep.equal({ value: longLabel });
      selected++;
    });
    parent.addEventListener('cds-tree-node-toggled', (event) => {
      expect(event.detail).to.deep.equal({ value: longLabel, expanded: true });
      toggled++;
    });

    getText(parent).click();
    await parent.updateComplete;
    expect(selected).to.equal(1);
    expect(parent.selected).to.be.true;

    parent.focus();
    await sendKeys({ press: 'ArrowRight' });
    await waitUntil(
      () => child.checkVisibility() && getText(child).clientWidth > 0
    );
    expect(toggled).to.equal(1);
    await sendKeys({ press: 'ArrowDown' });
    expect(document.activeElement).to.equal(child);
    await waitUntil(() => getTooltip(child)?.open);
    await waitUntil(() => !getTooltip(parent)?.open);
    await sendKeys({ press: 'ArrowDown' });
    expect(document.activeElement).to.equal(next);
    await waitUntil(() => !getTooltip(child)?.open);
    expect(
      wrapper.querySelectorAll('cds-tree-node[tabindex="0"]').length
    ).to.equal(1);
  });

  it('should activate the link callback and select the node when clicking its label', async () => {
    let clicks = 0;
    const {
      nodes: [node],
    } = await createTree(html`
      <cds-tree-node
        href="#target"
        label=${longLabel}
        .onClick=${(event) => {
          event.preventDefault();
          clicks++;
        }}></cds-tree-node>
    `);
    getText(node).click();
    await node.updateComplete;
    expect(clicks).to.equal(1);
    expect(node).to.have.attribute('selected');
    const link = node.shadowRoot.querySelector('a');
    expect(link).to.have.attribute('href', '#target');
  });

  it('should allow reading disabled labels without selecting them', async () => {
    const {
      nodes: [node],
    } = await createTree(
      html`<cds-tree-node label=${longLabel} disabled></cds-tree-node>`
    );
    hoverLabel(node);
    await waitUntil(() => getTooltip(node)?.open);
    getText(node).click();
    await node.updateComplete;
    expect(node.selected).to.be.false;
    expect(node).to.have.attribute('aria-disabled', 'true');
  });

  it('should resume observing after reconnection', async () => {
    const {
      wrapper,
      nodes: [node],
    } = await createTree(
      html`<cds-tree-node label=${longLabel}></cds-tree-node>`
    );
    hoverLabel(node);
    await waitUntil(() => getTooltip(node)?.open);
    node.remove();
    expect(!!getTooltip(node)?.open).to.be.false;
    wrapper.querySelector('cds-tree-view').append(node);
    await node.updateComplete;
    wrapper.style.inlineSize = '800px';
    await waitUntil(
      () => getText(node).clientWidth >= getText(node).scrollWidth
    );
    hoverLabel(node);
    await aTimeout(150);
    expect(!!getTooltip(node)?.open).to.be.false;
    wrapper.style.inlineSize = '160px';
    await waitUntil(() => getTooltip(node)?.open);
  });

  it('should support RTL and the v12 release flag without extra tab stops', async () => {
    const flags = await fixture(html`
      <feature-flags enable-v12-release dir="rtl">
        <cds-tree-view label="Tree">
          <cds-tree-node label=${longLabel}></cds-tree-node>
        </cds-tree-view>
      </feature-flags>
    `);
    flags.style.display = 'block';
    flags.style.inlineSize = '160px';
    const node = flags.querySelector('cds-tree-node');
    await waitUntil(() => getText(node)?.clientWidth > 0);
    node.focus();
    await waitUntil(() => getTooltip(node)?.open);
    expect(getComputedStyle(getText(node)).direction).to.equal('rtl');
    expect(getTooltip(node).autoalign).to.be.true;
    expect(getTooltip(node).querySelector('cds-tooltip-content').caret).to.be
      .false;
    expect(node.shadowRoot.querySelector('[tabindex], button')).to.not.exist;
  });
});
