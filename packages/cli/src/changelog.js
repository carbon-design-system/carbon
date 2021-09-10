/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { default: parse } = require('@commitlint/parse');
const execa = require('execa');

// We keep a list of commits that are process-oriented that we never want to
// show up in generated changelogs
const headerDenyList = new Set([
  'chore(project): sync generated files [skip ci]',
  'chore(release): update package versions',
]);

/**
 * @typedef PackageInfo
 * @property {string} name
 * @property {string} version
 * @property {boolean} private
 * @property {string} location
 */

/**
 * Generate the contents of a CHANGELOG for a given list of packages between two
 * tagged git objects. For example, if updating from v1.0.0 to v1.1.0, this
 * method would generate a changelog for all commits in the range
 * v1.0.0...v1.1.0 and group them based on the given packages.
 *
 * @param {Array<PackageInfo>} packages
 * @param {string} lastTag
 * @param {string} latestTag
 * @returns {string}
 */
async function generate(packages, lastTag, latestTag) {
  const packageCommitsInRange = await Promise.all(
    packages.map((pkg) => getCommitsInRange(pkg, `${lastTag}...${latestTag}`))
  );
  const packageCommitsToInclude = packageCommitsInRange.filter(
    ({ commits }) => {
      return commits.length > 0;
    }
  );

  return [
    getMarkdownTitle(lastTag, latestTag),
    ...getMarkdownSections(packageCommitsToInclude),
  ].join('\n');
}

const sectionTypes = [
  {
    title: 'New features :rocket:',
    types: ['feat'],
  },
  {
    title: 'Bug fixes :bug:',
    types: ['fix'],
  },
  {
    title: 'Documentation :memo:',
    types: ['docs'],
  },
  {
    title: 'Housekeeping :house:',
    types: ['build', 'ci', 'chore', 'perf', 'refactor', 'revert', 'test'],
  },
];

const commitUrl = 'https://github.com/carbon-design-system/carbon/commit';

/**
 * Get the sections to be rendered in our changelog for the given packages and
 * their associated commits. Our plan is to group the commits for each package
 * under various section types and build up the lists accordingly.
 *
 * @param {Array} packages
 * @returns {Array}
 */
function getMarkdownSections(packages) {
  return packages.map(({ name, version, commits }) => {
    let section = `## \`${name}@${version}\`\n`;

    for (const { title, types } of sectionTypes) {
      const commitsForSection = commits.filter((commit) => {
        return types.includes(commit.info.type);
      });

      if (commitsForSection.length === 0) {
        continue;
      }

      let subsection = `### ${title}\n`;

      for (const commit of commitsForSection) {
        const { hash, info } = commit;
        const url = `${commitUrl}/${hash}`;
        subsection += `- ${info.header} ([\`${hash}\`](${url}))\n`;
      }

      section += '\n' + subsection;
    }

    return section;
  });
}

const compareUrl = 'https://github.com/carbon-design-system/carbon/compare';

/**
 * Get the markdown title for the given lastTag and latestTag. This title is
 * used at the top of a given GitHub release.
 *
 * @param {string} lastTag
 * @param {string} latestTag
 * @returns {string}
 */
function getMarkdownTitle(lastTag, latestTag) {
  const now = new Date();
  const year = now.getFullYear();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const url = `${compareUrl}/${lastTag}...${latestTag}`;

  return `# [${latestTag}](${url}) (${year}-${month}-${day})`;
}

/**
 * Retrieves the commits from the given range for the particular package.
 * Specifically, we're going to find commits that are in the package folder so
 * that we can group them later on when generating the changelog.
 *
 * @param {PackageInfo} pkg
 * @param {string} range
 * @returns {Array}
 */
async function getCommitsInRange(pkg, range) {
  // Using the `rev-list` sub-command of `git` we can list out all of the commits
  // for the given range inside of the package's location. This will allow us to
  // find all the commits associated with this package that we'll display in the
  // changelog
  const { stdout } = await execa('git', [
    'rev-list',
    range,
    '--oneline',
    '--',
    pkg.location,
  ]);

  // If the git sub-command returns nothing, then no commits have occurred for
  // this package in the given commit range
  if (stdout === '') {
    return {
      ...pkg,
      commits: [],
    };
  }

  const commitsInFolder = await Promise.all(
    stdout.split('\n').map(async (commit) => {
      // The output from `git rev-list` follows the pattern: `HASH <header>`, so
      // we will need to trim the string to get the appropriate hash and text
      // values for `parse` to consume.
      const hash = commit.slice(0, 9);
      const text = commit.slice(10);
      // Just in case, we'll trim the header value as sometimes the commit gets
      // an extra space that's unnecessary
      const info = await parse(text.trim());

      return {
        info,
        hash,
        text,
      };
    })
  );

  const headers = new Set();
  // There are certain conditions where we don't want a commit visible in the
  // CHANGELOG, namely when we cannot parse the commit info type or when the
  // commit header is in our deny list
  const commits = commitsInFolder
    .filter((commit) => {
      if (commit.info.type === null) {
        return false;
      }

      if (headerDenyList.has(commit.info.header)) {
        return false;
      }

      return true;
    })
    .filter((commit) => {
      // Running into an issue with duplicate headers when viewing "committed by"
      // and "committed and authored by", as a result we'll keep a set of all
      // headers and exclude the commit if we've seen it already
      if (headers.has(commit.info.header)) {
        return false;
      }
      headers.add(commit.info.header);
      return true;
    });

  return {
    ...pkg,
    commits,
  };
}

module.exports = {
  generate,
};
