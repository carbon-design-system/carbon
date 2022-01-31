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
];

const Project = {
  async all() {
    return await Promise.all(
      projects.map((project) => {
        return Project.load(project.org, project.repo);
      })
    );
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
      return [];
      // return [rootWorkspace, ...childWorkspaces];
    }

    // Remote repos are currently unsupported
    return [];
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
      directory,
      name: packageJson.name,
      version: packageJson.version,
      private: packageJson.private ?? false,
      workspaces: packageJson.workspaces,
      dependencies,
    };

    return workspace;
  },
  async getWorkspacesFor(workspace) {
    if (!Array.isArray(workspace.workspaces)) {
      throw new Error(`Workspace has no workspaces defined`);
    }
    return await Promise.all(
      workspace.workspaces.map(async (pattern) => {
        console.log(pattern, workspace.directory);

        const matches = await glob(pattern, {
          cwd: workspace.directory,
        });

        console.log(matches);
        return {};
      })
    ).then((workspaces) => {
      return workspaces.flat();
    });
  },
};

export { Project };
