/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StandardAboutModal } from './preview-components/StandardAboutModal';
import { AboutModalWithAdditionalContent } from './preview-components/AboutModalWithAdditionalContent';

function App() {
  return (
    <div className="example-container">
      <h1>About Modal Examples</h1>

      <section className="example-section">
        <h2>Standard About Modal</h2>
        <StandardAboutModal />
      </section>

      <section className="example-section">
        <h2>About Modal with additional content</h2>
        <AboutModalWithAdditionalContent />
      </section>
    </div>
  );
}

export default App;
