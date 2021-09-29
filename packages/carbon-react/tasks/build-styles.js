/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');

async function build() {
  const styles = {
    type: 'directory',
    filepath: 'scss',
    files: [
      {
        type: 'file',
        filepath: '_breakpoint.scss',
      },
      {
        type: 'file',
        filepath: '_colors.scss',
      },
      {
        type: 'file',
        filepath: '_config.scss',
      },
      {
        type: 'file',
        filepath: '_feature-flags.scss',
      },
      {
        type: 'file',
        filepath: '_grid.scss',
      },
      {
        type: 'file',
        filepath: '_motion.scss',
      },
      {
        type: 'file',
        filepath: '_reset.scss',
      },
      {
        type: 'file',
        filepath: '_spacing.scss',
      },
      {
        type: 'file',
        filepath: '_theme.scss',
      },
      {
        type: 'file',
        filepath: '_themes.scss',
      },
      {
        type: 'file',
        filepath: '_type.scss',
      },
      {
        type: 'file',
        filepath: '_zone.scss',
      },
      {
        type: 'directory',
        filepath: 'components',
        files: [
          {
            type: 'directory',
            filepath: 'accordion',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'breadcrumb',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'button',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'checkbox',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'code-snippet',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'combo-box',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'content-switcher',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'copy-button',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'data-table',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'date-picker',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'dropdown',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'file-uploader',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'form',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'inline-loading',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'link',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'list',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'loading',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'menu',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'modal',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'multiselect',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'notification',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'number-input',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'overflow-menu',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'pagination',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'pagination-nav',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'progress-indicator',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'radio-button',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'search',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'select',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'slider',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'structured-list',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'tabs',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'tag',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'text-area',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'text-input',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'tile',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'time-picker',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'toggle',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'tooltip',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'treeview',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
          {
            type: 'directory',
            filepath: 'ui-shell',
            files: [
              {
                type: 'file',
                filepath: '_index.scss',
              },
            ],
          },
        ],
      },
      {
        type: 'directory',
        filepath: 'compat',
        files: [
          {
            type: 'file',
            filepath: '_theme.scss',
          },
          {
            type: 'file',
            filepath: '_themes.scss',
          },
        ],
      },
    ],
  };
  const files = collect(styles);

  await Promise.all(
    files.map(async (file) => {
      const filepath = path.resolve(__dirname, '..', file.relativePath);
      await fs.ensureFile(filepath);
      await fs.writeFile(
        filepath,
        `// Code generated by @carbon/react. DO NOT EDIT.
//
// Copyright IBM Corp. 2018, 2018
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@forward '@carbon/styles/${file.importPath}';
`
      );
    })
  );
}

function collect(node, directory = '') {
  if (node.type === 'directory') {
    const context = path.join(directory, node.filepath);
    return node.files.flatMap((node) => {
      return collect(node, context);
    });
  }

  if (node.type === 'file') {
    // The location where this file will live in the `scss` folder
    const relativePath = path.join(directory, node.filepath);
    // The path used for the `@forward` rule in the file itself
    let importPath = '';

    // If we ahve an `_index.scss` entrypoint, we can re-export from the
    // directory itself
    if (node.filepath === '_index.scss') {
      importPath = path.dirname(relativePath);
    } else {
      // Otherwise, let's drop the leading `_` and trailing `.scss` from the
      // file name to get the import
      const basename = node.filepath.replace(/^_/, '').replace(/\.scss$/, '');
      importPath = path.join(directory, basename);
    }

    return {
      relativePath,
      importPath,
    };
  }

  throw new Error(`Unknown node type: ${node.type}`);
}

build().catch((error) => {
  console.log(error);
  process.exit(1);
});
