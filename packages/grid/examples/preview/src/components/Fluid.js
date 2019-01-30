import React from 'react';
import { Grid, Row, Column } from './Grid';
import Main from './Main';
import ExampleContent from './ExampleContent';

export default function BasicUsage() {
  return (
    <Main>
      <div class="bx--fluid-grid">
        <Row>
          <Column breakpoint="md" span={4}>
            <h1>Fluid example</h1>
            <p>
              This example showcases the percentage based container and how it
              behaves responsively before maxing out at the largest breakpoint.
            </p>
          </Column>
        </Row>
        <ExampleContent />
      </div>
    </Main>
  );
}
