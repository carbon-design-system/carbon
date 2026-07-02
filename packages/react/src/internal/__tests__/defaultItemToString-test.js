/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultItemToString } from '../defaultItemToString';

describe('defaultItemToString', () => {
  it('should return strings as is', () => {
    expect(defaultItemToString('hello')).toBe('hello');
    expect(defaultItemToString('')).toBe('');
  });

  it('should stringify numbers', () => {
    expect(defaultItemToString(0)).toBe('0');
    expect(defaultItemToString(42)).toBe('42');
    expect(defaultItemToString(-7)).toBe('-7');
  });

  it('should handle nullish values', () => {
    expect(defaultItemToString(null)).toBe('');
    expect(defaultItemToString(undefined)).toBe('');
  });

  it('should return the label when the object has a string label', () => {
    expect(defaultItemToString({ label: 'Option A' })).toBe('Option A');
    expect(defaultItemToString({ label: '' })).toBe('');
  });

  it('should ignore non-string labels', () => {
    expect(defaultItemToString({ label: 123 })).toBe('');
    expect(defaultItemToString({ label: false })).toBe('');
    expect(defaultItemToString({ label: null })).toBe('');
    expect(defaultItemToString({ label: undefined })).toBe('');
  });

  it('should ignore objects without labels', () => {
    expect(defaultItemToString({})).toBe('');
    expect(defaultItemToString({ name: 'nope' })).toBe('');
  });

  it('should ignore arrays unless they have a string label property', () => {
    const arr = [];

    expect(defaultItemToString(arr)).toBe('');

    arr.label = 'from array';

    expect(defaultItemToString(arr)).toBe('from array');
  });

  it('should read inherited labels from prototype chain', () => {
    const proto = { label: 'from proto' };
    const obj = Object.create(proto);

    expect(defaultItemToString(obj)).toBe('from proto');
  });

  it('should return empty strings for functions, bigints, and symbols', () => {
    expect(defaultItemToString(() => {})).toBe('');
    expect(defaultItemToString(10n)).toBe('');
    expect(defaultItemToString(Symbol('x'))).toBe('');
  });

  it('should return empty string for boxed primitives (Number, String, Boolean)', () => {
    expect(defaultItemToString(new Number(5))).toBe('');
    expect(defaultItemToString(new String('hello'))).toBe('');
    expect(defaultItemToString(new Boolean(true))).toBe('');
  });

  it('should handle objects with non-enumerable string label', () => {
    const object = {};

    Object.defineProperty(object, 'label', {
      value: 'hidden label',
      enumerable: false,
    });

    expect(defaultItemToString(object)).toBe('hidden label');
  });
});
