/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const program = require('commander');
const path = require('path');
const packageJson = require('../package.json');
const { ConsoleReporter } = require('./reporter');
const bundle = require('./commands/bundle');
const check = require('./commands/check');
const measure = require('./commands/measure');

const reporter = new ConsoleReporter();

async function bundler({ argv, cwd: getWorkingDirectory }) {
  const cwd = getWorkingDirectory();

  // prettier-ignore
  program
    .name(packageJson.name)
    .version(packageJson.version)
    .usage('<command> [options]');

  // check package(s) to see if scss files compile
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
      bundle(path.join(cwd, entrypoint), {
        cwd,
        globals: cmd.globals ? formatGlobals(cmd.globals) : {},
        name: cmd.name,
      })
    );

  program.parse(argv);
}

function formatGlobals(string) {
  const mappings = string.split(',').map(mapping => {
    return mapping.split('=');
  });
  return mappings.reduce(
    (acc, [pkg, global]) => ({
      ...acc,
      [pkg]: global,
    }),
    {}
  );
}

module.exports = bundler;
