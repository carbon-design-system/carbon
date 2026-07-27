/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Wrap the application passed to a React root with the v12 release feature flag.
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;
  const reactDomBindings = getReactDomBindings(root, j);
  const reactRootBindings = getReactRootBindings(root, j, reactDomBindings);
  const renderArguments = findRenderArguments(
    root,
    j,
    reactDomBindings,
    reactRootBindings
  );

  if (renderArguments.length === 0) {
    return null;
  }

  const featureFlags = getFeatureFlagsReference(root, j);
  let didChange = false;

  for (const argumentPath of renderArguments) {
    const application = argumentPath.node;

    if (isNamedJSXElement(application, featureFlags.jsxName)) {
      didChange = enableV12Release(application.openingElement, j) || didChange;
      continue;
    }

    argumentPath.replace(
      createFeatureFlagsWrapper(application, featureFlags, j)
    );
    didChange = true;
  }

  if (!didChange) {
    return null;
  }

  if (featureFlags.needsImport) {
    addFeatureFlagsImport(root, featureFlags, j);
  }

  return root.toSource(printOptions);
}

function getReactDomBindings(root, j) {
  const bindings = {
    createRoot: new Set(),
    hydrateRoot: new Set(),
    render: new Set(),
    reactDom: new Set(),
  };

  root
    .find(j.ImportDeclaration)
    .filter(
      (path) =>
        path.node.source.value === 'react-dom' ||
        path.node.source.value === 'react-dom/client'
    )
    .forEach((path) => {
      const source = path.node.source.value;

      for (const specifier of path.node.specifiers) {
        if (
          specifier.type === 'ImportDefaultSpecifier' ||
          specifier.type === 'ImportNamespaceSpecifier'
        ) {
          bindings.reactDom.add(specifier.local.name);
          continue;
        }

        if (
          specifier.type !== 'ImportSpecifier' ||
          path.node.importKind === 'type' ||
          specifier.importKind === 'type'
        ) {
          continue;
        }

        const importedName = specifier.imported.name;
        if (
          source === 'react-dom/client' &&
          (importedName === 'createRoot' || importedName === 'hydrateRoot')
        ) {
          bindings[importedName].add(specifier.local.name);
        } else if (source === 'react-dom' && importedName === 'render') {
          bindings.render.add(specifier.local.name);
        }
      }
    });

  return bindings;
}

function getReactRootBindings(root, j, reactDomBindings) {
  const rootBindings = new Set();

  root.find(j.VariableDeclarator).forEach((path) => {
    if (
      path.node.id.type === 'Identifier' &&
      isCreateRootCall(path.node.init, reactDomBindings)
    ) {
      rootBindings.add(path.node.id.name);
    }
  });

  root.find(j.AssignmentExpression).forEach((path) => {
    if (
      path.node.left.type === 'Identifier' &&
      isCreateRootCall(path.node.right, reactDomBindings)
    ) {
      rootBindings.add(path.node.left.name);
    }
  });

  return rootBindings;
}

function findRenderArguments(root, j, reactDomBindings, reactRootBindings) {
  const argumentsToWrap = [];

  root.find(j.CallExpression).forEach((path) => {
    const { callee } = path.node;

    if (isHydrateRootCall(path.node, reactDomBindings)) {
      addJSXArgument(path, 1, argumentsToWrap);
      return;
    }

    if (
      callee.type === 'Identifier' &&
      reactDomBindings.render.has(callee.name)
    ) {
      addJSXArgument(path, 0, argumentsToWrap);
      return;
    }

    if (!isMemberCall(callee, 'render') && !isMemberCall(callee, 'hydrate')) {
      return;
    }

    if (
      (callee.object.type === 'Identifier' &&
        (reactRootBindings.has(callee.object.name) ||
          reactDomBindings.reactDom.has(callee.object.name))) ||
      isCreateRootCall(callee.object, reactDomBindings)
    ) {
      addJSXArgument(path, 0, argumentsToWrap);
    }
  });

  return argumentsToWrap;
}

function addJSXArgument(callPath, argumentIndex, argumentsToWrap) {
  const argument = callPath.node.arguments[argumentIndex];
  if (argument?.type === 'JSXElement' || argument?.type === 'JSXFragment') {
    argumentsToWrap.push(callPath.get('arguments', argumentIndex));
  }
}

function isCreateRootCall(node, reactDomBindings) {
  if (!node || node.type !== 'CallExpression') {
    return false;
  }

  if (
    node.callee.type === 'Identifier' &&
    reactDomBindings.createRoot.has(node.callee.name)
  ) {
    return true;
  }

  return (
    isMemberCall(node.callee, 'createRoot') &&
    node.callee.object.type === 'Identifier' &&
    reactDomBindings.reactDom.has(node.callee.object.name)
  );
}

function isHydrateRootCall(node, reactDomBindings) {
  if (node.callee.type === 'Identifier') {
    return reactDomBindings.hydrateRoot.has(node.callee.name);
  }

  return (
    isMemberCall(node.callee, 'hydrateRoot') &&
    node.callee.object.type === 'Identifier' &&
    reactDomBindings.reactDom.has(node.callee.object.name)
  );
}

function isMemberCall(callee, propertyName) {
  if (
    callee.type !== 'MemberExpression' &&
    callee.type !== 'OptionalMemberExpression'
  ) {
    return false;
  }

  if (callee.computed) {
    return (
      (callee.property.type === 'Literal' ||
        callee.property.type === 'StringLiteral') &&
      callee.property.value === propertyName
    );
  }

  return (
    callee.property.type === 'Identifier' &&
    callee.property.name === propertyName
  );
}

function getFeatureFlagsReference(root, j) {
  const carbonImports = root
    .find(j.ImportDeclaration, {
      source: { value: '@carbon/react' },
    })
    .paths();

  for (const path of carbonImports) {
    if (path.node.importKind === 'type') {
      continue;
    }

    for (const specifier of path.node.specifiers) {
      if (
        specifier.type === 'ImportSpecifier' &&
        specifier.importKind !== 'type' &&
        specifier.imported.name === 'FeatureFlags'
      ) {
        return {
          importName: specifier.local.name,
          jsxName: j.jsxIdentifier(specifier.local.name),
          needsImport: false,
        };
      }

      if (specifier.type === 'ImportNamespaceSpecifier') {
        return {
          importName: null,
          jsxName: j.jsxMemberExpression(
            j.jsxIdentifier(specifier.local.name),
            j.jsxIdentifier('FeatureFlags')
          ),
          needsImport: false,
        };
      }
    }
  }

  const importName = getAvailableImportName(root, j);
  return {
    importName,
    jsxName: j.jsxIdentifier(importName),
    needsImport: true,
  };
}

function getAvailableImportName(root, j) {
  let importName = 'FeatureFlags';
  let suffix = 2;

  while (
    root.find(j.Identifier, { name: importName }).size() > 0 ||
    root.find(j.JSXIdentifier, { name: importName }).size() > 0
  ) {
    importName = `CarbonFeatureFlags${suffix === 2 ? '' : suffix}`;
    suffix++;
  }

  return importName;
}

function addFeatureFlagsImport(root, featureFlags, j) {
  const carbonImport = root
    .find(j.ImportDeclaration, {
      source: { value: '@carbon/react' },
    })
    .filter(
      (path) =>
        path.node.importKind !== 'type' &&
        !path.node.specifiers.some(
          (specifier) => specifier.type === 'ImportNamespaceSpecifier'
        )
    )
    .at(0);
  const local =
    featureFlags.importName === 'FeatureFlags'
      ? null
      : j.identifier(featureFlags.importName);
  const specifier = j.importSpecifier(j.identifier('FeatureFlags'), local);

  if (carbonImport.size() > 0) {
    carbonImport.get().node.specifiers.push(specifier);
    return;
  }

  const declaration = j.importDeclaration(
    [specifier],
    j.literal('@carbon/react')
  );
  const lastImport = root.find(j.ImportDeclaration).at(-1);

  if (lastImport.size() > 0) {
    lastImport.insertAfter(declaration);
  } else {
    root.get().node.program.body.unshift(declaration);
  }
}

function isNamedJSXElement(node, expectedName) {
  return (
    node.type === 'JSXElement' &&
    areJSXNamesEqual(node.openingElement.name, expectedName)
  );
}

function areJSXNamesEqual(actual, expected) {
  if (actual.type !== expected.type) {
    return false;
  }

  if (actual.type === 'JSXIdentifier') {
    return actual.name === expected.name;
  }

  if (actual.type === 'JSXMemberExpression') {
    return (
      areJSXNamesEqual(actual.object, expected.object) &&
      areJSXNamesEqual(actual.property, expected.property)
    );
  }

  return false;
}

function enableV12Release(openingElement, j) {
  const attributes = openingElement.attributes;
  const releaseAttributes = attributes.filter(
    (attribute) =>
      attribute.type === 'JSXAttribute' &&
      attribute.name.name === 'enableV12Release'
  );
  const lastAttribute = attributes[attributes.length - 1];
  const isEnabled =
    releaseAttributes.length === 1 &&
    releaseAttributes[0] === lastAttribute &&
    (lastAttribute.value === null ||
      (lastAttribute.value.type === 'JSXExpressionContainer' &&
        (lastAttribute.value.expression.type === 'BooleanLiteral' ||
          lastAttribute.value.expression.type === 'Literal') &&
        lastAttribute.value.expression.value === true));

  if (isEnabled) {
    return false;
  }

  openingElement.attributes = attributes
    .filter(
      (attribute) =>
        attribute.type !== 'JSXAttribute' ||
        attribute.name.name !== 'enableV12Release'
    )
    .concat(j.jsxAttribute(j.jsxIdentifier('enableV12Release')));
  return true;
}

function createFeatureFlagsWrapper(application, featureFlags, j) {
  return j.jsxElement(
    j.jsxOpeningElement(
      cloneJSXName(featureFlags.jsxName),
      [j.jsxAttribute(j.jsxIdentifier('enableV12Release'))],
      false
    ),
    j.jsxClosingElement(cloneJSXName(featureFlags.jsxName)),
    [j.jsxText('\n'), application, j.jsxText('\n')]
  );
}

function cloneJSXName(name) {
  return JSON.parse(JSON.stringify(name));
}

module.exports = transform;
module.exports.parser = 'tsx';
