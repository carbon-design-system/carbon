/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { Carousel } from '.';
import styles from './_storybook-styles.scss?inline';
import DocsPage from './Carousel.docs-page';

export default {
  title: 'Internal/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: DocsPage,
    },
  },
};

const Template = (args) => {
  return <Carousel {...args} />;
};

export const carousel = Template.bind({});
carousel.args = {
  children: (
    <>
      Carousel is an <em>Onboarding</em> internal component and is not intended
      for general use.
    </>
  ),
};
