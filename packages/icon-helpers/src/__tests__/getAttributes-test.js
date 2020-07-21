/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

'use strict';

describe('getAttributes', () => {
  let getAttributes;

  beforeEach(() => {
    getAttributes = require('../getAttributes').default;
  });

  it('should default `aria-hidden="true"` and `focusable="false"` for SVGs', () => {
    const attrs = getAttributes();
    expect(attrs['aria-hidden']).toBe(true);
    expect(attrs.focusable).toBe('false');
    expect(attrs.role).not.toBeDefined();
  });

  // Test when we need to set `focusable` and `tabindex`. The rule of thumb
  // currently is that if we are provided a tabindex in addition to an aria
  // label then we can set focusable and tabindex on the result attribute set.
  // However, if we get ONLY tabindex then we do not pass it along as the SVG
  // should have an aria label (or title) available.
  test.each([
    [
      'false',
      'only tabindex',
      {
        tabindex: 0,
      },
    ],
    [
      'true',
      'aria-label and tabindex',
      {
        'aria-label': 'label',
        tabindex: 0,
      },
    ],
    [
      'false',
      'only aria-label',
      {
        'aria-label': 'label',
      },
    ],
    [
      'true',
      'aria-labelledby and tabindex',
      {
        'aria-labelledby': 'id',
        tabindex: 0,
      },
    ],
    [
      'false',
      'only aria-labelledby',
      {
        'aria-labelledby': 'id',
      },
    ],
    [
      'true',
      'title and tabindex',
      {
        title: 'title',
        tabindex: 0,
      },
    ],
    [
      'false',
      'only title',
      {
        title: 'title',
      },
    ],
  ])(
    'should set `focusable="%s"` when using %s',
    (focusable, _, attributes) => {
      const iconAttributes = getAttributes({
        width: 16,
        height: 16,
        viewBox: '0 0 16 16',
        ...attributes,
      });
      expect(iconAttributes.focusable).toBe(focusable);
    }
  );

  test.each(['aria-label', 'aria-labelledby', 'title'])(
    'should set role and remove aria-hidden if `%s` is set',
    (attr) => {
      const attrs = getAttributes({
        [attr]: 'attribute',
      });
      expect(attrs.role).toBe('img');
      expect(attrs['aria-hidden']).not.toBeDefined();
    }
  );
});
