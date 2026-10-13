/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const virtualPrefix = '\0carbon-lit-style:';
const virtualSuffix = '.js';

/**
 * `*.scss?lit` is rewritten by `@mordech/vite-lit-loader` into a `?inline`
 * import after Vite has already compiled that same file as SCSS. Storybook
 * then compiles every component stylesheet twice. Resolve `?lit` styles to a
 * JavaScript module that imports `?inline` once, before the CSS pipeline sees
 * the original id.
 *
 * The virtual id must not end in a stylesheet extension. Vite treats any id
 * ending in `.scss` as CSS and would compile the generated JavaScript.
 */
export function litStyleEntryPlugin() {
  return {
    name: 'carbon:lit-style-entry',
    enforce: 'pre',
    async resolveId(source, importer) {
      const queryIndex = source.indexOf('?');
      if (queryIndex === -1) {
        return null;
      }

      const params = new URLSearchParams(source.slice(queryIndex + 1));
      if (!params.has('lit')) {
        return null;
      }

      const filename = source.slice(0, queryIndex);
      if (!/\.(scss|sass|css)$/.test(filename)) {
        return null;
      }

      const resolved = await this.resolve(filename, importer, {
        skipSelf: true,
      });
      if (!resolved || resolved.external) {
        return null;
      }

      return `${virtualPrefix}${resolved.id}${virtualSuffix}`;
    },
    load(id) {
      if (!id.startsWith(virtualPrefix) || !id.endsWith(virtualSuffix)) {
        return null;
      }

      const file = id.slice(virtualPrefix.length, -virtualSuffix.length);
      return `import { unsafeCSS } from 'lit';
import styles from ${JSON.stringify(`${file}?inline`)};
export default unsafeCSS(styles);
`;
    },
  };
}
