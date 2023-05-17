/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Grid,
  Column,
  Heading,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import { Caution, Warning } from '@carbon/react/icons';
import { parseISO, format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import { getIssueStatistics, getEnabledRepos } from '../../../github';
import { Header } from '../../../components/Header';
import { Text } from '../../../components/Text';
import { Box } from '../../../components/Box';
import { Flex } from '../../../components/Flex';

export default function InsightPage(props) {
  const router = useRouter();

  if (router.query.owner && router.query.repo) {
    const { issues, sprints, statistics } = props;
    return (
      <>
        <Header />
        <main>
          <Grid>
            <Column sm={4} md={4} lg={12}>
              <Box mb-6>
                <div>
                  <Grid>
                    <Column sm={4} md={8} lg={16}>
                      <Text mt-8 productive-heading-03>
                        <Heading>{router.query.repo}</Heading>
                      </Text>
                    </Column>
                  </Grid>
                </div>
              </Box>
              <Box mb-8>
                <div>
                  <Grid>
                    <Column sm={4} md={4} lg={4}>
                      <Stack>
                        <Text body-short-01>Open issues</Text>
                        <Text body-short-02>{issues.open}</Text>
                      </Stack>
                    </Column>
                    <Column sm={4} md={4} lg={4}>
                      <Stack>
                        <Text body-short-01>Issues closed per sprint</Text>
                        <Text body-short-02>
                          {statistics.issues_closed_per_sprint.median}
                        </Text>
                      </Stack>
                    </Column>
                    <Column sm={4} md={4} lg={4}>
                      <Stack>
                        <Text body-short-01>Issues created per sprint</Text>
                        <Text body-short-02>
                          {statistics.issues_created_per_sprint.median}
                        </Text>
                      </Stack>
                    </Column>
                  </Grid>
                </div>
              </Box>
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Period</TableHeader>
                      <TableHeader>Open issues</TableHeader>
                      <TableHeader>Issues closed</TableHeader>
                      <TableHeader>Issues created</TableHeader>
                      <TableHeader>Change</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sprints.map((sprint) => {
                      const start = parseISO(sprint.start);
                      const end = parseISO(sprint.end);

                      function formatChange(change) {
                        if (change) {
                          const symbol = change.type === 'increase' ? '+' : '';
                          return `(${symbol}${change.value})`;
                        }
                        return '';
                      }

                      const stddevs = {
                        closed:
                          Math.abs(
                            statistics.issues_closed_per_sprint.mean -
                              sprint.issues.states.closed.total
                          ) / statistics.issues_closed_per_sprint.stddev,
                        created:
                          Math.abs(
                            statistics.issues_created_per_sprint.mean -
                              sprint.issues.states.created.total
                          ) / statistics.issues_created_per_sprint.stddev,
                      };
                      const closedStyle = {};
                      const createdStyle = {};
                      let createdLabel = null;
                      let closedLabel = null;

                      if (stddevs.created >= 2) {
                        createdStyle.background = 'red';
                        createdStyle.color = 'black';
                        createdLabel = <Warning />;
                      } else if (stddevs.created >= 1) {
                        createdStyle.background = 'yellow';
                        createdStyle.color = 'black';
                        createdLabel = <Caution />;
                      }

                      if (stddevs.closed >= 2) {
                        closedStyle.background = 'red';
                        closedStyle.color = 'black';
                        closedLabel = <Warning />;
                      } else if (stddevs.closed >= 1) {
                        closedStyle.background = 'yellow';
                        closedStyle.color = 'black';
                        closedLabel = <Caution />;
                      }

                      const delta =
                        sprint.issues.states.created.total -
                        sprint.issues.states.closed.total;

                      return (
                        <TableRow key={sprint.start}>
                          <TableCell>
                            {format(start, 'MMMM do')} -{' '}
                            {format(end, 'MMMM do')}
                          </TableCell>
                          <TableCell>
                            <span>
                              {sprint.issues.states.open.total}{' '}
                              {formatChange(sprint.issues.states.open.change)}
                            </span>
                          </TableCell>
                          {/* eslint-disable-next-line react/forbid-component-props */}
                          <TableCell style={closedStyle}>
                            <Flex align-center justify-between gap-x-5>
                              <span>
                                {sprint.issues.states.closed.total}{' '}
                                {formatChange(
                                  sprint.issues.states.closed.change
                                )}
                              </span>
                              {closedLabel}
                            </Flex>
                          </TableCell>
                          {/* eslint-disable-next-line react/forbid-component-props */}
                          <TableCell style={createdStyle}>
                            <Flex align-center justify-between gap-x-5>
                              <span>
                                {sprint.issues.states.created.total}{' '}
                                {formatChange(
                                  sprint.issues.states.created.change
                                )}
                              </span>
                              {createdLabel}
                            </Flex>
                          </TableCell>
                          <TableCell>
                            <span>{`${delta > 0 ? '+' : ''}${delta}`}</span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Column>
            <Column sm={4} md={4} lg={4}>
              <Text mt-8 productive-heading-02 mb-3>
                <Heading>Labels</Heading>
              </Text>
              <Stack as="ol" gap={2}>
                {issues.labels.map((label) => {
                  return (
                    <li key={label.name}>
                      <span>
                        {label.percent} {label.name}
                      </span>
                    </li>
                  );
                })}
              </Stack>
            </Column>
          </Grid>
        </main>
      </>
    );
  }

  return 'Loading...';
}

export async function getStaticProps({ params }) {
  const { owner, repo } = params;
  const statistics = await getIssueStatistics(owner, repo);

  return {
    props: {
      ...statistics,
    },
  };
}

export async function getStaticPaths() {
  const paths = getEnabledRepos().map(({ owner, repo }) => {
    return {
      params: {
        owner,
        repo,
      },
    };
  });

  return {
    fallback: false,
    paths,
  };
}
