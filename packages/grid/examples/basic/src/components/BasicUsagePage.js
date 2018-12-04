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
        <Row>
          <Column breakpoint="md" span={4}>
            <h2>Mixed</h2>
          </Column>
        </Row>
        <Row>
          <div className="bx--col-sm-3 bx--col-md-5 bx--col-lg-7 bx--col-xlg-9 bx--col-max-15">
            <div className="outside">
              <div className="inside">
                <p>Span 3 columns at Small</p>
                <p>Span 5 columns at Medium</p>
                <p>Span 7 columns at Large</p>
                <p>Span 9 columns at X-Large</p>
                <p>Span 15 columns at Max</p>
              </div>
            </div>
          </div>
        </Row>
      </Grid>
    </Main>
  );
}
