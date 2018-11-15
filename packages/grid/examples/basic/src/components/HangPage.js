import React from 'react';
import { Grid, Row, Column } from './Grid';
import Main from './Main';
import ExampleContent from './ExampleContent';

export default function HangPage() {
  return (
    <Main>
      <Grid padding hang>
        <Row>
          <Column breakpoint="md" span={4}>
            <h1>Hang example</h1>
            <p>
              This examples hows how to apply the <code>.bx--grid--hang</code>{' '}
              class in order to drop the left gutter for a specific grid
              context. This example also includes the gutter from the grid.
            </p>
          </Column>
        </Row>
        <ExampleContent />
      </Grid>
    </Main>
  );
}
