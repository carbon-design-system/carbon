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
import Link from '../../components/Link';

export default function AVTIndexPage({ reports }) {
  return (
    <>
      <Header />
      <main>
        <Grid>
          <Column sm={4} md={8} lg={16}>
            <Text productive-heading-04 mt-8>
              <h1>AVT ({reports.length})</h1>
            </Text>
          </Column>
        </Grid>
        <Grid>
          <Column sm={4} md={8} lg={16}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Report</TableHeader>
                  <TableHeader>Violation</TableHeader>
                  <TableHeader>Potential violation</TableHeader>
                  <TableHeader>Recommendation</TableHeader>
                  <TableHeader>Potential recommendation</TableHeader>
                  <TableHeader>Manual</TableHeader>
                  <TableHeader>Ignored</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => {
                  return (
                    <TableRow key={report.label}>
                      <TableCell>
                        <Link href={`/avt/${report.label}`}>
                          {report.label}
                        </Link>
                      </TableCell>
                      <TableCell>{report.summary.counts.violation}</TableCell>
                      <TableCell>
                        {report.summary.counts.potentialviolation}
                      </TableCell>
                      <TableCell>
                        {report.summary.counts.recommendation}
                      </TableCell>
                      <TableCell>
                        {report.summary.counts.potentialrecommendation}
                      </TableCell>
                      <TableCell>{report.summary.counts.manual}</TableCell>
                      <TableCell>{report.summary.counts.ignored}</TableCell>
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
  const REPORTS_DIR = path.resolve(process.cwd(), '..', '.avt', 'reports');
  const files = await fs.readdir(REPORTS_DIR).then((files) => {
    return files.map((basename) => {
      return path.join(REPORTS_DIR, basename);
    });
  });
  const reports = await Promise.all(
    files.map(async (filepath) => {
      const contents = await fs.readFile(filepath, 'utf8');
      const json = JSON.parse(contents);
      return json;
    })
  );

  return {
    props: {
      reports: reports.map((report) => {
        return {
          id: report.scanID,
          label: report.label,
          summary: {
            counts: report.summary.counts,
            reportLevels: report.summary.reportLevels,
          },
          results: report.results.map((result) => {
            return {
              id: result.ruleId,
              ignored: result.ignored,
              message: result.message,
              level: result.level,
            };
          }),
        };
      }),
    },
  };
}
