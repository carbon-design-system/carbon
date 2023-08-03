/**
 * Copyright IBM Corp. 2016, 2023
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

export const Default = (args) => (
  <StructuredListWrapper {...args}>
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

Default.args = {
  isCondensed: false,
  isFlush: false,
};

Default.argTypes = {
  selection: {
    control: {
      disable: true,
    },
  },
  isCondensed: {
    control: {
      type: 'boolean',
    },
  },
  isFlush: {
    control: {
      type: 'boolean',
    },
  },
};

export const Selection = (args) => {
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
    <StructuredListWrapper selection {...args}>
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

Selection.argTypes = {
  isFlush: {
    table: {
      disable: true,
    },
  },
  selection: {
    control: {
      disable: true,
    },
  },
};

export const Skeleton = (args) => (
  <div style={{ width: '800px' }}>
    <StructuredListSkeleton {...args} />
  </div>
);

Skeleton.args = {
  rowCount: 5,
};

Skeleton.argTypes = {
  isFlush: {
    table: {
      disable: true,
    },
  },
  isCondensed: {
    table: {
      disable: true,
    },
  },
  ariaLabel: {
    table: {
      disable: true,
    },
  },
  ['aria-label']: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  selection: {
    table: {
      disable: true,
    },
  },
  rowCount: {
    control: {
      type: 'number',
    },
  },
};
