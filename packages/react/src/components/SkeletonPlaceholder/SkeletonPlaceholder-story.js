/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import { withKnobs, select } from '@storybook/addon-knobs';
import SkeletonPlaceholder from '../SkeletonPlaceholder';
import mdx from './SkeletonPlaceholder.mdx';

const classNames = {
  'my--skeleton__placeholder--small': 'my--skeleton__placeholder--small',
  'my--skeleton__placeholder--medium': 'my--skeleton__placeholder--medium',
  'my--skeleton__placeholder--large': 'my--skeleton__placeholder--large',
};

const props = () => ({
  className: select('Classes with different sizes', classNames),
});

export default {
  title: 'Components/Skeleton/SkeletonPlaceholder',
  component: SkeletonPlaceholder,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <div style={{ height: '250px', width: '250px' }}>
    <style
      dangerouslySetInnerHTML={{
        __html: `
      .my--skeleton__placeholder--small {
        height: 100px;
        width: 100px;
      }

      .my--skeleton__placeholder--medium {
        height: 150px;
        width: 150px;
      }

      .my--skeleton__placeholder--large {
        height: 250px;
        width: 250px;
      }
    `,
      }}
    />
    <SkeletonPlaceholder {...props()} />
  </div>
);
