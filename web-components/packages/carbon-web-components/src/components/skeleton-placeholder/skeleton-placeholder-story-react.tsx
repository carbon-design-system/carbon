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
import BXSkeletonPlaceholder from 'carbon-web-components/es/components-react/skeleton-placeholder/skeleton-placeholder';
import { Default as baseDefault } from './skeleton-placeholder-story';

export { default } from './skeleton-placeholder-story';

export const Default = () => <BXSkeletonPlaceholder />;

Object.assign(Default, baseDefault);
