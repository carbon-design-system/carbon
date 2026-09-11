/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { StandardCreateFullPage } from './preview-components/StandardCreateFullPage';
import { CreateFullPageWithSections } from './preview-components/CreateFullPageWithSections';
import { CreateFullPageWithHeader } from './preview-components/CreateFullPageWithHeader';
import { CreateFullPageWithStepInErrorState } from './preview-components/CreateFullPageWithStepInErrorState';
import { CreateFullPageWithGlobalHeader } from './preview-components/CreateFullPageWithGlobalHeader';

function App() {
  const [showStandard, setShowStandard] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showGlobalHeader, setShowGlobalHeader] = useState(false);

  if (showStandard) return <StandardCreateFullPage />;
  if (showSections) return <CreateFullPageWithSections />;
  if (showHeader) return <CreateFullPageWithHeader />;
  if (showError) return <CreateFullPageWithStepInErrorState />;
  if (showGlobalHeader) return <CreateFullPageWithGlobalHeader />;

  return (
    <div className="example-container">
      <h1>Create Full Page Examples</h1>

      <section className="example-section">
        <h2>Standard Create Full Page</h2>
        <p>Basic multi-step form with 5 steps</p>
        <Button onClick={() => setShowStandard(true)}>
          Launch Standard Full Page
        </Button>
      </section>

      <section className="example-section">
        <h2>Create Full Page with Sections</h2>
        <p>Form with section dividers within steps</p>
        <Button onClick={() => setShowSections(true)}>
          Launch Full Page with Sections
        </Button>
      </section>

      <section className="example-section">
        <h2>Create Full Page with Header</h2>
        <p>Includes breadcrumbs and page title</p>
        <Button onClick={() => setShowHeader(true)}>
          Launch Full Page with Header
        </Button>
      </section>

      <section className="example-section">
        <h2>Create Full Page with Step in Error State</h2>
        <p>Demonstrates error handling and validation</p>
        <Button onClick={() => setShowError(true)}>
          Launch Full Page with Error State
        </Button>
      </section>

      <section className="example-section">
        <h2>Create Full Page with Global Header</h2>
        <p>Integration with Carbon global header and side nav</p>
        <Button onClick={() => setShowGlobalHeader(true)}>
          Launch Full Page with Global Header
        </Button>
      </section>
    </div>
  );
}

export default App;
