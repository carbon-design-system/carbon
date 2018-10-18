'use strict';

const program = require('commander');
const packageJson = require('../package.json');
const { ConsoleReporter } = require('./reporter');
const check = require('./commands/check');

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

  // TODO: `measure`, measure package(s) size

  program.parse(argv);
}

module.exports = bundler;
