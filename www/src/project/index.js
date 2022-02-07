/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Octokit } from '@octokit/rest';
import cssstats from 'cssstats';
import micromatch from 'micromatch';
import path from 'node:path';
import sass from 'sass';
import semver from 'semver';
import { FSCache } from '../cache/fs';
import { hash } from '../crypto/murmur';
import * as time from '../time';

const cache = FSCache.create(path.join(process.cwd(), '.cache', 'projects'));
const gh = new Octokit({
  auth: process.env.GH_TOKEN,
  userAgent: 'carbon-design-system-tooling',
  baseUrl: 'https://api.github.com',
});
const ghe = new Octokit({
  auth: process.env.GHE_TOKEN,
  userAgent: 'carbon-design-system-tooling',
  baseUrl: 'https://github.ibm.com/api/v3',
});

function getOctokitClient(source) {
  if (source.type !== 'remote') {
    throw new Error(`Project does not support access via octokit`);
  }

  if (source.host === 'github.com') {
    return gh;
  }

  if (source.host === 'github.ibm.com') {
    return ghe;
  }

  throw new Error(`Unknown host: ${source.host}`);
}

class Project {
  static create({ owner, repo, source }) {
    return new Project(owner, repo, source);
  }

  static createId(owner, repo, source) {
    if (source.type === 'remote') {
      return hash(`${source.host}_${owner}_${repo}`);
    }
    throw new Error(`Unsupported project source type: ${source.type}`);
  }

  constructor(owner, repo, source) {
    this.id = Project.createId(owner, repo, source);
    this.owner = owner;
    this.repo = repo;
    this.source = source;
  }

  async getTree(sha) {
    return await ProjectTree.create(this, sha ?? this.source.branch);
  }
}

class ProjectTree {
  static async create(project, sha) {
    const octokit = getOctokitClient(project.source);
    const { data } = await octokit.rest.git.getTree({
      owner: project.owner,
      repo: project.repo,
      tree_sha: sha,
    });
    const rootWorkspace = await Workspace.create(
      project,
      '.',
      data.sha,
      data.tree
    );
    return new ProjectTree(project, data.sha, rootWorkspace);
  }

  constructor(project, sha, rootWorkspace) {
    this.project = project;
    this.sha = sha;
    this.rootWorkspace = rootWorkspace;
  }

  async getWorkspaces() {
    return await this.rootWorkspace.getChildWorkspaces();
  }

  async getWorkspace(sha) {
    const workspaces = await this.rootWorkspace.getChildWorkspaces();
    return workspaces.find((workspace) => {
      return workspace.sha === sha;
    });
  }
}

class Workspace {
  static async create(project, directory, sha, tree) {
    const packageJson = await getPackageJson(project, sha);
    return new Workspace(project, directory, sha, tree, packageJson);
  }

  constructor(project, directory, sha, tree, packageJson) {
    this.project = project;
    this.directory = directory;
    this.sha = sha;
    this.tree = tree;
    this.packageJson = {
      name: packageJson.name,
      description: packageJson.description,
      version: packageJson.version,
      private:
        typeof packageJson.private !== undefined &&
        typeof packageJson.private !== null
          ? Boolean(packageJson.private)
          : false,
      workspaces: getWorkspacePatterns(packageJson),
    };

    const dependencyTypes = ['dependencies', 'devDependencies'];
    this.dependencies = dependencyTypes.flatMap((type) => {
      if (packageJson[type]) {
        return Object.entries(packageJson[type]).map(([name, range]) => {
          return {
            name,
            range,
            type,
            source: 'npm',
          };
        });
      }
      return [];
    });

    this.parentWorkspace = null;
  }

  addParentWorkspace(workspace) {
    this.parentWorkspace = workspace;
  }

  async getChildWorkspaces() {
    const octokit = getOctokitClient(this.project.source);
    const patterns = this.packageJson.workspaces.map((pattern) => {
      const scanned = micromatch.scan(pattern);
      return {
        pattern,
        base: scanned.base.split('/'),
        glob: scanned.glob,
      };
    });
    const workspaces = await Promise.all(
      patterns.map(async ({ pattern, base, glob }) => {
        const hierarchy = [];
        let tree = this.tree;

        if (glob) {
          for (const directory of base) {
            const match = tree.find((node) => {
              return node.path === directory && node.type === 'tree';
            });
            const { data } = await octokit.rest.git.getTree({
              owner: this.project.owner,
              repo: this.project.repo,
              tree_sha: match.sha,
            });
            hierarchy.push(match.path);
            tree = data.tree;
          }
        }

        const matches = tree
          .filter((node) => {
            return (
              node.type === 'tree' &&
              micromatch.isMatch(path.join(...hierarchy, node.path), pattern)
            );
          })
          .map((node) => {
            return {
              directory: path.join(...hierarchy, node.path),
              sha: node.sha,
            };
          });

        return matches;
      })
    ).then((workspaces) => {
      return Promise.all(
        workspaces.flat().map(async (workspace) => {
          const { data } = await octokit.rest.git.getTree({
            owner: this.project.owner,
            repo: this.project.repo,
            tree_sha: workspace.sha,
          });
          return Workspace.create(
            this.project,
            workspace.directory,
            workspace.sha,
            data.tree
          );
        })
      );
    });

    const graph = new Map();

    for (const workspace of workspaces) {
      workspace.addParentWorkspace(this);
      graph.set(workspace.packageJson.name, workspace);
    }

    for (const workspace of workspaces) {
      const workspaceDependencies = workspace.dependencies.filter(
        (dependency) => {
          if (graph.has(dependency.name)) {
            const entry = graph.get(dependency.name);
            if (
              semver.intersects(dependency.range, entry.packageJson.version)
            ) {
              return true;
            }
          }
          return false;
        }
      );

      for (const dependency of workspaceDependencies) {
        dependency.source = 'workspace';
        dependency.workspace = graph.get(dependency.name);
      }
    }

    return workspaces;
  }

  async getFiles() {
    console.log('Workspace#getFiles');
    const key = `${this.sha}#getFiles`;

    if (!(await cache.has(key))) {
      const octokit = getOctokitClient(this.project.source);
      const files = [];
      const queue = [
        {
          tree: this.tree,
          hierarchy: [],
        },
      ];

      while (queue.length !== 0) {
        const { tree, hierarchy } = queue.shift();

        for (const node of tree) {
          if (node.type === 'blob') {
            files.push({
              hierarchy,
              node,
            });
          }

          if (node.type === 'tree') {
            const { data } = await octokit.rest.git.getTree({
              owner: this.project.owner,
              repo: this.project.repo,
              tree_sha: node.sha,
            });

            queue.push({
              hierarchy: [...hierarchy, node.path],
              tree: data.tree,
            });
          }
        }
      }

      const value = files.map((file) => {
        const filepath = path.join(...file.hierarchy, file.node.path);
        return {
          filepath,
          sha: file.node.sha,
          basename: file.node.path,
        };
      });

      await cache.set(key, value);
    }

    const value = await cache.get(key);
    return value.map((file) => {
      return SassFile.create({
        ...file,
        workspace: this,
      });
    });
  }

  async getSassFiles() {
    const files = await this.getFiles();
    const scss = files.filter((file) => {
      return path.extname(file.basename) === '.scss';
    });

    return {
      available: scss.length > 0,
      files: scss,
    };
  }

  async getSassFile(sha) {
    const info = await this.getSassFiles();
    return info.files.find((file) => {
      return file.sha === sha;
    });
  }

  async findFile(filepath) {
    const files = await this.getFiles();
    return files.find((file) => {
      return file.filepath === filepath;
    });
  }
}

class SassFile {
  static create({ filepath, sha, basename, workspace }) {
    return new SassFile(workspace, filepath, sha, basename);
  }

  constructor(workspace, filepath, sha, basename) {
    this.workspace = workspace;
    this.filepath = filepath;
    this.sha = sha;
    this.basename = basename;
  }

  async getStats() {
    const octokit = getOctokitClient(this.workspace.project.source);
    const key = `SassFile#getStats(${this.sha})`;

    if (!(await cache.has(key))) {
      const { data } = await octokit.rest.git.getBlob({
        owner: this.workspace.project.owner,
        repo: this.workspace.project.repo,
        file_sha: this.sha,
      });
      const value = {
        content: data.content,
        encoding: data.encoding,
      };

      await cache.set(key, value);
    }
    const { content, encoding } = await cache.get(key);
    const buffer = Buffer.from(content, encoding);

    const loadURL = async (url) => {
      console.log('load: %s', url);

      if (url.toString().startsWith('gh:')) {
        const [_prefix, sha] = url.toString().split(':');
        const { data: blob } = await octokit.rest.git.getBlob({
          owner: this.workspace.project.owner,
          repo: this.workspace.project.repo,
          file_sha: sha,
        });

        return {
          contents: Buffer.from(blob.content, blob.encoding).toString(),
          syntax: 'scss',
        };
      }

      return null;
    };

    const result = await sass.compileStringAsync(buffer.toString(), {
      importers: [
        {
          canonicalize: async (url, options) => {
            console.log('canonicalize', url, options);

            const parsed = path.parse(url);

            if (!parsed.dir.startsWith('.')) {
              console.log('HERE BABY');
              console.log(url);
              console.log(parsed);
              return null;
            }

            const basenames = [];

            if (parsed.ext === '') {
              basenames.push(`_${parsed.base}.scss`);
              basenames.push(`${parsed.base}.scss`);
              basenames.push(`_${parsed.base}.css`);
              basenames.push(`${parsed.base}.css`);
              basenames.push(`${parsed.base}/index.scss`);
              basenames.push(`${parsed.base}/_index.scss`);
            } else if (parsed.ext === '.scss') {
              basenames.push(parsed.base);
              basenames.push(`_${parsed.base}`);
            }

            const candidates = basenames.map((basename) => {
              return path.relative(
                process.cwd(),
                path.resolve(path.dirname(this.filepath), parsed.dir, basename)
              );
            });
            const { files } = await this.workspace.getSassFiles();
            const file = files.find((file) => {
              return candidates.some((candidate) => {
                return candidate === file.filepath;
              });
            });

            if (file) {
              return new URL(`gh:${file.sha}`);
            }

            return null;
          },
          load: loadURL,
        },
        {
          canonicalize: async (url, options) => {
            console.log('canonicalize', url, options);
            if (url.startsWith('@')) {
              const dependency = this.workspace.dependencies.find(
                (dependency) => {
                  return url.startsWith(dependency.name);
                }
              );

              if (dependency) {
                const parsed = path.parse(url);
                const candidates = [
                  `index.scss`,
                  `_index.scss`,
                  `${url}/index.scss`,
                  `${url}/_index.scss`,
                  path.join(parsed.dir, `${parsed.base}.scss`),
                  path.join(parsed.dir, `_${parsed.base}.scss`),
                ];
                console.log(candidates);
                const { files } = await dependency.workspace.getSassFiles();
                const file = files.filter((file) => {
                  console.log(file.filepath);
                  return candidates.some((candidate) => {
                    return file.filepath === candidate;
                  });
                });
                if (file) {
                  console.log(file);
                  return new URL(`gh:${file.sha}`);
                }
              }
            }
            return null;
          },
          load: loadURL,
        },
      ],
    });
    const stats = cssstats(result.css);

    return stats;
  }
}

async function getPackageJson(project, sha) {
  const octokit = getOctokitClient(project.source);
  const { data } = await octokit.rest.git.getTree({
    owner: project.owner,
    repo: project.repo,
    tree_sha: sha,
  });
  const packageJsonNode = data.tree.find((node) => {
    return node.path === 'package.json';
  });

  if (!packageJsonNode) {
    return null;
  }

  const blob = await octokit.rest.git.getBlob({
    owner: project.owner,
    repo: project.repo,
    file_sha: packageJsonNode.sha,
  });
  const contents = Buffer.from(blob.data.content, blob.data.encoding);
  return JSON.parse(contents);
}

function getWorkspacePatterns(packageJson) {
  if (packageJson.workspaces) {
    if (Array.isArray(packageJson.workspaces)) {
      return packageJson.workspaces;
    } else if (
      typeof packageJson.workspaces === 'object' &&
      packageJson.workspaces.packages
    ) {
      return packageJson.workspaces.packages;
    } else {
      console.log('Unknown work config for package.json');
    }
  }
  return [];
}

const projects = [
  {
    owner: 'carbon-design-system',
    repo: 'carbon',
    source: {
      type: 'remote',
      host: 'github.com',
      branch: 'main',
    },
  },
  {
    owner: 'carbon-design-system',
    repo: 'ibm-cloud-cognitive',
    source: {
      type: 'remote',
      host: 'github.com',
      branch: 'main',
    },
  },
  {
    owner: 'ibmcloud',
    repo: 'pal',
    source: {
      type: 'remote',
      host: 'github.ibm.com',
      branch: 'master',
    },
  },
].map((project) => {
  return Project.create({
    owner: project.owner,
    repo: project.repo,
    source: project.source,
  });
});

async function all() {
  return projects;
}

async function findBy({ owner, repo, host }) {
  return projects.find((project) => {
    return (
      project.owner === owner &&
      project.repo === repo &&
      project.source.host === host
    );
  });
}

async function find(id) {
  return projects.find((project) => {
    return project.id === id;
  });
}

async function getProjectWorkspaces(id) {
  const project = await find(id);
  if (!project) {
    throw new Error(`Unable to find project with id: ${id}`);
  }

  const octokit = getOctokitClient(project);
  const treeResponse = await octokit.rest.git.getTree({
    owner: project.owner,
    repo: project.repo,
    tree_sha: project.source.branch,
  });
  const packageJson = treeResponse.data.tree.find((node) => {
    return node.path === 'package.json';
  });

  if (!packageJson) {
    return [];
  }

  const blobResponse = await octokit.rest.git.getBlob({
    owner: project.owner,
    repo: project.repo,
    file_sha: packageJson.sha,
  });
  const contents = JSON.parse(
    Buffer.from(blobResponse.data.content, blobResponse.data.encoding)
  );

  if (!contents.workspaces) {
    return [];
  }

  if (Array.isArray(contents.workspaces)) {
    const workspaces = await loadRemoteWorkspaces(
      octokit,
      project,
      contents.workspaces
    );
    return workspaces;
  } else if (
    typeof contents.workspaces === 'object' &&
    contents.workspaces.packages &&
    Array.isArray(contents.workspaces.packages)
  ) {
    const workspaces = await loadRemoteWorkspaces(
      octokit,
      project,
      contents.workspaces.packages
    );
    return workspaces;
  } else {
    throw new Error('Unsupported workspace format');
  }
}

async function getWorkspaces(project, id) {
  const octokit = getOctokitClient(project);
  const treeResponse = await octokit.rest.git.getTree({
    owner: project.owner,
    repo: project.repo,
    tree_sha: id,
  });
  const packageJson = treeResponse.data.tree.find((node) => {
    return node.path === 'package.json';
  });

  if (!packageJson) {
    return [];
  }

  const blobResponse = await octokit.rest.git.getBlob({
    owner: project.owner,
    repo: project.repo,
    file_sha: packageJson.sha,
  });
  const contents = JSON.parse(
    Buffer.from(blobResponse.data.content, blobResponse.data.encoding)
  );

  if (!contents.workspaces) {
    return [];
  }

  if (Array.isArray(contents.workspaces)) {
    const workspaces = await loadRemoteWorkspaces(
      octokit,
      project,
      contents.workspaces
    );
    return workspaces;
  } else if (
    typeof contents.workspaces === 'object' &&
    contents.workspaces.packages &&
    Array.isArray(contents.workspaces.packages)
  ) {
    const workspaces = await loadRemoteWorkspaces(
      octokit,
      project,
      contents.workspaces.packages
    );
    return workspaces;
  } else {
    throw new Error('Unsupported workspace format');
  }
}

async function loadRemoteWorkspaces(octokit, project, patterns) {
  const treeResponse = await octokit.rest.git.getTree({
    owner: project.owner,
    repo: project.repo,
    tree_sha: project.source.branch,
  });

  return Promise.all(
    patterns.map(async (pattern) => {
      console.log('Visiting pattern: %s', pattern);

      const parts = pattern.split('/');
      const depth = [];
      const matches = [];
      let currentTree = treeResponse.data.tree;

      while (parts.length > 0) {
        const part = parts.shift();
        if (part === '*') {
          const directories = await Promise.all(
            currentTree.map(async (node) => {
              if (node.type === 'tree') {
                const tree = await octokit.rest.git.getTree({
                  owner: project.owner,
                  repo: project.repo,
                  tree_sha: node.sha,
                });

                const packageJson = tree.data.tree.find((node) => {
                  return node.path === 'package.json';
                });

                if (packageJson) {
                  return node;
                }

                return false;
              }
              return false;
            })
          ).then((directories) => {
            return directories.filter(Boolean);
          });

          for (const directory of directories) {
            matches.push({
              directory: path.join(...depth, directory.path),
              id: directory.sha,
              sha: directory.sha,
            });
          }
        } else {
          const node = currentTree.find((node) => {
            return node.path === part;
          });

          if (parts.length === 0) {
            matches.push({
              directory: path.join(...depth, node.path),
              id: node.sha,
              sha: node.sha,
            });
          } else {
            depth.push(node.path);
            currentTree = await octokit.rest.git.getTree({
              owner: project.owner,
              repo: project.repo,
              tree_sha: node.sha,
            });
            currentTree = currentTree.data.tree;
          }
        }
      }

      return matches;
    })
  )
    .then((workspaces) => {
      return workspaces.flat();
    })
    .then((workspaces) => {
      return Promise.all(
        workspaces.map(async (workspace) => {
          const tree = await octokit.rest.git.getTree({
            owner: project.owner,
            repo: project.repo,
            tree_sha: workspace.sha,
          });
          const packageJson = tree.data.tree.find((node) => {
            return node.path === 'package.json';
          });
          const blobResponse = await octokit.rest.git.getBlob({
            owner: project.owner,
            repo: project.repo,
            file_sha: packageJson.sha,
          });
          const contents = JSON.parse(
            Buffer.from(blobResponse.data.content, blobResponse.data.encoding)
          );

          return {
            ...workspace,
            description: contents.description,
            name: contents.name,
            private: contents.private ?? false,
            version: contents.version,
            workspaces: contents.workspaces ?? [],
          };
        })
      );
    });
}

async function findWorkspace(project, id) {
  const workspaces = await getWorkspaces(project, project.source.branch);
  return workspaces.find((workspace) => {
    return workspace.sha === id;
  });
}

// const Project = {
// all,
// getProjectWorkspaces,
// findBy,
// findWorkspace,
// };

export { all, findBy };
