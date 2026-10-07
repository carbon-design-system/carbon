/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StandardImportAndUpload } from './preview-components/StandardImportAndUpload';

function App() {
  return (
    <div className="example-container">
      <h1>Import and Upload Examples</h1>

      <section className="example-section">
        <h2>Standard Import and Upload</h2>
        <StandardImportAndUpload />
      </section>
    </div>
  );
}

export default App;
