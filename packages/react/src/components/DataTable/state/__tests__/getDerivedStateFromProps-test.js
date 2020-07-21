/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getDerivedStateFromProps from '../getDerivedStateFromProps';
import { defaultSortRow } from '../../tools/sorting';

describe('getDerivedStateFromProps', () => {
  it('uses prevState if available', () => {
    const prevState = { sortDirection: 'DESC', sortHeaderKey: 'mockKey' };
    const props = {
      rows: [],
      headers: [],
    };
    expect(getDerivedStateFromProps(props, prevState)).toEqual(
      expect.objectContaining(prevState)
    );
  });

  it('has default values if prevState is not available', () => {
    const props = {
      rows: [],
      headers: [],
    };
    expect(getDerivedStateFromProps(props, {})).toEqual(
      expect.objectContaining({
        sortDirection: 'NONE',
        sortHeaderKey: null,
      })
    );
  });

  describe('with previous state', () => {
    let mockProps;

    beforeEach(() => {
      mockProps = {
        rows: [
          {
            id: '1',
            sortField: 'b',
          },
          {
            id: '2',
            sortField: 'c',
          },
          {
            id: '0',
            sortField: 'a',
          },
        ],
        headers: [
          {
            key: 'sortField',
            header: 'Sort field',
          },
        ],
        sortRow: defaultSortRow,
        locale: 'en',
      };
    });

    it('should preserve the previous sort state', () => {
      const initialState = getDerivedStateFromProps(mockProps, {});
      expect(initialState.rowIds).toEqual(['1', '2', '0']);
      const prevState = {
        sortHeaderKey: 'sortField',
        sortDirection: 'ASC',
      };
      const nextState = getDerivedStateFromProps(mockProps, prevState);
      expect(nextState.rowIds).toEqual(['0', '1', '2']);
    });

    it('should preserve the previous filter state', () => {
      const initialState = getDerivedStateFromProps(mockProps, {});
      expect(initialState.filterInputValue).toBe(null);
      const prevState = {
        filterInputValue: 'a',
      };
      const nextState = getDerivedStateFromProps(mockProps, prevState);
      expect(nextState.filterInputValue).toBe('a');
    });

    it('should preserve the previous batch action state', () => {
      const initialState = getDerivedStateFromProps(mockProps, {});
      expect(initialState.shouldShowBatchActions).toBe(false);
      const prevState = {
        shouldShowBatchActions: true,
      };
      const nextState = getDerivedStateFromProps(mockProps, prevState);
      expect(nextState.shouldShowBatchActions).toBe(true);
    });
  });
});
