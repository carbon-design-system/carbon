/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const defaultOptions = {
  quote: 'auto',
  trailingComma: true,
};

function transform(fileInfo, api, options) {
  const printOptions = options.printOptions || defaultOptions;
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Helper function to check if the import source is from '@carbon/react' or its subpaths
  function isCarbonReactImport(sourceValue) {
    return (
      sourceValue === '@carbon/react' ||
      sourceValue.startsWith('@carbon/react/es') ||
      sourceValue.startsWith('@carbon/react/lib')
    );
  }

  // Collect names of identifiers imported from '@carbon/react' or its subpaths
  const importedIdentifiers = new Map(); // Map of local name to transformed name

  // Transform import declarations
  root.find(j.ImportDeclaration).forEach((path) => {
    const sourceValue = path.node.source.value;

    // Only transform imports from '@carbon/react' and its subpaths
    if (!isCarbonReactImport(sourceValue)) {
      return;
    }

    path.node.specifiers.forEach((specifier) => {
      if (specifier.type === 'ImportSpecifier') {
        let importedName = specifier.imported.name;
        let localName = specifier.local ? specifier.local.name : importedName;
        let transformedImportedName = importedName;
        let transformedLocalName = localName;

        // Transform imported names and local names as necessary
        if (importedName === 'unstable__StaticNotification') {
          transformedImportedName = 'unstable__Callout';
          specifier.imported.name = transformedImportedName;

          if (localName === 'StaticNotification') {
            transformedLocalName = 'Callout';
            specifier.local.name = transformedLocalName;
          } else if (localName === 'unstable__StaticNotification') {
            transformedLocalName = 'unstable__Callout';
            specifier.local.name = transformedLocalName;
          }
          // If local name is something else (e.g., SomeOtherName), leave it unchanged
        } else if (importedName === 'StaticNotification') {
          transformedImportedName = 'Callout';
          specifier.imported.name = transformedImportedName;

          if (localName === 'StaticNotification') {
            transformedLocalName = 'Callout';
            specifier.local.name = transformedLocalName;
          }
          // If local name is different, leave it unchanged
        } else if (importedName === 'StaticNotificationProps') {
          transformedImportedName = 'CalloutProps';
          specifier.imported.name = transformedImportedName;

          if (localName === 'StaticNotificationProps') {
            transformedLocalName = 'CalloutProps';
            specifier.local.name = transformedLocalName;
          }
          // If local name is different, leave it unchanged
        }

        // If imported name and local name are the same after transformation, remove the alias
        if (
          specifier.local &&
          specifier.local.name === specifier.imported.name
        ) {
          delete specifier.local;
        }

        // Update the mapping of imported identifiers
        // Only add to the map if the local name or the transformed name is different
        if (localName !== transformedLocalName) {
          importedIdentifiers.set(localName, transformedLocalName);
        }
      }
    });
  });

  // Deduplicate imports
  const importDeclarations = root.find(j.ImportDeclaration);

  importDeclarations.forEach((path) => {
    const sourceValue = path.node.source.value;

    // Only deduplicate imports from '@carbon/react' and its subpaths
    if (!isCarbonReactImport(sourceValue)) {
      return;
    }

    const specifiers = path.node.specifiers;
    const uniqueSpecifiers = [];
    const seen = new Set();

    specifiers.forEach((specifier) => {
      const importedName = specifier.imported.name;
      const localName = specifier.local ? specifier.local.name : importedName;
      const key = `${importedName}:${localName}`;

      if (!seen.has(key)) {
        seen.add(key);
        uniqueSpecifiers.push(specifier);
      }
    });

    path.node.specifiers = uniqueSpecifiers;
  });

  // Remove empty import declarations
  importDeclarations.forEach((path) => {
    if (path.node.specifiers.length === 0) {
      j(path).remove();
    }
  });

  // Update usages in the code
  root.find(j.Identifier).forEach((path) => {
    const name = path.node.name;

    // Skip if the identifier is part of an import specifier
    if (
      path.parent.node.type === 'ImportSpecifier' ||
      path.parent.node.type === 'ImportDefaultSpecifier' ||
      path.parent.node.type === 'ImportNamespaceSpecifier'
    ) {
      return;
    }

    // Only transform identifiers that match the imported identifiers
    if (importedIdentifiers.has(name)) {
      const transformedName = importedIdentifiers.get(name);
      path.node.name = transformedName;
    }
  });

  return root.toSource(printOptions);
}

module.exports = transform;
