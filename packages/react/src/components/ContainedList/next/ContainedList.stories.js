/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ContainedList from '../';

export default {
  title: 'Experimental/unstable_ContainedList',
  component: ContainedList,
};

export const VariantOne = () => (
  <>
    <ContainedList kind="variantone" label="Heading" />
    <ContainedList kind="variantone" label="Heading" />
  </>
);

export const VariantTwo = () => (
  <>
    <ContainedList kind="varianttwo" label="Heading" />
    <ContainedList kind="varianttwo" label="Heading" />
  </>
);

const PlaygroundStory = (args) => <ContainedList {...args} />;

export const Playground = PlaygroundStory.bind({});

Playground.argTypes = {
  label: { defaultValue: 'Heading' },
};
