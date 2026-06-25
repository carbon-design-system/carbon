/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { InstantGenerate } from './preview-components/InstantGenerate';
import { Generate } from './preview-components/Generate';
import { Edit } from './preview-components/Edit';

function App() {
  return (
    <div className="example-container">
      <h1>Generate an API Key Examples</h1>

      <section className="example-section">
        <h2>Instant Generate</h2>
        <InstantGenerate />
      </section>

      <section className="example-section">
        <h2>Generate</h2>
        <Generate />
      </section>

      <section className="example-section">
        <h2>Edit</h2>
        <Edit />
      </section>
    </div>
  );
}

export default App;
