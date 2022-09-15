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
import BXSkeletonText from 'carbon-web-components/es/components-react/skeleton-text/skeleton-text';
import { Default as baseDefault } from './skeleton-text-story';

export { default } from './skeleton-text-story';

export const Default = () => <BXSkeletonText />;

export const lines = () => (
  <>
    <BXSkeletonText type="line" />
    <BXSkeletonText type="line" />
    <BXSkeletonText type="line" />
  </>
);

lines.decorators = [story => <div style={{ width: '300px' }}>{story()}</div>];

Object.assign(Default, baseDefault);
