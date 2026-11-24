/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './_story-styles.scss';
import DocsPage from './Carousel.mdx';
import { CarouselExample } from './example/components/CarouselExample';
import { ViewStackExample } from './example/components/ViewStackExample';

export default {
  title: 'Examples/Carousel',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

export const StandardCarousel = () => {
  return <CarouselExample />;
};

StandardCarousel.storyName = 'Carousel with navigation';

export const ViewStack = () => {
  return <ViewStackExample />;
};

ViewStack.storyName = 'ViewStack navigation';
