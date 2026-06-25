/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Returns a compiled string of all the text content of a React node and any of its child nodes.
 * This is meant to be used in a limited fashion to convert a "styled" sentence into a single string:
 *   e.g. <p>Title <b>Page</b>.</p> --> "Title Page."
 * This will likely not work for arrays of nodes due to the lack of word spacing:
 *   e.g. <ul>
 *          <li>Item 1</li>
 *          <li>Item 2</li>
 *          <li>Item 3</li>
 *        </ul>
 *        --> "Item 1Item 2Item 3"
 * @param {ReactNode} node A React node
 * @returns {string}
 */
export const getNodeTextContent = (node) => {
  if (node == null) {
    return '';
  }

  switch (typeof node) {
    case 'string':
    case 'number':
      return node.toString();

    case 'object': {
      if (node instanceof Array) {
        return node.map(getNodeTextContent).join('');
      }

      if ('props' in node) {
        return getNodeTextContent(node.props.children);
      }

      // Ignore any other JavaScript 'object' types.
      return '';
    }

    case 'function': {
      return getNodeTextContent(node());
    }

    default:
      // Ignore all other JavaScript types.
      return '';
  }
};
