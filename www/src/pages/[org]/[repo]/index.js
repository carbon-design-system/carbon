/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@carbon/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Project } from '../../../project';

export default function ProjectPage(props) {
  const router = useRouter();
  const { org, repo } = router.query;

  if (org === undefined || repo === undefined) {
    return null;
  }

  const { workspaces } = props;

  return (
    <>
      <main>
        <h1>
          {org} {repo}
        </h1>
        <section>
          <h2>Workspaces</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Version</TableHeader>
                <TableHeader>Public</TableHeader>
                <TableHeader>Directory</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {workspaces.map((workspace) => {
                return (
                  <TableRow key={workspace.id}>
                    <TableCell>
                      <Link href={`/${org}/${repo}/w/${workspace.id}`}>
                        <a>{workspace.name}</a>
                      </Link>
                    </TableCell>
                    <TableCell>{workspace.version}</TableCell>
                    <TableCell>{workspace.private ? '—' : 'Yes'}</TableCell>
                    <TableCell>{workspace.directory}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const projects = await Project.all();
  const paths = projects.map((project) => {
    return {
      params: {
        org: project.org,
        repo: project.repo,
      },
    };
  });

  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({ params }) {
  const { org, repo } = params;
  const project = await Project.find({
    org,
    repo,
  });
  const workspaces = await Project.getProjectWorkspaces(project.id);
  return {
    props: {
      project,
      workspaces: workspaces.map((workspace) => {
        return {
          description: workspace.description,
          directory: workspace.directory,
          id: workspace.id,
          name: workspace.name,
          private: workspace.private,
          version: workspace.version,
        };
      }),
    },
  };
}
