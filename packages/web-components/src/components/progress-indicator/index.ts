/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSProgressIndicator from './progress-indicator';
import CDSProgressIndicatorSkeleton from './progress-indicator-skeleton';
import CDSProgressStep from './progress-step';
import CDSProgressStepSkeleton from './progress-step-skeleton';

export {
  CDSProgressIndicator,
  CDSProgressIndicatorSkeleton,
  CDSProgressStep,
  CDSProgressStepSkeleton,
};

defineCustomElement(CDSProgressIndicator);
defineCustomElement(CDSProgressIndicatorSkeleton);
defineCustomElement(CDSProgressStep);
defineCustomElement(CDSProgressStepSkeleton);
