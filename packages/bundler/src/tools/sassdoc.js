-/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const prettier = require('prettier');
const sassdoc = require('sassdoc');
const toc = require('markdown-toc');

const prettierOptions = {
  parser: 'markdown',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

/**
 * Custom slugify for markdown-toc to not include escaped emoji characters
 * @param {string} title - the anchor link
 */
const slugify = title => {
  return [...toc.slugify(title)].reduce((acc, ch) => {
    if (ch.charCodeAt(0) > 255) {
      return acc;
    }
    return acc + ch;
  }, '');
};

/**
 * Create a JSON file of documented Sass items
 * @see {@link http://sassdoc.com/configuration/|Sassdoc configuration}
 * @param {string} sourceDir - source directory
 * @param {object} config - configuration object
 * @returns {object} json object
 */
async function createJson(sourceDir, config) {
  config = config || {};

  return sassdoc.parse(sourceDir, config).then(
    data => {
      return data;
    },
    err => {
      console.error(err);
    }
  );
}

/**
 * Remove duplicate objects in `require` and `usedBy` arrays. Array objects have
 * `name` and `type` properties, sometimes nested in a `context` object.
 * @param {Array} arr - array with potential duplicates
 * @returns {Array} deduped array
 */
function dedupeArray(arr) {
  return arr.reduce(
    (p, item) => {
      const type = item.type || item.context.type;
      const name = item.name || item.context.name;
      const id = [type, name].join('|');

      if (p.temp.indexOf(id) === -1) {
        p.out.push(item);
        p.temp.push(id);
      }
      return p;
    },
    { temp: [], out: [] }
  ).out;
}

/**
 * Create a unique Sassdoc item name
 * @param {string} name - Sassdoc name
 * @param {string} type - Sassdoc type (e.g. `variable`, `mixin`)
 * @returns {string} unique Sassdoc item name
 */
function createUniqueName(name, type) {
  return `${name} [${type}]`;
}

/**
 * Create a standardized group name
 * @param {Array} group - Item's group
 * @returns {string} group name
 */
function createGroupName(group) {
  return !group || !group[0] || group[0] === 'undefined' ? 'general' : group[0];
}

/**
 * Create GitHub-flavored markdown anchor link
 * @param {string} name - anchor value
 * @param {string} heading - anchor link destination
 * @returns {string} markdown anchor
 */
function createAnchorLink(name, heading) {
  const anchorLink = heading
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[`~!@#$%^&*()+=<>?,./:;"'|{}[\]\\–—]/g, '')
    .replace(
      // eslint-disable-next-line no-irregular-whitespace
      /[　。？！，、；：“”【】（）〔〕［］﹃﹄“”‘’﹁﹂—…－～《》〈〉「」]/g,
      ''
    );

  return `[${name}](#${anchorLink})`;
}

/**
 * Create markdown for Sassdoc item (function, mixin, placeholder, variable)
 * @param {string} item - Sassdoc item
 * @returns {string} item in markdown formatting
 */
function createMarkdownItem(item) {
  let str = '';

  if (!item.context) return '';

  let status = item.access === 'public' ? '✅' : '❌';

  if (item.deprecated || item.deprecated === '') {
    status += '⚠️';
  }

  // Name
  str += `\n\n### ${status}${createUniqueName(
    item.context.name,
    item.context.type
  )}`;

  // Description
  if (item.description) {
    str += `\n\n${item.description.trim()}`;
  }

  // Value (variables)
  if (item.context.value) {
    str += `

<details>
<summary>Source code</summary>

\`\`\`scss
$${item.context.name}: ${item.context.value};
\`\`\`
</details>`;
  }

  // Code (mixins)
  if (item.context.code) {
    let paramStr = '';

    if (item.parameter) {
      item.parameter.forEach(param => {
        if (paramStr) paramStr += `, `;
        paramStr += `$${param.name}`;
        if (param.default) paramStr += `: ${param.default}`;
      });
    }

    str += `

<details>
<summary>Source code</summary>

\`\`\`scss
@${item.context.type} ${item.context.name}(${paramStr}) {${item.context.code}}
\`\`\`
</details>`;
  }

  // Parameters
  if (item.parameter && item.parameter.length) {
    str += `

- **Parameters**:

| Name | Description | Type | Default value |
| --- | --- | --- | --- |`;

    item.parameter.forEach(param => {
      const paramType = param.type
        ? `\`${param.type.replace(/\|/g, `\\|`)}\``
        : '—';
      const paramDefault = param.default ? `\`${param.default}\`` : '—';

      const row = `\n| \`$${param.name}\` | ${param.description ||
        '—'} | ${paramType} | ${paramDefault} |`;

      str += row;
    });
  }

  // Example
  if (item.example && item.example.length) {
    str += `\n\n**Example**:`;

    if (item.example[0].description) {
      str += ` ${item.example[0].description}`;
    }

    str += `

<details>
<summary>Example code</summary>

\`\`\`${item.example[0].type}
${item.example[0].code}
\`\`\`
</details>`;
  }

  // Bullets
  const metadata = [];

  const groupName = createGroupName(item.group);

  metadata.push({
    key: 'Group',
    value: createAnchorLink(groupName, groupName),
  });

  if (item.return) {
    metadata.push({
      key: 'Returns',
      value: `\`${item.return.type}\` ${item.return.description || ''}`,
    });
  }

  if (item.type) {
    metadata.push({
      key: 'Type',
      value: `\`${item.type}\``,
    });
  }

  if (item.alias) {
    metadata.push({
      key: 'Alias',
      value: `\`${item.alias}\``,
    });
  }

  if (item.aliased) {
    let subbullets = '';

    item.aliased.forEach(aliased => {
      subbullets += `\n  - \`${aliased}\``;
    });

    metadata.push({
      key: 'Aliased',
      value: subbullets,
    });
  }

  if (item.content) {
    metadata.push({
      key: 'Content',
      value: item.content,
    });
  }

  if (item.require && item.require.length) {
    let subbullets = '';

    dedupeArray(item.require).forEach(requires => {
      subbullets += `\n   - ${createAnchorLink(
        `${requires.name} [${requires.type}]`,
        createUniqueName(requires.name, requires.type)
      )}`;
    });

    metadata.push({
      key: 'Requires',
      value: subbullets,
    });
  }

  if (item.usedBy && item.usedBy.length) {
    let subbullets = '';

    dedupeArray(item.usedBy).forEach(usedBy => {
      subbullets += `\n   - ${createAnchorLink(
        `${usedBy.context.name} [${usedBy.context.type}]`,
        createUniqueName(usedBy.context.name, usedBy.context.type)
      )}`;
    });

    metadata.push({
      key: 'Used by',
      value: subbullets,
    });
  }

  // if (item.since && item.since.length) {
  //   metadata.push({
  //     key: 'Since',
  //     value: item.since[0].version,
  //   });
  // }

  if (item.link && item.link.length) {
    let subbullets = '';

    item.link.forEach(link => {
      subbullets += `\n   - [${link.caption || 'Link'}](${link.url})`;
    });

    metadata.push({
      key: 'Links',
      value: subbullets,
    });
  }

  if (item.deprecated || item.deprecated === '') {
    metadata.push({
      key: 'Deprecated',
      value: item.deprecated || 'This may not be available in future releases',
    });
  }

  if (metadata.length) {
    str += '\n';

    metadata.forEach(meta => {
      str += `\n- **${meta.key}**: ${meta.value}`;
    });
  }

  return str;
}

/**
 * Create a markdown file of documented Sass items
 * @see {@link http://sassdoc.com/configuration/|Sassdoc configuration}
 * @param {string} sourceDir - source directory
 * @param {object} config - configuration object
 * @returns {string} markdown
 */
async function createMarkdown(sourceDir, config) {
  config = config || {};

  return sassdoc.parse(sourceDir, config).then(
    data => {
      let markdownFile = '';

      const documentedItems = data.filter(
        item => item.access === 'public' || item.access === 'private'
      );

      markdownFile += `# Sass API

| Mark | Description |
| --- | --- |
| ✅ | Public functions, mixins, placeholders, and variables |
| ❌ | Private items - not supported outside package's build |
| ⚠️ | Deprecated items - may not be available in future releases |

<!-- toc -->
<!-- tocstop -->`;

      let currentGroup = '';

      documentedItems.forEach(item => {
        const itemGroup = createGroupName(item.group);

        if (itemGroup !== currentGroup) {
          markdownFile += `\n\n## ${itemGroup}`;
          currentGroup = itemGroup;
        }

        markdownFile += createMarkdownItem(item);
      });

      return prettier.format(
        toc.insert(markdownFile, { slugify }),
        prettierOptions
      );
    },
    err => {
      console.error(err);
    }
  );
}

module.exports = {
  createJson,
  createMarkdown,
};
