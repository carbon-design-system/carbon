/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { tokenizeValue /*, TOKEN_TYPES */ } from '..';

describe('tokenizeValue', () => {
  it('Handles empty input', () => {
    expect(tokenizeValue('')).toEqual({
      items: [],
    });
  });

  it('Handles single quoted strings', () => {
    expect(tokenizeValue("'a value'")).toEqual({
      items: [
        {
          type: 'Quoted literal',
          value: "'a value'",
          raw: "'a value'",
        },
      ],
      raw: "'a value'",
    });
  });

  it('Handles double quoted strings', () => {
    expect(tokenizeValue('"a value"')).toEqual({
      items: [
        {
          type: 'Quoted literal',
          value: '"a value"',
          raw: '"a value"',
        },
      ],
      raw: '"a value"',
    });
  });

  it('Handles single $varaiable', () => {
    expect(tokenizeValue('$test')).toEqual({
      items: [
        {
          type: 'scss variable',
          value: '$test',
          raw: '$test',
        },
      ],
      raw: '$test',
    });
  });

  it('Handles single CSS varaiable', () => {
    expect(tokenizeValue('var(--test)')).toEqual({
      items: [
        {
          items: [
            {
              type: 'Text Literal',
              value: '--test',
              raw: '--test',
            },
          ],
          type: 'function',
          value: 'var',
          isCalc: false,
          raw: 'var(--test)',
        },
      ],
      raw: 'var(--test)',
    });
  });

  it('Handles a function with multiple parameters', () => {
    expect(tokenizeValue("func('test', 'a value')")).toEqual({
      items: [
        {
          items: [
            {
              items: [
                {
                  type: 'Item in list',
                  items: [
                    {
                      type: 'Quoted literal',
                      value: "'test'",
                      raw: "'test'",
                    },
                  ],
                  raw: "'test'",
                },
                {
                  type: 'Item in list',
                  items: [
                    {
                      type: 'Quoted literal',
                      value: "'a value'",
                      raw: "'a value'",
                    },
                  ],
                  raw: "'a value'",
                },
              ],
              type: 'Comma sepaarted list',
              raw: "'test', 'a value'",
            },
          ],
          type: 'function',
          value: 'func',
          isCalc: false,
          raw: "func('test', 'a value')",
        },
      ],
      raw: "func('test', 'a value')",
    });
  });

  it('Handles calc', () => {
    expect(tokenizeValue('calc(100vw - 20px)')).toEqual({
      items: [
        {
          items: [
            {
              items: [
                {
                  type: 'Numeric literal',
                  value: '100',
                  units: 'vw',
                  spaceAfter: true,
                  raw: '100vw',
                },
                {
                  type: 'operator',
                  value: '-',
                  spaceAfter: true,
                  raw: '-',
                },
                {
                  type: 'Numeric literal',
                  value: '20',
                  units: 'px',
                  raw: '20px',
                },
              ],
              type: 'Math',
              raw: '100vw - 20px',
            },
          ],
          type: 'function',
          value: 'calc',
          isCalc: true,
          raw: 'calc(100vw - 20px)',
        },
      ],
      raw: 'calc(100vw - 20px)',
    });
  });

  it('Handles math', () => {
    expect(tokenizeValue('100vw - 20px')).toEqual({
      items: [
        {
          items: [
            {
              type: 'Numeric literal',
              value: '100',
              units: 'vw',
              spaceAfter: true,
              raw: '100vw',
            },
            {
              type: 'operator',
              value: '-',
              spaceAfter: true,
              raw: '-',
            },
            {
              type: 'Numeric literal',
              value: '20',
              units: 'px',
              raw: '20px',
            },
          ],
          type: 'Math',
          raw: '100vw - 20px',
        },
      ],
      raw: '100vw - 20px',
    });
  });

  it('Handles multiple space seperated values', () => {
    expect(tokenizeValue('$a $b $c')).toEqual({
      items: [
        { type: 'scss variable', value: '$a', spaceAfter: true, raw: '$a' },
        { type: 'scss variable', value: '$b', spaceAfter: true, raw: '$b' },
        { type: 'scss variable', value: '$c', raw: '$c' },
      ],
      raw: '$a $b $c',
    });
  });

  it('Handles comma seperated list', () => {
    expect(tokenizeValue('$a, $b,$c')).toEqual({
      items: [
        {
          type: 'Item in list',
          items: [{ type: 'scss variable', value: '$a', raw: '$a' }],
          raw: '$a',
        },
        {
          type: 'Item in list',
          items: [{ type: 'scss variable', value: '$b', raw: '$b' }],
          raw: '$b',
        },
        {
          type: 'Item in list',
          items: [{ type: 'scss variable', value: '$c', raw: '$c' }],
          raw: '$c',
        },
      ],
      raw: '$a, $b,$c',
      type: 'Comma sepaarted list',
    });
  });

  it('Handles unexpected input', () => {
    expect(tokenizeValue("'unterminated quoted literal")).toMatchObject({
      items: [],
      message: 'Failed to parse value',
      raw: "'unterminated quoted literal",
    });
  });

  it('Treats #{$var} as is scss variable', () => {
    expect(tokenizeValue('#{$i-am-not-easily-knowable}')).toMatchObject({
      items: [
        {
          raw: '#{$i-am-not-easily-knowable}',
          type: 'scss variable',
          value: '#{$i-am-not-easily-knowable}',
        },
      ],
      raw: '#{$i-am-not-easily-knowable}',
    });
  });
});
