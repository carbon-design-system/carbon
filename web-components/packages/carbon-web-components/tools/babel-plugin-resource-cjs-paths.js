/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = function resourceCJSPaths(babel) {
  const t = babel.types;

  return {
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;
        const { value: source } = node.source;
        if (/^carbon-components\/es/i.test(source)) {
          const declaration = t.cloneNode(node);
          declaration.source.value = source.replace(
            /^carbon-components\/es/i,
            'carbon-components/umd'
          );
          path.replaceWith(declaration);
        }
      },
    },
  };
};
