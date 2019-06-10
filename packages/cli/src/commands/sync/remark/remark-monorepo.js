/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');

function monorepo() {
  async function transformer(tree, file) {
    const { cwd } = file;
    const localPackageJsonPath = path.join(cwd, 'package.json');
    const localPackageJson = await fs.readJson(localPackageJsonPath);
    const { name, description } = localPackageJson;

    if (!name) {
      return new Error(
        `Expected a name to be defined for the package at: ${cwd}`
      );
    }
    if (!description) {
      return new Error(
        `Expected a description to be defined for the package at: ${cwd}`
      );
    }

    // Grab all sections under `## Usage` as these are custom for each project
    const usage = [];
    let usageHeadingFound = false;

    for (const child of tree.children) {
      if (usageHeadingFound) {
        if (child.type === 'heading' && child.depth <= 2) {
          break;
        }
        usage.push(child);
      }

      if (
        child.type === 'heading' &&
        child.depth === 2 &&
        child.children[0].value === 'Usage'
      ) {
        usageHeadingFound = true;
        usage.push(child);
      }
    }

    // [x] Title
    // [x] Getting Started
    // [x] Usage
    // [x] Examples
    // [ ] Contributors
    // [x] Contributing
    // [x] License
    tree.children = [
      ...createTitle(localPackageJson.name, localPackageJson.description),
      ...createGettingStarted(localPackageJson.name),
      ...usage,
      ...(await createAPIDoc(localPackageJson.name, path.join(cwd, 'docs'))),
      ...(await createExamples(
        localPackageJson.name,
        path.join(cwd, 'examples')
      )),
      ...createContributing(),
      ...createLicense(),
    ];
  }

  return transformer;
}

function createTitle(name, description) {
  return [
    {
      type: 'heading',
      depth: 1,
      children: [
        {
          type: 'text',
          value: name,
        },
      ],
    },
    {
      type: 'blockquote',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: description,
            },
          ],
        },
      ],
    },
  ];
}

function createGettingStarted(name) {
  return [
    {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: 'Getting started',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'To install ',
        },
        {
          type: 'inlineCode',
          value: name,
        },
        {
          type: 'text',
          value:
            ' in your project, you will need to run the following command using ',
        },
        {
          type: 'link',
          title: null,
          url: 'https://www.npmjs.com/',
          children: [
            {
              type: 'text',
              value: 'npm',
            },
          ],
        },
        {
          type: 'text',
          value: ':',
        },
      ],
    },
    {
      type: 'code',
      lang: 'bash',
      value: `npm install -S ${name}`,
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'If you prefer ',
        },
        {
          type: 'link',
          title: null,
          url: 'https://yarnpkg.com/en/',
          children: [
            {
              type: 'text',
              value: 'Yarn',
            },
          ],
        },
        {
          type: 'text',
          value: ', use the following command\ninstead:',
        },
      ],
    },
    {
      type: 'code',
      lang: 'bash',
      meta: null,
      value: `yarn add ${name}`,
    },
  ];
}

async function createAPIDoc(name, docsDir) {
  // No docs to list
  if (!(await fs.pathExists(docsDir))) {
    return [];
  }

  const docs = (await fs.readdir(docsDir)).filter(name => {
    // Ignore dotfiles and json files
    return !(name[0] === '.' || name === 'sass.json');
  });

  if (docs.length === 0) {
    return [];
  }

  return [
    {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: '📖 API Documentation',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: "If you're looking for ",
        },
        {
          type: 'inlineCode',
          value: name,
        },
        {
          type: 'text',
          value: ' API documentation, check out:',
        },
      ],
    },
    {
      type: 'list',
      ordered: false,
      spread: false,
      children: docs.map(doc => ({
        type: 'listItem',
        spread: false,
        checked: null,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'link',
                title: null,
                url: `./docs/${doc}`,
                children: [
                  {
                    type: 'text',
                    value: `${doc[0].toUpperCase() +
                      doc.slice(1).replace(/\.[^/.]+$/, '')}`,
                  },
                ],
              },
            ],
          },
        ],
      })),
    },
  ];
}

async function createExamples(name, examplesDir) {
  // No examples to list
  if (!(await fs.pathExists(examplesDir))) {
    return [];
  }

  const examples = (await fs.readdir(examplesDir)).filter(name => {
    // Ignore dotfiles and special cases `codesandbox` and `storybook`
    return !(
      name[0] === '.' ||
      name === 'codesandbox' ||
      name === 'storybook' ||
      name === 'preview'
    );
  });

  if (examples.length === 0) {
    return [];
  }

  return [
    {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: '📚 Examples',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: "If you're looking for more examples on how to use ",
        },
        {
          type: 'inlineCode',
          value: name,
        },
        {
          type: 'text',
          value: ', we have some examples that you can check out:',
        },
      ],
    },
    {
      type: 'list',
      ordered: false,
      spread: false,
      children: examples.map(example => ({
        type: 'listItem',
        spread: false,
        checked: null,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'link',
                title: null,
                url: `./examples/${example}`,
                children: [
                  {
                    type: 'text',
                    value: example,
                  },
                ],
              },
            ],
          },
        ],
      })),
    },
  ];
}

function createContributing() {
  return [
    {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: '🙌 Contributing',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value:
            "We're always looking for contributors to help us fix bugs, build new features, or help us improve the project documentation. If you're interested, definitely check out our ",
        },
        {
          type: 'link',
          title: null,
          url: '/.github/CONTRIBUTING.md',
          children: [
            {
              type: 'text',
              value: 'Contributing Guide',
            },
          ],
        },
        {
          type: 'text',
          value: '! 👀',
        },
      ],
    },
  ];
}

function createLicense() {
  return [
    {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: '📝 License',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'Licensed under the ',
        },
        {
          type: 'link',
          title: null,
          url: '/LICENSE',
          children: [
            {
              type: 'text',
              value: 'Apache 2.0 License',
            },
          ],
        },
        {
          type: 'text',
          value: '.',
        },
      ],
    },
  ];
}

module.exports = monorepo;
