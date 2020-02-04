/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createRef } from 'react';
import {
  actionTypes,
  initialState,
  resizeReducer,
  getNextColKey,
  getColRefs,
} from '../columnResize';

describe('column resizer reducer', () => {
  const ref1 = createRef();
  const key1 = 'aKey';

  function getAddAction(key = key1, ref = ref1) {
    return {
      type: actionTypes.ADD_COLUMN,
      colKey: key,
      ref,
      colWidth: 100,
    };
  }

  it('should handle ADD_COLUMN.', () => {
    const nextState = resizeReducer(initialState, getAddAction());
    expect(nextState).toEqual({
      allColumnKeys: [key1],
      columnsByKey: {
        [key1]: {
          ref: ref1,
          colWidth: 100,
        },
      },
      columnKeyResizeActive: null,
    });
  });

  it('should handle REMOVE_COLUMN.', () => {
    const removeAction = {
      type: actionTypes.REMOVE_COLUMN,
      colKey: key1,
    };
    const nextState = resizeReducer(
      resizeReducer(initialState, getAddAction()),
      removeAction
    );
    expect(nextState).toEqual(initialState);
  });

  it('should handle START_RESIZE_ACTION.', () => {
    const startAction = {
      type: actionTypes.START_RESIZE_ACTION,
      colKey: key1,
    };
    const nextState = resizeReducer(
      resizeReducer(initialState, getAddAction()),
      startAction
    );
    expect(nextState).toEqual({
      allColumnKeys: [key1],
      columnsByKey: {
        [key1]: {
          ref: ref1,
          colWidth: 100,
        },
      },
      columnKeyResizeActive: key1,
    });
  });

  it('should handle END_RESIZE_ACTION.', () => {
    const startAction = {
      type: actionTypes.START_RESIZE_ACTION,
      colKey: key1,
    };
    const endAction = {
      type: actionTypes.END_RESIZE_ACTION,
      colKey: key1,
    };
    const nextState = resizeReducer(
      resizeReducer(resizeReducer(initialState, getAddAction()), startAction),
      endAction
    );

    expect(nextState).toEqual({
      allColumnKeys: [key1],
      columnsByKey: {
        [key1]: {
          ref: ref1,
          colWidth: 100,
        },
      },
      columnKeyResizeActive: null,
    });
  });

  it('should handle UPDATE_COLWIDTH.', () => {
    const updateAction = {
      type: actionTypes.UPDATE_COLWIDTH,
      colKey: key1,
      incr: 50,
    };
    const nextState = resizeReducer(
      resizeReducer(initialState, getAddAction()),
      updateAction
    );
    expect(nextState).toEqual({
      allColumnKeys: [key1],
      columnsByKey: {
        [key1]: {
          ref: ref1,
          colWidth: 150,
        },
      },
      columnKeyResizeActive: null,
    });
  });

  it('should handle BATCH_SET_COLWIDTHS.', () => {
    const key2 = 'aKey2';
    const key3 = 'aKey3';
    const ref2 = createRef();
    const ref3 = createRef();
    const addAction2 = getAddAction(key2, ref2);
    const addAction3 = getAddAction(key3, ref3);

    const setAction = {
      type: actionTypes.BATCH_SET_COLWIDTHS,
      colKey: key1,
      colWidths: {
        aKey: 150,
        aKey2: 200,
        aKey3: 250,
      },
    };
    const nextState = resizeReducer(
      resizeReducer(resizeReducer(initialState, getAddAction()), addAction2),
      addAction3
    );
    const nextState2 = resizeReducer(nextState, setAction);

    expect(nextState2).toEqual({
      allColumnKeys: [key1, key2, key3],
      columnsByKey: {
        [key1]: {
          ref: ref1,
          colWidth: 150,
        },
        [key2]: {
          ref: ref2,
          colWidth: 200,
        },
        [key3]: {
          ref: ref3,
          colWidth: 250,
        },
      },
      columnKeyResizeActive: null,
    });
  });

  it('should return key of next column.', () => {
    const key2 = 'aKey2';
    const key3 = 'aKey3';
    const ref2 = createRef();
    const ref3 = createRef();
    const addAction2 = getAddAction(key2, ref2);
    const addAction3 = getAddAction(key3, ref3);

    const nextState = resizeReducer(
      resizeReducer(resizeReducer(initialState, getAddAction()), addAction2),
      addAction3
    );

    expect(getNextColKey(nextState, key2)).toEqual(key3);
  });

  it('should return column refs.', () => {
    const key2 = 'aKey2';
    const key3 = 'aKey3';
    const ref2 = createRef();
    const ref3 = createRef();
    const addAction2 = getAddAction(key2, ref2);
    const addAction3 = getAddAction(key3, ref3);

    const nextState = resizeReducer(
      resizeReducer(resizeReducer(initialState, getAddAction()), addAction2),
      addAction3
    );

    expect(getColRefs(nextState)).toEqual([
      { key: key1, ref: ref1 },
      { key: key2, ref: ref2 },
      { key: key3, ref: ref3 },
    ]);
  });

  it('should not handle unkown actions.', () => {
    expect(() =>
      resizeReducer(initialState, { type: 'unkown' })
    ).toThrowError();
  });
});
