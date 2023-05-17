/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Grid,
  Column,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@carbon/react';
import Link from 'next/link';

function WorkspaceList({ workspaces }) {
  return (
    <Grid condensed>
      <Column sm={4} md={8} lg={16}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Package</TableHeader>
              <TableHeader>Exports</TableHeader>
              <TableHeader>Version</TableHeader>
              <TableHeader>Directory</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {workspaces.map((workspace) => {
              return (
                <TableRow key={workspace.id}>
                  <TableCell>
                    <Link href={`/packages/${workspace.id}`}>
                      <a>{workspace.name}</a>
                    </Link>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{workspace.version}</TableCell>
                  <TableCell>{workspace.directory}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Column>
    </Grid>
  );
}

export { WorkspaceList };
