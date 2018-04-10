'use strict';

const commitAnayzer = require('@semantic-release/commit-analyzer');

const reCommit = /^release(\(([\w$.\-* ]*)\))?:/i;

module.exports = (pluginConfig, ref, cb) => {
  // eslint-disable-next-line no-console
  console.log(
    `Commits:\n${ref.commits
      .map(({ message }) => message.split('\n')[0])
      .reverse()
      .join('\n')}`
  );
  if (ref.commits.every(({ message }) => !reCommit.test(message))) {
    cb(null);
  } else {
    commitAnayzer(pluginConfig, ref, cb);
  }
};
