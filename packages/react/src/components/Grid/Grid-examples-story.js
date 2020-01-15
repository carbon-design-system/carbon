import React from 'react';
import { Grid } from './Grid';

import './_Grid-story.scss';

export default {
  decorators: [storyFn => <div id="templates">{storyFn()}</div>],
  title: 'Grid/Templates',
};

// const colors = () => ({
//   cell: color('cell (blue 10)', blue[10], 'colors'),
//   margin: color('margin (blue 20)', blue[20], 'colors'),
//   dividers: color('dividers (blue 40)', blue[40], 'colors'),
//   padding: color('padding (blue 40)', blue[40], 'colors'),
//   bleed: color('bleed (gray 100)', gray[100], 'colors'),
// });

function DemoContent({ children }) {
  return (
    <div className="outside">
      <div className="inside">{children}</div>
    </div>
  );
}

export const autoColumns = () => (
  <Grid>
    <Grid.Row>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
    </Grid.Row>
  </Grid>
);

export const responsiveGrid = () => (
  <Grid>
    <Grid.Row>
      <Grid.Col sm={1} md={4} lg={8}>
        <DemoContent>sm: 1/4, md: 1/2, lg: 2/3</DemoContent>
      </Grid.Col>
      <Grid.Col sm={1} md={2} lg={2}>
        <DemoContent>sm: 1/4, md: 1/4, lg: 1/6</DemoContent>
      </Grid.Col>
      <Grid.Col sm={1} md={1} lg={1}>
        <DemoContent>sm: 1/4, md: 1/8, lg: 1/12</DemoContent>
      </Grid.Col>
      <Grid.Col sm={1} md={1} lg={1}>
        <DemoContent>sm: 1/4, md: 1/8, lg: 1/12</DemoContent>
      </Grid.Col>
    </Grid.Row>
  </Grid>
);

export const offset = () => (
  <Grid>
    <Grid.Row>
      <Grid.Col smOffset={3} sm={1}>
        <DemoContent>Offset 3</DemoContent>
      </Grid.Col>
      <Grid.Col smOffset={2} sm={2}>
        <DemoContent>Offset 2</DemoContent>
      </Grid.Col>
      <Grid.Col smOffset={1} sm={3}>
        <DemoContent>Offset 1</DemoContent>
      </Grid.Col>
      <Grid.Col smOffset={0} sm={4}>
        <DemoContent>Offset 0</DemoContent>
      </Grid.Col>
    </Grid.Row>
  </Grid>
);

export const condensed = () => (
  <Grid condensed>
    <Grid.Row>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
    </Grid.Row>
  </Grid>
);

export const condensedColumns = () => (
  <Grid>
    <Grid.Row>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
    </Grid.Row>
    <Grid.Row condensed>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
    </Grid.Row>
    <Grid.Row>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
    </Grid.Row>
  </Grid>
);

export const fullWidth = () => (
  <Grid fullWidth>
    <Grid.Row>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
      <Grid.Col>
        <DemoContent>1/4</DemoContent>
      </Grid.Col>
    </Grid.Row>
  </Grid>
);
