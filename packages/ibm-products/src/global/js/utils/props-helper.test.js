//
// Copyright IBM Corp. 2021, 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//
import { prepareProps, allPropTypes, deprecateProp } from './props-helper';

describe('prepareProps', () => {
  const defaults = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
  const props = { e: 9, f: 10, g: 11, h: 12, i: 13, j: 14, k: 15, l: 16 };
  const overrides = { c: 17, d: 18, g: 19, h: 20, k: 21, l: 22, o: 23, p: 24 };
  const block = ['b', 'd', 'f', 'h', 'n', 'p'];

  it('applies correct defaults and overrides and blocks values', async () => {
    const result = prepareProps(defaults, props, block, 'j', 'l', overrides);

    // defaulted
    expect(result.a).toEqual(1);
    // defaulted, blocked
    expect(Object.hasOwnProperty.call(result, 'b')).toBeFalsy();
    // defaulted, overridden
    expect(result.c).toEqual(17);
    // defaulted, blocked, overridden
    expect(result.d).toEqual(18);
    // defaulted, set
    expect(result.e).toEqual(9);
    // defaulted, set, blocked
    expect(Object.hasOwnProperty.call(result, 'f')).toBeFalsy();
    // defaulted, set, overridden
    expect(result.g).toEqual(19);
    // defaulted, set, blocked, overridden
    expect(result.h).toEqual(20);
    // set
    expect(result.i).toEqual(13);
    // set, blocked
    expect(Object.hasOwnProperty.call(result, 'j')).toBeFalsy();
    // set, overridden
    expect(result.k).toEqual(21);
    // set, blocked, overridden
    expect(result.l).toEqual(22);
    //
    expect(Object.hasOwnProperty.call(result, 'm')).toBeFalsy();
    // blocked
    expect(Object.hasOwnProperty.call(result, 'n')).toBeFalsy();
    // overridden
    expect(result.o).toEqual(23);
    // blocked, overridden
    expect(result.p).toEqual(24);
  });
});

describe('allPropTypes', () => {
  const e1 = new Error();
  const e2 = new Error(
    'The prop `b` is marked as required in `Component X`, but its value is `null`.'
  );
  const e3 = new Error(
    'The prop `c` is marked as required in `Component X`, but its value is `undefined`.'
  );
  const p = () => null;
  const f = () => e1;
  const props = { a: '42', b: null };
  const args1 = [props, 'a', 'Component X', 'prop'];
  const args2 = [props, 'b', 'Component X', 'prop'];
  const args3 = [props, 'c', 'Component X', 'prop'];

  it('returns null only if all supplied type checkers return null', async () => {
    expect(allPropTypes([f, f, f, f])(...args1)).toEqual(e1);
    expect(allPropTypes([p, f, f, f])(...args1)).toEqual(e1);
    expect(allPropTypes([p, p, f, f])(...args1)).toEqual(e1);
    expect(allPropTypes([p, p, p, f])(...args1)).toEqual(e1);
    expect(allPropTypes([p, p, p, p])(...args1)).toBeNull();
  });

  it('rejects null or undefined when marked required', async () => {
    expect(allPropTypes([f, f, f, f]).isRequired(...args1)).toEqual(e1);
    expect(allPropTypes([f, f, f, f]).isRequired(...args2)).toEqual(e2);
    expect(allPropTypes([f, f, f, f]).isRequired(...args3)).toEqual(e3);
    expect(allPropTypes([p, f, f, f]).isRequired(...args1)).toEqual(e1);
    expect(allPropTypes([p, f, f, f]).isRequired(...args2)).toEqual(e2);
    expect(allPropTypes([f, f, f, f]).isRequired(...args3)).toEqual(e3);
    expect(allPropTypes([p, p, p, f]).isRequired(...args1)).toEqual(e1);
    expect(allPropTypes([p, p, p, f]).isRequired(...args2)).toEqual(e2);
    expect(allPropTypes([f, f, f, f]).isRequired(...args3)).toEqual(e3);
    expect(allPropTypes([p, p, p, p]).isRequired(...args1)).toBeNull();
    expect(allPropTypes([p, p, p, p]).isRequired(...args2)).toEqual(e2);
    expect(allPropTypes([f, f, f, f]).isRequired(...args3)).toEqual(e3);
  });
});
