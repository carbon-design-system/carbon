/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { dirname, isAbsolute, relative, resolve } = require('path');
const { default: template } = require('@babel/template');
const { default: traverse } = require('@babel/traverse');
const {
  default: transformTemplateLiterals,
} = require('@babel/plugin-transform-template-literals');
const replaceExtension = require('replace-ext');

const regexEvent = /^event/;

/**
 * @param {string} source The source file path.
 * @param {string} extension The extension to replace source file path with.
 * @returns {string} Given `source` with its extension replaced with the given one, preserving `./`.
 */
function replaceExtensionRelative(source, extension) {
  return !/^\./.test(source)
    ? source
    : `${dirname(source) !== '.' ? '' : './'}${replaceExtension(
        source,
        extension
      )}`;
}

function createMetadataVisitor(api) {
  const { types: t } = api;

  /**
   * @param {Path} path The Babel path what a `@property()` decorator call refers to.
   * @returns {boolean} `true` if such decorator is imported from `lit-element`.
   */
  const propertyIsFromLit = (path) => {
    const { parentPath } = path;
    return (
      path.isImportSpecifier() &&
      path.get('imported').isIdentifier({ name: 'property' }) &&
      parentPath.isImportDeclaration &&
      parentPath.get('source').isStringLiteral({ value: 'lit-element' })
    );
  };

  const getParentClassImportSource = (path) => {
    const { parentPath } = path;
    if (
      path.isImportDefaultSpecifier() &&
      parentPath.isImportDeclaration &&
      parentPath.get('source').isStringLiteral()
    ) {
      return parentPath.get('source').node.value;
    }
    return undefined;
  };

  /**
   * Metadata harvested from `@property` decorator.
   *
   * @typedef {object} PropertyMetadata
   * @property {string} [type] The property type.
   * @property {string|boolean} [attribute]
   *   The attribute name the property maps to.
   *   `false` means there is no corresponding attribute.
   */

  /**
   * @param {Path} path The Babel path for `@property()` decorator call.
   * @returns {PropertyMetadata} The metadata harvested from the given `@property()` decorator call.
   */
  const getPropertyMetadata = (path) => {
    const metadata = {};
    const expression = path.get('expression');
    if (!t.isCallExpression(expression)) {
      return undefined;
    }

    if (
      !expression.get('callee').isIdentifier() ||
      !propertyIsFromLit(
        path.scope.getBinding(expression.get('callee.name').node).path
      )
    ) {
      return undefined;
    }

    const firstArg = expression.get('arguments.0');
    if (firstArg && firstArg.isObjectExpression()) {
      // eslint-disable-next-line no-restricted-syntax
      for (const property of firstArg.get('properties')) {
        const key = property.get('key');
        const value = property.get('value');
        if (key.isIdentifier({ name: 'type' })) {
          value.assertIdentifier();
          metadata.type = value.get('name').node;
        } else if (key.isIdentifier({ name: 'attribute' })) {
          if (!value.isBooleanLiteral() && !value.isStringLiteral()) {
            throw value.buildCodeFrameError(
              '`attribute` in `@property` must point to a boolean literal or a string literal.'
            );
          }
          metadata.attribute = value.get('value').node;
        }
      }
    }

    const leadingComments = path.parentPath.get('leadingComments');
    if (leadingComments) {
      metadata.comments = (
        Array.isArray(leadingComments) ? leadingComments : [leadingComments]
      )
        .map((item) => item.node)
        .filter(Boolean);
    }

    return metadata;
  };

  /**
   * @param {Path} path The Babel path of the superclass.
   * @returns {PropertyMetadata}
   *   The given Babel path itself if it's an identifier.
   *   The first argument if the given Babel path is a function, assuming it as a mixin call.
   */
  const getTarget = (path) => {
    if (path.isIdentifier()) {
      return path;
    }
    if (path.isCallExpression()) {
      return getTarget(path.get('arguments.0'));
    }
    return null;
  };

  /**
   * A visitor to gather metadata of custom element properties and events,
   * from `type` in `@property()` for the former, from `eventSomething` for the latter.
   * The gathered metadata is stored in the context `declaredProps` for the former, `customEvents` for the latter.
   */
  const metadataVisitor = {
    ClassDeclaration(path, context) {
      const { file } = context;
      const superClass = getTarget(path.get('superClass'));
      if (superClass) {
        const parentClassImportSource = getParentClassImportSource(
          superClass.scope.getBinding(superClass.node.name).path
        );
        if (parentClassImportSource) {
          const relativeTarget = relative(
            resolve(__dirname, '../src/components'),
            resolve(dirname(file.opts.filename), parentClassImportSource)
          );
          if (!isAbsolute(relativeTarget) && !relativeTarget.startsWith('..')) {
            context.parentDescriptorSource = parentClassImportSource;
          }
        }
      }
      const leadingComments = path.get('leadingComments');
      if (leadingComments) {
        context.classComments = leadingComments.map((item) => item.node);
      }
      context.className = path.get('id.name').node;
    },

    ClassMethod(path, { customEvents }) {
      const { static: staticMethod, kind, key } = path.node;
      const { name } = key;
      if (staticMethod && kind === 'get' && regexEvent.test(name)) {
        const body = path.get('body');
        const firstBody = body.get('body.0');
        firstBody.assertReturnStatement();
        const argument = firstBody.get('argument');
        if (!argument.isStringLiteral() && !argument.isTemplateLiteral()) {
          throw firstBody.buildCodeFrameError(
            '`static get eventFoo` must have and be only with a return statement with a string literal or a template literal.'
          );
        }
        const metadata = {
          eventName: t.cloneDeep(argument.node),
        };
        const leadingComments = path.get('leadingComments');
        if (leadingComments) {
          metadata.comments = (
            Array.isArray(leadingComments) ? leadingComments : [leadingComments]
          ).map((item) => item.node);
        }
        customEvents[name] = metadata;
      }
    },

    ClassProperty(path, { customEvents }) {
      const { static: staticField, key } = path.node;
      const value = path.get('value');
      const { name } = key;
      if (staticField && regexEvent.test(name)) {
        if (!value.isStringLiteral() && !value.isTemplateLiteral()) {
          throw value.buildCodeFrameError(
            '`static eventFoo` must refer to a string literal or a template literal.'
          );
        }
        const metadata = {
          eventName: t.cloneDeep(value.node),
        };
        const leadingComments = path.get('leadingComments');
        if (leadingComments) {
          metadata.comments = (
            Array.isArray(leadingComments) ? leadingComments : [leadingComments]
          ).map((item) => item.node);
        }
        customEvents[name] = metadata;
      }
    },

    Decorator(path, context) {
      const { parent, parentPath } = path;
      const { declaredProps } = context;
      const expression = path.get('expression');
      const customElementName = expression.get('arguments.0');
      if (
        expression.isCallExpression() &&
        expression.get('callee').isIdentifier({ name: 'customElement' })
      ) {
        if (
          !customElementName.isStringLiteral() &&
          !customElementName.isTemplateLiteral()
        ) {
          throw customElementName.buildCodeFrameError(
            '`@customElement()` must be called with the custom element name.'
          );
        }
        context.customElementName = customElementName.node;
      }

      const metadata = getPropertyMetadata(path);
      if (metadata) {
        if (
          !parentPath.isClassProperty() &&
          (!parentPath.isClassMethod() ||
            (parentPath.node.kind !== 'get' && parentPath.node.kind !== 'set'))
        ) {
          throw parentPath.buildCodeFrameError(
            '`@property()` must target class properties.'
          );
        }
        declaredProps[parent.key.name] = metadata;
      }
    },

    ExportNamedDeclaration(path, context) {
      const { source, specifiers } = path.node;
      const { namedExportsSources } = context;
      if (specifiers.length > 0) {
        if (source) {
          const { value: sourceValue } = source;
          namedExportsSources[sourceValue] =
            namedExportsSources[sourceValue] || {};
          // eslint-disable-next-line no-restricted-syntax
          for (const { local, exported } of specifiers) {
            namedExportsSources[sourceValue][exported.name] = local.name;
          }
        } else {
          // eslint-disable-next-line no-restricted-syntax
          for (const { local, exported } of specifiers) {
            const { path: bindingPath } = path.scope.getBinding(local.name);
            const { value: bindingSourceValue } =
              bindingPath.parentPath.node.source;
            namedExportsSources[bindingSourceValue] =
              namedExportsSources[bindingSourceValue] || {};
            namedExportsSources[bindingSourceValue][exported.name] =
              bindingPath.isImportDefaultSpecifier()
                ? 'default'
                : bindingPath.get('imported').node.name;
          }
        }
      }
    },
  };

  return metadataVisitor;
}

module.exports = function generateCreateReactCustomElementType(
  api,
  { nonUpgradable } = {}
) {
  const { types: t } = api;

  const booleanSerializerIdentifier = t.identifier('booleanSerializer');
  const numberSerializerIdentifier = t.identifier('numberSerializer');
  const objectSerializerIdentifier = t.identifier('objectSerializer');

  /**
   * The named import specifiers associated with `type` in `@property`.
   *
   * @type {object<string, ImportSpecifier>}
   */
  const importSpecifiers = {
    Boolean: t.importSpecifier(
      booleanSerializerIdentifier,
      booleanSerializerIdentifier
    ),
    Number: t.importSpecifier(
      numberSerializerIdentifier,
      numberSerializerIdentifier
    ),
    Object: t.importSpecifier(
      objectSerializerIdentifier,
      objectSerializerIdentifier
    ),
  };

  /**
   * The serializers associated with `type` in `@property`.
   *
   * @type {object<string, Identifier>}
   */
  const serializers = {
    Boolean: booleanSerializerIdentifier,
    Number: numberSerializerIdentifier,
    Object: objectSerializerIdentifier,
  };

  /**
   * The prop types associated with `type` in `@property`.
   *
   * @type {object<string, Identifier>}
   */
  const propTypesForLitTypes = {
    String: t.memberExpression(
      t.identifier('PropTypes'),
      t.identifier('string')
    ),
    Boolean: t.memberExpression(
      t.identifier('PropTypes'),
      t.identifier('bool')
    ),
    Number: t.memberExpression(
      t.identifier('PropTypes'),
      t.identifier('number')
    ),
    Object: t.memberExpression(
      t.identifier('PropTypes'),
      t.identifier('object')
    ),
  };

  /**
   *
   * @param {object<string, PropertyMetadata>} declaredProps The list of metadata harvested from `@property()` decorator calls.
   * @returns {ImportDeclaration} The `import` statement for `src/globals/wrappers/createReactCustomElementType`.
   */
  const buildCreateReactCustomElementTypeImport = (declaredProps) => {
    const typesInUse = Object.keys(declaredProps)
      .map((name) => declaredProps[name].type)
      .filter((type) => importSpecifiers[type]);

    return t.importDeclaration(
      [
        t.importDefaultSpecifier(t.identifier('createReactCustomElementType')),
        ...Array.from(new Set(typesInUse)).map(
          (type) => importSpecifiers[type]
        ),
      ],
      t.stringLiteral('../../globals/wrappers/createReactCustomElementType.js')
    );
  };

  /**
   * @param {object<string, PropertyMetadata>} declaredProps The list of metadata harvested from `@property()` decorator calls.
   * @returns {ObjectProperty[]}
   *   The list of `{ attribute: 'attribute-name', serialize: typeSerializer }` generated from `@property()` decorators.
   */
  const buildPropsDescriptor = (declaredProps) =>
    Object.keys(declaredProps).map((name) => {
      const { type, attribute } = declaredProps[name];
      const propDesciptor = [];
      if (attribute === false) {
        propDesciptor.push(
          t.objectProperty(t.identifier('attribute'), t.booleanLiteral(false))
        );
      } else {
        if (type && type !== 'String') {
          const serializer = serializers[type];
          if (!serializer) {
            throw new Error(`No serializer found for type: ${type}`);
          }
          propDesciptor.push(
            t.objectProperty(t.identifier('serialize'), serializer)
          );
        }
        if (attribute) {
          propDesciptor.push(
            t.objectProperty(
              t.identifier('attribute'),
              t.stringLiteral(attribute)
            )
          );
        }
      }
      return t.objectProperty(
        t.identifier(name),
        t.objectExpression(propDesciptor)
      );
    });

  /**
   * @param {object<string, StringLiteral|TemplateLiteral>} customEvents
   *   The list of metadata harvested from `eventSomething` static properties.
   * @returns {ObjectProperty[]} The list of `{ event: 'event-name' }` generated from `eventSomething` static properties.
   */
  const buildEventsDescriptor = (customEvents) =>
    Object.keys(customEvents).map((name) =>
      t.objectProperty(
        t.identifier(name.replace(regexEvent, 'on')),
        t.objectExpression([
          t.objectProperty(t.identifier('event'), customEvents[name].eventName),
        ])
      )
    );

  /**
   * @param {object<string, PropertyMetadata>} declaredProps The list of metadata harvested from `@property()` decorator calls.
   * @returns {ObjectProperty[]} The list of `PropTypes.someType` generated from `@property()` decorators.
   */
  const buildPropTypes = (declaredProps) =>
    Object.keys(declaredProps).map((name) => {
      const { type } = declaredProps[name];
      const propType = propTypesForLitTypes[type || 'String'];
      if (!propType) {
        throw new Error(`No React prop type found for type: ${type}`);
      }
      return t.objectProperty(t.identifier(name), propType);
    });

  /**
   * @param {object<string, StringLiteral|TemplateLiteral>} customEvents
   *   The list of metadata harvested from `eventSomething` static properties.
   * @returns {ObjectProperty[]} The list of `PropTypes.func` generated from `eventSomething` static properties.
   */
  const buildEventsPropTypes = (customEvents) =>
    Object.keys(customEvents).map((name) =>
      t.objectProperty(
        t.identifier(name.replace(regexEvent, 'on')),
        t.memberExpression(t.identifier('PropTypes'), t.identifier('func'))
      )
    );

  const metadataVisitor = createMetadataVisitor(api);

  /**
   * A Babel plugin that first gathers metadata of custom element properties/events from AST,
   * then creates another AST of `createReactCustomElementType()` and replaces the original AST with the created one.
   */
  return {
    name: 'create-react-custom-element-type',
    visitor: {
      Program(path, { file }) {
        const declaredProps = {};
        const customEvents = {};
        const namedExportsSources = {};
        const context = {
          file,
          declaredProps,
          customEvents,
          namedExportsSources,
        };
        // Gathers metadata of custom element properties and events, into `context`
        path.traverse(metadataVisitor, context);

        const relativePath = relative(
          resolve(__dirname, '../src/components'),
          file.opts.filename
        );
        const retargedPath = t.stringLiteral(
          `../../components/${replaceExtension(relativePath, '.js')}`
        );

        // Creates a module with `createReactCustomElementType()`
        // with the gathered metadata of custom element properties and events
        const descriptors = t.objectExpression([
          ...buildPropsDescriptor(declaredProps),
          ...buildEventsDescriptor(customEvents),
        ]);
        const descriptorsWithParent = !context.parentDescriptorSource
          ? descriptors
          : t.callExpression(
              t.memberExpression(
                t.identifier('Object'),
                t.identifier('assign')
              ),
              [
                t.objectExpression([]),
                t.identifier('parentDescriptor'),
                descriptors,
              ]
            );

        const propTypes = t.objectExpression([
          ...buildPropTypes(declaredProps),
          ...buildEventsPropTypes(customEvents),
        ]);
        const propTypesWithParent = !context.parentDescriptorSource
          ? propTypes
          : t.callExpression(
              t.memberExpression(
                t.identifier('Object'),
                t.identifier('assign')
              ),
              [
                t.objectExpression([]),
                t.identifier('parentPropTypes'),
                propTypes,
              ]
            );

        const body = [];
        if (!context.customElementName) {
          if (context.className) {
            // Class name found but custom element name not found means that it's likely a module not for custom element
            // (e.g. an abstract class like floating menu)
            // If so, we just export empty `descriptor` and re-export from the original class
            body.unshift(
              ...template.ast`
                 export var descriptor = ${descriptorsWithParent};
                 export var propTypes = ${propTypesWithParent};
               `
            );
          }
        } else {
          body.unshift(
            buildCreateReactCustomElementTypeImport(declaredProps),
            ...template.ast`
               import PropTypes from "prop-types";
               import settings from "carbon-components/es/globals/js/settings.js";
               var prefix = settings.prefix;
               export var descriptor = ${descriptorsWithParent};
               export var propTypes = ${propTypesWithParent};
               const Component = createReactCustomElementType(${context.customElementName}, descriptor);
               Component.propTypes = propTypes;
               export default Component;
             `
          );
          if (!nonUpgradable) {
            body.unshift(
              t.exportNamedDeclaration(
                null,
                [
                  t.exportSpecifier(
                    t.identifier('default'),
                    t.identifier('CustomElement')
                  ),
                ],
                retargedPath
              )
            );
          }
        }
        if (context.parentDescriptorSource) {
          body.unshift(
            t.importDeclaration(
              [
                t.importSpecifier(
                  t.identifier('parentDescriptor'),
                  t.identifier('descriptor')
                ),
              ],
              t.stringLiteral(
                replaceExtensionRelative(context.parentDescriptorSource, '.js')
              )
            ),
            t.importDeclaration(
              [
                t.importSpecifier(
                  t.identifier('parentPropTypes'),
                  t.identifier('propTypes')
                ),
              ],
              t.stringLiteral(
                replaceExtensionRelative(context.parentDescriptorSource, '.js')
              )
            )
          );
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const [source, exports] of Object.entries(namedExportsSources)) {
          body.unshift(
            t.exportNamedDeclaration(
              null,
              Object.keys(exports).map((exportedName) =>
                t.exportSpecifier(
                  t.identifier(exports[exportedName]),
                  t.identifier(exportedName)
                )
              ),
              t.stringLiteral(replaceExtensionRelative(source, '.js'))
            )
          );
        }
        const program = t.program(body);
        traverse(
          program,
          transformTemplateLiterals(api).visitor,
          path.scope,
          path
        );
        path.replaceWith(program);
        path.stop();
      },
    },
  };
};

module.exports.createMetadataVisitor = createMetadataVisitor;
