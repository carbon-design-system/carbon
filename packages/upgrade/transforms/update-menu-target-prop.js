/**
 * Copyright Your Company Name. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Update `target` prop to `menuTarget` within <Menu> components
 * and adds a deprecation warning.
 *
 * Transforms:
 *
 * <Menu target={props.target} />
 *
 * Into:
 *
 * <Menu menuTarget={props.target} />
 *
 * And adds the following warning at the top of the file:
 *
 * console.warn('The "target" prop is deprecated and will be removed in a future release. Please use "menuTarget" instead.');
 */

function transformer(file, api) {
  const j = api.jscodeshift;

  return (
    j(file.source)
      // Added deprecation warning at the top of the file
      .find(j.Program)
      .forEach((path) => {
        path.node.body.unshift(
          j.expressionStatement(
            j.callExpression(
              j.memberExpression(j.identifier('console'), j.identifier('warn')),
              [
                j.literal(
                  'The "target" prop is deprecated and will be removed in a future release. Please use "menuTarget" instead.'
                ),
              ]
            )
          )
        );
      })
      // Finding <Menu> components and replace `target` with `menuTarget`
      .find(j.JSXElement, {
        openingElement: { name: { name: 'Menu' } },
      })
      .forEach((path) => {
        path
          .find(j.JSXAttribute, { name: { name: 'target' } })
          .forEach((attrPath) => {
            attrPath.get('name').replace(j.jsxIdentifier('menuTarget'));
          });
      })
      .toSource({ quote: 'single' })
  );
}

module.exports = transformer;
