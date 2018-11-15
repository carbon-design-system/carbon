import React from 'react';
import { Grid, Row, Column } from './Grid';
import Main from './Main';

function RatioObject() {
  return (
    <div className="bx--aspect-ratio--object">
      <div
        style={{
          backgroundColor: '#3d3d3d',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

export default function AspectRatioPage() {
  return (
    <Main>
      <Grid condensed>
        <Row>
          <Column breakpoint="md" span={4}>
            <h1>Aspect ratio example</h1>
            <p>
              This examples shows how we can set multiple aspect ratios on
              objects on the page. We support a number of aspect ratios, namely
              1x1, 4x3, and 16x9.
            </p>
          </Column>
        </Row>
        <Row>
          <Column auto>
            <h2>1x1</h2>
          </Column>
        </Row>
        <Row>
          <Column auto>
            <div className="bx--aspect-ratio bx--aspect-ratio--align bx--aspect-ratio--1x1">
              <RatioObject />
            </div>
          </Column>
          <Column auto>
            <Row>
              <Column auto>
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <RatioObject />
                </div>
              </Column>
              <Column auto>
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <RatioObject />
                </div>
              </Column>
            </Row>
            <Row condensed>
              <Column auto>
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <RatioObject />
                </div>
              </Column>
              <Column auto>
                <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
                  <RatioObject />
                </div>
              </Column>
            </Row>
          </Column>
        </Row>
        <Row>
          <Column auto>
            <h2>4x3</h2>
          </Column>
        </Row>
        <Row>
          <Column auto>
            <div className="bx--aspect-ratio bx--aspect-ratio--align bx--aspect-ratio--4x3">
              <RatioObject />
            </div>
          </Column>
          <Column auto>
            <Row>
              <Column auto>
                <div className="bx--aspect-ratio bx--aspect-ratio--4x3">
                  <RatioObject />
                </div>
              </Column>
              <Column auto>
                <div className="bx--aspect-ratio bx--aspect-ratio--4x3">
                  <RatioObject />
                </div>
              </Column>
            </Row>
            <Row condensed>
              <Column auto>
                <div className="bx--aspect-ratio bx--aspect-ratio--4x3">
                  <RatioObject />
                </div>
              </Column>
              <Column auto>
                <div className="bx--aspect-ratio bx--aspect-ratio--4x3">
                  <RatioObject />
                </div>
              </Column>
            </Row>
          </Column>
        </Row>
        <Row>
          <Column auto>
            <h2>16x9</h2>
          </Column>
        </Row>
        {Array.from({ length: 2 }, (_, i) => (
          <Row key={i} condensed>
            <Column breakpoint="md" span={2}>
              <div className="bx--aspect-ratio bx--aspect-ratio--16x9">
                <RatioObject />
              </div>
            </Column>
            <Column breakpoint="md" span={2}>
              <div className="bx--aspect-ratio bx--aspect-ratio--16x9">
                <RatioObject />
              </div>
            </Column>
            <Column breakpoint="md" span={2}>
              <div className="bx--aspect-ratio bx--aspect-ratio--16x9">
                <RatioObject />
              </div>
            </Column>
            <Column breakpoint="md" span={2}>
              <div className="bx--aspect-ratio bx--aspect-ratio--16x9">
                <RatioObject />
              </div>
            </Column>
          </Row>
        ))}
      </Grid>
    </Main>
  );
}
