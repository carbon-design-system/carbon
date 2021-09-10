/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { paramCase } = require('change-case');
const fs = require('fs-extra');
const { prompt } = require('enquirer');
const path = require('path');
const { loadTemplates } = require('../component');
const { createLogger } = require('../logger');

const logger = createLogger('component');

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  );
}

async function component() {
  const templates = await loadTemplates();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of this component?',
      validate(value) {
        if (value === '') {
          return 'A name is required for the component';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'directory',
      message: 'Specify the path for this component',
      initial: '.',
    },
    {
      type: 'multiselect',
      name: 'options',
      message: 'What else should we scaffold out for you?',
      initial: ['tests', 'stories'],
      choices: [
        {
          name: 'tests',
          value: true,
        },
        {
          name: 'stories',
          value: true,
        },
      ],
      result(names) {
        return this.map(names);
      },
    },
  ];

  clearConsole();
  const answers = await prompt(questions);

  logger.start('Generating component...');

  const directory = path.resolve(
    process.cwd(),
    answers.directory,
    answers.name
  );

  logger.info(`Writing component directory to ${directory}`);

  if (await fs.exists(directory)) {
    throw new Error(`A directory already exists at ${directory}`);
  }

  logger.info('Scaffolding out default files...');

  await fs.ensureDir(directory);
  await fs.writeFile(
    path.join(directory, 'index.js'),
    templates.index.compile({ name: answers.name })
  );
  await fs.writeFile(
    path.join(directory, `${answers.name}.js`),
    templates.component.compile({ name: answers.name })
  );

  if (answers.options.tests) {
    logger.start('Scaffolding out test files...');
    await fs.ensureDir(path.join(directory, '__tests__'));
    await fs.writeFile(
      path.join(directory, '__tests__', `${answers.name}-test.js`),
      templates.test.compile({ name: answers.name })
    );
    logger.stop();
  }

  if (answers.options.stories) {
    logger.start('Scaffolding out story files...');
    await fs.writeFile(
      path.join(directory, `${answers.name}-story.js`),
      templates.story.compile({
        name: answers.name,
      })
    );
    await fs.writeFile(
      path.join(directory, `${answers.name}.mdx`),
      templates.mdx.compile({
        name: answers.name,
        url: paramCase(answers.name),
      })
    );
    logger.stop();
  }

  logger.stop();
}

module.exports = {
  command: 'component',
  desc: '[EXPERIMENTAL] Scaffold a component in React',
  handler: component,
};
