/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as babel from '@babel/core';
import traverse from '@babel/traverse';
import fs from 'fs-extra';
import path from 'path';
import resolve from 'resolve';
import { hash } from '../crypto/murmur';

export async function analyze({ directory, filepath, type }) {
  if (directory) {
    throw new Error('analyzing a directory is currently unsuported');
  }

  if (type === 'javascript') {
    return {
      react: react(filepath).map((component) => {
        const id = hash(`${component.filepath}#${component.name}`);
        const result = {
          id,
          name: component.name,
          properties: component.properties,
          filepath: component.filepath,
        };

        if (component.type) {
          result.type = component.type;
        }

        return result;
      }),
    };
  }

  throw new Error(`Unsupported analysis type: ${type}`);
}

const ignorelist = new Set(['node_modules', 'lib']);

function react(entrypoint) {
  const stack = [entrypoint];
  const visited = new Set();
  const components = new Map();

  while (stack.length !== 0) {
    const filepath = stack.pop();

    // TODO: make sure entries added to the queue are defined
    if (!filepath) {
      continue;
    }

    if (visited.has(filepath)) {
      continue;
    }

    visited.add(filepath);

    for (const match of ignorelist) {
      if (filepath.includes(match)) {
        continue;
      }
    }

    const contents = fs.readFileSync(filepath, 'utf8');
    const ast = babel.parseSync(contents, {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-proposal-export-default-from'],
    });

    traverse(ast, {
      AssignmentExpression({ node }) {
        if (node.left.type !== 'MemberExpression') {
          return;
        }

        if (node.left.property.name !== 'propTypes') {
          return;
        }

        if (node.right.type === 'ObjectExpression') {
          const properties = node.right.properties
            .filter((property) => {
              return (
                property.type === 'ObjectProperty' &&
                property.computed === false
              );
            })
            .map((property) => {
              const type = getPropType(property);
              // This can sometimes be a StringLiteral
              const name = property.key.name || property.key.value;

              if (
                Array.isArray(property.leadingComments) &&
                property.leadingComments.length > 0
              ) {
                return {
                  ...type,
                  name,
                  description: property.leadingComments[0].value
                    .replace(/\*/g, '')
                    .split('\n')
                    .map((line) => line.trim())
                    .filter((line) => {
                      return line.length > 0;
                    })
                    .join('\n'),
                };
              }
              return {
                ...type,
                name,
              };
            });

          const key = `${filepath}#${node.left.object.name}`;
          components.set(key, {
            key,
            filepath: path.relative(path.dirname(entrypoint), filepath),
            name: node.left.object.name,
            properties,
          });
        }
      },
      ClassProperty(nodePath) {
        if (nodePath.node.static !== true) {
          return;
        }

        if (nodePath.node.key.name !== 'propTypes') {
          return;
        }

        const properties = nodePath.node.value.properties
          .filter((property) => {
            return (
              property.type === 'ObjectProperty' && property.computed === false
            );
          })
          .map((property) => {
            const type = getPropType(property);
            // This can sometimes be a StringLiteral
            const name = property.key.name || property.key.value;

            if (
              Array.isArray(property.leadingComments) &&
              property.leadingComments.length > 0
            ) {
              return {
                ...type,
                name,
                description: property.leadingComments[0].value
                  .replace(/\*/g, '')
                  .split('\n')
                  .map((line) => line.trim())
                  .filter((line) => {
                    return line.length > 0;
                  })
                  .join('\n'),
              };
            }
            return {
              ...type,
              name,
            };
          });

        const classDeclaration = nodePath.findParent((path) => {
          return path.isClassDeclaration();
        });
        const key = `${filepath}#${classDeclaration.node.id.name}`;
        components.set(key, {
          type: 'class',
          key,
          filepath: path.relative(path.dirname(entrypoint), filepath),
          name: classDeclaration.node.id.name,
          properties,
        });
      },

      ExportNamedDeclaration({ node }) {
        if (node.source) {
          const source = node.source.value;
          stack.push(
            resolve.sync(source, {
              basedir: path.dirname(filepath),
            })
          );
        }
      },
      ExportAllDeclaration({ node }) {
        if (node.source) {
          const source = node.source.value;
          stack.push(
            resolve.sync(source, {
              basedir: path.dirname(filepath),
            })
          );
        }
      },
      ImportDeclaration({ node }) {
        const source = node.source.value;
        stack.push(
          resolve.sync(source, {
            basedir: path.dirname(filepath),
          })
        );
      },
    });
  }

  return Array.from(components.values());
}

function getPropType(node) {
  if (node.value.type === 'MemberExpression') {
    if (
      node.value.object.type === 'Identifier' &&
      node.value.object.name === 'PropTypes'
    ) {
      return {
        type: node.value.property.name,
      };
    }

    // PropTypes.foo.isRequired
    if (node.value.object.type === 'MemberExpression') {
      const { object, property } = node.value;

      if (
        object.object.type === 'Identifier' &&
        object.object.name === 'PropTypes'
      ) {
        if (property.name === 'isRequired') {
          return {
            type: object.property.name,
            required: true,
          };
        }
      }
    }

    // ListBoxTypes.ListBoxType
    if (node.value.object.type === 'Identifier') {
      const { object, property } = node.value;
      return {
        type: `${object.name}.${property.name}`,
      };
    }
  }

  if (node.value.type === 'CallExpression') {
    if (node.value.callee.type === 'MemberExpression') {
      const { callee } = node.value;
      const { object, property } = callee;
      if (object.name === 'PropTypes') {
        return {
          type: `${property.name}`,
        };
      }
    }

    // Function calls, like deprecate();
    if (node.value.callee.type === 'Identifier') {
      return {
        type: `${node.value.callee.name}()`,
      };
    }
  }

  if (node.value.type === 'Identifier') {
    return {
      type: node.value.name,
    };
  }

  return {
    type: 'unknown',
  };
}
