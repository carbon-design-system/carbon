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
import * as Project from '../project';
import * as time from '../time';

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    owner: {
      type: new GraphQLNonNull(GraphQLString),
    },
    repo: {
      type: new GraphQLNonNull(GraphQLString),
    },
    tree: {
      type: ProjectTreeType,
      args: {
        sha: {
          type: GraphQLID,
        },
      },
      resolve: async (project, args) => {
        const tree = await project.getTree(args.sha);
        return tree;
      },
    },
    workspaces: {
      type: new GraphQLNonNull(new GraphQLList(WorkspaceType)),
      resolve: async (project) => {
        return await Project.getProjectWorkspaces(project.id);
      },
    },
    workspace: {
      type: WorkspaceType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (project, args) => {
        return await Project.findWorkspace(project, args.id);
      },
    },
  }),
});

const ProjectTreeType = new GraphQLObjectType({
  name: 'ProjectTree',
  fields: () => ({
    sha: {
      type: new GraphQLNonNull(GraphQLID),
    },
    workspaces: {
      type: new GraphQLNonNull(new GraphQLList(WorkspaceType)),
      resolve: async (projectTree) => {
        return await projectTree.getWorkspaces();
      },
    },
    workspace: {
      type: WorkspaceType,
      args: {
        sha: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (projectTree, args) => {
        return await projectTree.getWorkspace(args.sha);
      },
    },
  }),
});

const WorkspaceType = new GraphQLObjectType({
  name: 'Workspace',
  fields: () => ({
    directory: {
      type: new GraphQLNonNull(GraphQLString),
    },
    sass: {
      type: new GraphQLNonNull(
        new GraphQLObjectType({
          name: 'WorkspaceSassFiles',
          fields: () => ({
            available: {
              type: new GraphQLNonNull(GraphQLBoolean),
            },
            files: {
              type: new GraphQLNonNull(
                new GraphQLList(
                  new GraphQLObjectType({
                    name: 'SassFile',
                    fields: () => ({
                      basename: {
                        type: new GraphQLNonNull(GraphQLString),
                      },
                      filepath: {
                        type: new GraphQLNonNull(GraphQLString),
                      },
                      sha: {
                        type: new GraphQLNonNull(GraphQLString),
                      },
                      stats: {
                        type: new GraphQLNonNull(
                          GraphQLObjectType({
                            name: 'SassFileStats',
                            fields: () => ({
                              size: {
                                type: GraphQLInt,
                                resolve: () => {
                                  return 0;
                                },
                              },
                            }),
                          })
                        ),
                      },
                    }),
                  })
                )
              ),
            },
          }),
        })
      ),
      resolve: async (workspace) => {
        return await workspace.getSassFiles();
      },
    },
    package_json: {
      type: new GraphQLNonNull(
        new GraphQLObjectType({
          name: 'PackageJson',
          fields: () => ({
            description: {
              type: GraphQLString,
            },
            name: {
              type: new GraphQLNonNull(GraphQLString),
            },
            private: {
              type: new GraphQLNonNull(GraphQLBoolean),
            },
            version: {
              type: new GraphQLNonNull(GraphQLString),
            },
            dependencies: {
              type: new GraphQLNonNull(
                new GraphQLList(
                  new GraphQLObjectType({
                    name: 'PackageJsonDependencies',
                    fields: () => ({
                      name: {
                        type: new GraphQLNonNull(GraphQLString),
                      },
                      range: {
                        type: new GraphQLNonNull(GraphQLString),
                      },
                      source: {
                        type: new GraphQLNonNull(GraphQLString),
                      },
                      type: {
                        type: new GraphQLNonNull(GraphQLString),
                      },
                      workspace: {
                        type: WorkspaceType,
                      },
                    }),
                  })
                )
              ),
            },
          }),
        })
      ),
      resolve: (workspace) => {
        return {
          ...workspace.packageJson,
          dependencies: workspace.dependencies,
        };
      },
    },
    sha: {
      type: new GraphQLNonNull(GraphQLString),
    },
    downloads: {
      type: new GraphQLNonNull(PackageDownloadsType),
      resolve: async (workspace) => {
        console.log('downloads resolver');
        return {
          workspace,
        };
      },
    },
    // id: {
    // type: new GraphQLNonNull(GraphQLID),
    // },
    // package: {
    // type: new GraphQLNonNull(PackageType),
    // resolve: async (workspace) => {
    // const directory = path.join(
    // workspace.parentDirectory,
    // workspace.directory
    // );
    // const scssFiles = await glob(['index.scss', 'scss/**/*.scss'], {
    // cwd: directory,
    // ignore: ['**/vendor/**'],
    // });
    // const scss = {
    // exported: scssFiles.length > 0,
    // files: scssFiles.map((match) => {
    // const filepath = path.join(directory, match);
    // return {
    // id: hash(filepath),
    // filepath,
    // rootDirectory: directory,
    // };
    // }),
    // };
    // return {
    // react: {
    // exported: false,
    // components: [],
    // props: [],
    // },
    // scss,
    // };
    // },
    // },
    // private: {
    // type: new GraphQLNonNull(GraphQLBoolean),
    // resolve: (root) => {
    // return Boolean(root.private);
    // },
    // },
    // version: {
    // type: new GraphQLNonNull(GraphQLString),
    // },
  }),
});

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
        key: (root) => root.workspace.sha,
        value: async (root) => {
          if (root.workspace.packageJson.private === true) {
            return null;
          }

          if (root.workspace.packageJson.name) {
            const { downloads } = await npm.downloads.lastDay(
              root.workspace.packageJson.name
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
        key: (root) => root.workspace.sha,
        value: async (root) => {
          if (root.workspace.packageJson.private === true) {
            return null;
          }

          if (root.workspace.packageJson.name) {
            const { downloads } = await npm.downloads.lastMonth(
              root.workspace.packageJson.name
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
        key: (root) => root.workspace.sha,
        value: async (root) => {
          if (root.workspace.packageJson.private === true) {
            return null;
          }

          if (root.workspace.packageJson.name) {
            const { downloads } = await npm.downloads.lastWeek(
              root.workspace.packageJson.name
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
          owner: {
            type: new GraphQLNonNull(GraphQLString),
          },
          repo: {
            type: new GraphQLNonNull(GraphQLString),
          },
          host: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: async (_root, args) => {
          return await Project.findBy({
            owner: args.owner,
            repo: args.repo,
            host: args.host,
          });
        },
      },
    }),
  }),
});
