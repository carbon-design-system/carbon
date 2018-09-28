'use strict';

const icons = require('@carbon/icons');
const del = require('del');
const { camelCase, pascal } = require('change-case');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const { rollup } = require('rollup');
const { BUILD_DIRS, BUILD_ES_DIR, BUILD_STORYBOOK } = require('./paths');

const prettierOptions = {
  parser: 'babylon',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
};

const MODULE_TYPES = [
  {
    type: 'cjs',
    folder: 'lib',
  },
  {
    type: 'umd',
    folder: 'umd',
  },
];

async function build() {
  console.log('Cleaning up build directories...');
  await del(BUILD_DIRS);

  // Copy tools over
  console.log('Copying icon tooling and building modules...');
  const toolsSource = path.join(__dirname, './tools.js');
  const toolsPath = path.join(BUILD_ES_DIR, 'tools.js');
  await fs.copy(toolsSource, toolsPath);

  const toolsBundle = await rollup({
    input: toolsPath,
    external: ['react'],
  });
  await Promise.all(
    MODULE_TYPES.map(async ({ type, folder }) => {
      const outputOptions = {
        format: type,
        file: toolsPath.replace(/\/es\//, `/${folder}/`),
      };
      if (type === 'umd') {
        outputOptions.name = 'CarbonIconsReactTools';
        outputOptions.globals = {
          react: 'React',
        };
      }
      return toolsBundle.write(outputOptions);
    })
  );

  const iconExports = Object.keys(icons);

  console.log(`Building components for ${iconExports.length} icons...`);
  const files = await Promise.all(
    iconExports.map(async iconExport => {
      const { name, size, attrs, content } = icons[iconExport];
      const folder = path.join(BUILD_ES_DIR, name);
      const filepath = path.join(folder, `${size}.js`);
      const exportName =
        size === 'glyph' ? pascal(`${name}Glyph`) : pascal(`${name}${size}`);
      const source = `import React from 'react';
import { createIconComponent } from '../tools';

export default createIconComponent({
  name: '${exportName}',
  width: ${attrs.width},
  height: ${attrs.height},
  viewBox: '${attrs.viewBox}',
  children: [${content.map(iconToString).join(',')}]
});`;

      return {
        name,
        size,
        module: {
          folder,
          filepath,
          name: exportName,
          source: prettier.format(source, prettierOptions),
        },
      };
    })
  );

  console.log('Building JS modules...');
  await Promise.all(
    files.map(async file => {
      const { name, size, module: iconModule } = file;
      const { folder, filepath, source, name: exportName } = iconModule;

      await fs.ensureDir(folder);
      await fs.writeFile(filepath, source);

      const modules = MODULE_TYPES.map(
        async ({ type, folder: moduleTypeFolder }) => {
          const bundle = await rollup({
            input: filepath,
            external(id) {
              if (type === 'umd') {
                return id === 'react';
              }
              return id === 'react' || id.includes('tools.js');
            },
          });

          const outputOptions = {
            format: type,
            file: filepath.replace(/\/es\//, `/${moduleTypeFolder}/`),
          };

          if (type === 'umd') {
            outputOptions.name = exportName;
            outputOptions.globals = {
              react: 'React',
            };
          }

          return bundle.write(outputOptions);
        }
      );

      await Promise.all(modules);
    })
  );

  // Build entrypoint
  console.log('Creating icon entrypoints...');
  const entrypointPath = path.join(BUILD_ES_DIR, 'index.js');
  const entrypointImports = files.reduce((acc, file) => {
    const { name, size, module: iconModule } = file;
    return (
      acc + `import ${getModuleName(iconModule.name)} from './${name}/${size}';`
    );
  }, '');
  const entrypointExports = files
    .map(file => getModuleName(file.module.name))
    .join(', ');
  const entrypoint = prettier.format(
    `${entrypointImports}
  export {
  ${entrypointExports}
  };
  `,
    prettierOptions
  );

  await fs.writeFile(entrypointPath, entrypoint);

  const entrypointBundle = await rollup({
    input: entrypointPath,
    external: ['react'],
  });

  await Promise.all(
    MODULE_TYPES.map(async ({ type, folder }) => {
      const outputOptions = {
        format: type,
        file: entrypointPath.replace(/\/es\//, `/${folder}/`),
      };

      if (type === 'umd') {
        outputOptions.name = 'CarbonIconsReact';
        outputOptions.globals = {
          react: 'React',
        };
      }

      return entrypointBundle.write(outputOptions);
    })
  );

  // Create storybook stories
  console.log('Creating storybook stories...');
  await fs.ensureDir(BUILD_STORYBOOK);
  await Promise.all(
    files.map(async file => {
      const { name } = file.module;
      const storyPath = path.join(BUILD_STORYBOOK, `${name}-story.js`);
      const storySource = `import React from 'react';
import { storiesOf } from '@storybook/react';
import ${getModuleName(name)} from '../../../lib/${file.name}/${file.size}';

storiesOf('${name}', module).add('default', () => <${getModuleName(name)} />);
`;

      await fs.writeFile(
        storyPath,
        prettier.format(storySource, prettierOptions)
      );
    })
  );
}

function getModuleName(name) {
  if (isNaN(name[0])) {
    return name;
  }
  return `_${name}`;
}

function iconToString(descriptor) {
  const { elem, attrs = {}, content = [] } = descriptor;
  const props = Object.keys(attrs).reduce((acc, key) => {
    return {
      ...acc,
      [camelCase(key)]: attrs[key],
    };
  }, {});
  if (content.length === 0) {
    return `React.createElement('${elem}', ${JSON.stringify(props)})`;
  }
  const children = content.map(iconToString).join(', ');
  return `React.createElement('${elem}', ${JSON.stringify(
    props
  )}, ${children})`;
}

module.exports = build;
