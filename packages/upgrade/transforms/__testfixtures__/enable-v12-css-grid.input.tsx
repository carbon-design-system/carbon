/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Grid, Column } from '@carbon/react';

// Test 1: Basic Grid
function Test1() {
  return (
    <Grid>
      <Column lg={4}>Content</Column>
    </Grid>
  );
}

// Test 2: Grid with props
function Test2() {
  return (
    <Grid condensed narrow>
      <Column lg={8}>Content</Column>
    </Grid>
  );
}

// Test 3: Already has noRowGap
function Test3() {
  return (
    <Grid noRowGap={false}>
      <Column lg={4}>Content</Column>
    </Grid>
  );
}

// Test 4: Nested Grids
function Test4() {
  return (
    <Grid>
      <Column lg={8}>
        <Grid>
          <Column lg={4}>Nested</Column>
        </Grid>
      </Column>
    </Grid>
  );
}

// Made with Bob
