import './Grid-story.scss';
import React from 'react';
import { Grid, Row, Column } from './';
import mdx from './Grid.mdx';
import { FeatureFlags } from '../FeatureFlags';
import { Heading } from '../Heading';

export default {
  title: 'Components/Grid',
  component: Grid,
  subcomponents: {
    Row,
    Column,
  },
  decorators: [(storyFn) => <div id="templates">{storyFn()}</div>],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

function DemoContent({ children }) {
  return (
    <div className="outside">
      <div className="inside">{children}</div>
    </div>
  );
}

export const experimentalCSSGrid = () => (
  <FeatureFlags flags={{ 'enable-css-grid': true }}>
    <Heading>Wide</Heading>
    <Grid>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
      <Grid>
        <Column sm={2} md={4} lg={8}>
          Subgrid
        </Column>
        <Column sm={2} md={4} lg={8}>
          Subgrid
        </Column>
      </Grid>
    </Grid>

    <Heading>Narrow</Heading>
    <Grid narrow>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
    </Grid>

    <Heading>Condensed</Heading>
    <Grid condensed>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
      <Column sm={1} md={2} lg={4}>
        Column
      </Column>
    </Grid>
  </FeatureFlags>
);

export const autoColumns = () => (
  <Grid>
    <Row>
      <Column>
        <DemoContent>Span 25%</DemoContent>
      </Column>
      <Column>
        <DemoContent>Span 25%</DemoContent>
      </Column>
      <Column>
        <DemoContent>Span 25%</DemoContent>
      </Column>
      <Column>
        <DemoContent>Span 25%</DemoContent>
      </Column>
    </Row>
  </Grid>
);

export const responsiveGrid = () => (
  <Grid>
    <Row>
      <Column sm={2} md={4} lg={6}>
        <DemoContent>
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 6 of 12</p>
        </DemoContent>
      </Column>
      <Column sm={2} md={2} lg={3}>
        <DemoContent>
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 2 of 8</p>
          <p>Large: Span 3 of 12</p>
        </DemoContent>
      </Column>
      <Column sm={0} md={2} lg={3}>
        <DemoContent>
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 2 of 8</p>
          <p>Large: Span 3 of 12</p>
        </DemoContent>
      </Column>
    </Row>
  </Grid>
);

export const offset = () => (
  <Grid>
    <Row>
      <Column sm={{ span: 1, offset: 3 }}>
        <DemoContent>Small: offset 3</DemoContent>
      </Column>
      <Column sm={{ span: 2, offset: 2 }}>
        <DemoContent>Small: offset 2</DemoContent>
      </Column>
      <Column sm={{ span: 3, offset: 1 }}>
        <DemoContent>Small: offset 1</DemoContent>
      </Column>
      <Column sm={{ span: 4, offset: 0 }}>
        <DemoContent>Small: offset 0</DemoContent>
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

export const narrow = () => (
  <Grid narrow>
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

export const narrowColumns = () => (
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
    <Row narrow>
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

export const mixedGridModes = () => (
  <Grid>
    <Row>
      <Column>
        <DemoContent>Wide</DemoContent>
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
    <Row narrow>
      <Column>
        <DemoContent>Narrow</DemoContent>
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
        <DemoContent>Condensed</DemoContent>
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
