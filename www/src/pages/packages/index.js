/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid, Column, Stack } from '@carbon/react';
import path from 'path';
import React from 'react';
import * as Project from '../../project';
import { Text } from '../../components/Text';
import { Header } from '../../components/Header';
import { WorkspaceList } from '../../components/WorkspaceList';

export default function PackagesPage({ workspaces }) {
  return (
    <>
      <Header />
      <Stack as="main" gap={8}>
        <div>
          <Grid>
            <Column sm={4} md={8} lg={16}>
              <Text productive-heading-04 mt-8>
                <h1>Packages</h1>
              </Text>
            </Column>
          </Grid>
        </div>
        <section>
          <WorkspaceList workspaces={workspaces} />
        </section>
      </Stack>
    </>
  );
}

export async function getStaticProps() {
  const project = await Project.get();
  const workspaces = project.workspaces
    .filter((workspace) => {
      if (workspace.name === 'www') {
        return false;
      }
      return workspace.directory !== project.directory;
    })
    .map((workspace) => {
      return {
        id: workspace.id,
        name: workspace.name,
        version: workspace.version,
        directory: path.relative(project.directory, workspace.directory),
      };
    });

  workspaces.sort((a, b) => {
    if (a.name.startsWith('@') && b.name.startsWith('@')) {
      return a.name.localeCompare(b.name);
    }

    if (a.name.startsWith('@')) {
      return -1;
    }

    if (b.name.startsWith('@')) {
      return 1;
    }

    return a.name.localeCompare(b.name);
  });

  return {
    props: {
      workspaces,
    },
  };
}
