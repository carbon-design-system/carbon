/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';

import ContainedList from '../ContainedList';

const props = () => ({});

export default {
  title: 'Experimental/unstable_ContainedList',
  component: ContainedList,
  decorators: [withKnobs],
};

export const _ContainedList = () => <ContainedList />;
_ContainedList.storyName = 'ContainedList';

export const Playground = () => <ContainedList {...props()} />;
