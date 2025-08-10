/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { sortStates } from '../sortStates';

describe('sorting state', () => {
  let sorting;
  let initialSortState;
  let getNextSortDirection;
  let getNextSortState;

  beforeEach(() => {
    jest.mock('../../tools/sorting', () => ({
      sortRows: jest.fn(() => ['b', 'a', 'c']),
    }));

    sorting = require('../sorting');
    initialSortState = sorting.initialSortState;
    getNextSortDirection = sorting.getNextSortDirection;
    getNextSortState = sorting.getNextSortState;
  });

  describe('sortStates', () => {
    it('should describe the available sort states', () => {
      expect(sortStates).toMatchSnapshot();
    });
  });

  describe('initialSortState', () => {
    it('should set the initial sort state to NONE', () => {
      expect(initialSortState).toBe(sortStates.NONE);
    });
  });

  describe('getNextSortDirection', () => {
    let mockHeaderA;
    let mockHeaderB;
    let mockPrevState;

    beforeEach(() => {
      mockHeaderA = 'a';
      mockHeaderB = 'b';
      mockPrevState = sortStates.NONE;
    });

    it('should default to ASC', () => {
      expect(
        getNextSortDirection(mockHeaderA, mockHeaderA, mockPrevState)
      ).toBe(sortStates.ASC);
    });

    it('should transition from ASC -> DESC -> NONE', () => {
      const nextState1 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        mockPrevState
      );
      const nextState2 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        nextState1
      );
      const nextState3 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        nextState2
      );
      const nextState4 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        nextState3
      );
      expect(nextState1).toBe(sortStates.ASC);
      expect(nextState2).toBe(sortStates.DESC);
      expect(nextState3).toBe(sortStates.NONE);
      expect(nextState4).toBe(sortStates.ASC);
    });

    it('should reset to ASC if the header changes', () => {
      const nextState1 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        mockPrevState
      );
      const nextState2 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        nextState1
      );
      const nextState3 = getNextSortDirection(
        mockHeaderA,
        mockHeaderB,
        nextState2
      );
      expect(nextState1).toBe(sortStates.ASC);
      expect(nextState2).toBe(sortStates.DESC);
      expect(nextState3).toBe(sortStates.ASC);
    });
  });

  describe('getNextSortState', () => {
    let mockProps;
    let mockState;

    beforeEach(() => {
      mockProps = {
        locale: 'en',
        sortRow: jest.fn(),
      };
      mockState = {
        rowIds: ['b', 'a', 'c'],
        initialRowOrder: ['a', 'b', 'c'],
        cellsById: {
          'a:a': {
            value: 'row-a:header-a',
          },
          'a:b': {
            value: 'row-a:header-b',
          },
          'a:c': {
            value: 'row-a:header-c',
          },
          'b:a': {
            value: 'row-b:header-a',
          },
          'b:b': {
            value: 'row-b:header-b',
          },
          'b:c': {
            value: 'row-b:header-c',
          },
        },
      };
    });

    it('should initialize in ASC order for the first header called', () => {
      const sortHeaderKey = 'a';
      expect(
        getNextSortState(mockProps, mockState, { key: sortHeaderKey })
      ).toEqual({
        sortHeaderKey,
        sortDirection: sortStates.ASC,
        rowIds: ['b', 'a', 'c'],
      });
    });

    it('should iterate through the sort order for the same header key', () => {
      const sortHeaderKey = 'a';
      const nextState1 = getNextSortState(mockProps, mockState, {
        key: sortHeaderKey,
      });
      const nextState2 = getNextSortState(
        mockProps,
        {
          ...mockState,
          ...nextState1,
        },
        {
          key: sortHeaderKey,
        }
      );
      const nextState3 = getNextSortState(
        mockProps,
        {
          ...mockState,
          ...nextState2,
        },
        {
          key: sortHeaderKey,
        }
      );
      expect(nextState1).toEqual({
        sortHeaderKey,
        sortDirection: sortStates.ASC,
        rowIds: ['b', 'a', 'c'],
      });
      expect(nextState2).toEqual({
        sortHeaderKey,
        sortDirection: sortStates.DESC,
        rowIds: ['b', 'a', 'c'],
      });
      expect(nextState3).toEqual({
        sortHeaderKey,
        sortDirection: sortStates.NONE,
        // Initial row order
        rowIds: ['a', 'b', 'c'],
      });
    });

    it('should sort without `sortRow` being provided', () => {
      const state = getNextSortState({ locale: 'en' }, mockState, { key: 'a' });

      expect(state.rowIds).toEqual(['b', 'a', 'c']);
    });

    it('should reset sort direction when a different header is sorted', () => {
      const state1 = getNextSortState(mockProps, mockState, { key: 'a' });
      const state2 = getNextSortState(
        mockProps,
        { ...mockState, ...state1 },
        { key: 'b' }
      );

      expect(state2.sortDirection).toBe(sortStates.ASC);
    });

    it('should handle empty `cellsById`', () => {
      const emptyState = { ...mockState, cellsById: {} };
      const state = getNextSortState(mockProps, emptyState, { key: 'a' });

      expect(state.rowIds).toEqual(['b', 'a', 'c']);
    });
  });
});
