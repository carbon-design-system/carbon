/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FeatureFlags } from '@carbon/react';
import { Default } from './preview-components/Default';
import { WithSequence } from './preview-components/WithSequence';
import { WithMediaAndPictogram } from './preview-components/WithMediaAndPictogram';
import { WithMediaAndSequence } from './preview-components/WithMediaAndSequence';
import { WithHorizontalMedia } from './preview-components/WithHorizontalMedia';
import { WithAILabelAndActions } from './preview-components/WithAILabelAndActions';
import { WithDisabled } from './preview-components/WithDisabled';
import './styles/_story-styles.scss';

// This example targets v12, so the Card is told the v12 release is enabled.
export const App = () => (
  <FeatureFlags enableV12Release>
    <div className="get-started-card-example">
      <Default />
      <WithSequence />
      <WithMediaAndPictogram />
      <WithMediaAndSequence />
      <WithHorizontalMedia />
      <WithAILabelAndActions />
      <WithDisabled />
    </div>
  </FeatureFlags>
);

export default App;
