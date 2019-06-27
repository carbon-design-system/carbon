/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function diff(expected, actual) {
  if (!actual) {
    return [['Expected a DOM node but none were found', expected]];
  }

  if (typeof expected === 'string') {
    if (!(actual instanceof Text)) {
      return [['Expected a text node', expected, actual]];
    }

    if (expected !== actual.textContent) {
      return [
        ['Expected the given text to match', expected, actual.textContent],
      ];
    }

    return [];
  }

  if (expected.nodeName.toLowerCase() !== actual.nodeName.toLowerCase()) {
    return [
      [
        'Expected the markup to have the same node name',
        expected.nodeName,
        actual.outerHTML,
      ],
    ];
  }

  for (const key of Object.keys(expected.attributes)) {
    if (key === 'class') {
      if (!actual.classList.contains(expected.attributes[key])) {
        return [
          [
            'Expected the markup to contain the correct class name',
            expected.attributes[key],
            actual.className,
          ],
        ];
      }
    } else {
      if (typeof expected.attributes[key] === 'function') {
        if (!actual.hasAttribute(key)) {
          return [
            [
              'Expected the markup to contain the correct attribute',
              expected.attributes[key],
              actual.getAttribute(key),
            ],
          ];
        }

        const result = expected.attributes[key](actual);
        if (result) {
          return [...result];
        }
      } else if (expected.attributes[key] !== actual.getAttribute(key)) {
        return [
          [
            'Expected the markup to contain the correct attribute',
            expected.attributes[key],
            actual.getAttribute(key),
          ],
        ];
      }
    }
  }

  for (let i = 0; i < expected.children.length; i++) {
    const expectedChild = expected.children[i];
    const actualChild = actual.childNodes[i];
    const childErrors = diff(expectedChild, actualChild);

    if (childErrors.length > 0) {
      return childErrors;
    }
  }

  return [];
}
