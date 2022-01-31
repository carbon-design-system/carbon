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
  GraphQLID,
  GraphQLBoolean,
} from 'graphql';
import { Project } from '../project';

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
    directory: {
      type: new GraphQLNonNull(GraphQLString),
    },
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    version: {
      type: new GraphQLNonNull(GraphQLString),
    },
    private: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    downloads: {
      type: new GraphQLNonNull(PackageDownloadsType),
    },
  }),
});

const PackageDownloadsType = new GraphQLObjectType({
  name: 'PackageDownloads',
  fields: () => ({
    lastMonth: {
      type: GraphQLInt,
    },
  }),
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
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
        resolve: (_root, args) => {
          const project = {
            org: args.org,
            repo: args.repo,
            workspaces: [
              {
                name: 'carbon-components-react',
                version: '7.51.0',
                private: false,
                directory: 'packages/react',
              },
            ],
          };
          return project;
        },
      },
    },
  }),
});
