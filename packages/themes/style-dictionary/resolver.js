/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Reads a DTCG resolver document (2025.10). Style Dictionary does not read
 * resolver files, so this turns one modifier context into the token files of a
 * single Style Dictionary run.
 *
 * Only what `tokens/themes.resolver.json` uses is supported: sets and modifier
 * contexts whose sources reference token files, and a `resolutionOrder` that
 * references those sets and modifiers. Anything else throws.
 *
 * @see https://www.designtokens.org/tr/2025.10/resolver/
 * @param {string} filepath
 */
function readResolver(filepath) {
  const document = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const directory = path.dirname(filepath);

  function files(sources) {
    return sources.map((source) => {
      if (typeof source.$ref !== 'string' || source.$ref.startsWith('#')) {
        throw new Error(
          `${filepath}: only sources that reference a token file are supported`
        );
      }
      return path.resolve(directory, source.$ref);
    });
  }

  return {
    /**
     * The context names of a modifier.
     *
     * @param {string} modifier
     * @returns {string[]}
     */
    contexts(modifier) {
      return Object.keys(document.modifiers[modifier].contexts);
    },

    /**
     * The token files for one set of inputs, in resolution order. Files from
     * sets are returned as `include` and files from modifiers as `source`,
     * matching the Style Dictionary options of the same names.
     *
     * @param {Record<string, string>} inputs  modifier name → context name
     * @returns {{ include: string[], source: string[] }}
     */
    resolve(inputs = {}) {
      const include = [];
      const source = [];

      for (const { $ref } of document.resolutionOrder) {
        const [, kind, name] = /^#\/(sets|modifiers)\/(.+)$/.exec($ref) ?? [];
        const item = document[kind]?.[name];
        if (!item) {
          throw new Error(`${filepath}: unsupported resolutionOrder "${$ref}"`);
        }

        if (kind === 'sets') {
          // Style Dictionary always merges `include` before `source`
          if (source.length > 0) {
            throw new Error(`${filepath}: sets must come before modifiers`);
          }
          include.push(...files(item.sources));
          continue;
        }

        const context = inputs[name] ?? item.default;
        if (!item.contexts[context]) {
          throw new Error(`${filepath}: unknown ${name} context "${context}"`);
        }
        source.push(...files(item.contexts[context]));
      }

      return { include, source };
    },
  };
}

module.exports = { readResolver };
