/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const t = require('@babel/types');
const { default: generate } = require('@babel/generator');
const { default: template } = require('@babel/template');
const { babel } = require('@rollup/plugin-babel');
const fs = require('fs-extra');
const path = require('path');
const { rollup } = require('rollup');
const ts = require('typescript');
const virtual = require('../plugins/virtual');
const { babelConfig } = require('./next/babel');
const { svgToJSX, jsToAST } = require('./next/convert');
const templates = require('./next/templates');
const { writeTsDefinitions } = require('./next/typescript');

// This builder outputs a collection of CommonJS modules representing our icon
// components. It does not generate an `index.js` entrypoint file due to the
// number of icons we currently support (>1600)
//
// Each CommonJS module includes an icon component. For more information on the
// structure of each module, checkout `createIconEntrypoint`
async function builder(metadata, { output }) {
  const modules = metadata.icons.map((icon) => {
    const { moduleInfo } = icon;
    const localPreamble = [];
    const globalPreamble = [];

    if (icon.deprecated) {
      localPreamble.push(
        templates.deprecatedBlock({
          check: t.identifier('didWarnAboutDeprecation'),
          warning: t.stringLiteral(
            formatDeprecationWarning(moduleInfo.local, icon.reason)
          ),
        })
      );

      globalPreamble.push(
        templates.deprecatedBlock({
          check: t.memberExpression(
            t.identifier('didWarnAboutDeprecation'),
            t.stringLiteral(moduleInfo.global),
            true
          ),
          warning: t.stringLiteral(
            formatDeprecationWarning(moduleInfo.global, icon.reason)
          ),
        })
      );
    }

    const localSource = createIconSource(
      moduleInfo.local,
      moduleInfo.sizes,
      localPreamble
    );

    const globalSource = createIconSource(
      moduleInfo.global,
      moduleInfo.sizes,
      globalPreamble
    );

    return {
      filepath: moduleInfo.filepath,
      entrypoint: createIconEntrypoint(
        moduleInfo.local,
        localSource,
        icon.deprecated
      ),
      name: moduleInfo.global,
      source: globalSource,
    };
  });

  // Rollup allows us to define multiple "entrypoints" instead of only one when
  // creating a bundle. This allows us to map different input paths in the
  // `input` object to files that we're generating for each icon component in
  // the `files` object
  const files = {
    'index.ts': template.ast(`
      import Icon from './Icon.tsx';
      export { Icon };
    `),
  };
  const input = {
    'index.js': 'index.ts',
    'Icon.js': './Icon.tsx',
  };
  const BUCKET_SIZE = 125;
  const buckets = [
    {
      id: 'bucket-0',
      modules: [],
    },
  ];
  let bucket = buckets[0];
  let bucketIndex = 0;

  for (const m of modules) {
    if (bucket.modules.length === BUCKET_SIZE) {
      bucketIndex++;
      bucket = {
        id: `bucket-${bucketIndex}`,
        modules: [],
      };
      buckets.push(bucket);
    }

    bucket.modules.push(m);
  }

  for (const m of modules) {
    files[m.filepath] = m.entrypoint;
    input[m.filepath] = m.filepath;
  }

  for (const bucket of buckets) {
    const filename = `generated/${bucket.id}.js`;

    input[filename] = filename;
    files[filename] = template.ast(`
      import React from 'react';
      import Icon from './Icon.tsx';
      import { iconPropTypes } from './iconPropTypes.js';
      const didWarnAboutDeprecation = {};
    `);

    for (const m of bucket.modules) {
      files[filename].push(...m.source, template.ast(`export { ${m.name} };`));
    }

    files[filename] = t.file(t.program(files[filename]));
    files[filename] = generate(files[filename]).code;
    files['index.ts'].push(template.ast(`export * from '${filename}';`));
  }

  files['index.ts'] = generate(t.file(t.program(files['index.ts']))).code;

  const defaultVirtualOptions = {
    // Each Icon module uses the "./Icon.tsx" path to import this base component
    // Babel transforms the .tsx extension to .js
    './Icon.tsx': await fs.readFile(
      path.resolve(__dirname, './components/Icon.tsx'),
      'utf8'
    ),
    './iconPropTypes.js': `
    import PropTypes from 'prop-types';

    export const iconPropTypes = {
      size: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    };
  `,
  };

  const bundle = await rollup({
    input,
    external: ['@carbon/icon-helpers', 'react', 'prop-types'],
    plugins: [
      // We use a "virtual" plugin to pass all of our components that we
      // created from our metadata to rollup instead of rollup trying to read
      // these files from disk
      virtual({
        ...defaultVirtualOptions,
        ...files,
      }),
      babel(babelConfig),
    ],
  });
  const targets = [
    {
      directory: path.join(output, 'es'),
      format: 'esm',
      tsModuleKind: ts.ModuleKind.ESNext,
    },
    {
      directory: path.join(output, 'lib'),
      format: 'commonjs',
      tsModuleKind: ts.ModuleKind.CommonJS,
    },
  ];

  for (const target of targets) {
    await bundle.write({
      dir: target.directory,
      format: target.format,
      entryFileNames: '[name]',
      banner: templates.banner,
      exports: 'auto',
    });

    // write TypeScript definition files
    writeTsDefinitions(modules, buckets, target.tsModuleKind, target.directory);
  }
}

/**
 * Generates a CommonJS entrypoint for an icon, including all size variations
 * for the icon. This helper also generates deprecation warning if the given
 * icon has been deprecated.
 *
 * The general structure of each icon module is as follows:
 *
 * ```jsx
 * import React from 'react';
 * import Icon from './Icon.tsx';
 *
 * const ComponentName = React.forwardRef(
 *   function ComponentName({ children, size = 32, ... rest}, ref) {
 *     return (
 *       <Icon width={size} height={size} ref={ref} {...rest>
 *         <path d="..." />
 *         {children}
 *      </Icon>
 *   }
 * );
 *
 * export default ComponentName;
 * ```
 *
 * @param {string} moduleName
 * @param {Array<object>} source
 * @param {boolean} [isDeprecated]
 * @returns {string}
 */
function createIconEntrypoint(moduleName, source, isDeprecated = false) {
  const statements = [
    // Import statements
    template.ast(`import React from 'react';`),
    template.ast(`import Icon from './Icon.tsx';`),
    template.ast(`import { iconPropTypes } from './iconPropTypes.js';`),
  ];

  // Optional preamble block for deprecation. This block sets up our state for
  // tracking if we've warned about the icon being deprecated
  if (isDeprecated) {
    statements.push(template.ast(`let didWarnAboutDeprecation = false;`));
  }

  statements.push(...source);

  // Export statement
  statements.push(template.ast(`export default ${moduleName};`));

  const file = t.file(t.program(statements));
  const { code } = generate(file);

  return code;
}

/**
 * Generate the source for an Icon component. This includes support for icons
 * that have a single size, along with icons that have different assets across
 * different sizes.
 *
 * In order to handle icons with different assets across sizes, we conditionally
 * render the JSX for each size inside of the Icon component
 *
 * @param {string} moduleName
 * @param {Array<object>} sizes
 * @param {Array<object>} [preamble]
 */
function createIconSource(moduleName, sizes, preamble = []) {
  // We map over all of our different asset sizes to generate the JSX needed to
  // render the asset
  const sizeVariants = sizes.map(({ size, ast }) => {
    const { svgProps, children } = svgToJSX(ast);
    const source = templates.jsx({
      props: t.objectExpression([
        t.objectProperty(t.identifier('width'), t.identifier('size')),
        t.objectProperty(t.identifier('height'), t.identifier('size')),
        t.objectProperty(t.identifier('ref'), t.identifier('ref')),
        ...Object.entries(svgProps).map(([key, value]) => {
          return t.objectProperty(t.identifier(key), jsToAST(value));
        }),
        t.spreadElement(t.identifier('rest')),
      ]),
      children,
    });

    return {
      source,
      size: size || 'glyph',
    };
  });

  // Find our max size from all of our asset sizes. The max size will be our
  // "default" icon, meaning that it will be used if no matches come in for a
  // specific size
  const maxSize = sizeVariants.reduce((maxSize, { size }) => {
    if (size > maxSize) {
      return size;
    }
    return maxSize;
  }, -Infinity);

  // Each asset that is not used for our "default" icon will conditionally
  // render from an if statement in our component
  const ifStatements = sizeVariants.filter(({ size }) => {
    return size !== maxSize;
  });

  // The "default" icon that will be rendered, based on the max size
  const returnStatement =
    sizeVariants.find(({ size }) => {
      return size === maxSize;
    }) ?? sizeVariants[0];

  // We build up our component source by adding in any necessary deprecation
  // blocks along with conditionally rendering all asset sizes. We also use a
  // return statement for the "default" icon
  const source = templates.component({
    moduleName: t.identifier(moduleName),
    defaultSize: t.numericLiteral(16),
    statements: [
      ...preamble,
      ...ifStatements.map(({ size, source }) => {
        // Generate if (size === 16 || size === '16' || size === '16px') {}
        // block statements to match on numbers or strings
        return t.ifStatement(
          t.logicalExpression(
            '||',
            t.logicalExpression(
              '||',
              t.binaryExpression('===', t.identifier('size'), jsToAST(size)),
              t.binaryExpression(
                '===',
                t.identifier('size'),
                jsToAST('' + size)
              )
            ),
            t.binaryExpression(
              '===',
              t.identifier('size'),
              jsToAST(`${size}px`)
            )
          ),
          t.blockStatement([t.returnStatement(source)])
        );
      }),
      t.returnStatement(returnStatement.source),
    ].filter(Boolean),
  });

  return source;
}

/**
 * Format a given module name and reason into a single warning message
 * @param {string} moduleName
 * @param {string} [reason]
 * @returns {string}
 */
function formatDeprecationWarning(moduleName, reason) {
  if (!reason) {
    return (
      `The ${moduleName} component has been deprecated and will be ` +
      `removed in the next major version of @carbon/icons-react.`
    );
  }

  return (
    `${reason}. As a result, the ${moduleName} component will be removed in ` +
    `the next major version of @carbon/icons-react.`
  );
}

module.exports = builder;
