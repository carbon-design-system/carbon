import React from 'react';
import { Grid, Row, Column } from './Grid';
import Main from './Main';
import ExampleContent from './ExampleContent';

export default function CondensedPage() {
  return (
    <Main>
      <Grid condensed padding>
        <Row>
          <Column breakpoint="md" span={4}>
            <h1>Condensed example</h1>
            <p>
              This examples hows how to apply the <code>.bx--grid--bleed</code>{' '}
              class to collapse the gutters on each of the columns in the grid
              context. We also apply <code>.bx--grid--padding</code> so that the
              contents of each column have a set padding amount.
            </p>
          </Column>
        </Row>
        <ExampleContent />
      </Grid>
    </Main>
  );
}
