/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Default } from './preview-components/Default';
import { WithSequence } from './preview-components/WithSequence';
import { WithMediaAndPictogram } from './preview-components/WithMediaAndPictogram';
import { WithMediaAndSequence } from './preview-components/WithMediaAndSequence';
import { WithDisabled } from './preview-components/WithDisabled';
import './styles/_story-styles.scss';

export const App = () => (
  <div className="get-started-card-example">
    <Default />
    <WithSequence />
    <WithMediaAndPictogram />
    <WithMediaAndSequence />
    <WithDisabled />
  </div>
);

export default App;
