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
import BXProgressIndicator from 'carbon-web-components/es/components-react/progress-indicator/progress-indicator';
// @ts-ignore
import BXProgressStep from 'carbon-web-components/es/components-react/progress-indicator/progress-step';
// @ts-ignore
// eslint-disable-next-line max-len
import BXProgressIndicatorSkeleton from 'carbon-web-components/es/components-react/progress-indicator/progress-indicator-skeleton';
// @ts-ignore
import BXProgressStepSkeleton from 'carbon-web-components/es/components-react/progress-indicator/progress-step-skeleton';
import { Default as baseDefault, skeleton as baseSkeleton } from './progress-indicator-story';

export { default } from './progress-indicator-story';

export const Default = args => {
  const { vertical } = args?.['bx-progress-indicator'];
  const { iconLabel, labelText, secondaryLabelText } = args?.['bx-progress-step'];
  return (
    <BXProgressIndicator vertical={vertical}>
      <BXProgressStep iconLabel={iconLabel} labelText={labelText} secondaryLabelText={secondaryLabelText} state="invalid" />
      <BXProgressStep iconLabel={iconLabel} labelText={labelText} secondaryLabelText={secondaryLabelText} state="complete" />
      <BXProgressStep iconLabel={iconLabel} labelText={labelText} secondaryLabelText={secondaryLabelText} state="current" />
      <BXProgressStep disabled iconLabel={iconLabel} labelText={labelText} secondaryLabelText={secondaryLabelText} />
      <BXProgressStep iconLabel={iconLabel} labelText={labelText} secondaryLabelText={secondaryLabelText} />
    </BXProgressIndicator>
  );
};

Object.assign(Default, baseDefault);

export const skeleton = args => {
  const { vertical } = args?.['bx-progress-indicator-skeleton'];
  return (
    <BXProgressIndicatorSkeleton vertical={vertical}>
      <BXProgressStepSkeleton></BXProgressStepSkeleton>
      <BXProgressStepSkeleton></BXProgressStepSkeleton>
      <BXProgressStepSkeleton></BXProgressStepSkeleton>
    </BXProgressIndicatorSkeleton>
  );
};

Object.assign(skeleton, baseSkeleton);
