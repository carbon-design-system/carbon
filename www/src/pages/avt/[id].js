/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Grid,
  Column,
} from '@carbon/react';
import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import { Header } from '../../components/Header';
import { Text } from '../../components/Text';

export default function AVTReportPage({ report }) {
  console.log(report);
  return (
    <>
      <Header />
      <main>
        <Grid>
          <Column sm={4} md={8} lg={16}>
            <Text productive-heading-04 mt-8>
              <h1>{report.label}</h1>
            </Text>
            <div>
              <dl className="avt-report-summary">
                <dt>Violation</dt>
                <dd>{report.summary.counts.violation}</dd>
                <dt>Potential violation</dt>
                <dd>{report.summary.counts.potentialviolation}</dd>
                <dt>Recommendation</dt>
                <dd>{report.summary.counts.recommendation}</dd>
                <dt>Potential recommendation</dt>
                <dd>{report.summary.counts.potentialrecommendation}</dd>
                <dt>Manual</dt>
                <dd>{report.summary.counts.manual}</dd>
                <dt>Ignored</dt>
                <dd>{report.summary.counts.ignored}</dd>
              </dl>
            </div>
          </Column>
        </Grid>
        <Grid>
          <Column sm={4} md={8} lg={16}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Rule</TableHeader>
                  <TableHeader>Result</TableHeader>
                  <TableHeader>Description</TableHeader>
                  <TableHeader>Path</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {report.results.map((result) => {
                  return (
                    <TableRow key={`${result.ruleId}:${result.path.dom}`}>
                      <TableCell>{result.ruleId}</TableCell>
                      <TableCell>{result.level}</TableCell>
                      <TableCell>{result.message}</TableCell>
                      <TableCell>{result.path.dom}</TableCell>
                    </TableRow>
                  );
                })}
                {Object.entries(report.nls).map(([key, value]) => {
                  return (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value.Pass_0}</TableCell>
                      <TableCell>{value[0]}</TableCell>
                      <TableCell></TableCell>
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

export async function getStaticProps({ params }) {
  const REPORTS_DIR = path.resolve(process.cwd(), '..', '.avt', 'reports');
  const reports = await fs.readdir(REPORTS_DIR);
  const filepath = reports.find((filepath) => {
    return path.basename(filepath, '.json') === params.id;
  });

  if (!filepath) {
    throw new Error(`Unable to find report for ${params.id}`);
  }

  const contents = await fs.readFile(path.join(REPORTS_DIR, filepath), 'utf8');
  const json = JSON.parse(contents);

  return {
    props: {
      report: json,
    },
  };
}

export async function getStaticPaths() {
  const REPORTS_DIR = path.resolve(process.cwd(), '..', '.avt', 'reports');
  const files = await fs.readdir(REPORTS_DIR);

  return {
    fallback: false,
    paths: files.map((filename) => {
      return {
        params: {
          id: path.basename(filename, '.json'),
        },
      };
    }),
  };
}
