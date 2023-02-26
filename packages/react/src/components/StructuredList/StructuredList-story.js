/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { CheckmarkFilled } from '@carbon/icons-react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
} from './StructuredList';
import StructuredListSkeleton from '../StructuredList/StructuredList.Skeleton';
import mdx from './StructuredList.mdx';

const prefix = 'cds';

const props = () => ({
  isCondensed: boolean('Condensed', false),
  isFlush: boolean('Flush alignment', false),
});

export default {
  title: 'Components/StructuredList',
  component: StructuredListWrapper,
  decorators: [withKnobs],
  subcomponents: {
    StructuredListHead,
    StructuredListBody,
    StructuredListRow,
    StructuredListInput,
    StructuredListCell,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Simple = () => (
  <StructuredListWrapper>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>ColumnA</StructuredListCell>
        <StructuredListCell head>ColumnB</StructuredListCell>
        <StructuredListCell head>ColumnC</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      <StructuredListRow>
        <StructuredListCell noWrap>Row 1</StructuredListCell>
        <StructuredListCell>Row 1</StructuredListCell>
        <StructuredListCell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
          magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
          sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
          vulputate nisl a porttitor interdum.
        </StructuredListCell>
      </StructuredListRow>
      <StructuredListRow>
        <StructuredListCell noWrap>Row 2</StructuredListCell>
        <StructuredListCell>Row 2</StructuredListCell>
        <StructuredListCell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
          magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
          sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
          vulputate nisl a porttitor interdum.
        </StructuredListCell>
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
);

export const Playground = () => (
  <StructuredListWrapper {...props()}>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>ColumnA</StructuredListCell>
        <StructuredListCell head>ColumnB</StructuredListCell>
        <StructuredListCell head>ColumnC</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      <StructuredListRow>
        <StructuredListCell noWrap>Row 1</StructuredListCell>
        <StructuredListCell>Row 1</StructuredListCell>
        <StructuredListCell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
          magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
          sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
          vulputate nisl a porttitor interdum.
        </StructuredListCell>
      </StructuredListRow>
      <StructuredListRow>
        <StructuredListCell noWrap>Row 2</StructuredListCell>
        <StructuredListCell>Row 2</StructuredListCell>
        <StructuredListCell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
          magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
          sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
          vulputate nisl a porttitor interdum.
        </StructuredListCell>
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
);

export const Selection = () => {
  const structuredListBodyRowGenerator = (numRows) => {
    return Array.apply(null, Array(numRows)).map((n, i) => (
      <StructuredListRow label key={`row-${i}`}>
        <StructuredListCell>Row {i}</StructuredListCell>
        <StructuredListCell>Row {i}</StructuredListCell>
        <StructuredListCell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
          magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
          sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
          vulputate nisl a porttitor interdum.
        </StructuredListCell>
        <StructuredListInput
          id={`row-${i}`}
          value={`row-${i}`}
          title={`row-${i}`}
          name="row-0"
          defaultChecked={!i || null}
        />
        <StructuredListCell>
          <CheckmarkFilled
            className={`${prefix}--structured-list-svg`}
            aria-label="select an option">
            <title>select an option</title>
          </CheckmarkFilled>
        </StructuredListCell>
      </StructuredListRow>
    ));
  };
  return (
    <StructuredListWrapper selection {...props()}>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
          <StructuredListCell head>{''}</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {structuredListBodyRowGenerator(4)}
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

export const Skeleton = () => (
  <div style={{ width: '800px' }}>
    <StructuredListSkeleton />
    <StructuredListSkeleton />
  </div>
);

Skeleton.storyName = 'skeleton';
