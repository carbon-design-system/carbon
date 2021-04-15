/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {
  StructuredListWrapper as StructuredListWrapperNext,
  StructuredListHead as StructuredListHeadNext,
  StructuredListInput as StructuredListInputNext,
  StructuredListBody as StructuredListBodyNext,
  StructuredListRow as StructuredListRowNext,
  StructuredListCell as StructuredListCellNext,
} from './next/StructuredList';
import {
  StructuredListWrapper as StructuredListWrapperClassic,
  StructuredListHead as StructuredListHeadClassic,
  StructuredListInput as StructuredListInputClassic,
  StructuredListBody as StructuredListBodyClassic,
  StructuredListRow as StructuredListRowClassic,
  StructuredListCell as StructuredListCellClassic,
} from './StructuredList';
import { useFeatureFlag } from '../FeatureFlags';

export function StructuredListWrapper(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListWrapperNext {...props} />;
  }
  return <StructuredListWrapperClassic {...props} />;
}

export function StructuredListHead(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListHeadNext {...props} />;
  }
  return <StructuredListHeadClassic {...props} />;
}
export function StructuredListInput(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListInputNext {...props} />;
  }
  return <StructuredListInputClassic {...props} />;
}

export function StructuredListBody(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListBodyNext {...props} />;
  }
  return <StructuredListBodyClassic {...props} />;
}

export function StructuredListRow(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListRowNext {...props} />;
  }
  return <StructuredListRowClassic {...props} />;
}

export function StructuredListCell(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <StructuredListCellNext {...props} />;
  }
  return <StructuredListCellClassic {...props} />;
}

export { default as StructuredListSkeleton } from './StructuredList.Skeleton';
