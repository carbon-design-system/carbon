/**
 * Copyright IBM Corp. 2025, 2026
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

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('initializes carousel with correct classes and wrapper', () => {
    initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    const wrapper = container.querySelector('.carousel__itemsWrapper');
    expect(wrapper).toBeInTheDocument();
    expect(container.classList.contains('carousel__view-stack')).toBe(true);
    expect(wrapper?.children.length).toBe(3);
  });

  test('initializes carousel with correct a11y attributes', () => {
    initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    const liveRegion = container.querySelector('.carousel__live-region');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion.getAttribute('aria-live')).toBe('polite');
    expect(liveRegion.getAttribute('aria-atomic')).toBe('true');
    expect(liveRegion.textContent).toBe('Item 1 of 3');

    const wrapper = container.querySelector('.carousel__itemsWrapper');
    const children = [...wrapper.children];
    children.forEach((child, idx) => {
      if (idx === 0) {
        expect(child.getAttribute('aria-hidden')).toBe(null);
        expect(child.getAttribute('inert')).toBe(null);
      } else {
        expect(child.getAttribute('aria-hidden')).toBe('true');
        expect(child.getAttribute('inert')).toBe('');
      }
    });
  });

  test('only generates live region once', () => {
    initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    expect(container.querySelectorAll('.carousel__live-region').length).toBe(1);

    initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    expect(container.querySelectorAll('.carousel__live-region').length).toBe(1);
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
    expect(container.querySelector('.carousel__live-region').textContent).toBe(
      'Item 1 of 3'
    );
    carousel.next(); // go to index 1
    expect(container.querySelector('.carousel__live-region').textContent).toBe(
      'Item 2 of 3'
    );
    carousel.prev();
    expect(container.querySelector('.carousel__live-region').textContent).toBe(
      'Item 1 of 3'
    );
    const active = carousel.getActiveItem();
    expect(active.index).toBe(0);
  });

  test('should return correct callback data when transitions or animations are disabled', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const carousel = initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    carousel.next();
    expect(mockOnViewChangeEnd.mock.lastCall[0].currentIndex).toBe(1);

    carousel.next();
    expect(mockOnViewChangeEnd.mock.lastCall[0].currentIndex).toBe(2);

    carousel.prev();
    expect(mockOnViewChangeEnd.mock.lastCall[0].currentIndex).toBe(1);
  });

  test('nav controls handle out of bounds', () => {
    const carousel = initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    // attempt to go below first index
    carousel.prev();
    expect(container.querySelector('.carousel__live-region').textContent).toBe(
      'Item 1 of 3'
    );
    expect(carousel.getActiveItem().index).toBe(0);

    // attempt to go beyond the last index
    for (let i = 0; i <= 3; i++) {
      carousel.next();
    }
    expect(container.querySelector('.carousel__live-region').textContent).toBe(
      'Item 3 of 3'
    );
    expect(carousel.getActiveItem().index).toBe(2);
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

  test('goToIndex handles out of bounds', () => {
    const carousel = initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    let active;

    carousel.goToIndex(-1);
    active = carousel.getActiveItem();
    expect(active.index).toBe(0);
    expect(active.item?.textContent).toBe('Slide 1');
    expect(container.querySelector('.carousel__live-region').textContent).toBe(
      'Item 1 of 3'
    );

    carousel.goToIndex(999999);
    active = carousel.getActiveItem();
    expect(active.index).toBe(2);
    expect(active.item?.textContent).toBe('Slide 3');
    expect(container.querySelector('.carousel__live-region').textContent).toBe(
      'Item 3 of 3'
    );
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

  test('should stop transition callbacks after `destroyEvents`', () => {
    const carousel = initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    mockOnViewChangeEnd.mockClear();

    const activeItem = carousel.getActiveItem().item;

    activeItem?.dispatchEvent(new Event('transitionend'));
    expect(mockOnViewChangeEnd).toHaveBeenCalledTimes(1);

    carousel.destroyEvents();
    activeItem?.dispatchEvent(new Event('transitionend'));
    expect(mockOnViewChangeEnd).toHaveBeenCalledTimes(1);
  });

  test('live region is not created when carousel has no children ', () => {
    document.body.innerHTML = `<div id="carousel"></div>`;
    const container = document.getElementById('carousel');

    initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    expect(
      container.querySelector('.carousel__live-region')
    ).not.toBeInTheDocument();
  });

  test('onViewChangeEnd is called only once the first time that it is called', () => {
    const carousel = initCarousel(container, {
      onViewChangeStart: mockOnViewChangeStart,
      onViewChangeEnd: mockOnViewChangeEnd,
    });

    mockOnViewChangeEnd.mockClear();

    carousel.next();

    const activeItem = carousel.getActiveItem().item;
    activeItem?.dispatchEvent(new Event('transitionend'));

    expect(mockOnViewChangeEnd).toHaveBeenCalledTimes(1);
    expect(mockOnViewChangeEnd).toHaveBeenLastCalledWith(
      expect.objectContaining({ currentIndex: 1 })
    );
  });
});
