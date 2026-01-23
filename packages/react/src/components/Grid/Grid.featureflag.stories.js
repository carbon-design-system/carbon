/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Grid.stories.scss';

import React from 'react';
import { Grid, Column, ColumnHang } from '../Grid';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

export default {
  title: 'Elements/Grid/Feature Flag',
  component: Grid,
  subcomponents: {
    Column,
  },
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <div className="sb-css-grid-container">
          <Story />
        </div>
      </WithFeatureFlags>
    ),
  ],
};

export const V12Default = (args) => {
  return (
    <Grid {...args}>
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
    </Grid>
  );
};

V12Default.args = {
  as: 'div',
  fullWidth: false,
  narrow: false,
  condensed: false,
  noRowGap: false,
};

V12Default.argTypes = {
  as: {
    control: {
      type: 'text',
    },
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
  },
  narrow: {
    control: {
      type: 'boolean',
    },
  },
  condensed: {
    control: {
      type: 'boolean',
    },
  },
  noRowGap: {
    control: {
      type: 'boolean',
    },
    description:
      'When true, removes row gap between grid rows (useful for backward compatibility)',
  },
};

export const V12WithNoRowGap = () => {
  return (
    <>
      <h5>With Row Gap (default v12 behavior)</h5>
      <Grid>
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
      </Grid>

      <h5 style={{ marginTop: '2rem' }}>Without Row Gap (noRowGap={true})</h5>
      <Grid noRowGap={true}>
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
      </Grid>
    </>
  );
};

export const V12Narrow = () => {
  return (
    <Grid narrow>
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
    </Grid>
  );
};

export const V12Condensed = () => {
  return (
    <Grid condensed>
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
    </Grid>
  );
};

export const V12FullWidth = () => {
  return (
    <Grid fullWidth>
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
      <Column sm={4} />
    </Grid>
  );
};

export const V12Responsive = () => {
  return (
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
  );
};

export const V12Subgrid = () => {
  return (
    <>
      <h5>Wide</h5>
      <Grid>
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={8} lg={16}>
          <Grid>
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
          </Grid>
        </Column>
      </Grid>
      <h5>Narrow</h5>
      <Grid narrow>
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={8} lg={16}>
          <Grid narrow>
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
          </Grid>
        </Column>
      </Grid>
      <h5>Condensed</h5>
      <Grid condensed>
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={8} lg={16}>
          <Grid condensed>
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
          </Grid>
        </Column>
      </Grid>
    </>
  );
};

export const V12MixedGutterModes = () => {
  return (
    <>
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

export const V12GridStartEnd = () => {
  return (
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
  );
};

export const V12Offset = () => {
  return (
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
  );
};
