/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { initCarousal } from './carousal';

describe('initCarousal', () => {
  let container;
  let mockOnViewChangeStart;
  let mockOnViewChangeEnd;

  beforeEach(() => {
    document.body.innerHTML = `
    <div id="carousal">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </div>
  `;

    container = document.getElementById('carousal');
    mockOnViewChangeStart = jest.fn();
    mockOnViewChangeEnd = jest.fn();
  });

  test('initializes carousal with correct classes and wrapper', () => {
    initCarousal(container, mockOnViewChangeStart, mockOnViewChangeEnd);

    const wrapper = container.querySelector('.carousal__itemsWrapper');
    expect(wrapper).toBeTruthy();
    expect(container.classList.contains('carousal__view-stack')).toBe(true);
    expect(wrapper?.children.length).toBe(3);
  });

  test('getActiveItem returns correct index and item', () => {
    const carousal = initCarousal(
      container,
      mockOnViewChangeStart,
      mockOnViewChangeEnd
    );

    const active = carousal.getActiveItem();
    expect(active.index).toBe(0);
    expect(active.item?.textContent).toBe('Slide 1');
  });

  test('navigate next triggers onViewChangeStart and onViewChangeEnd', () => {
    const carousal = initCarousal(
      container,
      mockOnViewChangeStart,
      mockOnViewChangeEnd
    );

    carousal.next();
    const active = carousal.getActiveItem();

    expect(mockOnViewChangeStart).toHaveBeenCalled();
    expect(mockOnViewChangeEnd).toHaveBeenCalled();
    expect(active.index).toBe(1);
  });
  it('should navigate to the previous view', () => {
    const carousal = initCarousal(
      container,
      mockOnViewChangeStart,
      mockOnViewChangeEnd
    );
    carousal.next(); // go to index 1
    carousal.prev();
    const active = carousal.getActiveItem();
    expect(active.index).toBe(0);
  });

  test('navigate prev does not go below index 0', () => {
    const carousal = initCarousal(
      container,
      mockOnViewChangeStart,
      mockOnViewChangeEnd
    );

    carousal.prev(); // Should not move
    expect(carousal.getActiveItem().index).toBe(0);

    carousal.next();
    carousal.prev(); // Should go back to 0
    expect(carousal.getActiveItem().index).toBe(0);
  });

  test('goToIndex navigates to correct slide', () => {
    const carousal = initCarousal(
      container,
      mockOnViewChangeStart,
      mockOnViewChangeEnd
    );

    carousal.goToIndex(2);
    const active = carousal.getActiveItem();

    expect(active.index).toBe(2);
    expect(active.item?.textContent).toBe('Slide 3');
  });

  test('reset goes back to first slide', () => {
    const carousal = initCarousal(
      container,
      mockOnViewChangeStart,
      mockOnViewChangeEnd
    );

    carousal.goToIndex(2);
    carousal.reset();
    const active = carousal.getActiveItem();

    expect(active.index).toBe(0);
  });
});
