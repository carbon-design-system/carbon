/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  Column,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Tag,
} from '@carbon/react';
import React from 'react';
import Link from 'next/link';
import { Box } from '../../../components/Box';
import { Flex } from '../../../components/Flex';
import { Header } from '../../../components/Header';
import { Text } from '../../../components/Text';
import * as Project from '../../../project';
import { npm } from '../../../npm';

const formatter = new Intl.NumberFormat();

function hasNoExports(exports) {
  return Object.values(exports).every((value) => {
    return value.length === 0;
  });
}

export default function PackagePage({ downloads, pkg, exports }) {
  return (
    <>
      <Header />
      <main>
        <Stack gap={6}>
          <div>
            <Grid>
              <Column sm={4} md={6} lg={12}>
                <Box mt-7 mb-8>
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <Link href="/packages">
                        <a>Packages</a>
                      </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>{pkg.name}</BreadcrumbItem>
                  </Breadcrumb>
                </Box>
                {hasNoExports(exports) ? (
                  <Text body-short-02>
                    <p>No exports available</p>
                  </Text>
                ) : null}
                {Array.isArray(exports.react) && exports.react.length > 0 ? (
                  <Flex as="section" col gap-y-5>
                    <Text productive-heading-03>
                      <h2>Components ({exports.react.length})</h2>
                    </Text>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableHeader>Component</TableHeader>
                          <TableHeader>Type</TableHeader>
                          <TableHeader>Props</TableHeader>
                          <TableHeader>Location</TableHeader>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {exports.react
                          .sort((a, b) => {
                            return a.name.localeCompare(b.name);
                          })
                          .map((component) => {
                            return (
                              <TableRow key={component.id}>
                                <TableCell>
                                  <Link
                                    href={`/packages/${pkg.id}/components/${component.id}`}>
                                    <a>{component.name}</a>
                                  </Link>
                                </TableCell>
                                <TableCell>
                                  {component.type === 'class' ? (
                                    <Tag type="magenta">class</Tag>
                                  ) : (
                                    <Tag>FC</Tag>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {component.properties.length}
                                </TableCell>
                                <TableCell>{component.filepath}</TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </Flex>
                ) : null}
              </Column>
              <Column sm={0} md={2} lg={4}>
                <Flex col gap-y-5 mt-8>
                  {pkg.description ? (
                    <div>
                      <Text body-short-01>
                        <p>About</p>
                      </Text>
                      <Text body-long-02>
                        <p>{pkg.description}</p>
                      </Text>
                    </div>
                  ) : null}
                  {pkg.version ? (
                    <div>
                      <Text body-short-01>
                        <p>Version</p>
                      </Text>
                      <Text body-short-02>
                        <p>v{pkg.version}</p>
                      </Text>
                    </div>
                  ) : null}
                </Flex>
                <Flex as="article" col gap-5 mt-8>
                  <header>Downloads</header>
                  <dl>
                    {downloads.map(({ period, downloads }) => {
                      const formatted = {
                        lastDay: 'Last day',
                        lastWeek: 'Last week',
                        lastMonth: 'Last month',
                      };
                      return (
                        <React.Fragment key={period}>
                          <dt>
                            <Text body-short-01>{formatted[period]}</Text>
                          </dt>
                          <Box mb-4>
                            <dd>
                              <Text body-short-02>
                                {formatter.format(downloads)}
                              </Text>
                            </dd>
                          </Box>
                        </React.Fragment>
                      );
                    })}
                  </dl>
                </Flex>
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
  const props = {
    pkg: {
      id: workspace.id,
      directory: workspace.directory,
      name: workspace.name,
      version: workspace.version,
    },
    downloads: [],
  };
  const description = await workspace.getPackageField('description');

  if (description) {
    props.pkg.description = description;
  }

  const isPrivate = await workspace.getPackageField('private');
  if (!isPrivate) {
    const downloads = await Promise.all(
      ['lastDay', 'lastWeek', 'lastMonth'].map(async (period) => {
        const result = await npm.downloads[period](workspace.name);
        return {
          period,
          downloads: result.downloads,
        };
      })
    );
    props.downloads = downloads;
  }

  props.exports = await workspace.getPackageExports();

  return {
    props,
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
