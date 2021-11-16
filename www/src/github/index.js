import { Octokit } from '@octokit/rest';
import { retry } from '@octokit/plugin-retry';
import { throttling } from '@octokit/plugin-throttling';
import fs from 'fs-extra';
import path from 'path';
import * as time from '../time';

const CACHE_FOLDER = path.join(process.cwd(), '.ghcache');
const Cache = {
  has(key) {
    const filepath = path.join(CACHE_FOLDER, key);
    if (fs.existsSync(filepath)) {
      const json = fs.readJsonSync(filepath);
      const { expiresAt } = json;

      if (Date.now() >= expiresAt) {
        return false;
      }

      return true;
    }
    return false;
  },
  get(key) {
    const filepath = path.join(CACHE_FOLDER, key);
    if (fs.existsSync(filepath)) {
      const json = fs.readJsonSync(filepath);
      const { expiresAt, data } = json;

      if (Date.now() >= expiresAt) {
        return null;
      }

      return data;
    }
    return null;
  },
  set(key, data, ttl) {
    const filepath = path.join(CACHE_FOLDER, key);
    const expiresAt = Date.now() + ttl;
    fs.writeJsonSync(filepath, {
      expiresAt,
      data,
    });
  },
};

const CustomOctokit = Octokit.plugin(retry, throttling);
const octokit = new CustomOctokit({
  auth: process.env.GH_TOKEN,
  userAgent: 'carbon',
  throttle: {
    onRateLimit: (retryAfter, options) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (options.request.retryCount === 0) {
        // only retries once
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (_retryAfter, options) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      );

      return true;
    },
  },
  retry: {
    doNotRetry: ['429'],
  },
});

function createIteratorCache([resource, method]) {
  return async (options = {}, ttl = time.Week) => {
    const keys = {
      resource,
      method,
      ...options,
    };
    const cacheKey = [];

    for (const key of Object.keys(keys).sort()) {
      const value = keys[key];
      cacheKey.push(`${key}:${JSON.stringify(value)}`);
    }

    const key = cacheKey.join('+');

    if (Cache.has(key)) {
      return Cache.get(key);
    }

    const iterator = octokit.paginate.iterator(
      octokit.rest[resource][method],
      options
    );
    const data = [];
    let current = 0;

    for await (const page of iterator) {
      console.log('Page: %s', ++current);
      data.push(...page.data);
    }

    Cache.set(key, data, ttl);

    return data;
  };
}

const cached = {
  issues: {
    listForRepo: createIteratorCache(['issues', 'listForRepo']),
  },
};

export { cached as octokit };
