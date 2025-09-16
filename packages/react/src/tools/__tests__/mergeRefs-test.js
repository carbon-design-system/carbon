/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mergeRefs } from '../mergeRefs';

describe('mergeRefs', () => {
  it('should support object refs and ref callbacks', () => {
    const elem = document.createElement('div');
    const ref = React.createRef();
    let functionRefResult;
    mergeRefs(ref, (el) => {
      functionRefResult = el;
    })(elem);
    expect(ref.current).toBe(elem);
    expect(functionRefResult).toBe(elem);
  });

  it('should skip empty refs', () => {
    expect(() => {
      mergeRefs(undefined)(document.createElement('div'));
    }).not.toThrow();
    expect(() => {
      mergeRefs(null)(document.createElement('div'));
    }).not.toThrow();
  });

  it('should merge multiple refs and update them all', () => {
    const element = document.createElement('div');
    const ref1 = React.createRef();
    const ref2 = React.createRef();
    let callback1, callback2;
    const merged = mergeRefs(
      ref1,
      ref2,
      (el) => (callback1 = el),
      (el) => (callback2 = el)
    );

    merged(element);

    expect(ref1.current).toBe(element);
    expect(ref2.current).toBe(element);
    expect(callback1).toBe(element);
    expect(callback2).toBe(element);
  });

  it('should allow clearing', () => {
    const ref = React.createRef();
    let callbackValue;
    const merged = mergeRefs(ref, (el) => {
      callbackValue = el;
    });
    const element = document.createElement('div');

    merged(element);

    expect(ref.current).toBe(element);
    expect(callbackValue).toBe(element);

    // Setting the value to `null` should update the object and callback refs.
    merged(null);

    expect(ref.current).toBeNull();
    expect(callbackValue).toBeNull();
  });

  it('should not mutate non-ref plain objects', () => {
    const element = document.createElement('div');
    const randomObject = {};

    mergeRefs(randomObject)(element);

    expect('current' in randomObject).toBe(false);
  });

  it('should ignore primitive values passed accidentally as refs', () => {
    const element = document.createElement('div');

    expect(() => mergeRefs(42, 'hello')(element)).not.toThrow();
  });
});
