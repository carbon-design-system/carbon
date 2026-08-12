/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, fixture, expect, oneEvent, aTimeout } from '@open-wc/testing';
import '../index';

describe('cds-resizer-grid', function () {
  it('should render cds-resizer-grid', async () => {
    const grid = await fixture(html`
      <cds-resizer-grid>
        <cds-resizer-panel slot="left">Left panel</cds-resizer-panel>
        <cds-resizer-panel slot="right">Right panel</cds-resizer-panel>
      </cds-resizer-grid>
    `);
    expect(grid).dom.to.equalSnapshot();
    expect(grid).shadowDom.to.be.accessible();
  });

  it('should render all slot elements', async () => {
    const grid = await fixture(html`
      <cds-resizer-grid>
        <cds-resizer-panel slot="left">Left</cds-resizer-panel>
        <cds-resizer-panel slot="right">Right</cds-resizer-panel>
        <cds-resizer-panel slot="top">Top</cds-resizer-panel>
        <cds-resizer-panel slot="bottom">Bottom</cds-resizer-panel>
        <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
        <cds-resizer-handle slot="handle-vertical"></cds-resizer-handle>
      </cds-resizer-grid>
    `);

    const slots = grid.shadowRoot.querySelectorAll('slot');
    expect(slots.length).to.equal(6);
    expect(grid.shadowRoot.querySelector('slot[name="left"]')).to.exist;
    expect(grid.shadowRoot.querySelector('slot[name="right"]')).to.exist;
    expect(grid.shadowRoot.querySelector('slot[name="top"]')).to.exist;
    expect(grid.shadowRoot.querySelector('slot[name="bottom"]')).to.exist;
    expect(grid.shadowRoot.querySelector('slot[name="handle-horizontal"]')).to
      .exist;
    expect(grid.shadowRoot.querySelector('slot[name="handle-vertical"]')).to
      .exist;
  });

  it('should accept custom CSS properties for panel sizing', async () => {
    const grid = await fixture(html`
      <cds-resizer-grid
        style="--start-element-size: 2fr; --end-element-size: 1fr;">
        <cds-resizer-panel slot="left">Left</cds-resizer-panel>
        <cds-resizer-panel slot="right">Right</cds-resizer-panel>
      </cds-resizer-grid>
    `);

    const computedStyle = getComputedStyle(grid);
    expect(
      computedStyle.getPropertyValue('--start-element-size').trim()
    ).to.equal('2fr');
    expect(
      computedStyle.getPropertyValue('--end-element-size').trim()
    ).to.equal('1fr');
  });
});

describe('cds-resizer-panel', function () {
  it('should render cds-resizer-panel', async () => {
    const panel = await fixture(html`
      <cds-resizer-panel>Panel content</cds-resizer-panel>
    `);
    expect(panel).dom.to.equalSnapshot();
    expect(panel).shadowDom.to.be.accessible();
  });

  it('should render slotted content', async () => {
    const panel = await fixture(html`
      <cds-resizer-panel>
        <div class="test-content">Test content</div>
      </cds-resizer-panel>
    `);

    const slottedContent = panel.querySelector('.test-content');
    expect(slottedContent).to.exist;
    expect(slottedContent.textContent).to.equal('Test content');
  });

  it('should accept slot attribute', async () => {
    const panel = await fixture(html`
      <cds-resizer-panel slot="left">Left panel</cds-resizer-panel>
    `);
    expect(panel.getAttribute('slot')).to.equal('left');
  });
});

describe('cds-resizer-handle', function () {
  it('should render cds-resizer-handle', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle></cds-resizer-handle>
    `);
    handle.setAttribute('aria-valuenow', '50');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    await handle.updateComplete;
    expect(handle).dom.to.equalSnapshot();
    await expect(handle).shadowDom.to.be.accessible();
  });

  it('should set accessibility attributes on connect', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle></cds-resizer-handle>
    `);
    expect(handle.getAttribute('role')).to.equal('separator');
    expect(handle.getAttribute('tabindex')).to.equal('0');
    expect(handle.hasAttribute('aria-orientation')).to.be.true;
    expect(handle.getAttribute('aria-live')).to.equal('assertive');
  });

  it('should set vertical aria-orientation for handle-horizontal slot', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
    `);
    expect(handle.getAttribute('aria-orientation')).to.equal('vertical');
  });

  it('should set horizontal aria-orientation for handle-vertical slot', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle slot="handle-vertical"></cds-resizer-handle>
    `);
    expect(handle.getAttribute('aria-orientation')).to.equal('horizontal');
  });

  it('should render icon slot', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle>
        <svg slot="icon" width="16" height="16"></svg>
      </cds-resizer-handle>
    `);
    const icon = handle.querySelector('[slot="icon"]');
    expect(icon).to.exist;
    expect(icon.tagName.toLowerCase()).to.equal('svg');
  });

  it('should render screen reader text', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle></cds-resizer-handle>
    `);
    const srText = handle.shadowRoot.querySelector('.sr-only');
    expect(srText).to.exist;
    expect(srText.textContent).to.include('Use arrow keys to resize');
  });

  it('should emit resize-start event on pointer down', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle></cds-resizer-handle>
    `);
    setTimeout(() => {
      handle.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          clientX: 100,
          clientY: 100,
        })
      );
    });
    const { detail } = await oneEvent(handle, 'resize-start');
    expect(detail.axis).to.exist;
    expect(detail.startPosition.x).to.equal(100);
    expect(detail.startPosition.y).to.equal(100);
  });

  it('should emit resize-drag event during pointer move', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle></cds-resizer-handle>
    `);
    handle.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 100,
        clientY: 100,
      })
    );
    setTimeout(() => {
      window.dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          clientX: 150,
          clientY: 100,
        })
      );
    });
    const { detail } = await oneEvent(handle, 'resize-drag');
    expect(detail.axis).to.exist;
    expect(detail.delta).to.exist;
    expect(detail.position).to.exist;
  });

  it('should emit resize-end event on pointer up', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle></cds-resizer-handle>
    `);
    handle.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 100,
        clientY: 100,
      })
    );
    setTimeout(() => {
      window.dispatchEvent(
        new PointerEvent('pointerup', {
          bubbles: true,
          clientX: 150,
          clientY: 100,
        })
      );
    });
    const { detail } = await oneEvent(handle, 'resize-end');
    expect(detail.axis).to.exist;
    expect(detail.delta).to.be.a('number');
  });

  it('should emit resize-reset on double tap', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle></cds-resizer-handle>
    `);
    handle.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 100,
        clientY: 100,
      })
    );
    setTimeout(() => {
      handle.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          clientX: 100,
          clientY: 100,
        })
      );
    }, 100);
    const event = await oneEvent(handle, 'resize-reset');
    expect(event).to.exist;
  });

  it('should handle ArrowRight keyboard navigation', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
    `);
    setTimeout(() => {
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      );
    });
    const { detail } = await oneEvent(handle, 'resize-drag');
    expect(detail.delta).to.equal(5);
  });

  it('should handle ArrowLeft keyboard navigation', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
    `);
    setTimeout(() => {
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      );
    });
    const { detail } = await oneEvent(handle, 'resize-drag');
    expect(detail.delta).to.equal(-5);
  });

  it('should handle ArrowDown keyboard navigation', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle slot="handle-vertical"></cds-resizer-handle>
    `);
    setTimeout(() => {
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
    });
    const { detail } = await oneEvent(handle, 'resize-drag');
    expect(detail.delta).to.equal(5);
  });

  it('should handle ArrowUp keyboard navigation', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle slot="handle-vertical"></cds-resizer-handle>
    `);
    setTimeout(() => {
      handle.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
      );
    });
    const { detail } = await oneEvent(handle, 'resize-drag');
    expect(detail.delta).to.equal(-5);
  });

  it('should use larger step with Shift key', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
    `);
    setTimeout(() => {
      handle.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          shiftKey: true,
          bubbles: true,
        })
      );
    });
    const { detail } = await oneEvent(handle, 'resize-drag');
    expect(detail.delta).to.equal(25);
  });

  it('should not emit resize-drag for non-navigation keys', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle></cds-resizer-handle>
    `);
    let called = false;
    handle.addEventListener('resize-drag', () => {
      called = true;
    });
    handle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', bubbles: true })
    );
    await aTimeout(100);
    expect(called).to.be.false;
  });

  it('should set and clear synthetic hover state', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle></cds-resizer-handle>
    `);
    handle.setSyntheticHoverState(true);
    expect(handle.hasAttribute('data-synthetic-hover')).to.be.true;
    handle.setSyntheticHoverState(false);
    expect(handle.hasAttribute('data-synthetic-hover')).to.be.false;
  });

  it('should set and clear synthetic active state', async () => {
    const handle = await fixture(html`
      <cds-resizer-handle></cds-resizer-handle>
    `);
    handle.setSyntheticActiveState(true);
    expect(handle.hasAttribute('data-synthetic-active')).to.be.true;
    handle.setSyntheticActiveState(false);
    expect(handle.hasAttribute('data-synthetic-active')).to.be.false;
  });

  it('should update grid CSS properties during drag', async () => {
    const grid = await fixture(html`
      <cds-resizer-grid>
        <cds-resizer-panel slot="left" style="width: 300px;"
          >Left</cds-resizer-panel
        >
        <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
        <cds-resizer-panel slot="right" style="width: 300px;"
          >Right</cds-resizer-panel
        >
      </cds-resizer-grid>
    `);
    const handle = grid.querySelector('cds-resizer-handle');
    await aTimeout(100);
    handle.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 300,
        clientY: 100,
      })
    );
    window.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 350,
        clientY: 100,
      })
    );
    await aTimeout(100);
    expect(grid.style.getPropertyValue('--start-element-size')).to.not.be.empty;
    expect(grid.style.getPropertyValue('--end-element-size')).to.not.be.empty;
  });

  it('should remove transition during drag', async () => {
    const grid = await fixture(html`
      <cds-resizer-grid>
        <cds-resizer-panel slot="left" style="width: 300px;"
          >Left</cds-resizer-panel
        >
        <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
        <cds-resizer-panel slot="right" style="width: 300px;"
          >Right</cds-resizer-panel
        >
      </cds-resizer-grid>
    `);
    const handle = grid.querySelector('cds-resizer-handle');
    await aTimeout(100);
    handle.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 300,
        clientY: 100,
      })
    );
    window.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 350,
        clientY: 100,
      })
    );
    await aTimeout(50);
    expect(grid.style.transition).to.equal('none');
  });
});

describe('cds-resizer-handle-pivot', function () {
  it('should render cds-resizer-handle-pivot', async () => {
    const pivot = await fixture(html`
      <cds-resizer-handle-pivot></cds-resizer-handle-pivot>
    `);
    expect(pivot).dom.to.equalSnapshot();
    expect(pivot).shadowDom.to.be.accessible();
  });

  it('should set slot attribute to pivot on connect', async () => {
    const pivot = await fixture(html`
      <cds-resizer-handle-pivot></cds-resizer-handle-pivot>
    `);
    expect(pivot.getAttribute('slot')).to.equal('pivot');
  });

  it('should set synthetic hover state on pointer enter', async () => {
    const grid = await fixture(html`
      <cds-resizer-grid>
        <cds-resizer-panel slot="left">
          <cds-resizer-grid>
            <cds-resizer-panel slot="left">Inner Left</cds-resizer-panel>
            <cds-resizer-handle slot="handle-horizontal">
              <cds-resizer-handle-pivot slot="pivot"></cds-resizer-handle-pivot>
            </cds-resizer-handle>
            <cds-resizer-panel slot="right">Inner Right</cds-resizer-panel>
          </cds-resizer-grid>
        </cds-resizer-panel>
        <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
        <cds-resizer-panel slot="right">Right</cds-resizer-panel>
      </cds-resizer-grid>
    `);
    const outerHandle = grid.querySelector(
      'cds-resizer-handle[slot="handle-horizontal"]'
    );
    const pivot = grid.querySelector('cds-resizer-handle-pivot');
    await Promise.all([outerHandle.updateComplete, pivot.updateComplete]);
    pivot.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
    await outerHandle.updateComplete;
    expect(outerHandle.hasAttribute('data-synthetic-hover')).to.be.true;
  });

  it('should clear synthetic hover state on pointer leave', async () => {
    const grid = await fixture(html`
      <cds-resizer-grid>
        <cds-resizer-panel slot="left">
          <cds-resizer-grid>
            <cds-resizer-panel slot="left">Inner Left</cds-resizer-panel>
            <cds-resizer-handle slot="handle-horizontal">
              <cds-resizer-handle-pivot slot="pivot"></cds-resizer-handle-pivot>
            </cds-resizer-handle>
            <cds-resizer-panel slot="right">Inner Right</cds-resizer-panel>
          </cds-resizer-grid>
        </cds-resizer-panel>
        <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
        <cds-resizer-panel slot="right">Right</cds-resizer-panel>
      </cds-resizer-grid>
    `);
    const outerHandle = grid.querySelector(
      'cds-resizer-handle[slot="handle-horizontal"]'
    );
    const pivot = grid.querySelector('cds-resizer-handle-pivot');
    await Promise.all([outerHandle.updateComplete, pivot.updateComplete]);
    pivot.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
    await outerHandle.updateComplete;
    expect(outerHandle.hasAttribute('data-synthetic-hover')).to.be.true;
    pivot.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
    await outerHandle.updateComplete;
    expect(outerHandle.hasAttribute('data-synthetic-hover')).to.be.false;
  });

  it('should clean up synthetic states on disconnect', async () => {
    const grid = await fixture(html`
      <cds-resizer-grid>
        <cds-resizer-panel slot="left">
          <cds-resizer-grid>
            <cds-resizer-panel slot="left">Inner Left</cds-resizer-panel>
            <cds-resizer-handle slot="handle-horizontal">
              <cds-resizer-handle-pivot slot="pivot"></cds-resizer-handle-pivot>
            </cds-resizer-handle>
            <cds-resizer-panel slot="right">Inner Right</cds-resizer-panel>
          </cds-resizer-grid>
        </cds-resizer-panel>
        <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
        <cds-resizer-panel slot="right">Right</cds-resizer-panel>
      </cds-resizer-grid>
    `);
    const outerHandle = grid.querySelector(
      'cds-resizer-handle[slot="handle-horizontal"]'
    );
    const pivot = grid.querySelector('cds-resizer-handle-pivot');
    await Promise.all([outerHandle.updateComplete, pivot.updateComplete]);
    pivot.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
    await outerHandle.updateComplete;
    expect(outerHandle.hasAttribute('data-synthetic-hover')).to.be.true;
    pivot.remove();
    await Promise.all([pivot.updateComplete, outerHandle.updateComplete]);
    expect(outerHandle.hasAttribute('data-synthetic-hover')).to.be.false;
  });

  it('should handle missing handle gracefully', async () => {
    const pivot = await fixture(html`
      <cds-resizer-handle-pivot></cds-resizer-handle-pivot>
    `);
    expect(() =>
      pivot.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          clientX: 100,
          clientY: 100,
        })
      )
    ).to.not.throw();
  });
});

describe('Resizer integration', function () {
  it('should work with a complete horizontal grid layout', async () => {
    const grid = await fixture(html`
      <cds-resizer-grid>
        <cds-resizer-panel slot="left">
          <div style="padding: 16px;">Left Panel</div>
        </cds-resizer-panel>
        <cds-resizer-handle slot="handle-horizontal">
          <svg slot="icon" width="16" height="16"></svg>
        </cds-resizer-handle>
        <cds-resizer-panel slot="right">
          <div style="padding: 16px;">Right Panel</div>
        </cds-resizer-panel>
      </cds-resizer-grid>
    `);
    expect(grid).to.exist;
    expect(grid.querySelectorAll('cds-resizer-panel').length).to.equal(2);
    expect(grid.querySelector('cds-resizer-handle')).to.exist;
  });

  it('should work with a vertical layout', async () => {
    const grid = await fixture(html`
      <cds-resizer-grid>
        <cds-resizer-panel slot="top">Top Panel</cds-resizer-panel>
        <cds-resizer-handle slot="handle-vertical"></cds-resizer-handle>
        <cds-resizer-panel slot="bottom">Bottom Panel</cds-resizer-panel>
      </cds-resizer-grid>
    `);
    const handle = grid.querySelector('cds-resizer-handle');
    expect(handle.getAttribute('aria-orientation')).to.equal('horizontal');
  });

  it('should handle the full resize workflow', async () => {
    const grid = await fixture(html`
      <cds-resizer-grid>
        <cds-resizer-panel slot="left" style="width: 300px;"
          >Left</cds-resizer-panel
        >
        <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
        <cds-resizer-panel slot="right" style="width: 300px;"
          >Right</cds-resizer-panel
        >
      </cds-resizer-grid>
    `);
    const handle = grid.querySelector('cds-resizer-handle');
    await aTimeout(100);
    const events = [];
    handle.addEventListener('resize-start', () => events.push('start'));
    handle.addEventListener('resize-drag', () => events.push('drag'));
    handle.addEventListener('resize-end', () => events.push('end'));
    handle.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 300,
        clientY: 100,
      })
    );
    await aTimeout(50);
    window.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 350,
        clientY: 100,
      })
    );
    await aTimeout(50);
    window.dispatchEvent(
      new PointerEvent('pointerup', {
        bubbles: true,
        clientX: 350,
        clientY: 100,
      })
    );
    await aTimeout(50);
    expect(events).to.include('start');
    expect(events).to.include('drag');
    expect(events).to.include('end');
  });
});
