/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Bottleneck from 'bottleneck';
import got from 'got';
import { Second } from '../time';

function create({ maxAttempts = 5 } = {}) {
  const limiter = new Bottleneck({
    minTime: 333,
    maxConcurrent: 3,
  });

  limiter.on('failed', (_error, jobInfo) => {
    // Linear backoff strategy based on retry count
    if (jobInfo.retryCount <= maxAttempts) {
      return jobInfo.retryCount * Second;
    }
  });

  const unpkg = {
    /**
     * Return metadata about any file in a package as JSON
     */
    async getFileMetadata() {},

    /**
     * Load a file for the given package
     */
    async getFile(package, version = 'latest', file) {
      const url = new URL(
        `/${package}@${version}/${file}`,
        'https://unpkg.com'
      );
      return got(url).json();
    },
  };

  for (const [key, value] of Object.entries(unpkg)) {
    unpkg[key] = limiter.wrap(value);
  }

  return unwrap;
}

const unpkg = create();

export { create, unpkg };
