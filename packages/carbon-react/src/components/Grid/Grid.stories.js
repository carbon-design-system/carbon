/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Grid.stories.scss';
import { Grid, Column } from 'carbon-components-react/es/components/Grid';
import { FeatureFlags } from 'carbon-components-react/es/components/FeatureFlags';
import React from 'react';
import mdx from './Grid.mdx';

export default {
  title: 'Components/Grid',
  component: Grid,
  subcomponents: {
    Column,
  },
  decorators: [
    (Story) => (
      <FeatureFlags flags={{ 'enable-css-grid': true }}>
        <Story />
      </FeatureFlags>
    ),
  ],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const ExampleColumns = () => {
  return (
    <>
      <Column sm={4}>
        <p>sm={`{4}`}</p>
      </Column>
      <Column sm={4}>
        <p>sm={`{4}`}</p>
      </Column>
      <Column sm={4}>
        <p>sm={`{4}`}</p>
      </Column>
      <Column sm={4}>
        <p>sm={`{4}`}</p>
      </Column>

      {/* <Column sm={2}>1/8</Column>
      <Column sm={2}>1/8</Column>
      <Column sm={2}>1/8</Column>
      <Column sm={2}>1/8</Column>
      <Column sm={2}>1/8</Column>
      <Column sm={2}>1/8</Column>
      <Column sm={2}>1/8</Column>
      <Column sm={2}>1/8</Column>

      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column>
      <Column>1/16</Column> */}
    </>
  );
};

export const Wide = () => {
  return (
    <Grid>
      <ExampleColumns />
    </Grid>
  );
};

export const Narrow = () => {
  return (
    <Grid narrow>
      <ExampleColumns />
    </Grid>
  );
};

export const Condensed = () => {
  return (
    <Grid condensed>
      <ExampleColumns />
    </Grid>
  );
};

export const Responsive = () => (
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
  </Grid>
);

export const Subgrid = () => {
  return (
    <>
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
          <Grid>
            <Column sm={2} md={4} lg={10}>
              <p>Subgrid</p>
              <div style={{ marginBottom: '1rem' }}>
                <p>
                  subgrids should always be wrapped in a column. This way the
                  *column* will define responsive parameters, and the subgrid
                  will then inherit them
                </p>
                <p>
                  this actually doesn't work because when the subgrid is a
                  different mode the grid definition rests with the parent
                  column of the grid, which means we can't override the margins,
                  etc so narrow hangs properly in the gutter.
                </p>
                <p>
                  subgrids will always need a `columns` definition and should
                  not be placed in a column. They should always be direct
                  children of a Grid.
                </p>
                <p>
                  How do we declare responsive properties for the subgrid then?
                </p>
              </div>
            </Column>
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

      <Grid>
        <Column sm={2} md={4} lg={3}>
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 3 of 16</p>
        </Column>
        <Grid columns={10}>
          <Column sm={2} md={4} lg={10}>
            <p>Subgrid</p>
            <div style={{ marginBottom: '1rem' }}>
              <p>try without wrapping in a column</p>
            </div>
          </Column>
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

        <Column sm={0} md={0} lg={3}>
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 0 of 8</p>
          <p>Large: Span 3 of 16</p>
        </Column>
      </Grid>
    </>
  );
};

export const MixedModes = () => {
  return (
    <>
      <p>
        Wide parent grid, Wide & Narrow children{' '}
        <span className="subgrid">subgrids</span>
      </p>

      <Grid>
        <Column lg={4}>
          <p>Wide</p>
        </Column>
        <Grid narrow columns={12}>
          <Column lg={12}>
            <p className="bx--gutter-start">Narrow direct subgrid</p>
          </Column>
        </Grid>
      </Grid>

      <Grid>
        <Column lg={4}>
          <p>Wide</p>
        </Column>
        <Column lg={12}>
          <Grid narrow>
            <Column lg={12}>
              <p className="bx--gutter-start">Narrow subgrid in a column</p>
            </Column>
          </Grid>
        </Column>
      </Grid>

      <p>
        Wide parent grid, Wide & Condensed children{' '}
        <span className="subgrid">subgrids</span>
      </p>

      <Grid>
        <Column sm={4}>
          <p>Wide</p>
        </Column>
        <Grid condensed columns={12}>
          <Column lg={12}>
            <p>Condensed</p>
          </Column>
        </Grid>
      </Grid>

      <p>
        Wide parent grid, Narrow & Condensed children{' '}
        <span className="subgrid">subgrids</span>
      </p>

      <section className="bx--css-grid">
        <div className="bx--col-span-4 bx--subgrid bx--css-grid--narrow">
          <div className="bx--col-span-100">
            <p className="bx--gutter-start">Narrow</p>
          </div>
        </div>
        <div className="bx--col-span-12 bx--subgrid bx--css-grid--condensed">
          <div className="bx--col-span-100">
            <p>Condensed</p>
          </div>
        </div>
        <div className="bx--col-span-12 bx--subgrid bx--css-grid--condensed">
          <div className="bx--col-span-100">
            <p>Condensed</p>
          </div>
        </div>
        <div className="bx--col-span-4 bx--subgrid bx--css-grid--narrow">
          <div className="bx--col-span-100">
            <p className="bx--gutter-start">Narrow</p>
          </div>
        </div>
      </section>

      <p>
        Narrow parent grid, Wide & Condensed children{' '}
        <span className="subgrid">subgrids</span>
      </p>

      <section className="bx--css-grid bx--css-grid--narrow">
        <div className="bx--col-span-4 bx--subgrid bx--css-grid">
          <div className="bx--col-span-100">
            <p>Wide subgrid</p>
          </div>
        </div>
        <div className="bx--col-span-12 bx--subgrid bx--css-grid--condensed">
          <div className="bx--col-span-100">
            <p>Condensed subgrid</p>
          </div>
        </div>
        <div className="bx--col-span-12 bx--subgrid bx--css-grid--condensed">
          <div className="bx--col-span-100">
            <p>Condensed subgrid</p>
          </div>
        </div>
        <div className="bx--col-span-4 bx--subgrid bx--css-grid">
          <div className="bx--col-span-100">
            <p>Wide subgrid</p>
          </div>
        </div>
      </section>

      <p>
        Condensed parent grid, Narrow & Wide children{' '}
        <span className="subgrid">subgrids</span>
      </p>

      <section className="bx--css-grid bx--css-grid--condensed">
        <div className="bx--col-span-4 bx--subgrid bx--css-grid--narrow">
          <div className="bx--col-span-100">
            <p className="bx--gutter-start">Narrow subgrid</p>
          </div>
        </div>
        <div className="bx--col-span-12 bx--subgrid bx--css-grid">
          <div className="bx--col-span-100">
            <p>Wide subgrid</p>
          </div>
        </div>
        <div className="bx--col-span-12 bx--subgrid bx--css-grid">
          <div className="bx--col-span-100">
            <p>Wide subgrid</p>
          </div>
        </div>
        <div className="bx--col-span-4 bx--subgrid bx--css-grid--narrow">
          <div className="bx--col-span-100">
            <p className="bx--gutter-start">Narrow subgrid</p>
          </div>
        </div>
      </section>
    </>
  );
};

export const AutoColumns = () => {
  return (
    <>
      <p>
        "Auto" is a bit different with CSS Grid. Instead of automatically
        spanning equal space, it is now equal to 1 column.
      </p>
      <Grid>
        <Column>1/16</Column>
        <Column>1/16</Column>
        <Column>1/16</Column>
        <Column>1/16</Column>
      </Grid>
    </>
  );
};
