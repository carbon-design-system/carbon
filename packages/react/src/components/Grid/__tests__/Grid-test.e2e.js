/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/globals/scss/vendor/@carbon/grid/scss/modules/_css-grid.scss';
import './Grid-test.e2e.scss';

import React from 'react';
import { mount } from '@cypress/react';
import { Grid, Column } from '..';
import { FeatureFlags } from '../../FeatureFlags';

describe('Grid', () => {
  beforeEach(() => {
    mount(
      <FeatureFlags flags={{ 'enable-css-grid': true }}>
        <Grid>
          <Column sm={4} />
          <Column sm={4} />
          <Column sm={4} />
          <Column sm={4} />
        </Grid>

        <Grid narrow>
          <Column sm={4} />
          <Column sm={4} />
          <Column sm={4} />
          <Column sm={4} />
        </Grid>

        <Grid condensed>
          <Column sm={4} />
          <Column sm={4} />
          <Column sm={4} />
          <Column sm={4} />
        </Grid>

        <Grid fullWidth>
          <Column sm={4} />
          <Column sm={4} />
          <Column sm={4} />
          <Column sm={4} />
        </Grid>

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

        <Grid>
          <Column sm={1} md={2} lg={4}>
            <Grid narrow>
              <Column sm={1} md={2} lg={4}>
                <p>narrow</p>
              </Column>
            </Grid>
          </Column>
          <Column sm={3} md={6} lg={12}>
            <Grid condensed>
              <Column sm={3} md={6} lg={12}>
                <p>condensed</p>
              </Column>
            </Grid>
          </Column>
          <Column sm={1} md={2} lg={4}>
            <Grid condensed>
              <Column sm={1} md={2} lg={4}>
                <p>condensed</p>
              </Column>
            </Grid>
          </Column>
          <Column sm={3} md={6} lg={12}>
            <Grid narrow>
              <Column sm={3} md={6} lg={12}>
                <p>narrow</p>
              </Column>
            </Grid>
          </Column>
        </Grid>

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
        </Grid>
        <Grid>
          <Column></Column>
          <Column></Column>
          <Column></Column>
          <Column></Column>
          <Column></Column>
          <Column></Column>
          <Column></Column>
          <Column></Column>
        </Grid>
      </FeatureFlags>
    );
  });

  it('should render', () => {
    cy.viewport(1400, 500);
    cy.findAllByText(/narrow/).should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });
});
