// codemod.js
function transform(fileInfo, api, options) {
  const printOptions = options.printOptions || defaultOptions;
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Update import declarations
  root.find(j.ImportDeclaration).forEach((path) => {
    const { specifiers } = path.node;

    specifiers.forEach((specifier) => {
      const { imported, local } = specifier;

      // Early return if not dealing with StaticNotification or unstable__StaticNotification
      if (!local || !imported) return;

      const { name: importedName } = imported;
      const { name: localName } = local;

      // Skip transformation if `unstable__Callout` is already renamed to `StaticNotification`
      if (
        importedName === 'unstable__Callout' &&
        localName === 'StaticNotification'
      ) {
        return; // Leave as is
      }

      // Prefer transforming to unstable__Callout over Callout, unless already imported
      if (importedName === 'StaticNotification') {
        if (localName === 'Callout') {
          // If `StaticNotification as Callout` exists, replace it with `unstable__Callout`
          specifier.imported.name = 'unstable__Callout';
          specifier.local.name = 'unstable__Callout';
        } else {
          // Prefer renaming to `unstable__Callout` where possible
          specifier.imported.name = 'unstable__Callout';
        }
      } else if (importedName === 'unstable__StaticNotification') {
        specifier.imported.name = 'unstable__Callout';
      }

      // Handle aliasing (e.g., "as StaticNotification")
      if (localName === 'StaticNotification') {
        specifier.local.name = 'unstable__Callout';
      } else if (localName === 'unstable__StaticNotification') {
        specifier.local.name = 'unstable__Callout';
      }
    });
  });

  // Update JSX elements and usage within code
  root
    .find(j.JSXIdentifier, { name: 'StaticNotification' })
    .replaceWith(j.jsxIdentifier('unstable__Callout'));

  root
    .find(j.JSXIdentifier, { name: 'unstable__StaticNotification' })
    .replaceWith(j.jsxIdentifier('unstable__Callout'));

  root
    .find(j.Identifier, { name: 'StaticNotification' })
    .replaceWith(j.identifier('unstable__Callout'));

  root
    .find(j.Identifier, { name: 'unstable__StaticNotification' })
    .replaceWith(j.identifier('unstable__Callout'));

  // Update TypeScript interface names (StaticNotificationProps -> CalloutProps)
  root
    .find(j.Identifier, { name: 'StaticNotificationProps' })
    .replaceWith(j.identifier('CalloutProps'));

  // FINAL STEP: Rename all `unstable__Callout` to `Callout`
  root.find(j.ImportSpecifier).forEach((path) => {
    const { imported, local } = path.node;

    if (imported.name === 'unstable__Callout') {
      imported.name = 'Callout';

      // If the local name is also `unstable__Callout`, rename it to `Callout`
      if (local.name === 'unstable__Callout') {
        local.name = 'Callout';
      }
    }
  });

  // Ensure all JSX and identifiers are also updated to `Callout`
  root
    .find(j.JSXIdentifier, { name: 'unstable__Callout' })
    .replaceWith(j.jsxIdentifier('Callout'));

  root
    .find(j.Identifier, { name: 'unstable__Callout' })
    .replaceWith(j.identifier('Callout'));

  return root.toSource(printOptions);
}

module.exports = transform;
