/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import Bottleneck from 'bottleneck';
import got from 'got';
import { Second } from '../time';

// Reference:
// https://github.com/npm/registry/blob/master/docs/download-counts.md#package-download-counts
function create({ maxAttempts = 10 } = {}) {
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

  // Point values
  // GET https://api.npmjs.org/downloads/point/{period}[/{package}]
  // @see https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values

  /**
   * @typedef EndpointResponse
   * @property {number} downloads
   * @property {string} start
   * @property {string} end
   * @property {string} package
   */

  const downloads = {
    /**
     * Get the number of downloads for the given package over the past month.
     *
     * @param {string} packageName
     * @returns {Promise<EndpointResponse>}
     */
    async lastMonth(packageName) {
      const url = new URL(
        '/downloads/point/last-month',
        'https://api.npmjs.org'
      );

      if (packageName) {
        url.pathname = `${url.pathname}/${packageName}`;
      }

      return got(url).json();
    },

    /**
     * Get the number of downloads for the given package over the past week.
     *
     * @param {string} packageName
     * @returns {Promise<EndpointResponse>}
     */
    async lastWeek(packageName) {
      const url = new URL(
        '/downloads/point/last-week',
        'https://api.npmjs.org'
      );

      if (packageName) {
        url.pathname = `${url.pathname}/${packageName}`;
      }

      return got(url).json();
    },

    /**
     * Get the number of downloads for the given package over the past day.
     *
     * @param {string} packageName
     * @returns {Promise<EndpointResponse>}
     */
    async lastDay(packageName) {
      const url = new URL('/downloads/point/last-day', 'https://api.npmjs.org');

      if (packageName) {
        url.pathname = `${url.pathname}/${packageName}`;
      }

      return got(url).json();
    },

    async range(from, to, packageName) {
      const url = new URL('/downloads/point', 'https://api.npmjs.org');

      if (!from instanceof Date) {
        throw new Error(
          'Expected parameter `from` to be of type `Date`, instead received: ' +
            `${from}`
        );
      }

      if (!to instanceof Date) {
        throw new Error(
          'Expected parameter `to` to be of type `Date`, instead received: ' +
            `${to}`
        );
      }

      const formattedFrom = [
        from.getFullYear(),
        from.getMonth() + 1,
        from.getDate(),
      ].join('-');
      const formattedTo = [
        to.getFullYear(),
        to.getMonth() + 1,
        to.getDate(),
      ].join('-');

      url.pathname = `${url.pathname}/${formattedFrom}:${formattedTo}`;

      if (packageName) {
        url.pathname = `${url.pathname}/${packageName}`;
      }

      return got(url).json();
    },
  };

  for (const [key, value] of Object.entries(downloads)) {
    downloads[key] = limiter.wrap(value);
  }

  return {
    downloads,
  };
}

const npm = create();

export { create, npm };
