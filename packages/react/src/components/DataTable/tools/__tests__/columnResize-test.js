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
  distributeOverColumns,
} from '../columnResize';

describe('distributeOverColumns function tests', () => {
  const minimalState = {
    columnsByKey: {
      a: {
        initialColWidth: 50, // 10 over min width
      },
      b: {
        initialColWidth: 80, //
      },
    },
    allColumnKeys: ['a', 'b'],
  };

  it('should distribute diff value over all columns', () => {
    const distributed = distributeOverColumns(
      minimalState,
      100,
      minimalState.allColumnKeys
    );
    expect(minimalState).toEqual({
      columnsByKey: {
        a: {
          initialColWidth: 50,
          colWidth: 70, // added 1/5 * 100
        },
        b: {
          initialColWidth: 80,
          colWidth: 160, // added 4/5 * 100
        },
      },
      allColumnKeys: ['a', 'b'],
    });
    expect(distributed).toEqual(100);
  });

  it('should distribute negative diff value over all columns', () => {
    const distributed = distributeOverColumns(
      minimalState,
      -20,
      minimalState.allColumnKeys
    );
    expect(minimalState).toEqual({
      columnsByKey: {
        a: {
          initialColWidth: 50,
          colWidth: 46, // minus 1/5 * 20
        },
        b: {
          initialColWidth: 80,
          colWidth: 64, // minus 4/5 * 20
        },
      },
      allColumnKeys: ['a', 'b'],
    });
    expect(distributed).toEqual(-20);
  });

  it('should distribute negative diff value until min width is hit', () => {
    const distributed = distributeOverColumns(
      minimalState,
      -100,
      minimalState.allColumnKeys
    );
    expect(minimalState).toEqual({
      columnsByKey: {
        a: {
          initialColWidth: 50,
          colWidth: 40, // min width
        },
        b: {
          initialColWidth: 80,
          colWidth: 40, // min width
        },
      },
      allColumnKeys: ['a', 'b'],
    });
    expect(distributed).toEqual(-50);
  });

  it('should not distribute for 0 diff', () => {
    const distributed = distributeOverColumns(
      minimalState,
      0,
      minimalState.allColumnKeys
    );
    expect(minimalState).toEqual({
      columnsByKey: {
        a: {
          initialColWidth: 50,
          colWidth: 40,
        },
        b: {
          initialColWidth: 80,
          colWidth: 40,
        },
      },
      allColumnKeys: ['a', 'b'],
    });
    expect(distributed).toEqual(0);
  });
});

describe('column resizer reducer', () => {
  const key1 = 'aKey';
  const key2 = 'aKey2';
  const key3 = 'aKey3';
  const ref1 = createRef();
  const ref2 = createRef();
  const ref3 = createRef();

  const startAction = {
    type: actionTypes.START_RESIZE_ACTION,
    colKey: key1,
    initialPos: 400,
  };

  function getAddAction(key = key1, ref = ref1, width = 100) {
    return {
      type: actionTypes.ADD_COLUMN,
      colKey: key,
      ref,
      colWidth: width,
    };
  }

  function getStateFor3Columns(w1 = 100, w2 = 100, w3 = 100) {
    const addAction1 = getAddAction(key1, ref1, w1);
    const addAction2 = getAddAction(key2, ref2, w2);
    const addAction3 = getAddAction(key3, ref3, w3);

    return resizeReducer(
      resizeReducer(
        resizeReducer(resizeReducer(initialState, addAction1), addAction2),
        addAction3
      ),
      startAction
    );
  }

  it('should handle ADD_COLUMN.', () => {
    const nextState = resizeReducer(initialState, getAddAction());
    expect(nextState).toEqual({
      allColumnKeys: [key1],
      columnsByKey: {
        [key1]: {
          ref: ref1,
          colWidth: 100,
          initialColWidth: 100,
        },
      },
      resizeActivity: {},
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
          initialColWidth: 100,
        },
      },
      resizeActivity: {
        colKey: key1,
        initialPos: 400,
      },
    });
  });

  it('should handle END_RESIZE_ACTION.', () => {
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
          initialColWidth: 100,
        },
      },
      resizeActivity: {},
    });
  });

  it('should handle multi column UPDATE_COLWIDTH increasing the width.', () => {
    const nextState = getStateFor3Columns();

    const updateAction = {
      type: actionTypes.UPDATE_COLWIDTH,
      colKey: key1,
      pos: 451, // +51
    };
    const nextState2 = resizeReducer(nextState, updateAction);

    expect(nextState2).toEqual(
      expect.objectContaining({
        columnsByKey: {
          [key1]: {
            ref: ref1,
            colWidth: 151,
            initialColWidth: 100,
          },
          [key2]: {
            ref: ref1,
            colWidth: 74.5,
            initialColWidth: 100,
          },
          [key3]: {
            ref: ref1,
            colWidth: 74.5,
            initialColWidth: 100,
          },
        },
      })
    );
  });

  it('should handle UPDATE_COLWIDTH hitting min width to the right.', () => {
    const nextState = getStateFor3Columns();

    const updateAction = {
      type: actionTypes.UPDATE_COLWIDTH,
      colKey: key2,
      pos: 470, // +70
    };
    const nextState2 = resizeReducer(nextState, updateAction);

    expect(nextState2).toEqual(
      expect.objectContaining({
        columnsByKey: {
          [key1]: {
            ref: ref1,
            colWidth: 100,
            initialColWidth: 100,
          },
          [key2]: {
            ref: ref1,
            colWidth: 160,
            initialColWidth: 100,
          },
          [key3]: {
            ref: ref1,
            colWidth: 40,
            initialColWidth: 100,
          },
        },
      })
    );
  });

  it('should handle UPDATE_COLWIDTH reducing the width.', () => {
    const nextState = getStateFor3Columns();

    const updateAction = {
      type: actionTypes.UPDATE_COLWIDTH,
      colKey: key2,
      pos: 350, // i.e. -50
    };
    const nextState2 = resizeReducer(nextState, updateAction);

    expect(nextState2).toEqual(
      expect.objectContaining({
        columnsByKey: {
          [key1]: {
            ref: ref1,
            colWidth: 100,
            initialColWidth: 100,
          },
          [key2]: {
            ref: ref1,
            colWidth: 50,
            initialColWidth: 100,
          },
          [key3]: {
            ref: ref1,
            colWidth: 150,
            initialColWidth: 100,
          },
        },
      })
    );
  });

  it('should handle UPDATE_COLWIDTH reducing the width of more than 1 column.', () => {
    const nextState = getStateFor3Columns();

    const updateAction = {
      type: actionTypes.UPDATE_COLWIDTH,
      colKey: key2,
      pos: 300, // i.e. -100
    };
    const nextState2 = resizeReducer(nextState, updateAction);

    expect(nextState2).toEqual(
      expect.objectContaining({
        columnsByKey: {
          [key1]: {
            ref: ref1,
            colWidth: 60, // -40
            initialColWidth: 100,
          },
          [key2]: {
            ref: ref1,
            colWidth: 40, // -60 (up to min width)
            initialColWidth: 100,
          },
          [key3]: {
            ref: ref1,
            colWidth: 200,
            initialColWidth: 100,
          },
        },
      })
    );
  });

  it('should handle UPDATE_COLWIDTH reducing the width to min width.', () => {
    const nextState = getStateFor3Columns();

    const updateAction = {
      type: actionTypes.UPDATE_COLWIDTH,
      colKey: key2,
      pos: 250, // i.e. -150
    };
    const nextState2 = resizeReducer(nextState, updateAction);

    expect(nextState2).toEqual(
      expect.objectContaining({
        columnsByKey: {
          [key1]: {
            ref: ref1,
            colWidth: 40, // -60 (up to min width)
            initialColWidth: 100,
          },
          [key2]: {
            ref: ref1,
            colWidth: 40, // -60 (up to min width)
            initialColWidth: 100,
          },
          [key3]: {
            ref: ref1,
            colWidth: 220,
            initialColWidth: 100,
          },
        },
      })
    );
  });

  it('should not do anything on UPDATE_COLWIDTH for right most column.', () => {
    const nextState = getStateFor3Columns();

    const updateAction = {
      type: actionTypes.UPDATE_COLWIDTH,
      colKey: key3,
      pos: 451, // +51,
    };
    const nextState2 = resizeReducer(nextState, updateAction);

    expect(nextState2).toEqual(
      expect.objectContaining({
        columnsByKey: {
          [key1]: {
            ref: ref1,
            colWidth: 100,
            initialColWidth: 100,
          },
          [key2]: {
            ref: ref1,
            colWidth: 100,
            initialColWidth: 100,
          },
          [key3]: {
            ref: ref1,
            colWidth: 100,
            initialColWidth: 100,
          },
        },
      })
    );
  });

  it('should handle UPDATE_COLWIDTH_FROM_ACTUAL.', () => {
    ref1.current = {
      getBoundingClientRect: () => ({
        width: 150,
      }),
    };
    ref2.current = {
      getBoundingClientRect: () => ({
        width: 200,
      }),
    };
    ref3.current = {
      getBoundingClientRect: () => ({
        width: 250,
      }),
    };

    const nextState = getStateFor3Columns();

    const setAction = {
      type: actionTypes.UPDATE_COLWIDTH_FROM_ACTUAL,
      colKey: key1,
      tableWidth: 600,
    };
    const nextState2 = resizeReducer(nextState, setAction);

    expect(nextState2).toEqual({
      allColumnKeys: [key1, key2, key3],
      columnsByKey: {
        [key1]: {
          ref: ref1,
          colWidth: 150,
          initialColWidth: 150,
        },
        [key2]: {
          ref: ref2,
          colWidth: 200,
          initialColWidth: 200,
        },
        [key3]: {
          ref: ref3,
          colWidth: 250,
          initialColWidth: 250,
        },
      },
      resizeActivity: {
        colKey: key1,
        initialPos: 400,
      },
    });
  });

  it('should handle REDISTRIBUTE_TABLE_WIDTH.', () => {
    const nextState = getStateFor3Columns();

    const setAction = {
      type: actionTypes.REDISTRIBUTE_TABLE_WIDTH,
      tableWidth: 450, // +150
    };
    const nextState2 = resizeReducer(nextState, setAction);

    expect(nextState2).toEqual({
      allColumnKeys: [key1, key2, key3],
      columnsByKey: {
        [key1]: {
          ref: ref1,
          colWidth: 150,
          initialColWidth: 100,
        },
        [key2]: {
          ref: ref2,
          colWidth: 150,
          initialColWidth: 100,
        },
        [key3]: {
          ref: ref3,
          colWidth: 150,
          initialColWidth: 100,
        },
      },
      resizeActivity: {
        colKey: key1,
        initialPos: 400,
      },
    });
  });

  it('should not handle unkown actions.', () => {
    expect(() =>
      resizeReducer(initialState, { type: 'unkown' })
    ).toThrowError();
  });
});
