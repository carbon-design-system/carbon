/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';
import * as Project from '../project';

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
              type: new GraphQLNonNull(new GraphQLList(SassFileType)),
            },
            file: {
              type: SassFileType,
              args: {
                sha: {
                  type: new GraphQLNonNull(GraphQLID),
                },
              },
              resolve: async (root, args) => {
                return await root.workspace.getSassFile(args.sha);
              },
            },
          }),
        })
      ),
      resolve: async (workspace) => {
        const result = await workspace.getSassFiles();
        return {
          ...result,
          workspace,
        };
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
    // downloads: {
    // type: new GraphQLNonNull(PackageDownloadsType),
    // resolve: async (workspace) => {
    // console.log('downloads resolver');
    // return {
    // workspace,
    // };
    // },
    // },
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

const SassFileType = new GraphQLObjectType({
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
        new GraphQLObjectType({
          name: 'SassFileStats',
          fields: () => ({
            size: {
              type: GraphQLInt,
            },
          }),
        })
      ),
      resolve: async (file) => {
        return await file.getStats();
      },
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
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
});

export { QueryType };
