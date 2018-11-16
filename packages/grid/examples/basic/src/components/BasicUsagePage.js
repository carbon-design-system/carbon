import React from 'react';
import { Grid, Row, Column } from './Grid';
import Main from './Main';
import ExampleContent from './ExampleContent';

export default function BasicUsage() {
  return (
    <Main>
      <Grid>
        <Row>
          <Column breakpoint="md" span={4}>
            <h1>Basic example</h1>
            <p>
              This example looks to showcase each of our breakpoints and how
              they behave responsively.
            </p>
          </Column>
        </Row>
        <ExampleContent />
      </Grid>
    </Main>
  );
}
