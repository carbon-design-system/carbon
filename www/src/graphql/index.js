/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLUnionType,
} from 'graphql';
import { hash } from '../crypto/murmur';
import cssstats from 'cssstats';
import fs from 'fs-extra';
import glob from 'fast-glob';
import path from 'path';
import sass from 'sass';
import { Cache } from '../cache/memory';
import { npm } from '../npm';
import { Project } from '../project';
import * as time from '../time';

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    org: {
      type: new GraphQLNonNull(GraphQLString),
    },
    repo: {
      type: new GraphQLNonNull(GraphQLString),
    },
    workspaces: {
      type: new GraphQLNonNull(new GraphQLList(WorkspaceType)),
      resolve: async (project) => {
        return await Project.getProjectWorkspaces(project.id);
      },
    },
  }),
});

const WorkspaceType = new GraphQLObjectType({
  name: 'Workspace',
  fields: () => ({
    description: {
      type: GraphQLString,
    },
    directory: {
      type: new GraphQLNonNull(GraphQLString),
    },
    downloads: {
      type: new GraphQLNonNull(PackageDownloadsType),
      resolve: async (workspace) => {
        return {
          workspace,
        };
      },
    },
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    package: {
      type: new GraphQLNonNull(PackageType),
      resolve: async (workspace) => {
        const directory = path.join(
          workspace.parentDirectory,
          workspace.directory
        );

        const scssFiles = await glob(['index.scss', 'scss/**/*.scss'], {
          cwd: directory,
          ignore: ['**/vendor/**'],
        });

        const scss = {
          exported: scssFiles.length > 0,
          files: scssFiles.map((match) => {
            const filepath = path.join(directory, match);
            return {
              id: hash(filepath),
              filepath,
              rootDirectory: directory,
            };
          }),
        };

        return {
          react: {
            exported: false,
            components: [],
            props: [],
          },
          scss,
        };
      },
    },
    private: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    version: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

const PackageType = new GraphQLObjectType({
  name: 'Package',
  fields: () => ({
    react: {
      type: ReactExportsType,
    },
    scss: {
      type: SassExportsType,
    },
  }),
});

const ReactExportsType = new GraphQLObjectType({
  name: 'ReactExports',
  fields: () => ({
    exported: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    components: {
      type: new GraphQLNonNull(new GraphQLList(ReactComponentType)),
    },
    props: {
      type: new GraphQLNonNull(new GraphQLList(ReactPropType)),
    },
  }),
});

const ReactComponentType = new GraphQLObjectType({
  name: 'ReactComponent',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    props: {
      type: new GraphQLNonNull(new GraphQLList(ReactComponentPropType)),
    },
    // TODO: type (functional, class, forwardRef)
  }),
});

const ReactPropType = new GraphQLObjectType({
  name: 'ReactProp',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    components: {
      type: new GraphQLNonNull(new GraphQLList(ReactComponentType)),
    },
  }),
});

const ReactComponentPropType = new GraphQLObjectType({
  name: 'ReactComponentProp',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

const SassExportsType = new GraphQLObjectType({
  name: 'SassExports',
  fields: () => ({
    exported: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    files: {
      type: new GraphQLNonNull(new GraphQLList(SassFileType)),
    },
  }),
});

const SassFileType = new GraphQLObjectType({
  name: 'SassFile',
  fields: () => ({
    filepath: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (exportType) => {
        return path.relative(exportType.rootDirectory, exportType.filepath);
      },
    },
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    stats: {
      type: new GraphQLNonNull(SassExportStats),
      resolve: createCachedResolver({
        key: (exportType) => exportType.filepath,
        value: async (exportType) => {
          try {
            const result = sass.compile(exportType.filepath, {
              loadPaths: [
                path.join(exportType.rootDirectory, 'node_modules'),
                path.resolve(
                  exportType.rootDirectory,
                  '..',
                  '..',
                  'node_modules'
                ),
              ],
            });
            const stats = cssstats(result.css);
            return stats;
          } catch (error) {
            console.log(error);
            throw error;
          }
        },
      }),
    },
  }),
});

const SassExportStats = new GraphQLObjectType({
  name: 'SassExportStats',
  fields: () => ({
    gzipSize: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    rules: {
      type: new GraphQLObjectType({
        name: 'SassExportRules',
        fields: () => ({
          total: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          size: {
            type: new GraphQLObjectType({
              name: 'SassExportRulesSize',
              fields: () => ({
                average: {
                  type: new GraphQLNonNull(GraphQLFloat),
                },
                max: {
                  type: new GraphQLNonNull(GraphQLInt),
                },
              }),
            }),
          },
        }),
      }),
    },
    selectors: {
      type: new GraphQLObjectType({
        name: 'SassExportSelectors',
        fields: () => ({
          total: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          class: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          type: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          pseudoClass: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          pseudoElement: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          specificity: {
            type: new GraphQLObjectType({
              name: 'SassExportSelectorsSpecificity',
              fields: () => ({
                average: {
                  type: new GraphQLNonNull(GraphQLFloat),
                },
                max: {
                  type: new GraphQLNonNull(GraphQLInt),
                },
              }),
            }),
          },
        }),
      }),
    },
    declarations: {
      type: new GraphQLObjectType({
        name: 'SassExportDeclarations',
        fields: () => ({
          total: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          unique: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          uniqueToTotalRatio: {
            type: GraphQLFloat,
            resolve: (root) => {
              if (isNaN(root.uniqueToTotalRatio)) {
                return null;
              }

              return root.uniqueToTotalRatio;
            },
          },
        }),
      }),
    },
    mediaQueries: {
      type: new GraphQLObjectType({
        name: 'SassExportMediaQueries',
        fields: () => ({
          total: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          unique: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          values: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
          },
        }),
      }),
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});

// const ReactComponentExportType = new GraphQLObjectType({
// name: 'ReactComponentExport',
// fields: () => ({
// id: {
// type: new GraphQLNonNull(GraphQLID),
// },
// name: {
// type: new GraphQLNonNull(GraphQLString),
// },
// }),
// });

// const PackageExportType = new GraphQLUnionType({
// name: 'PackageExport',
// types: [ReactComponentExportType],
// resolveType(_value) {
// return ReactComponentExportType;
// },
// });

function createCachedResolver({ key: getKey, value: getValue }) {
  const cache = Cache.create();
  return async (...args) => {
    const key = getKey(...args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const value = await getValue(...args);
    cache.set(key, value, {
      ttl: time.Day,
    });
    return value;
  };
}

const PackageDownloadsType = new GraphQLObjectType({
  name: 'PackageDownloads',
  fields: () => ({
    lastDay: {
      type: GraphQLInt,
      resolve: createCachedResolver({
        key: (root) => root.workspace.id,
        value: async (root) => {
          if (root.workspace.private === true) {
            return null;
          }

          if (root.workspace.name) {
            const { downloads } = await npm.downloads.lastDay(
              root.workspace.name
            );
            return downloads;
          }

          return null;
        },
      }),
    },
    lastMonth: {
      type: GraphQLInt,
      resolve: createCachedResolver({
        key: (root) => root.workspace.id,
        value: async (root) => {
          if (root.workspace.private === true) {
            return null;
          }

          if (root.workspace.name) {
            const { downloads } = await npm.downloads.lastMonth(
              root.workspace.name
            );
            return downloads;
          }

          return null;
        },
      }),
    },
    lastWeek: {
      type: GraphQLInt,
      resolve: createCachedResolver({
        key: (root) => root.workspace.id,
        value: async (root) => {
          if (root.workspace.private === true) {
            return null;
          }

          if (root.workspace.name) {
            const { downloads } = await npm.downloads.lastWeek(
              root.workspace.name
            );
            return downloads;
          }

          return null;
        },
      }),
    },
  }),
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      projects: {
        type: new GraphQLNonNull(new GraphQLList(ProjectType)),
        resolve: async () => {
          return await Project.all();
        },
      },
      project: {
        type: ProjectType,
        args: {
          org: {
            type: new GraphQLNonNull(GraphQLString),
          },
          repo: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: async (_root, args) => {
          return await Project.find({
            org: args.org,
            repo: args.repo,
          });
        },
      },
      workspace: {
        type: WorkspaceType,
        args: {
          project: {
            type: new GraphQLNonNull(GraphQLID),
          },
          workspace: {
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        resolve: async (_root, args) => {
          return await Project.getWorkspaceById(args.project, args.workspace);
        },
      },
    }),
  }),
});
