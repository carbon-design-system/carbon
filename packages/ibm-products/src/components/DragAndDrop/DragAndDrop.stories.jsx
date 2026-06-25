/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { px } from '@carbon/layout';

import styles from './_storybook-styles.scss?inline';

import DocsPage from './DragAndDrop.mdx';
import { Sortable } from './preview-components/Sortable';
import { GridContainer } from './preview-components/GridContainer';
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

export default {
  title: 'Patterns/Drag and drop',
  component: () => {},
  tags: ['autodocs'],
  argTypes: {
    borderColor: { control: 'color' },
  },
  parameters: {
    styles,
    docs: {
      page: DocsPage, // OPTIONAL: required only to customize default docs page
    },
  },
};

export const verticalExample = Sortable.bind({});
verticalExample.storyName = 'Vertical list';
verticalExample.args = {
  modifiers: [restrictToParentElement, restrictToVerticalAxis],
  strategy: verticalListSortingStrategy,
};

export const horizontalExample = Sortable.bind({});
horizontalExample.storyName = 'Horizontal list';
horizontalExample.args = {
  type: 'horizontal',
  modifiers: [restrictToParentElement, restrictToHorizontalAxis],
  strategy: horizontalListSortingStrategy,
};

const gridGapValue = 12;
const defaultGridItemSize = 140;
const gridProps = {
  withGrid: true,
  gridGap: px(gridGapValue),
  adjustScale: true,
  Container: (props) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({
    width: defaultGridItemSize,
    height: defaultGridItemSize,
  }),
};

export const gridExample = Sortable.bind({});
gridExample.storyName = 'Grid';
gridExample.args = {
  ...gridProps,
};

export const gridExampleRestrictToWindow = Sortable.bind({});
gridExampleRestrictToWindow.storyName = 'Grid, restrict drag to window edges';
gridExampleRestrictToWindow.args = {
  ...gridProps,
  modifiers: [restrictToWindowEdges],
};

export const gridExampleLargeItem = Sortable.bind({});
gridExampleLargeItem.storyName = 'Grid, large item';
gridExampleLargeItem.args = {
  ...gridProps,
  itemCount: 20,
  includeUnderlay: false,
  modifiers: [restrictToWindowEdges],
  wrapperStyle: ({ index }) => {
    if (index === 1) {
      return {
        height: defaultGridItemSize * 2 + gridGapValue,
        width: defaultGridItemSize * 2 + gridGapValue,
        gridRowStart: 'span 2',
        gridColumnStart: 'span 2',
      };
    }

    return {
      width: defaultGridItemSize,
      height: defaultGridItemSize,
    };
  },
};

export const gridDashboard = Sortable.bind({});
gridDashboard.storyName = 'Grid, dashboard layout';
gridDashboard.args = {
  ...gridProps,
  itemCount: 3,
  includeUnderlay: false,
  Container: (props) => <GridContainer {...props} columns={4} />,
  modifiers: [restrictToWindowEdges],
  wrapperStyle: ({ index }) => {
    if (index === 1) {
      return {
        height: defaultGridItemSize * 2 + gridGapValue,
        width: defaultGridItemSize * 4 + gridGapValue,
        gridRowStart: 'span 4',
        gridColumnStart: 'span 4',
      };
    }

    if (index === 2 || index === 3) {
      return {
        height: defaultGridItemSize,
        width: defaultGridItemSize * 2,
        gridRowStart: 'span 2',
        gridColumnStart: 'span 2',
      };
    }
  },
};
