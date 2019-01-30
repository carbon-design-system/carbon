import React from 'react';
import { Link } from '@reach/router';
import { Grid, Row, Column } from './Grid';
import Main from './Main';

const { PATH_PREFIX = '' } = process.env;

export default function ExamplesPage() {
  return (
    <Main>
      <Grid>
        <Row>
          <Column breakpoint="md" span={4}>
            <h1>Grid Examples</h1>
            <p>
              A variety of examples to help verify the grid implementation of
              the IBM Design Language for the Carbon Design System.
            </p>
          </Column>
        </Row>
        <Row>
          <Column auto>
            <ul>
              <li>
                <Link to={`${PATH_PREFIX}/basic`}>Basic Usage</Link>
              </li>
              <li>
                <Link to={`${PATH_PREFIX}/fluid`}>Fluid</Link>
              </li>
              <li>
                <Link to={`${PATH_PREFIX}/full-width`}>Full Width</Link>
              </li>
              <li>
                <Link to={`${PATH_PREFIX}/offset`}>Offsets</Link>
              </li>
              <li>
                <Link to={`${PATH_PREFIX}/padding`}>Padding</Link>
              </li>
              <li>
                <Link to={`${PATH_PREFIX}/bleed`}>Bleed</Link>
              </li>
              <li>
                <Link to={`${PATH_PREFIX}/condensed`}>Condensed</Link>
              </li>
              <li>
                <Link to={`${PATH_PREFIX}/hang`}>Hang</Link>
              </li>
              <li>
                <Link to={`${PATH_PREFIX}/aspect-ratio`}>Aspect Ratio</Link>
              </li>
              <li>
                <Link to={`${PATH_PREFIX}/full-bleed`}>Full bleed</Link>
              </li>
            </ul>
          </Column>
        </Row>
      </Grid>
    </Main>
  );
}
