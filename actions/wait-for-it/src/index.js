/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const core = require('@actions/core');
const got = require('got');

async function main() {
  let url = core.getInput('URL', {
    required: true,
  });

  // Since this file is being run within a Docker container, `localhost` will
  // not correctly map to the host's network. As a result, we replace instances
  // of `localhost` with the IP Address for the host's network so we can resolve
  // correctly
  if (url.includes('localhost')) {
    url = url.replace('localhost', '172.17.0.1');
  }

  core.info(`Waiting for a 200 response from ${url}`);

  try {
    await got(url, {
      method: 'GET',
      retry: {
        limit: 10,
        maxRetryAfter: 1000,
      },
      timeout: 1000,
    });
    core.info(`Received a 200 response from ${url}`);
  } catch (error) {
    core.error(error);
    core.setFailed(`Unable to receive a 200 response for ${url}`);
  }
}

main().catch((error) => {
  core.setFailed(error);
});
