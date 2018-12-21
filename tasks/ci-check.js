'use strict';

const { reporter } = require('@carbon/cli-reporter');
const { exec } = require('child-process-promise');

async function main() {
  reporter.info('Running checks in CI...');

  const options = {
    cwd: process.cwd(),
  };
  const tasks = [
    'yarn toolkit format:diff',
    `yarn bundler check --ignore '**/@(node_modules|examples)/**' 'packages/**/*.scss'`,
    'yarn jest --ci --reporters=default --reporters=jest-junit',
  ];

  reporter.info('Running the following tasks:');
  for (let i = 0; i < tasks.length; i++) {
    reporter.info(`[${i}] ${tasks[i]}`);
  }

  const promise = Promise.all(tasks.map(task => exec(task, options)));
  const interval = setInterval(() => {
    process.stdout.write('.');
  }, 1000);

  await promise;

  clearInterval(interval);
  console.log();

  reporter.success('Done! ✨');
}

main().catch(error => {
  reporter.error(error.message);
  if (error.stdout !== '') {
    console.error(error.stdout);
  }
  if (error.stderr !== '') {
    console.error(error.stderr);
  }
});
