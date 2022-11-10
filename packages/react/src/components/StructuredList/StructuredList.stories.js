/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { CheckmarkFilled } from '@carbon/icons-react';
import mdx from './StructuredList.mdx';

import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
} from './';
import StructuredListSkeleton from './StructuredList.Skeleton';

const prefix = 'cds';

export default {
  title: 'Components/StructuredList',
  component: StructuredListWrapper,
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
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = () => (
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

export const Playground = (props) => {
  const { className, selection, isCondensed, isFlush } = props;
  return (
    <StructuredListWrapper
      className={className}
      selection={selection}
      isCondensed={isCondensed}
      isFlush={isFlush}>
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
};

Playground.argTypes = {
  selection: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  isCondensed: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  isFlush: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
};

export const Selection = () => {
  const structuredListBodyRowGenerator = (numRows) => {
    return Array.apply(null, Array(numRows)).map((n, i) => (
      <StructuredListRow key={`row-${i}`}>
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
    <StructuredListWrapper selection>
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
