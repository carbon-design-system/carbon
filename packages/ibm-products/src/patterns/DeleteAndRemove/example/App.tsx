/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { HighImpactDeletion } from './preview-components/HighImpactDeletion';
import { HighImpactDeletionWithConnectedItems } from './preview-components/HighImpactDeletionWithConnectedItems';
import { HighImpactBatchDeletion } from './preview-components/HighImpactBatchDeletion';
import { MediumImpactDeletion } from './preview-components/MediumImpactDeletion';
import { LowImpactDeletion } from './preview-components/LowImpactDeletion';

function App() {
  return (
    <div className="example-container">
      <h1>Delete and Remove Examples</h1>

      <section className="example-section">
        <h2>High Impact Deletion</h2>
        <HighImpactDeletion />
      </section>

      <section className="example-section">
        <h2>Deletion with Connected Items</h2>
        <HighImpactDeletionWithConnectedItems />
      </section>

      <section className="example-section">
        <h2>Batch Deletion</h2>
        <HighImpactBatchDeletion />
      </section>

      <section className="example-section">
        <h2>Medium Impact Deletion</h2>
        <MediumImpactDeletion />
      </section>

      <section className="example-section">
        <h2>Low Impact Deletion</h2>
        <LowImpactDeletion />
      </section>
    </div>
  );
}

export default App;
