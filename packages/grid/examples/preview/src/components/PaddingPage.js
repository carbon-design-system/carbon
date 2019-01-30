import React from 'react';
import { Grid, Row, Column } from './Grid';
import Main from './Main';
import ExampleContent from './ExampleContent';

export default function PaddingPage() {
  return (
    <Main>
      <Grid padding>
        <Row>
          <Column breakpoint="md" span={4}>
            <h1>Padding example</h1>
            <p>
              This examples hows how to apply the{' '}
              <code>.bx--grid--padding</code> class to add padding to the
              contents of each column. This example also includes the gutter
              from the grid.
            </p>
          </Column>
        </Row>
        <ExampleContent />
      </Grid>
    </Main>
  );
}
