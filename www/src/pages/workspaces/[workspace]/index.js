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
import path from 'path';
import * as Project from '../../../project';
import { Box } from '../../../components/Box';
import { Header } from '../../../components/Header';
import { Text } from '../../../components/Text';

export default function WorkspacePage({ workspace }) {
  const files = new Map();

  for (const file of workspace.files) {
    files.set(file.id, file);
  }

  return (
    <>
      <Header />
      <main>
        <Grid>
          <Column sm={4} md={8} lg={16}>
            <Box mt-8 mb-6>
              <Text body-short-01>Workspace</Text>
              <Text productive-heading-03>
                <h1>{workspace.name}</h1>
              </Text>
            </Box>
          </Column>
        </Grid>
        <Grid as="section">
          <Column sm={4} md={8} lg={16}>
            <Text productive-heading-03>
              <h2>Files ({workspace.files.length})</h2>
            </Text>
          </Column>
          <Column sm={4} md={8} lg={16}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Filepath</TableHeader>
                  <TableHeader>Imports</TableHeader>
                  <TableHeader>Exports</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {workspace.files.map((file) => {
                  return (
                    <TableRow key={file.id}>
                      <TableCell>{file.filepath}</TableCell>
                      <TableCell>{file.imports.length}</TableCell>
                      <TableCell>{file.exports.length}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Column>
        </Grid>
        <Grid as="section">
          <Column sm={4} md={8} lg={16}>
            <Text productive-heading-03>
              <h2>Exports ({workspace.exports.length})</h2>
            </Text>
          </Column>
          <Column sm={4} md={8} lg={16}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Export</TableHeader>
                  <TableHeader>File</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {workspace.exports.map((exp) => {
                  const file = files.get(exp.file);
                  return (
                    <TableRow key={exp.id}>
                      <TableCell>{exp.name}</TableCell>
                      <TableCell>{file.filepath}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Column>
        </Grid>
        <Grid as="section">
          <Column sm={4} md={8} lg={16}>
            <Text productive-heading-03>
              <h2>Checklist</h2>
            </Text>
            <ul>
              <li>
                <span>Exports</span>
                <ul>
                  <li>main</li>
                  <li>module</li>
                  <li>exports</li>
                </ul>
              </li>
              <li>
                <span>Package</span>
                <ul>
                  <li>Homepage</li>
                  <li>Repo</li>
                  <li>Bugs</li>
                  <li>License</li>
                  <li>Description</li>
                  <li>Files</li>
                  <li>Keywords</li>
                  <li>Side Effects</li>
                </ul>
              </li>
            </ul>
          </Column>
        </Grid>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const project = await Project.get();
  const workspace = project.findWorkspaceById(params.workspace);
  const files = await workspace.getFiles().then((files) => {
    return files.map((file) => {
      return {
        id: file.id,
        filepath: path.relative(workspace.directory, file.filepath),
        imports: Array.from(file.imports),
        exports: Array.from(file.exports),
      };
    });
  });

  const exports = [];
  for (const file of files) {
    for (const name of file.exports) {
      const id = `${file.id}#${name}`;
      exports.push({
        id,
        name,
        file: file.id,
      });
    }
  }

  return {
    props: {
      workspace: {
        id: workspace.id,
        name: workspace.name,
        files,
        exports,
      },
    },
  };
}

export async function getStaticPaths() {
  const project = await Project.get();
  const paths = project.workspaces.map((workspace) => {
    return {
      params: {
        workspace: workspace.id,
      },
    };
  });

  return {
    fallback: false,
    paths,
  };
}
