/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid, Column } from '@carbon/react';
import React from 'react';
import { Header } from '../components/Header';
import { Text } from '../components/Text';

export default function IndexPage() {
  return (
    <>
      <Header />
      <main>
        <Grid>
          <Column sm={4} md={8} lg={16}>
            <Text productive-heading-04 mt-8>
              <h1>Carbon Design System</h1>
            </Text>
          </Column>
        </Grid>
      </main>
    </>
  );
}
