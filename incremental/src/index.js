/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const Workspace = require('./Workspace');
const { Package } = require('./Package');

async function main() {
  const workspace = await Workspace.get(path.resolve(__dirname, '..', '..'));
  const graph = new Map();

  function createId(name, version) {
    return createHash(`${name}:${version}`);
  }

  for (const pkg of workspace.children) {
    const node = {
      id: pkg.id,
      name: pkg.info.name,
      version: pkg.info.version,
      scripts: pkg.info.scripts,
      dependencies: [],
    };
    graph.set(node.id, node);
  }

  for (const pkg of workspace.children) {
    const entry = graph.get(pkg.id);
    for (const dependency of pkg.info.dependencies) {
      const match = find(dependency);
      if (match && !entry.dependencies.includes(match.id)) {
        entry.dependencies.push(match.id);
      }
    }
  }

  function find(dependency) {
    for (const node of graph.values()) {
      if (dependency.name && dependency.version) {
        if (Package.equal(node, dependency)) {
          return node;
        }
      }
    }
    return null;
  }

  function run(graph) {
    const order = topological(graph);
    const completed = new Set();
    const scheduled = new Set();
    const deferred = new Deferred();

    function canSchedule(id) {
      if (completed.has(id)) {
        return false;
      }
      if (scheduled.has(id)) {
        return false;
      }
      const entry = graph.get(id);
      return entry.dependencies.every((dependencyId) => {
        return completed.has(dependencyId);
      });
    }

    async function schedule() {
      console.log();
      console.log('Pending: %s', order.length);
      console.log();
      if (deferred.settled) {
        return;
      }

      if (order.length === 0) {
        deferred.resolve();
        return;
      }

      const jobsToSchedule = order.filter((id) => {
        return canSchedule(id);
      });

      for (const id of jobsToSchedule) {
        console.log('Scheduling: %s', graph.get(id).name);
        const now = Date.now();
        scheduled.add(id);
        sleep(id)
          .then(() => {
            console.log(
              '--------------------------------------------------- Completed: %s (%sms)',
              graph.get(id).name,
              Date.now() - now
            );
            scheduled.delete(id);
            completed.add(id);
            order.splice(order.indexOf(id), 1);
            schedule();
          })
          .catch(deferred.reject);
      }
    }

    schedule();

    return deferred.promise;
  }

  await run(graph);
  console.log('Done!');

  // const order = lanes(graph, topological(graph));
  // console.log(JSON.stringify(order, null, 2));
}

class Deferred {
  constructor() {
    this.settled = false;
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve(value) {
    if (this.settled === false) {
      this.settled = true;
      this._resolve(value);
    }
  }

  reject(reason) {
    if (this.settled === false) {
      this.settled = true;
      this._reject(reason);
    }
  }

  catch(...args) {
    return Promise.prototype.catch.apply(this._promise, args);
  }

  then(...args) {
    return Promise.prototype.then.apply(this._promise, args);
  }
}

function sleep(id) {
  return new Promise((resolve) => {
    const duration = Math.floor(Math.random() * 5000);
    // console.log(
    // '---------------------------------------------------------------------------------- Starting job: %s',
    // id
    // );
    setTimeout(() => {
      // console.log(
      // '---------------------------------------------------------------------------------- Ended job: %s in %sms',
      // id,
      // duration
      // );
      resolve();
    }, duration);
  });
}

function lanes(graph, order) {
  const root = {
    id: Symbol(),
    children: [],
  };

  for (const id of order) {
    const entry = graph.get(id);
    const orderedDependencies = entry.dependencies.sort((a, b) => {
      return order.indexOf(a) - order.indexOf(b);
    });
    // if (entry.dependencies.length === 0) {
    // const node = {
    // id,
    // name: entry.name,
    // children: [],
    // };
    // root.children.push(node);
    // continue;
    // }
  }

  // function findOrCreate(id, node = root) {
  // if (node.id === id) {
  // return node;
  // }

  // for (const child of node.children) {
  // const match = find(id, child);
  // if (match) {
  // return match;
  // }
  // }

  // const entry = {
  // id,
  // name: graph.get(id).name,
  // children: [],
  // };

  // node.children.push(entry);

  // return entry;
  // }

  // for (const id of order) {
  // const entry = graph.get(id);
  // const orderedDependencies = entry.dependencies.sort((a, b) => {
  // return order.indexOf(a) - order.indexOf(b);
  // });

  // let pointer = root;
  // for (const dependencyId of orderedDependencies) {
  // let child = pointer.children.find((child) => {
  // return child.id === dependencyId;
  // });
  // if (!child) {
  // child = {
  // id: dependencyId,
  // name: graph.get(dependencyId).name,
  // children: [],
  // };
  // pointer.children.push(child);
  // }
  // pointer = child;
  // }
  // }

  return root;

  // for (const id of order) {
  // const entry = graph.get(id);
  // const ordered = entry.dependencies.sort((a, b) => {
  // return order.indexOf(a) - order.indexOf(b);
  // });

  // let pointer = tree;
  // for (const id of ordered) {
  // let child = pointer.children.find((child) => {
  // return child.id === id;
  // });
  // if (!child) {
  // child = {
  // id,
  // name: graph.get(id).name,
  // children: [],
  // };
  // pointer.children.push(child);
  // }
  // pointer = child;
  // }

  // const node = {
  // id,
  // name: entry.name,
  // children: [],
  // };

  // pointer.children.push(node);
  // }

  // return tree;
}

function topological(graph) {
  const order = [];
  const visited = new Set();
  const visiting = new Set();

  function visit(id) {
    if (visited.has(id)) {
      return;
    }

    if (visiting.has(id)) {
      const stack = Array.from(visiting).join(' -> ');
      throw new Error(`Cycle detected for: ${id}, Stack: ${stack}`);
    }

    visiting.add(id);

    const node = graph.get(id);
    for (const dependency of node.dependencies) {
      visit(dependency);
    }

    visiting.delete(id);
    visited.add(id);
    order.push(id);
  }

  for (const id of graph.keys()) {
    visit(id);
  }

  return order;
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
