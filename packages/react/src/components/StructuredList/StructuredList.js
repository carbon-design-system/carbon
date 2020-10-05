/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { useDeprecatedImport } from '../../internal/useDeprecatedImport';

import OriginalStructuredListBody from './StructuredListBody';
import OriginalStructuredListCell from './StructuredListCell';
import OriginalStructuredListHead from './StructuredListHead';
import OriginalStructuredListInput from './StructuredListInput';
import OriginalStructuredListRow from './StructuredListRow';
import OriginalStructuredListWrapper from './StructuredListWrapper';

export const StructuredListBody = (props) => {
  useDeprecatedImport(
    'Import StructuredListBody from StructuredList/StructuredList is deprecated and it will be removed in the next major version. Please use StructuredList/ProgressStep.'
  );

  return <OriginalStructuredListBody {...props} />;
};

export const StructuredListCell = (props) => {
  useDeprecatedImport(
    'Import StructuredListCell from StructuredList/StructuredList is deprecated and it will be removed in the next major version. Please use StructuredList/StructuredListCell.'
  );

  return <OriginalStructuredListCell {...props} />;
};

export const StructuredListHead = (props) => {
  useDeprecatedImport(
    'Import StructuredListHead from StructuredList/StructuredList is deprecated and it will be removed in the next major version. Please use StructuredList/StructuredListHead.'
  );

  return <OriginalStructuredListHead {...props} />;
};

export const StructuredListInput = (props) => {
  useDeprecatedImport(
    'Import StructuredListInput from StructuredList/StructuredList is deprecated and it will be removed in the next major version. Please use StructuredList/StructuredListInput.'
  );

  return <OriginalStructuredListInput {...props} />;
};

export const StructuredListRow = (props) => {
  useDeprecatedImport(
    'Import StructuredListRow from StructuredList/StructuredList is deprecated and it will be removed in the next major version. Please use StructuredList/StructuredListRow.'
  );

  return <OriginalStructuredListRow {...props} />;
};

export const StructuredListWrapper = (props) => {
  useDeprecatedImport(
    'Import StructuredListWrapper from StructuredList/StructuredList is deprecated and it will be removed in the next major version. Please use StructuredList/StructuredListWrapper.'
  );

  return <OriginalStructuredListWrapper {...props} />;
};
