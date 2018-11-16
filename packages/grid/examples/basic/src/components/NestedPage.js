import React from 'react';
import { Grid, Row, Column } from './Grid';
import Main from './Main';

export default function NestedPage() {
  return (
    <Main>
      <Grid>
        <Row>
          <Column breakpoint="md" span={4}>
            <h1>Nested example</h1>
            <p>
              This example shows that we can nest rows inside of existing
              columns in order to continue using our grid layout.
            </p>
          </Column>
        </Row>
        <Row>
          <Column breakpoint="lg" span={8}>
            <div className="outside">
              <div className="inside">8</div>
            </div>
            <Row>
              <Column breakpoint="lg" span={8}>
                <div className="outside">
                  <div className="inside">4</div>
                </div>
              </Column>
              <Column breakpoint="lg" span={8}>
                <div className="outside">
                  <div className="inside">4</div>
                </div>
              </Column>
            </Row>
          </Column>
        </Row>
      </Grid>
    </Main>
  );
}
