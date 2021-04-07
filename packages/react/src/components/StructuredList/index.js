/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {
  StructuredListWrapper as StructuredListWrapperNew,
  StructuredListHead as StructuredListHeadNew,
  StructuredListInput as StructuredListInputNew,
  StructuredListBody as StructuredListBodyNew,
  StructuredListRow as StructuredListRowNew,
  StructuredListCell as StructuredListCellNew,
} from './next/StructuredList';
import {
  StructuredListWrapper as StructuredListWrapperOld,
  StructuredListHead as StructuredListHeadOld,
  StructuredListInput as StructuredListInputOld,
  StructuredListBody as StructuredListBodyOld,
  StructuredListRow as StructuredListRowOld,
  StructuredListCell as StructuredListCellOld,
} from './StructuredList';
import { useFeatureFlag } from '../FeatureFlags';

export function StructuredListWrapper(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListWrapperNew {...props} />;
  }
  return <StructuredListWrapperOld {...props} />;
}

export function StructuredListHead(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListHeadNew {...props} />;
  }
  return <StructuredListHeadOld {...props} />;
}
export function StructuredListInput(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListInputNew {...props} />;
  }
  return <StructuredListInputOld {...props} />;
}

export function StructuredListBody(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListBodyNew {...props} />;
  }
  return <StructuredListBodyOld {...props} />;
}

export function StructuredListRow(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListRowNew {...props} />;
  }
  return <StructuredListRowOld {...props} />;
}

export function StructuredListCell(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListCellNew {...props} />;
  }
  return <StructuredListCellOld {...props} />;
}

export * from './StructuredList.Skeleton';
