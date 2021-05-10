/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid, Column } from '../Grid';

export default {
  title: 'Components/Grid',
  component: Grid,
  subcomponents: {
    Column,
  },
};

export const Default = () => (
  <Grid>
    <Column>Example</Column>
  </Grid>
);
