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
    .action((pattern, cmd) =>
      check(pattern, {
        cwd,
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
    .action((entrypoint, cmd) =>
      bundle(path.join(cwd, entrypoint), {
        cwd,
        name: cmd.name,
      })
    );

  program.parse(argv);
}

module.exports = bundler;
