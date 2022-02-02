/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as time from '../time';

class Cache {
  static create() {
    return new Cache();
  }

  constructor() {
    this._cache = new Map();
  }

  has(key) {
    if (this._cache.has(key)) {
      const entry = this._cache.get(key);

      if (expired(entry.timestamp, entry.ttl)) {
        this._cache.delete(key);
        return false;
      }

      return true;
    }
    return false;
  }

  get(key) {
    const entry = this._cache.get(key);
    if (entry) {
      return entry.value;
    }
    return null;
  }

  set(key, value, { ttl = time.Hour } = {}) {
    const entry = {
      value,
      timestamp: Date.now(),
      ttl,
    };
    this._cache.set(key, entry);
  }
}

function expired(timestamp, ttl) {
  if (timestamp + ttl > Date.now()) {
    return false;
  }
  return true;
}

export { Cache };
