/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import ResponsiveHoc from './ResponsiveHoc';

const props = () => ({
  minDeviceWidth: number('minWidth', 900),
});

export default {
  title: 'ResponsiveHoc',
  decorators: [withKnobs],

  parameters: {
    component: ResponsiveHoc,
  },
};

export const Default = () => {
  return (
    <ResponsiveHoc {...props()}>
      <p>Content for ResponsiveHoc goes here.</p>
    </ResponsiveHoc>
  );
};

Default.parameters = {
  info: {
    text: `
        ResponsiveHoc are used when certain components or content needs to adapt to different resolutions.
        ResponsiveHoc work with SSR.
      `,
  },
};
