/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const archiver = require('archiver');
const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const zlib = require('zlib');
const unzipper = require('unzipper');
const { Workspace } = require('./Workspace');
const { DependencyGraph } = require('./DependencyGraph');
const { Scheduler } = require('./Scheduler');
const { createHash } = require('./hash');

class BuildCache {
  static async create() {
    const directory = path.resolve(__dirname, '../.cache');
    await fs.ensureDir(directory);

    const cache = await BuildCache.loadCache(directory);

    return new BuildCache(directory, cache);
  }

  static async loadCache(directory) {
    const cache = new Map();
    return cache;
  }

  constructor(directory, cache = new Map()) {
    this.directory = directory;
    this.cache = cache;
  }

  has(workspace, pkg) {
    if (!this.cache.has(workspace.hash)) {
      return false;
    }

    const entries = this.cache.get(workspace);
    return entries.has(pkg.files.hash);
  }

  async set(pkg, artifacts = []) {
    const key = pkg.files.hash;
    const entry = new Map();

    for (const artifact of artifacts) {
    }

    await fs.ensureDir(path.join(this.directory, key));

    this.cache.set(key, entry);
  }
}

async function main() {
  const workspace = await Workspace.get(path.resolve(__dirname, '..', '..'));
  const graph = DependencyGraph.create(workspace);
  const scheduler = Scheduler.create(graph);
  const changes = await Workspace.getChangedPackages(workspace);

  const state = await fs.readJson(
    path.resolve(__dirname, '..', 'build-state.json')
  );
  // console.log('Build state: %s', JSON.stringify(state));
  const cache = await BuildCache.create();

  function hasChanged(id) {
    return changes.find((change) => {
      return change.object.id === id;
    });
  }

  const CACHE_DIR = path.resolve(__dirname, '../.cache');
  const meta = new Map([
    [graph.getByName('@carbon/colors').id, ['es', 'lib', 'umd']],
    [graph.getByName('@carbon/themes').id, ['es', 'lib', 'umd']],
  ]);
  const colors = graph.getByName('@carbon/colors');
  const artifacts = ['es', 'lib', 'umd'];

  await scheduler.run(async (id) => {
    if (!meta.has(id)) {
      return;
    }

    const pkg = workspace.packages.find((pkg) => {
      return pkg.id === id;
    });

    const key = pkg.files.hash;

    // check if need to restore?
    if (
      state[pkg.id] &&
      state[pkg.id].hash === key &&
      artifacts.every((artifact) => {
        return fs.existsSync(path.join(pkg.directory, artifact));
      })
    ) {
      console.log(
        '[%s] build artifacts are already available, no need to update',
        pkg.info.name
      );
      return;
    }

    await Promise.all(
      artifacts.map((artifact) => {
        return fs.remove(path.join(pkg.directory, artifact));
      })
    );

    // archive path
    const archivePath = path.join(CACHE_DIR, `${key}.zip`);

    // cache has
    if (fs.existsSync(archivePath)) {
      console.log('[%s] restoring from cache', pkg.info.name);
      const iterator = fs.createReadStream(archivePath).pipe(
        unzipper.Parse({
          forceStream: true,
        })
      );

      // restore
      for await (const entry of iterator) {
        const filepath = path.join(pkg.directory, entry.path);
        await fs.ensureFile(filepath);
        await fs.writeFile(filepath, await entry.buffer());
      }

      if (!state[pkg.id]) {
        state[pkg.id] = {};
      }

      state[pkg.id] = {
        hash: pkg.files.hash,
      };

      return;
    }

    // cache does not have, build
    console.log('[%s] running build', pkg.info.name);
    const iterator = xspawn('yarn', ['build'], {
      cwd: pkg.directory,
      stdio: 'pipe',
      env: {
        ...process.env,
        FORCE_COLOR: true,
      },
    });

    for await (const data of iterator) {
      console.log('[%s] %s', pkg.info.name, data);
    }

    // save
    console.log('[%s] saving artifacts', pkg.info.name);
    await fs.ensureFile(archivePath);

    const writeStream = fs.createWriteStream(archivePath);
    const archive = archiver('zip', {
      zlib: {
        level: 9,
      },
    });

    archive.on('warning', (error) => {
      throw error;
    });

    archive.on('error', (error) => {
      throw error;
    });

    archive.pipe(writeStream);

    for (const artifact of artifacts) {
      archive.directory(path.join(pkg.directory, artifact), artifact);
    }

    if (!state[pkg.id]) {
      state[pkg.id] = {};
    }

    state[pkg.id] = {
      hash: pkg.files.hash,
    };

    return archive.finalize();
  });

  await fs.writeJson(path.resolve(__dirname, '..', 'build-state.json'), state);

  return workspace;
}

function xspawn(...args) {
  const child = spawn(...args);
  const pushQueue = [];
  const pullQueue = [];

  child.stdout.on('data', (data) => {
    pushValue(data.toString());
  });

  child.stderr.on('data', (data) => {
    pushValue(data.toString());
  });

  child.on('close', (code) => {
    if (code !== 0) {
      const [_resolve, reject] = pullQueue.shift();
      reject(new Error(`Child exited with code ${code}`));
    } else {
      const [resolve] = pullQueue.shift();
      resolve({ value: undefined, done: true });
    }
  });

  function pushValue(value) {
    if (pullQueue.length !== 0) {
      const [resolve] = pullQueue.shift();
      resolve({
        done: false,
        value,
      });
    } else {
      pushQueue.push(value);
    }
  }

  function pullValue() {
    return new Promise((resolve, reject) => {
      if (pushQueue.length !== 0) {
        resolve({ value: pushQueue.shift(), done: false });
      } else {
        pullQueue.push([resolve, reject]);
      }
    });
  }

  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return pullValue();
    },
  };
}

main()
  .then((workspace) => {
    return Workspace.commit(workspace);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
