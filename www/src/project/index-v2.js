/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import glob from 'fast-glob';
import path from 'path';
import { hash } from '../crypto/murmur';

function getProjectID(org, repo) {
  return hash(`${org}:${repo}`);
}

const projects = [
  {
    org: 'carbon-design-system',
    repo: 'carbon',
    root: path.resolve(process.cwd(), '..'),
  },
  {
    org: 'carbon-design-system',
    repo: 'ibm-cloud-cognitive',
    root: path.resolve(process.cwd(), '..', '..', 'ibm-cloud-cognitive'),
  },
  {
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    root: path.resolve(process.cwd(), '..', '..', 'carbon-for-ibm-dotcom'),
  },
  {
    org: 'carbon-design-system',
    repo: 'carbon-addons-iot-react',
    root: path.resolve(process.cwd(), '..', '..', 'carbon-addons-iot-react'),
  },
  {
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    root: path.resolve(process.cwd(), '..', '..', 'charts'),
  },
];

const Project = {
  async all() {
    return await Promise.all(
      projects.map((project) => {
        return Project.load(project.org, project.repo);
      })
    );
  },
  async find({ org, repo }) {
    const project = projects.find((project) => {
      return project.org === org && project.repo === repo;
    });
    if (project) {
      return {
        id,
        org,
        repo,
      };
    }
    return null;
  },
  async load(org, repo) {
    const id = getProjectID(org, repo);
    return {
      id,
      org,
      repo,
    };
  },
  async getProjectWorkspaces(projectId) {
    const project = projects.find((project) => {
      const id = getProjectID(project.org, project.repo);
      return id === projectId;
    });

    // Local project
    if (project.root) {
      const rootWorkspace = await Project.getWorkspace(project.root);
      const childWorkspaces = await Project.getWorkspacesFor(rootWorkspace);
      return [rootWorkspace, ...childWorkspaces];
    }

    // Remote repos are currently unsupported
    return [];
  },
  async find({ org, repo }) {
    const project = projects.find((project) => {
      return project.org === org && project.repo === repo;
    });
    if (!project) {
      return null;
    }
    return await Project.load(org, repo);
  },
  async getWorkspaceById(projectId, workspaceId) {
    const workspaces = await Project.getProjectWorkspaces(projectId);
    return workspaces.find((workspace) => {
      return workspace.id === workspaceId;
    });
  },
  async getWorkspace(directory) {
    const packageJsonPath = path.join(directory, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    const dependencyTypes = [
      'dependencies',
      'devDependencies',
      'peerDependencies',
    ];
    const dependencies = dependencyTypes.flatMap((type) => {
      if (packageJson[type]) {
        return Array.from(Object.entries(packageJson[type])).map(
          ([key, value]) => {
            return {
              name: key,
              value,
              type,
            };
          }
        );
      }
      return [];
    });

    const workspace = {
      id: hash(directory),
      directory,
      name: packageJson.name,
      version: packageJson.version ?? null,
      private: packageJson.private ?? false,
      description: packageJson.description ?? null,
      workspaces: [],
      dependencies,
    };

    if (packageJson.workspaces) {
      if (
        typeof packageJson.workspaces === 'object' &&
        packageJson.workspaces.packages
      ) {
        workspace.workspaces = packageJson.workspaces.packages;
      } else if (Array.isArray(packageJson.workspaces)) {
        workspace.workspaces = packageJson.workspaces;
      } else {
        throw new Error(`Unexpected workspace package.json format`);
      }
    }

    return workspace;
  },
  async getWorkspacesFor(root) {
    if (!Array.isArray(root.workspaces)) {
      throw new Error(`Workspace has no workspaces defined`);
    }

    const workspaces = await Promise.all(
      root.workspaces.map(async (pattern) => {
        const matches = await glob(pattern, {
          cwd: root.directory,
          onlyDirectories: true,
        });
        const directories = matches
          .map((match) => {
            return path.join(root.directory, match);
          })
          .filter((directory) => {
            const packageJsonPath = path.join(directory, 'package.json');
            return fs.existsSync(packageJsonPath);
          });
        const workspaces = await Promise.all(
          directories.map((directory) => {
            return Project.getWorkspace(directory);
          })
        ).then((workspaces) => {
          return workspaces.map((workspace) => {
            return {
              ...workspace,
              directory: path.relative(root.directory, workspace.directory),
              parentDirectory: root.directory,
            };
          });
        });

        return workspaces;
      })
    );

    return workspaces.flat();
  },
};

export { Project };
