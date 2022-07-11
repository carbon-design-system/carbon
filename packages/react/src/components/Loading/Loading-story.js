/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import Loading from '../Loading';

const props = () => ({
  active: boolean('Active (active)', true),
  withOverlay: boolean('With overlay (withOverlay)', false),
  small: boolean('Small (small)', false),
  description: text('Description (description)', 'Loading'),
});

export default {
  title: 'Components/Loading',
  component: Loading,
  decorators: [withKnobs],
};

export const Default = () => {
  return <Loading {...props()} className={'some-class'} />;
};
