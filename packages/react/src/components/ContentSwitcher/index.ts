/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ComponentClass } from 'react';
import { createClassWrapper } from '../../internal/createClassWrapper';
import ContentSwitcherCarbon, { ContentSwitcherProps } from './ContentSwitcher';

const ContentSwitcher = createClassWrapper(
  ContentSwitcherCarbon as ComponentClass<ContentSwitcherProps>
);
export default ContentSwitcher;
export { ContentSwitcher };
