/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ErrorBoundary } from '@carbon/react';
import * as React from 'react';
import { Project } from '../../../../../project';
import { Query } from '../../../../../components/Query';
import { ExportsSection } from '../../../../../components/ExportsSection';

const DOWNLOADS_QUERY = `
  query WorkspaceDownloadsLastMonthQuery($projectId: ID!, $workspaceId: ID!) {
    workspace(project: $projectId, workspace: $workspaceId) {
      downloads {
        lastMonth
      }
    }
  }
`;

export default function WorkspacePage({ project, workspace }) {
  return (
    <>
      <main>
        <h1>{workspace.name}</h1>
        <p>{workspace.description}</p>
        <sub>{workspace.version}</sub>
        <aside>
          <header>About</header>
          <ErrorBoundary fallback="Error loading details">
            <Query
              fallback="Loading..."
              query={DOWNLOADS_QUERY}
              variables={{
                projectId: project.id,
                workspaceId: workspace.id,
              }}>
              {(data) => {
                const sections = [
                  {
                    title: 'Description',
                    value: workspace.description,
                  },
                  {
                    title: 'Version',
                    value: workspace.version,
                  },
                  {
                    title: 'Downloads (last month)',
                    value: data.workspace.downloads.lastMonth,
                  },
                ].filter((section) => {
                  return !!section.value;
                });

                return (
                  <dl>
                    {sections.map((section) => {
                      return (
                        <React.Fragment key={section.title}>
                          <dt>{section.title}</dt>
                          <dd>{section.value}</dd>
                        </React.Fragment>
                      );
                    })}
                  </dl>
                );
              }}
            </Query>
          </ErrorBoundary>
        </aside>
        <section>
          <h2>Exports</h2>
          <ErrorBoundary fallback="Error loading workspace exports">
            <ExportsSection project={project.id} workspace={workspace.id} />
          </ErrorBoundary>
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const projects = await Project.all();
  const workspaces = await Promise.all(
    projects.map(async (project) => {
      const workspaces = await Project.getProjectWorkspaces(project.id);
      return workspaces.map((workspace) => {
        return {
          params: {
            org: project.org,
            repo: project.repo,
            id: workspace.id,
          },
        };
      });
    })
  );
  const paths = workspaces.flat();

  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({ params }) {
  const { org, repo, id } = params;
  const project = await Project.find({
    org,
    repo,
  });
  const workspace = await Project.getWorkspaceById(project.id, id);

  return {
    props: {
      project: {
        id: project.id,
      },
      workspace: {
        id: workspace.id,
        name: workspace.name,
        version: workspace.version,
        description: workspace.description,
      },
    },
  };
}
