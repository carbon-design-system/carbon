/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid, Column } from 'carbon-components-react/es/components/Grid';
import React from 'react';
import mdx from './Grid.mdx';

export default {
  title: 'Components/Grid',
  component: Grid,
  subcomponents: {
    Column,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <Grid>
      <Column>Example</Column>
    </Grid>
  );
};
