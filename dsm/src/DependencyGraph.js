/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { Package } = require('./Package');

const DependencyGraph = {
  create(workspace) {
    const graph = new Map();

    for (const pkg of workspace.packages) {
      const node = {
        id: pkg.id,
        name: pkg.info.name,
        version: pkg.info.version,
        scripts: pkg.info.scripts,
        dependencies: [],
      };
      graph.set(node.id, node);
    }

    for (const pkg of workspace.packages) {
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

    function getByName(name) {
      for (const node of graph.values()) {
        if (name === node.name) {
          return node;
        }
      }
      return null;
    }

    return {
      get(id) {
        return graph.get(id);
      },
      getByName,
      graph,
    };
  },
};

function topology({ graph }) {
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

module.exports = {
  DependencyGraph,
  topology,
};
