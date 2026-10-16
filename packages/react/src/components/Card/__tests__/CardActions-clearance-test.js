/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { act, render } from '@testing-library/react';
import { Card, CardAction, CardActions, CardHeader, CardTitle } from '..';

// CardActions keeps one module-level ResizeObserver for the whole page, so
// these tests live in their own file to get a fresh module registry and to
// install the observer mock before the first card mounts.

// The overflow handler creates its own ResizeObserver per card. Stub it so the
// only observer in play is the shared clearance observer under test.
jest.mock('@carbon/utilities', () => ({
  ...jest.requireActual('@carbon/utilities'),
  createOverflowHandler: jest.fn(() => ({ disconnect: jest.fn() })),
}));

const CLEARANCE = '--cds--card__actions-clearance';

describe('CardActions title clearance', () => {
  const originals = {};
  const instances = [];
  const frames = [];
  let notifyResize;
  let titleTop;
  let buttonLeft;

  // jsdom has no layout engine, so report rects by element role.
  const rectFor = (el) => {
    const make = (left, right, top, bottom) => ({
      left,
      right,
      top,
      bottom,
      width: right - left,
      height: bottom - top,
    });
    if (el.classList.contains('cds--card__header')) {
      return make(0, 400, 0, 120);
    }
    if (el.classList.contains('cds--card__actions')) {
      return make(200, 392, 8, 40);
    }
    if (el.classList.contains('cds--card__title')) {
      return make(16, 300, titleTop, titleTop + 32);
    }
    if (el.hasAttribute('data-offset')) {
      return make(0, 0, 0, 0);
    }
    if (el.dataset.id) {
      // Two visible buttons; the leftmost starts at x=buttonLeft (300).
      const index = Number(el.dataset.id.split('-').pop());
      return make(buttonLeft + index * 44, buttonLeft + 40 + index * 44, 8, 40);
    }
    return make(0, 0, 0, 0);
  };

  const flushFrames = () =>
    act(() => {
      while (frames.length) {
        frames.shift()(0);
      }
    });

  beforeAll(() => {
    originals.ResizeObserver = window.ResizeObserver;
    originals.raf = window.requestAnimationFrame;
    originals.rect = window.Element.prototype.getBoundingClientRect;

    window.ResizeObserver = jest.fn((callback) => {
      const instance = {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
      instances.push(instance);
      notifyResize = (targets) =>
        callback(targets.map((target) => ({ target })));
      return instance;
    });
    // Queue frames so tests control when a batch flushes, like a browser.
    window.requestAnimationFrame = (callback) => frames.push(callback);
    window.Element.prototype.getBoundingClientRect = function () {
      return rectFor(this);
    };
  });

  afterAll(() => {
    window.ResizeObserver = originals.ResizeObserver;
    window.requestAnimationFrame = originals.raf;
    window.Element.prototype.getBoundingClientRect = originals.rect;
  });

  beforeEach(() => {
    titleTop = 16;
    buttonLeft = 300;
    frames.length = 0;
  });

  const renderCard = (props = {}) =>
    render(
      <Card {...props}>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardActions>
            <CardAction>
              <button type="button">One</button>
            </CardAction>
            <CardAction>
              <button type="button">Two</button>
            </CardAction>
          </CardActions>
        </CardHeader>
      </Card>
    );

  const targetsOf = (container) => {
    const header = container.querySelector('.cds--card__header');
    const actions = container.querySelector('.cds--card__actions');
    return { header, targets: [header, ...actions.children] };
  };

  it('publishes the space the visible buttons occupy as the clearance', () => {
    const { container } = renderCard();
    const { header, targets } = targetsOf(container);

    notifyResize(targets);
    flushFrames();

    // header.right (400) minus the leftmost visible button (300).
    expect(header.style.getPropertyValue(CLEARANCE)).toBe('100px');
  });

  it('publishes 0px when the title sits entirely below the actions', () => {
    // Title starts below the actions' bottom edge (40), as it does under a
    // header media slot or any other content placed above it.
    titleTop = 72;
    const { container } = renderCard();
    const { header, targets } = targetsOf(container);

    notifyResize(targets);
    flushFrames();

    expect(header.style.getPropertyValue(CLEARANCE)).toBe('0px');
  });

  it('skips the style write when the measured value is unchanged', () => {
    const { container } = renderCard();
    const { header, targets } = targetsOf(container);
    const setProperty = jest.spyOn(header.style, 'setProperty');

    notifyResize(targets);
    flushFrames();
    notifyResize(targets);
    flushFrames();

    expect(setProperty).toHaveBeenCalledTimes(1);
  });

  it('re-measures when the layout changes after mount', () => {
    const { container } = renderCard();
    const { header, targets } = targetsOf(container);

    notifyResize(targets);
    flushFrames();
    expect(header.style.getPropertyValue(CLEARANCE)).toBe('100px');

    // e.g. late-loading media pushes the title below the actions.
    titleTop = 72;
    notifyResize(targets);
    flushFrames();
    expect(header.style.getPropertyValue(CLEARANCE)).toBe('0px');
  });

  it('batches many cards into a single animation frame', () => {
    const cards = [renderCard(), renderCard(), renderCard()];
    frames.length = 0;
    const all = cards.map(({ container }) => targetsOf(container));

    const before = frames.length;
    notifyResize(all.flatMap(({ targets }) => targets));
    expect(frames.length - before).toBe(1);

    flushFrames();
    all.forEach(({ header }) => {
      expect(header.style.getPropertyValue(CLEARANCE)).toBe('100px');
    });
  });

  it('shares one observer across cards instead of creating one per card', () => {
    // Make sure the shared observer already exists, then count constructions.
    renderCard();
    const before = window.ResizeObserver.mock.calls.length;

    renderCard();
    renderCard();
    renderCard();

    expect(window.ResizeObserver.mock.calls.length - before).toBe(0);
  });

  it('stops observing the header and buttons on unmount', () => {
    const { container, unmount } = renderCard();
    const { header, targets } = targetsOf(container);
    notifyResize(targets);
    flushFrames();

    unmount();

    expect(
      instances.some((instance) =>
        instance.unobserve.mock.calls.some(([el]) => el === header)
      )
    ).toBe(true);
  });

  it('does not write after unmount for a measurement still queued', () => {
    const { container, unmount } = renderCard();
    const { header, targets } = targetsOf(container);
    const setProperty = jest.spyOn(header.style, 'setProperty');

    notifyResize(targets);
    unmount();
    flushFrames();

    expect(setProperty).not.toHaveBeenCalled();
  });

  it('sets the clearance to 0px when all actions are removed', () => {
    const { container, rerender } = renderCard();
    const header = container.querySelector('.cds--card__header');

    rerender(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardActions />
        </CardHeader>
      </Card>
    );

    expect(header.style.getPropertyValue(CLEARANCE)).toBe('0px');
  });

  it('measures before paint without waiting for a frame or an observer', async () => {
    const { container } = renderCard();
    const header = container.querySelector('.cds--card__header');

    // Nothing has flushed synchronously, but one microtask later (still before
    // the browser paints) the measured value is in place.
    await act(async () => {
      await Promise.resolve();
    });

    expect(header.style.getPropertyValue(CLEARANCE)).toBe('100px');
  });

  it('converts the measurement back to CSS pixels under an ancestor scale', () => {
    // The header renders at half size (rect width 400, layout width 800).
    const offsetWidth = jest
      .spyOn(window.HTMLElement.prototype, 'offsetWidth', 'get')
      .mockReturnValue(800);
    try {
      const { container } = renderCard();
      const { header, targets } = targetsOf(container);

      notifyResize(targets);
      flushFrames();

      // 100 post-transform pixels are 200 CSS pixels at scale 0.5.
      expect(header.style.getPropertyValue(CLEARANCE)).toBe('200px');
    } finally {
      offsetWidth.mockRestore();
    }
  });

  it('still clears a button that spills outside the actions box', () => {
    // A button that grew after mount starts left of the actions box (x=200)
    // until the overflow handler collapses it.
    buttonLeft = 150;
    const { container } = renderCard();
    const { header, targets } = targetsOf(container);

    notifyResize(targets);
    flushFrames();

    expect(header.style.getPropertyValue(CLEARANCE)).toBe('250px');
  });
});
