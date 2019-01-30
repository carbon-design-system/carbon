import React from 'react';
import { Grid, Row, Column } from './Grid';
import Main from './Main';

function createOffset({ breakpoint, total, offset }) {
  return (
    <Column offset={offset} breakpoint={breakpoint} span={total - offset}>
      <div className="outside">
        <div className="inside">{total - offset}</div>
      </div>
    </Column>
  );
}

const total = 16;

export default function OffsetPage() {
  return (
    <Main>
      <Grid>
        <Row>
          <Column breakpoint="md" span={4}>
            <h1>Offset example</h1>
            <p>This example shows how to leverage offset classes.</p>
          </Column>
        </Row>
        <Row>
          <div className="bx--col">
            <div className="outside">
              <div className="inside">1</div>
            </div>
          </div>
          <div className="bx--col">
            <div className="outside">
              <div className="inside">2</div>
            </div>
          </div>
        </Row>
        {Array.from({ length: total - 1 }, (_, i) => (
          <Row key={i}>
            {createOffset({
              breakpoint: 'lg',
              offset: total - (i + 1),
              total,
            })}
          </Row>
        ))}
      </Grid>
    </Main>
  );
}
