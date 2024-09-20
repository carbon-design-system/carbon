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

  // Mapping function for typical imports
  function updateImportSpecifier(specifier, sourceValue) {
    // If the import is from '@carbon/react'
    if (typeof sourceValue === 'string' && sourceValue === '@carbon/react') {
      if (
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.name === 'unstable__StaticNotification'
      ) {
        // Change unstable__StaticNotification to unstable__Callout
        specifier.imported.name = 'unstable__Callout';
        // If the local alias is StaticNotification, change it to Callout
        if (specifier.local.name === 'StaticNotification') {
          specifier.local.name = 'Callout';
        }
      } else if (
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.name === 'StaticNotification'
      ) {
        // Change StaticNotification to Callout
        specifier.imported.name = 'Callout';
        if (specifier.local.name === 'StaticNotification') {
          specifier.local.name = 'Callout';
        }
      } else if (
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.name === 'StaticNotificationProps'
      ) {
        // Change StaticNotificationProps to CalloutProps
        specifier.imported.name = 'CalloutProps';
        if (specifier.local.name === 'StaticNotificationProps') {
          specifier.local.name = 'CalloutProps';
        }
      }
    } else if (
      typeof sourceValue === 'string' &&
      (sourceValue.startsWith('@carbon/react/es/components/Notification') ||
        sourceValue.startsWith('@carbon/react/lib/components/Notification'))
    ) {
      // For fully qualified paths, change StaticNotification to Callout and StaticNotificationProps to CalloutProps
      if (specifier.imported.name === 'StaticNotification') {
        specifier.imported.name = 'Callout';
        if (specifier.local.name === 'StaticNotification') {
          specifier.local.name = 'Callout';
        }
      } else if (specifier.imported.name === 'StaticNotificationProps') {
        specifier.imported.name = 'CalloutProps';
        if (specifier.local.name === 'StaticNotificationProps') {
          specifier.local.name = 'CalloutProps';
        }
      }
    }
  }

  // Handle the transformation of imports
  root.find(j.ImportDeclaration).forEach((path) => {
    const sourceValue = path.node.source.value;

    // Ensure sourceValue is a string
    if (
      typeof sourceValue !== 'string' ||
      !sourceValue.startsWith('@carbon/react')
    ) {
      return;
    }

    // Transform the specifiers
    path.node.specifiers.forEach((specifier) => {
      // Handle only ImportSpecifier types
      if (specifier.type === 'ImportSpecifier') {
        // Avoid transforming `unstable__Callout` if already correct
        if (
          specifier.imported.name === 'unstable__Callout' &&
          (specifier.local.name === 'Callout' ||
            specifier.local.name !== 'StaticNotification')
        ) {
          return; // Skip this, it's already correct
        }

        updateImportSpecifier(specifier, sourceValue);
      }
    });
  });

  return root.toSource(printOptions);
}

module.exports = transform;
