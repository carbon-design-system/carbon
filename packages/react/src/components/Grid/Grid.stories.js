/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Grid.stories.scss';

import React from 'react';
import { Grid, Column, ColumnHang } from '../Grid';
import mdx from './Grid.mdx';

export default {
  title: 'Elements/Grid',
  component: Grid,
  subcomponents: {
    Column,
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className="sb-css-grid-container">
          <Story />
        </div>
      );
    },
  ],
};

const CarbonBuilderLink = () => {
  return (
    <>
      <a href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22GridFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22grid%22%2C%22outline%22%3Atrue%2C%22items%22%3A%5B%7B%22type%22%3A%22row%22%2C%22items%22%3A%5B%7B%22type%22%3A%22column%22%2C%22items%22%3A%5B%5D%2C%22id%22%3A%225%22%2C%22codeContext%22%3A%7B%22name%22%3A%22column-5%22%7D%7D%2C%7B%22type%22%3A%22column%22%2C%22items%22%3A%5B%5D%2C%22id%22%3A%226%22%2C%22codeContext%22%3A%7B%22name%22%3A%22column-6%22%7D%7D%5D%2C%22id%22%3A%224%22%2C%22codeContext%22%3A%7B%22name%22%3A%22row-4%22%7D%7D%2C%7B%22type%22%3A%22row%22%2C%22items%22%3A%5B%7B%22type%22%3A%22column%22%2C%22items%22%3A%5B%5D%2C%22id%22%3A%228%22%2C%22codeContext%22%3A%7B%22name%22%3A%22column-8%22%7D%7D%2C%7B%22type%22%3A%22column%22%2C%22items%22%3A%5B%5D%2C%22id%22%3A%229%22%2C%22codeContext%22%3A%7B%22name%22%3A%22column-9%22%7D%7D%5D%2C%22id%22%3A%227%22%2C%22codeContext%22%3A%7B%22name%22%3A%22row-7%22%7D%7D%5D%2C%22id%22%3A%223%22%2C%22codeContext%22%3A%7B%22name%22%3A%22grid-3%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D" target="_blank" rel="noreferrer">
        Edit on Carbon UI Builder 
      </a>
      <br></br>
      <br></br>
    </>
  );
};

export const Default = () => {
  return (
    <div>
      <CarbonBuilderLink></CarbonBuilderLink>
      <Grid>
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
      </Grid>
    </div>
  );
};

export const Narrow = () => {
  return (
    <div>
      <CarbonBuilderLink></CarbonBuilderLink>
      <Grid narrow>
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
      </Grid>
    </div>
  );
};

export const Condensed = () => {
  return (
    <div>
      <CarbonBuilderLink></CarbonBuilderLink>
      <Grid condensed>
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
      </Grid>
    </div>
  );
};

export const FullWidth = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Grid fullWidth>
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
    </Grid>
  </div>
);

export const Responsive = () => (
<div>
  <CarbonBuilderLink></CarbonBuilderLink>
  <Grid>
    <Column sm={2} md={4} lg={6}>
      <p>Small: Span 2 of 4</p>
      <p>Medium: Span 4 of 8</p>
      <p>Large: Span 6 of 16</p>
    </Column>
    <Column sm={2} md={2} lg={3}>
      <p>Small: Span 2 of 4</p>
      <p>Medium: Span 2 of 8</p>
      <p>Large: Span 3 of 16</p>
    </Column>
    <Column sm={0} md={2} lg={3}>
      <p>Small: Span 0 of 4</p>
      <p>Medium: Span 2 of 8</p>
      <p>Large: Span 3 of 16</p>
    </Column>
    <Column sm={0} md={0} lg={4}>
      <p>Small: Span 0 of 4</p>
      <p>Medium: Span 0 of 8</p>
      <p>Large: Span 4 of 16</p>
    </Column>
    <Column sm="25%" md="50%" lg="75%">
      <p>Small: Span 25%</p>
      <p>Medium: Span 50%</p>
      <p>Large: Span 75%</p>
    </Column>
  </Grid>
</div>
);

export const Subgrid = () => {
  return (
    <div>
      <CarbonBuilderLink></CarbonBuilderLink>
      <Grid>
        <Column sm={2} md={4} lg={3}>
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 3 of 16</p>
        </Column>
        <Column sm={2} md={4} lg={10}>
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 10 of 16</p>
          <Grid className="example">
            <Column sm={1} md={1} lg={2}>
              <p>sm={1}</p> <p>md={1}</p> <p>lg={2}</p>
            </Column>
            <Column sm={1} md={1} lg={2}>
              <p>sm={1}</p> <p>md={1}</p> <p>lg={2}</p>
            </Column>
            <Column sm={0} md={1} lg={1}>
              <p>sm={0}</p> <p>md={1}</p> <p>lg={1}</p>
            </Column>
            <Column sm={0} md={1} lg={1}>
              <p>sm={0}</p> <p>md={1}</p> <p>lg={1}</p>
            </Column>
            <Column sm={0} md={0} lg={1}>
              <p>sm={0}</p> <p>md={0}</p> <p>lg={1}</p>
            </Column>
            <Column sm={0} md={0} lg={1}>
              <p>sm={0}</p> <p>md={0}</p> <p>lg={1}</p>
            </Column>
            <Column sm={0} md={0} lg={1}>
              <p>sm={0}</p> <p>md={0}</p> <p>lg={1}</p>
            </Column>
            <Column sm={0} md={0} lg={1}>
              <p>sm={0}</p> <p>md={0}</p> <p>lg={1}</p>
            </Column>
          </Grid>
        </Column>
        <Column sm={0} md={0} lg={3}>
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 0 of 8</p>
          <p>Large: Span 3 of 16</p>
        </Column>
      </Grid>
    </div>
  );
};

export const MixedGridModes = () => {
  return (
    <>
    <CarbonBuilderLink></CarbonBuilderLink>
      <Grid>
        <Column span={8}>
          <Grid>
            <Column span={8}>
              <Grid narrow>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column span={4}>
                  <Grid>
                    <Column>Text</Column>
                    <Column>Text</Column>
                    <Column span={2}>
                      <Grid condensed>
                        <Column>
                          <ColumnHang>Text</ColumnHang>
                        </Column>
                        <Column>
                          <ColumnHang>Text</ColumnHang>
                        </Column>
                      </Grid>
                    </Column>
                  </Grid>
                </Column>
              </Grid>
            </Column>
          </Grid>
        </Column>
      </Grid>
      <Grid narrow>
        <Column span={8}>
          <Grid>
            <Column span={4} />
            <Column span={4}>
              <Grid narrow>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
              </Grid>
            </Column>
          </Grid>
        </Column>
      </Grid>
    </>
  );
};

export const GridStartEnd = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Grid>
      <Column
        sm={{ span: 1, start: 4 }}
        md={{ span: 2, start: 7 }}
        lg={{ span: 4, start: 13 }}>
        span, start
      </Column>
      <Column
        sm={{ span: 2, end: 5 }}
        md={{ span: 4, end: 9 }}
        lg={{ span: 8, end: 17 }}>
        span, end
      </Column>
      <Column
        sm={{ start: 1, end: 4 }}
        md={{ start: 3, end: 9 }}
        lg={{ start: 5, end: 17 }}>
        start, end
      </Column>
    </Grid>
  </div>
);

export const Offset = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Grid>
      <Column
        sm={{ span: 1, offset: 3 }}
        md={{ span: 2, offset: 6 }}
        lg={{ span: 4, offset: 12 }}
      />
      <Column
        sm={{ span: 2, offset: 2 }}
        md={{ span: 4, offset: 4 }}
        lg={{ span: 8, offset: 8 }}
      />
      <Column
        sm={{ span: 3, offset: 1 }}
        md={{ span: 6, offset: 2 }}
        lg={{ span: 12, offset: 4 }}
      />
      <Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }} />
      <Column
        sm={{ span: '25%', offset: 1 }}
        md={{ span: '50%', offset: 2 }}
        lg={{ span: '75%', offset: 4 }}
      />
    </Grid>
  </div>
);

export const Playground = (args) => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Grid {...args}>
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
    </Grid>
  </div>
);

Playground.argTypes = {
  as: {
    control: {
      type: 'text',
    },
    defaultValue: 'div',
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  fullWidth: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  narrow: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  condensed: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  columns: {
    control: { type: 'number' },
  },
};
