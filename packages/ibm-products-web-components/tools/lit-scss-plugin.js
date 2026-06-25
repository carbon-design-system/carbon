/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import fs from 'fs/promises';
import * as sass from 'sass';

const noop = (s) => s;
const LIT_QUERY = '?lit';

function normalizeLitPath(id) {
  return id.endsWith(LIT_QUERY) ? id.slice(0, -LIT_QUERY.length) : id;
}

function matchesPattern(pattern, id) {
  if (pattern == null) {
    return false;
  }

  if (Array.isArray(pattern)) {
    return pattern.some((entry) => matchesPattern(entry, id));
  }

  if (pattern instanceof RegExp) {
    return pattern.test(id);
  }

  if (typeof pattern === 'function') {
    return pattern(id);
  }

  if (typeof pattern === 'string') {
    return id.includes(pattern);
  }

  return false;
}

function createFilter(include, exclude) {
  return (id) => {
    const included = include == null ? true : matchesPattern(include, id);
    const excluded = exclude == null ? false : matchesPattern(exclude, id);
    return included && !excluded;
  };
}

/**
 * @param {string} css A CSS.
 * @returns {string} A `lit-html` template of the given CSS.
 */
function transformToTemplate(css) {
  return `import { css } from 'lit';export default css([${JSON.stringify(
    css
  )}])`;
}

/**
 * @param {object} [options] The options.
 * @param {RegExp} [options.include=/\.scss/] The files to include.
 * @param {RegExp} [options.exclude] The files to exclude.
 * @param {Function} [options.preprocessor] The CSS preprocessor to use.
 * @returns {object} The plugin to transform an `.scss` file to a `lit-html` template.
 */
export default function LitSCSS({
  include = /\.scss(\?lit)?$/i,
  exclude,
  preprocessor = noop,
  ...options
} = {}) {
  const filter = createFilter(include, exclude);
  return {
    name: 'lit-scss',

    async resolveId(source, importer) {
      if (!filter(source) || !importer) {
        return null;
      }

      const cleanSource = normalizeLitPath(source);
      const resolved = await this.resolve(cleanSource, importer, {
        skipSelf: true,
      });
      if (!resolved) {
        return null;
      }

      return source.endsWith(LIT_QUERY)
        ? `${resolved.id}${LIT_QUERY}`
        : resolved;
    },

    /**
     * Enqueues the module contents for loading.
     *
     * @param {string} id The module ID.
     */
    load(id) {
      if (filter(id)) {
        this.addWatchFile(path.resolve(normalizeLitPath(id)));
      }
      if (!id.endsWith(LIT_QUERY)) {
        return null;
      }

      return fs.readFile(normalizeLitPath(id), 'utf8');
    },

    /**
     * Transforms the module contents.
     *
     * @param {string} contents The module contents.
     * @param {string} id The module ID.
     * @returns {object} The transformed module contents.
     */
    async transform(contents, id) {
      if (!filter(id)) {
        return null;
      }

      const resolvedId = normalizeLitPath(id);
      const finalContent = `
        $feature-flags: (
          enable-css-custom-properties: true,
        );
       ${contents}`;

      const { includePaths, ...sassOptions } = options;
      const { css } = sass.compileString(finalContent, {
        ...sassOptions,
        url: `file://${path.resolve(resolvedId)}`,
        loadPaths: includePaths || [],
      });

      return {
        code: transformToTemplate(await preprocessor(css.toString(), id)),
        map: {
          mappings: '',
        },
      };
    },
  };
}
