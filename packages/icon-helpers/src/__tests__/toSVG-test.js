/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

'use strict';

const defaultDescriptor = {
  name: 'default',
  size: '32',
  attrs: {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 32 32',
    width: '32',
    height: '32',
  },
  content: [
    {
      elem: 'path',
      attrs: {
        d:
          'M12 11.03v4h-2v-4H8v6h4v4h2v-10h-2zm12.19 0H22l-3 4.39v-4.39h-2v10h2V18.3l.91-1.33L22 21.03h2.19l-2.99-5.62 2.99-4.38z',
      },
    },
    {
      elem: 'path',
      attrs: {
        d:
          'M28 26H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2zM4 8v16h24V8z',
      },
    },
  ],
};

describe('toSVG', () => {
  let toSVG;

  beforeEach(() => {
    toSVG = require('../toSVG').default;
  });

  it('should convert a given descriptor to a valid DOM node', () => {
    expect(() => {
      const node = toSVG(defaultDescriptor);
      document.body.appendChild(node);
      node.parentNode.removeChild(node);
    }).not.toThrow();
  });
});
