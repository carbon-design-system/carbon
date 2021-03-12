/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './AspectRatio-story.scss';

import { withKnobs, select } from '@storybook/addon-knobs';
import React from 'react';
import { Grid, Row, Column } from '../Grid';
import { AspectRatio } from './';
import mdx from './AspectRatio.mdx';

export default {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  decorators: [
    withKnobs,
    (story) => <div className="aspect-ratio-story">{story()}</div>,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const aspectRatio = () => {
  return (
    <Grid>
      <Row>
        <Column>
          <AspectRatio ratio="1x1">Content</AspectRatio>
        </Column>
        <Column>
          <AspectRatio ratio="1x1">Content</AspectRatio>
        </Column>
        <Column>
          <AspectRatio ratio="1x1">Content</AspectRatio>
        </Column>
        <Column>
          <AspectRatio ratio="1x1">Content</AspectRatio>
        </Column>
      </Row>
    </Grid>
  );
};

export const playground = () => {
  const ratio = select(
    'ratio',
    ['16x9', '9x16', '2x1', '1x2', '4x3', '3x4', '1x1'],
    '1x1'
  );
  return (
    <Grid>
      <Row>
        <Column>
          <AspectRatio ratio={ratio}>Content</AspectRatio>
        </Column>
        <Column>
          <AspectRatio ratio={ratio}>Content</AspectRatio>
        </Column>
        <Column>
          <AspectRatio ratio={ratio}>Content</AspectRatio>
        </Column>
        <Column>
          <AspectRatio ratio={ratio}>Content</AspectRatio>
        </Column>
      </Row>
    </Grid>
  );
};
