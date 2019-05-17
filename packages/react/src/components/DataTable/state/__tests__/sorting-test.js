/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('sorting state', () => {
  let sorting;
  let sortStates;
  let initialSortState;
  let getNextSortDirection;
  let getNextSortState;

  beforeEach(() => {
    jest.mock('../../tools/sorting', () => ({
      sortRows: jest.fn(() => ['b', 'a', 'c']),
    }));

    sorting = require('../sorting');
    sortStates = sorting.sortStates;
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
  });
});
