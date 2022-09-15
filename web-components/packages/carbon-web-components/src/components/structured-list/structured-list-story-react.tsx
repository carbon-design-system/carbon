/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXStructuredList from 'carbon-web-components/es/components-react/structured-list/structured-list';
// @ts-ignore
import BXStructuredListHead from 'carbon-web-components/es/components-react/structured-list/structured-list-head';
// @ts-ignore
import BXStructuredListHeaderRow from 'carbon-web-components/es/components-react/structured-list/structured-list-header-row';
// @ts-ignore
import BXStructuredListBody from 'carbon-web-components/es/components-react/structured-list/structured-list-body';
// @ts-ignore
import BXStructuredListRow from 'carbon-web-components/es/components-react/structured-list/structured-list-row';
// @ts-ignore
// eslint-disable-next-line max-len
import BXStructuredListHeaderCellSkeleton from 'carbon-web-components/es/components-react/structured-list/structured-list-header-cell-skeleton';
import { Default as baseDefault } from './structured-list-story';
import styles from './structured-list-story.scss';

export { default } from './structured-list-story';

export const Default = args => {
  const { hasSelection } = args?.['bx-structured-list'];
  const selectionName = !hasSelection ? undefined : 'structured-list-selection';
  const selectionValues = !hasSelection
    ? []
    : ['structured-list-selection-0', 'structured-list-selection-1', 'structured-list-selection-2'];
  return (
    <BXStructuredList selectionName={selectionName}>
      <BXStructuredListHead>
        <BXStructuredListHeaderRow>
          <bx-structured-list-header-cell>ColumnA</bx-structured-list-header-cell>
          <bx-structured-list-header-cell>ColumnB</bx-structured-list-header-cell>
          <bx-structured-list-header-cell>ColumnC</bx-structured-list-header-cell>
        </BXStructuredListHeaderRow>
      </BXStructuredListHead>
      <BXStructuredListBody>
        <BXStructuredListRow selectionValue={selectionValues[0]}>
          <bx-structured-list-cell>Row 1</bx-structured-list-cell>
          <bx-structured-list-cell>Row 1</bx-structured-list-cell>
          <bx-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </bx-structured-list-cell>
        </BXStructuredListRow>
        <BXStructuredListRow selectionValue={selectionValues[1]}>
          <bx-structured-list-cell>Row 2</bx-structured-list-cell>
          <bx-structured-list-cell>Row 2</bx-structured-list-cell>
          <bx-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </bx-structured-list-cell>
        </BXStructuredListRow>
        <BXStructuredListRow selectionValue={selectionValues[2]}>
          <bx-structured-list-cell>Row 3</bx-structured-list-cell>
          <bx-structured-list-cell>Row 3</bx-structured-list-cell>
          <bx-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </bx-structured-list-cell>
        </BXStructuredListRow>
      </BXStructuredListBody>
    </BXStructuredList>
  );
};

Object.assign(Default, baseDefault);

export const skeleton = () => (
  <>
    <style type="text/css">{styles.cssText}</style>
    <BXStructuredList>
      <BXStructuredListHead>
        <BXStructuredListHeaderRow>
          <BXStructuredListHeaderCellSkeleton />
          <BXStructuredListHeaderCellSkeleton />
          <BXStructuredListHeaderCellSkeleton />
        </BXStructuredListHeaderRow>
      </BXStructuredListHead>
      <BXStructuredListBody>
        <BXStructuredListRow>
          <bx-structured-list-cell />
          <bx-structured-list-cell />
          <bx-structured-list-cell />
        </BXStructuredListRow>
        <BXStructuredListRow>
          <bx-structured-list-cell />
          <bx-structured-list-cell />
          <bx-structured-list-cell />
        </BXStructuredListRow>
        <BXStructuredListRow>
          <bx-structured-list-cell />
          <bx-structured-list-cell />
          <bx-structured-list-cell />
        </BXStructuredListRow>
      </BXStructuredListBody>
    </BXStructuredList>
  </>
);
