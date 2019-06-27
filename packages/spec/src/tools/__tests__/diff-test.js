/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createElement, createExpected } from '../html';
import { diff } from '../diff';

describe('diff', () => {
  it('should report no changes if markup is the same', () => {
    const elements = diff(createExpected('p'), createElement('p'));
    expect(elements.length).toBe(0);

    const attributes = diff(
      createExpected('a', { class: 'class-name' }),
      createElement('a', { class: 'class-name' })
    );
    expect(attributes.length).toBe(0);

    const textContent = diff(
      createExpected('a', { class: 'class-name' }, 'Link'),
      createElement('a', { class: 'class-name' }, 'Link')
    );
    expect(textContent.length).toBe(0);

    const content = diff(
      createExpected(
        'div',
        {
          class: 'outer-div',
        },
        createExpected(
          'div',
          {
            class: 'inner-div',
          },
          'Content'
        )
      ),
      createElement(
        'div',
        {
          class: 'outer-div',
        },
        createElement(
          'div',
          {
            class: 'inner-div',
          },
          'Content'
        )
      )
    );
    expect(content.length).toBe(0);
  });

  it('should report if node is expected but none were found', () => {
    const expected = createExpected('h1');
    const output = diff(expected);
    expect(output.length > 0).toBe(true);
    expect(output).toMatchInlineSnapshot(`
Array [
  Array [
    "Expected a DOM node but none were found",
    Object {
      "attributes": Object {},
      "children": Array [],
      "nodeName": "H1",
      "tagName": "H1",
    },
  ],
]
`);
  });

  it('should report if node tag names do not match', () => {
    const expected = createExpected('h1');
    const output = diff(expected, createElement('h2'));
    expect(output.length > 0).toBe(true);
    expect(output).toMatchInlineSnapshot(`
Array [
  Array [
    "Expected the markup to have the same node name",
    "H1",
    "<h2></h2>",
  ],
]
`);
  });

  it('should report on attributes that do not match', () => {
    const expected = createExpected('h1', {
      class: 'a',
      tabindex: '0',
    });
    const actual = createElement('h1', {
      class: 'b',
      tabindex: '-1',
    });
    const output = diff(expected, actual);
    expect(output.length > 0).toBe(true);
    expect(output).toMatchInlineSnapshot(`
Array [
  Array [
    "Expected the markup to contain the correct class name",
    "a",
    "b",
  ],
]
`);
  });

  it('should report violations on child nodes', () => {
    const expected = createExpected('div', {}, createExpected('p', {}, 'Link'));
    const actual = createElement('div', {}, createElement('a', {}, 'Link'));
    const output = diff(expected, actual);
    expect(output.length > 0).toBe(true);
    expect(output).toMatchInlineSnapshot(`
Array [
  Array [
    "Expected the markup to have the same node name",
    "P",
    "<a>Link</a>",
  ],
]
`);
  });

  it('should report if text node mismatch occurs', () => {
    const expected = createExpected('a', {}, 'Link');
    const actual = createElement('a', {}, 'link');
    const output = diff(expected, actual);
    expect(output).toMatchInlineSnapshot(`
Array [
  Array [
    "Expected the given text to match",
    "Link",
    "link",
  ],
]
`);
  });
});
