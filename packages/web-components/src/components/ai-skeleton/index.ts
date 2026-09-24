/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../skeleton-icon/index';
import '../skeleton-placeholder/index';
import '../skeleton-text/index';
import CDSAISkeletonIcon from './ai-skeleton-icon';
import CDSAISkeletonPlaceholder from './ai-skeleton-placeholder';
import CDSAISkeletonText from './ai-skeleton-text';

export { CDSAISkeletonIcon, CDSAISkeletonPlaceholder, CDSAISkeletonText };

defineCustomElement(CDSAISkeletonIcon);
defineCustomElement(CDSAISkeletonPlaceholder);
defineCustomElement(CDSAISkeletonText);
