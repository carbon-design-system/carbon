/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface CarousalStackHistory {
  id: number;
  elem: HTMLLIElement;
}

type CarousalResponse = {
  currentIndex: number;
  lastIndex: number;
  totalViews: number;
  historyStack: CarousalStackHistory[];
};

type ActiveItem = {
  index: number;
  item: HTMLElement | null;
};

export type Config = {
  onViewChangeStart?: (args: CarousalResponse) => void;
  onViewChangeEnd?: (args: CarousalResponse) => void;
  excludeSwipeSupport?: boolean;
};

interface InitCarousal {
  next: () => void;
  prev: () => void;
  reset: () => void;
  goToIndex: (index: number) => void;
  getActiveItem: () => ActiveItem;
  destroyEvents: (() => void) | null;
}
export type { CarousalStackHistory, CarousalResponse, InitCarousal };
