/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid, Column, Stack } from '@carbon/react';
import { Header } from '../../../components/Header';
import { Text } from '../../../components/Text';
import * as Project from '../../../project';

export default function PackagePage({ package: pkg }) {
  return (
    <>
      <Header />
      <main>
        <Stack gap={6}>
          <div>
            <Grid>
              <Column sm={4} md={8} lg={16}>
                <Text productive-heading-03 mt-8>
                  <h1>
                    <code>{pkg.name}</code>
                  </h1>
                </Text>
              </Column>
            </Grid>
          </div>
        </Stack>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { package: id } = params;
  const project = await Project.get();
  const workspace = project.findWorkspaceById(id);

  return {
    props: {
      package: {
        id: workspace.id,
        directory: workspace.directory,
        name: workspace.name,
        version: workspace.version,
      },
    },
  };
}

export async function getStaticPaths() {
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
      };
    });
  const paths = workspaces.map((workspace) => {
    return {
      params: {
        package: workspace.id,
      },
    };
  });

  return {
    fallback: false,
    paths,
  };
}
