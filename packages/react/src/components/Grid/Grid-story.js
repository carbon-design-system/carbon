import './Grid-story.scss';
import React from 'react';
import { Grid, Row, Column } from './';

export default {
  decorators: [storyFn => <div id="templates">{storyFn()}</div>],
  title: 'Grid',
};

function DemoContent({ children }) {
  return (
    <div className="outside">
      <div className="inside">{children}</div>
    </div>
  );
}

export const autoColumns = () => (
  <Grid>
    <Row>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
    </Row>
  </Grid>
);

export const responsiveGrid = () => (
  <Grid>
    <Row>
      <Column sm={1} md={4} lg={8}>
        <DemoContent>sm: 1/4, md: 1/2, lg: 2/3</DemoContent>
      </Column>
      <Column sm={1} md={2} lg={2}>
        <DemoContent>sm: 1/4, md: 1/4, lg: 1/6</DemoContent>
      </Column>
      <Column sm={1} md={1} lg={1}>
        <DemoContent>sm: 1/4, md: 1/8, lg: 1/12</DemoContent>
      </Column>
      <Column sm={1} md={1} lg={1}>
        <DemoContent>sm: 1/4, md: 1/8, lg: 1/12</DemoContent>
      </Column>
    </Row>
  </Grid>
);

export const offset = () => (
  <Grid>
    <Row>
      <Column sm={{ span: 1, offset: 3 }}>
        <DemoContent>Small Screen Offset 3</DemoContent>
      </Column>
      <Column sm={{ span: 2, offset: 2 }}>
        <DemoContent>Small Screen Offset 2</DemoContent>
      </Column>
      <Column sm={{ span: 3, offset: 1 }}>
        <DemoContent>Small Screen Offset 1</DemoContent>
      </Column>
      <Column sm={{ span: 4, offset: 0 }}>
        <DemoContent>Small Screen Offset 0</DemoContent>
      </Column>
    </Row>
  </Grid>
);

export const condensed = () => (
  <Grid condensed>
    <Row>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
    </Row>
  </Grid>
);

export const condensedColumns = () => (
  <Grid>
    <Row>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
    </Row>
    <Row condensed>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
    </Row>
    <Row>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
    </Row>
  </Grid>
);

export const fullWidth = () => (
  <Grid fullWidth>
    <Row>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
      <Column>
        <DemoContent>1/4</DemoContent>
      </Column>
    </Row>
  </Grid>
);
