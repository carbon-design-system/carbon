/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as postcss from 'postcss';
import scssParser from 'postcss-scss';

/**
 * Preorder traversal for the given AST node or collection of AST nodes
 */
function* traverse(item) {
  const nodes = Array.isArray(item) ? item : [item];

  for (const node of nodes) {
    yield node;
    if (node.nodes) {
      yield* traverse(node.nodes);
    }
  }
}

/**
 * Call visitor functions when encountering specific AST node types in the given
 * AST
 */
function visit(ast, visitors) {
  const visitorsByKey = new Map();

  for (const [key, value] of Object.entries(visitors)) {
    if (key === 'Declaration') {
      visitorsByKey.set('decl', value);
    } else {
      visitorsByKey.set(key.toLowerCase(), value);
    }
  }

  for (const node of traverse(ast)) {
    if (visitorsByKey.has(node.type)) {
      const visitor = visitorsByKey.get(node.type);
      visitor(node);
    }
  }
}

/**
 * A NodePath provides common operations for updating or removing nodes in an
 * AST
 */
const NodePath = {
  replace(node, replacement) {
    if (node.raws) {
      replacement.raws = node.raws;
    }
    node.parent.nodes[node.parent.nodes.indexOf(node)] = replacement;
  },
  insertBefore(node, replacement) {
    node.parent.nodes.splice(
      node.parent.nodes.indexOf(node),
      1,
      replacement,
      node
    );
  },
  insertAfter(node, replacement) {
    node.parent.nodes.splice(
      node.parent.nodes.indexOf(node),
      1,
      node,
      replacement
    );
  },
  remove(node) {
    node.parent.nodes.splice(node.parent.nodes.indexOf(node), 1);
  },
};

/**
 * A collection provides methods to filter and traverse various parts of an AST
 */
const Collection = {
  create(source) {
    const nodes = Array.isArray(source) ? source : [source];
    const collection = {
      filter,
      find,
      map,
      forEach,
      size,
      toSource,
    };

    function filter(callback) {
      return Collection.create(nodes.filter(callback));
    }

    function find(type, filter) {
      const matches = [];
      const visitorName = typeof type === 'string' ? type : type.name;
      const visitors = {
        [visitorName]: (node) => {
          if (!filter) {
            matches.push(node);
          }

          if (compare(node, filter)) {
            matches.push(node);
          }
        },
      };

      function compare(a, b) {
        if (Array.isArray(a) && Array.isArray(b)) {
          for (let i = 0; i < b.length; i++) {
            if (!compare(b[i], a[i])) {
              return false;
            }
          }
          return true;
        }

        if (typeof a === 'object' && typeof b === 'object') {
          for (const key of Object.keys(b)) {
            if (!compare(b[key], a[key])) {
              return false;
            }
          }
          return true;
        }

        return a === b;
      }

      forEach((node) => {
        visit(node, visitors);
      });

      return Collection.create(matches);
    }

    function map(callback) {
      return Collection.create(nodes.map(callback));
    }

    function forEach(callback) {
      nodes.forEach(callback);
      return collection;
    }

    function toSource() {
      const root = nodes.find((node) => {
        return node.type === 'root';
      });

      if (root) {
        const result = root.toResult();
        return result.css;
      }

      throw new Error('Unable to find a Root node');
    }

    function size() {
      return nodes.length;
    }

    return collection;
  },
};

const types = {
  // Type classes
  AtRule: postcss.AtRule,
  Comment: postcss.Comment,
  Declaration: postcss.Declaration,
  Root: postcss.Root,
  Rule: postcss.Rule,

  // Type builders
  atRule: postcss.atRule,
  comment: postcss.comment,
  declaration: postcss.decl,
  root: postcss.root,
  rule: postcss.rule,

  // Sass types that could be helpful
  // AtImport
  // AtUse
  // AtForward
  // Variable
  // Mixin
  // Function
};

/**
 * Transform the given input source into an AST
 */
function parse(source) {
  return scssParser.parse(source);
}

export { Collection, NodePath, types, parse, visit };
