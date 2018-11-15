import React from 'react';
import { Grid, Row, Column } from './Grid';
import Main from './Main';
import ExampleContent from './ExampleContent';

export default function BleedPage() {
  return (
    <Main>
      <Grid bleed padding>
        <Row>
          <Column breakpoint="md" span={4}>
            <h1>Bleed example</h1>
            <p>
              This example shows how to apply the <code>.bx--grid--bleed</code>{' '}
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
