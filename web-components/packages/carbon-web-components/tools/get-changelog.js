#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const child = require('child_process');
const program = require('commander');

program.option('-f, --tagFrom <git tag from>', 'Git tag range from').option('-t, --tagTo <git tag to>', 'Git tag range from');

/**
 * Stores the arguments
 *
 * @type {commander.Command}
 */
const args = program.parse(process.argv);

/**
 * Tag From (-f)
 *
 * @type {string}
 */
const { tagFrom } = args;

/**
 * Tag To (-t)
 *
 * @type {string}
 */
const { tagTo } = args;

/**
 * Uses a delimiter for splitting the comments into an array
 *
 * @type {string}
 */
const delimiter = '----DELIMITER----';

/**
 * Returns back the commits in an array
 *
 * @returns {string[]} Commits array of objects
 */
function getCommits() {
  const toTag = tagTo !== undefined ? tagTo : 'HEAD';

  // Gets the git output between the two tags
  const output = child.execSync(`git log ${tagFrom}..${toTag} --pretty=format:"%s"${delimiter}`).toString('utf-8');

  // Generates the array of commit comments
  return output.split(`${delimiter}\n`);
}

/**
 * Returns the name from the commit string
 *
 * @param {string} str Commit string
 * @returns {string} commit name
 * @private
 */
function _getCommitName(str) {
  return str
    .substring(str.indexOf('(') + 1, str.indexOf('):'))
    .trim()
    .toLowerCase();
}

/**
 * Returns the subject from the commit string
 *
 * @param {string} str Commit string
 * @returns {string} commit subject
 * @private
 */
function _getCommitSubject(str) {
  return str
    .substring(str.indexOf('):') + 2, str.length)
    .trim()
    .toLowerCase();
}

/**
 * Gets the changelog content
 *
 * @returns {string} Changelog content
 */
function getChangelog() {
  // Stores the changelog
  let changelog = '';

  // Stores the list of features
  const features = {};

  // Stores the list of fixes
  const fixes = {};

  // Stores the list of chores
  const chores = {};

  const commitsArray = getCommits();

  commitsArray.forEach(commit => {
    const commitParse = commit.replace(delimiter, '');
    if (commit.startsWith('feat(')) {
      const featName = _getCommitName(commitParse);
      const featSubject = _getCommitSubject(commitParse);

      features[featName] = features[featName] || [];
      features[featName].push(featSubject);
    }

    if (commit.startsWith('fix(')) {
      const fixName = _getCommitName(commitParse);
      const fixSubject = _getCommitSubject(commitParse);

      fixes[fixName] = fixes[fixName] || [];
      fixes[fixName].push(fixSubject);
    }

    if (commit.startsWith('chore(') || commit.startsWith('docs(') || commit.startsWith('test(')) {
      const choreName = _getCommitName(commitParse);
      const choreSubject = _getCommitSubject(commitParse);

      chores[choreName] = chores[choreName] || [];
      chores[choreName].push(choreSubject);
    }
  });

  if (Object.keys(features).length) {
    changelog += `### Features\n`;
    Object.keys(features).forEach(featureName => {
      changelog += `- **${featureName}**\n`;
      features[featureName].forEach(feature => {
        changelog += `  - ${feature}\n`;
      });
    });
    changelog += '\n';
  }

  if (Object.keys(fixes).length) {
    changelog += `### Fixes\n`;
    Object.keys(fixes).forEach(fixName => {
      changelog += `- **${fixName}**\n`;
      fixes[fixName].forEach(fix => {
        changelog += `  - ${fix}\n`;
      });
    });
    changelog += '\n';
  }

  if (Object.keys(chores).length) {
    changelog += `### Housekeeping\n`;
    Object.keys(chores).forEach(choreName => {
      changelog += `- **${choreName}**\n`;
      chores[choreName].forEach(chore => {
        changelog += `  - ${chore}\n`;
      });
    });
    changelog += '\n';
  }

  // eslint-disable-next-line no-console
  console.log(changelog);
}

getChangelog();
