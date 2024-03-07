/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './story.scss';
import { RadioButton, RadioButtonChecked } from '@carbon/icons-react';
import mdx from './StructuredList.mdx';
import { WithLayer } from '../../../.storybook/templates/WithLayer';
import { useFeatureFlag } from '../FeatureFlags';

import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
  StructuredListSkeleton,
} from './';

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

export const Default = (args) => {
  return (
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
};

Default.args = {
  isdensed: false,
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

const structuredListBodyRowGenerator = (numRows, v12StructuredRadioIcons) => {
  return Array.apply(null, Array(numRows)).map((n, i) => (
    <StructuredListRow key={`row-${i}`}>
      {v12StructuredRadioIcons && (
        <StructuredListCell>
          <div className="structured-unchecks">
            <RadioButton />
          </div>
          <div className="structured-checks">
            <RadioButtonChecked />
          </div>
        </StructuredListCell>
      )}
      <StructuredListCell>Row {i}</StructuredListCell>
      <StructuredListCell>Row {i}</StructuredListCell>
      <StructuredListCell>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna,
        finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel
        euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.
      </StructuredListCell>
      <StructuredListInput
        id={`row-${i}`}
        value={`row-${i}`}
        title={`row-${i}`}
        name="row-0"
        aria-label={`row-${i}`}
      />
      {!v12StructuredRadioIcons && (
        <StructuredListCell>
          <div className="structured-unchecks">
            <RadioButton />
          </div>
          <div className="structured-checks">
            <RadioButtonChecked />
          </div>
        </StructuredListCell>
      )}
    </StructuredListRow>
  ));
};

export const Selection = (args) => {
  const v12StructuredRadioIcons = useFeatureFlag(
    'enable-v12-structured-list-radio-icons'
  );
  return (
    <StructuredListWrapper selection {...args}>
      <StructuredListHead>
        <StructuredListRow head>
          {v12StructuredRadioIcons && (
            <StructuredListCell head></StructuredListCell>
          )}
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {structuredListBodyRowGenerator(4, v12StructuredRadioIcons)}
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

export const WithBackgroundLayer = () => (
  <WithLayer>
    <StructuredListWrapper selection>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {structuredListBodyRowGenerator(4)}
      </StructuredListBody>
    </StructuredListWrapper>
  </WithLayer>
);

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
