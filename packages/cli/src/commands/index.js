/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as bundlers from './bundle/bundlers.js';
import * as javascript from './bundle/javascript.js';
import * as typescript from './bundle/typescript.js';
import * as utils from './bundle/utils.js';
import * as getGitHubClient from './contribute/tools/getGitHubClient.js';
import * as setup from './contribute/setup.js';
import * as sassdocTools from './sassdoc/tools.js';
import * as remarkMonorepo from './sync/remark/remark-monorepo.js';
import * as npm from './sync/npm.js';
import * as packageSync from './sync/package.js';
import * as readme from './sync/readme.js';
import * as bundle from './bundle.js';
import * as changelog from './changelog.js';
import * as check from './check.js';
import * as ciCheck from './ci-check.js';
import * as component from './component.js';
import * as contribute from './contribute.js';
import * as inline from './inline.js';
import * as publish from './publish.js';
import * as release from './release.js';
import * as sassdoc from './sassdoc.js';
import * as sync from './sync.js';

const commands = {
  bundlers,
  javascript,
  typescript,
  utils,
  getGitHubClient,
  setup,
  sassdocTools,
  remarkMonorepo,
  npm,
  package: packageSync,
  readme,
  bundle,
  changelog,
  check,
  ciCheck,
  component,
  contribute,
  inline,
  publish,
  release,
  sassdoc,
  sync,
};

export default commands;
