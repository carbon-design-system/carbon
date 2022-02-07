/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import path from 'node:path';
import * as time from '../time';

class FSCache {
  static create(directory) {
    fs.ensureDirSync(directory);
    return new FSCache(directory);
  }

  static createId(key) {
    return Buffer.from(key, 'utf8').toString('base64');
  }

  constructor(directory) {
    this.directory = directory;
  }

  async has(key) {
    const id = FSCache.createId(key);
    const filepath = path.join(this.directory, id);

    if (fs.existsSync(filepath)) {
      const entry = await this.get(key);
      if (entry) {
        console.log('Cache hit: %s', key);
        return true;
      }
    }

    console.log('Cache miss: %s', key);

    return false;
  }

  async get(key) {
    const id = FSCache.createId(key);
    const filepath = path.join(this.directory, id);

    if (fs.existsSync(filepath)) {
      const contents = await fs.readFile(filepath, 'utf8');
      const { value, timestamp, ttl } = deserialize(contents);
      if (expired(timestamp, ttl)) {
        await fs.remove(filepath);
        return null;
      }
      return value;
    }

    return null;
  }

  async set(key, value, ttl = time.Week) {
    const id = FSCache.createId(key);
    const filepath = path.join(this.directory, id);
    await fs.ensureFile(filepath);
    const item = {
      value,
      ttl,
      timestamp: Date.now(),
    };
    await fs.writeFile(filepath, serialize(item));
  }

  async delete(key) {
    const id = FSCache.createId(key);
    const filepath = path.join(this.directory, id);
    await fs.remove(filepath);
  }
}

function serialize(item) {
  const buffer = Buffer.from(JSON.stringify(item), 'utf8');
  return buffer.toString('base64');
}

function deserialize(contents) {
  const buffer = Buffer.from(contents, 'base64');
  return JSON.parse(buffer);
}

function expired(timestamp, ttl) {
  if (timestamp + ttl > Date.now()) {
    return false;
  }
  return true;
}

export { FSCache };
