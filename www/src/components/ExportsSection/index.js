/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ErrorBoundary,
  Tabs,
  TabsSkeleton,
  unstable_TabList as TabList,
  Tab,
  unstable_TabPanels as TabPanels,
  unstable_TabPanel as TabPanel,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import { useState } from 'react';
import { Query } from '../Query';

const EXPORTS_QUERY = `
  query ExportsQuery($projectId: ID!, $workspaceId: ID!) {
    workspace(project: $projectId, workspace: $workspaceId) {
      package {
        react {
          exported
        }

        scss {
          exported
        }
      }
    }
  }
`;

function ExportsSection({ project, workspace }) {
  return (
    <Query
      fallback="Loading..."
      query={EXPORTS_QUERY}
      variables={{ projectId: project, workspaceId: workspace }}>
      {(data) => {
        return (
          <ExportsTabs
            project={project}
            workspace={{
              ...data.workspace,
              id: workspace,
            }}
          />
        );
      }}
    </Query>
  );
}

function ExportsTabs({ workspace, project }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sections = [
    {
      title: 'React',
      enabled: workspace.package.react.exported,
    },
    {
      title: 'Sass',
      enabled: workspace.package.scss.exported,
    },
  ];

  return (
    <Tabs
      onChange={({ selectedIndex }) => {
        setSelectedIndex(selectedIndex);
      }}>
      <TabList>
        <Tab>React</Tab>
        <Tab>Sass</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {selectedIndex === 0 ? (
            <ReactExports exported={workspace.package.react.exported} />
          ) : null}
        </TabPanel>
        <TabPanel>
          {selectedIndex === 1 ? (
            <SassExports
              exported={workspace.package.scss.exported}
              project={project}
              workspace={workspace.id}
            />
          ) : null}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function ReactExports({ exported }) {
  if (!exported) {
    return 'Not available';
  }
  return 'react';
}

const SASS_FILES_QUERY = `
  query SassFilesQuery($project: ID!, $workspace: ID!) {
    workspace(project: $project, workspace: $workspace) {
      package {
        scss {
          exported
          files {
            id
            filepath

            stats {
              size
              gzipSize

              rules {
                total
              }

              selectors {
                total
              }

              declarations {
                total
              }

              mediaQueries {
                total
              }
            }
          }
        }
      }
    }
  }

`;

function SassExports({ exported, project, workspace }) {
  if (!exported) {
    return 'Not available';
  }
  return (
    <Query
      fallback="Loading..."
      query={SASS_FILES_QUERY}
      variables={{ project, workspace }}>
      {({ workspace }) => {
        return (
          <>
            <h3>Files</h3>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Filepath</TableHeader>
                  <TableHeader>Gzip</TableHeader>
                  <TableHeader>Size</TableHeader>
                  <TableHeader>Rules</TableHeader>
                  <TableHeader>Selectors</TableHeader>
                  <TableHeader>Declarations</TableHeader>
                  <TableHeader>Media queries</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {workspace.package.scss.files
                  .sort((a, b) => {
                    return b.stats.gzipSize - a.stats.gzipSize;
                  })
                  .map((file) => {
                    return (
                      <TableRow key={file.id}>
                        <TableCell>{file.filepath}</TableCell>
                        <TableCell>
                          {formatBytes(file.stats.gzipSize)}
                        </TableCell>
                        <TableCell>{formatBytes(file.stats.size)}</TableCell>
                        <TableCell>{file.stats.rules.total}</TableCell>
                        <TableCell>{file.stats.selectors.total}</TableCell>
                        <TableCell>{file.stats.declarations.total}</TableCell>
                        <TableCell>{file.stats.mediaQueries.total}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </>
        );
      }}
    </Query>
  );
}

function formatBytes(value) {
  if (value < 1000) {
    return `${value} bytes`;
  }
  const formatted = parseInt(value / 1000, 0);
  return `${formatted} kB`;
}

export { ExportsSection };
