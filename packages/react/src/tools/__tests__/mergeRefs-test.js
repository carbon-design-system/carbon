/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import mergeRefs from '../mergeRefs';

describe('mergeRefs', () => {
  it('supports forwardRef as well as ref callback', () => {
    const elem = document.createElement('div');
    const ref = React.createRef();
    let functionRefResult;
    mergeRefs(ref, (el) => {
      functionRefResult = el;
    })(elem);
    expect(ref.current).toBe(elem);
    expect(functionRefResult).toBe(elem);
  });

  it('skips empty ref', () => {
    expect(() => {
      mergeRefs(undefined)(document.createElement('div'));
    }).not.toThrow(Error);
  });
});
