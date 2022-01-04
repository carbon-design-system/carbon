/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Grid,
  Column,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import Link from 'next/link';
import path from 'path';
import * as Project from '../../project';
import { Header } from '../../components/Header';
import { Text } from '../../components/Text';

export default function WorkspacesPage({ workspaces }) {
  return (
    <>
      <Header />
      <main>
        <Grid>
          <Column sm={4} md={8} lg={16}>
            <Text productive-heading-03 mt-8 mb-6>
              <h1>Workspaces</h1>
            </Text>
          </Column>
        </Grid>
        <Grid>
          <Column sm={4} md={8} lg={16}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Directory</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {workspaces.map((workspace) => {
                  return (
                    <TableRow key={workspace.id}>
                      <TableCell>
                        <Link href={`/workspaces/${workspace.id}`}>
                          <a>{workspace.name}</a>
                        </Link>
                      </TableCell>
                      <TableCell>{workspace.directory}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Column>
        </Grid>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const project = await Project.get();
  const workspaces = project.workspaces.map((workspace) => {
    return {
      id: workspace.id,
      name: workspace.name,
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
