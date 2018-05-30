import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from '../Icon';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
} from '../StructuredList';
import StructuredListSkeleton from '../StructuredList/StructuredList.Skeleton';

storiesOf('StructuredList', module)
  .addWithInfo(
    'Simple',
    `
      description here
    `,
    () => (
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
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Row 2</StructuredListCell>
            <StructuredListCell>Row 2</StructuredListCell>
            <StructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
    )
  )
  .addWithInfo(
    'Selection',
    `
      description here
    `,
    () => (
      <StructuredListWrapper selection border>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>{''}</StructuredListCell>
            <StructuredListCell head>ColumnA</StructuredListCell>
            <StructuredListCell head>ColumnB</StructuredListCell>
            <StructuredListCell head>ColumnC</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          <StructuredListRow label htmlFor="row-1">
            <StructuredListInput
              id="row-1"
              value="row-1"
              title="row-1"
              name="row-1"
              defaultChecked
            />
            <StructuredListCell>
              <Icon
                className="bx--structured-list-svg"
                name="checkmark--solid"
                description="select an option"
              />
            </StructuredListCell>
            <StructuredListCell>Row 1</StructuredListCell>
            <StructuredListCell>Row 1</StructuredListCell>
            <StructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow label htmlFor="row-2">
            <StructuredListInput
              id="row-2"
              value="row-2"
              title="row-2"
              name="row-1"
            />
            <StructuredListCell>
              <Icon
                className="bx--structured-list-svg"
                name="checkmark--solid"
                description="select an option"
              />
            </StructuredListCell>
            <StructuredListCell>Row 2</StructuredListCell>
            <StructuredListCell>Row 2</StructuredListCell>
            <StructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
    )
  )
  .addWithInfo(
    'skeleton',
    `
      description here
    `,
    () => (
      <div style={{ width: '800px' }}>
        <StructuredListSkeleton />
        <StructuredListSkeleton border />
      </div>
    )
  );
