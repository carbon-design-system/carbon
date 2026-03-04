/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { initCarousel } from './carousel';

describe('initCarousel', () => {
  let container;
  let mockOnViewChangeStart;
  let mockOnViewChangeEnd;

  beforeEach(() => {
    document.body.innerHTML = `
    <div id="carousel">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </div>
  `;

    container = document.getElementById('carousel');
    mockOnViewChangeStart = jest.fn();
    mockOnViewChangeEnd = jest.fn();
  });

  test('initializes carousel with correct classes and wrapper', () => {
    initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    const wrapper = container.querySelector('.carousel__itemsWrapper');
    expect(wrapper).toBeTruthy();
    expect(container.classList.contains('carousel__view-stack')).toBe(true);
    expect(wrapper?.children.length).toBe(3);
  });

  test('initializes carousel with correct a11y attributes', () => {
    initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    const liveRegion = container.querySelector('.carousel__live-region');
    expect(liveRegion).toBeTruthy();
    expect(liveRegion.getAttribute('aria-live')).toBe('polite');
    expect(liveRegion.getAttribute('aria-atomic')).toBeTruthy();
    expect(liveRegion.innerText).toBe('Item 1 of 3');

    const wrapper = container.querySelector('.carousel__itemsWrapper');
    const children = [...wrapper.children];
    children.forEach((child, idx) => {
      if (idx === 0) {
        expect(child.getAttribute('aria-hidden')).toBe(null);
        expect(child.getAttribute('inert')).toBe(null);
      } else {
        expect(child.getAttribute('aria-hidden')).toBeTruthy();
        expect(child.getAttribute('inert')).toBe('');
      }
    });
  });

  test('getActiveItem returns correct index and item', () => {
    const carousel = initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    const active = carousel.getActiveItem();
    expect(active.index).toBe(0);
    expect(active.item?.textContent).toBe('Slide 1');
  });

  test('navigate next triggers onViewChangeStart and onViewChangeEnd', () => {
    const carousel = initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    carousel.next();
    const active = carousel.getActiveItem();

    expect(mockOnViewChangeStart).toHaveBeenCalled();
    expect(mockOnViewChangeEnd).toHaveBeenCalled();
    expect(active.index).toBe(1);
  });

  test('should navigate to the previous view', () => {
    const carousel = initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });
    carousel.next(); // go to index 1
    carousel.prev();
    const active = carousel.getActiveItem();
    expect(active.index).toBe(0);
  });

  test('navigate prev does not go below index 0', () => {
    const carousel = initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    carousel.prev(); // Should not move
    expect(carousel.getActiveItem().index).toBe(0);

    carousel.next();
    carousel.prev(); // Should go back to 0
    expect(carousel.getActiveItem().index).toBe(0);
  });

  test('goToIndex navigates to correct slide', () => {
    const carousel = initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    carousel.goToIndex(2);
    const active = carousel.getActiveItem();

    expect(active.index).toBe(2);
    expect(active.item?.textContent).toBe('Slide 3');
  });

  test('reset goes back to first slide', () => {
    const carousel = initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    carousel.goToIndex(2);
    carousel.reset();
    const active = carousel.getActiveItem();

    expect(active.index).toBe(0);
  });
});
