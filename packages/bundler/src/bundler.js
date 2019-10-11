/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const program = require('commander');
const packageJson = require('../package.json');
const bundle = require('./commands/bundle');
const check = require('./commands/check');
const inline = require('./commands/inline');
const measure = require('./commands/measure');
const sassdoc = require('./commands/sassdoc');

async function bundler({ argv, cwd: getWorkingDirectory }) {
  const cwd = getWorkingDirectory();

  // prettier-ignore
  program
    .name(packageJson.name)
    .version(packageJson.version)
    .usage('<command> [options]');

  program
    .command('check <glob>')
    .description('check that each file can be compiled')
    .option('-i, --ignore <glob>', 'pass in a glob of files to ignore')
    .option('-l, --list', 'list all the files that were compiled')
    .action((pattern, cmd) =>
      check(pattern, {
        cwd,
        list: cmd.list || false,
        ignore: cmd.ignore || [],
      })
    );

  program
    .command('sassdoc <glob>')
    .description('generate sassdoc as markdown')
    .option('-i, --ignore <glob>', 'pass in a glob of files to ignore')
    .option('-j, --json', 'output as json file')
    .option('-o, --output <dir>', 'specify the directory to output the files')
    .action((pattern, cmd) =>
      sassdoc(pattern, {
        cwd,
        ignore: cmd.ignore || [],
        json: cmd.json || false,
        output: cmd.output || 'docs',
      })
    );

  program
    .command('inline')
    .description(
      'inline sass dependencies from package.json in a target folder'
    )
    .option(
      '-o, --output <dir>',
      'the directory to output inlined sass dependencies',
      'scss'
    )
    .action(cmd =>
      inline(cleanArgs(cmd), {
        cwd,
      })
    );

  program
    .command('measure <glob>')
    .description('measure the compiled size of your package(s)')
    .option('-i, --ignore <glob>', 'pass in a glob of files to ignore')
    .option('-o, --output <path>', 'specify the output path of your report')
    .action((pattern, cmd) =>
      measure(pattern, {
        cwd,
        ignore: cmd.ignore,
        output: cmd.output,
      })
    );

  program
    .command('bundle <entrypoint>')
    .description('bundle the given .js entrypoint')
    .option('-n, --name <name>', 'name the module for the UMD build')
    .option('-g, --globals <options>', 'global module names')
    .action((entrypoint, cmd) =>
      bundle(entrypoint, cleanArgs(cmd), {
        cwd,
      })
    );

  program
    .command('bundle:scss <entrypoint>')
    .description('bundle the given .scss entrypoint')
    .option('-n, --name <name>', 'name the output file')
    .option(
      '-o, --output <dir>',
      'specify the directory to output the files',
      'css'
    )
    .action((entrypoint, cmd) =>
      bundle(entrypoint, cleanArgs(cmd), {
        cwd,
      })
    );

  program.parse(argv);
}

// Inspired by Vue CLI:
// https://github.com/vuejs/vue-cli/blob/31e1b4995edef3d2079da654deedffe002a1d689/packages/%40vue/cli/bin/vue.js#L172
function cleanArgs(command) {
  return command.options.reduce((acc, option) => {
    // TODO: add case for reserved words from commander, like options

    // Add case for mapping `--foo-bar` to `fooBar`
    const key = option.long
      .replace(/^--/, '')
      .split('-')
      .map((word, i) => {
        if (i === 0) {
          return word;
        }
        return word[0].toUpperCase() + word.slice(1);
      })
      .join('');

    // If an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof command[key] !== 'function') {
      return {
        ...acc,
        [key]: command[key],
      };
    }
    return acc;
  }, {});
}

module.exports = bundler;
