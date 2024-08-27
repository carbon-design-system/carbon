/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Migrate the `flags` object prop to individual boolean props
 *
 * Transforms:
 *
 * <FeatureFlags flags={{ 'enable-v12-tile-default-icons': true }}>
 *
 * Into:
 *
 * <FeatureFlags enableV12TileDefaultIcons>
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

function transform(fileInfo, api, options) {
  const { jscodeshift: j } = api;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;
  if (
    !root.find(j.JSXOpeningElement, { name: { name: 'FeatureFlags' } }).size()
  ) {
    return null; // if no FeatureFlags found, don't modify & return the file
  }
  root
    .find(j.JSXOpeningElement, { name: { name: 'FeatureFlags' } })
    .forEach((path) => {
      const flagsAttribute = path.node.attributes.find(
        (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'flags'
      );

      if (flagsAttribute?.value?.expression?.type === 'ObjectExpression') {
        const newAttributes = flagsAttribute.value.expression.properties
          .filter((flag) => flag.value.value === true)
          .map((flag) => {
            const flagName =
              flag.key.type === 'Identifier' ? flag.key.name : flag.key.value;
            const propName = flagName.replace(/-(\w)/g, (_, c) =>
              c.toUpperCase()
            );
            return j.jsxAttribute(j.jsxIdentifier(propName));
          });

        path.node.attributes = [
          ...path.node.attributes.filter((attr) => attr.name.name !== 'flags'),
          ...newAttributes,
        ];
      }
    });

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
