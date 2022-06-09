/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const core = require('@actions/core');
const got = require('got');

async function main() {
  const url = core.getInput('URL', {
    required: true,
  });
  const maxAttempts = core.getInput('MAX_ATTEMPTS', {
    required: true,
  });

  core.info(`Waiting for a 200 response from ${url}`);

  try {
    await got(url, {
      method: 'GET',
      retry: {
        limit: maxAttempts,
        maxRetryAfter: 1000,
      },
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
