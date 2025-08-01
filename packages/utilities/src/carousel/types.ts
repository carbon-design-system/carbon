/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface CarouselStackHistory {
  id: number;
  elem: HTMLLIElement;
}

type CarouselResponse = {
  currentIndex: number;
  lastIndex: number;
  totalViews: number;
  historyStack: CarouselStackHistory[];
};

type ActiveItem = {
  index: number;
  item: HTMLElement | null;
};

export type Config = {
  onViewChangeStart?: (args: CarouselResponse) => void;
  onViewChangeEnd?: (args: CarouselResponse) => void;
  excludeSwipeSupport?: boolean;
};

interface InitCarousel {
  next: () => void;
  prev: () => void;
  reset: () => void;
  goToIndex: (index: number) => void;
  getActiveItem: () => ActiveItem;
  destroyEvents: (() => void) | null;
  allViews: Record<number, HTMLElement | null>;
}
export type { CarouselStackHistory, CarouselResponse, InitCarousel };
