/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { ContentSwitcher, Switch } from '@carbon/react';
import { CarouselExample } from './components/CarouselExample';
import { ViewStackExample } from './components/ViewStackExample';
import '@carbon/ibm-products/css/index.min.css';

function App() {
  const [selectedExample, setSelectedExample] = useState(0);

  return (
    <div className="app">
      <div style={{ padding: '2rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>Carousel Utility Examples</h1>

        <ContentSwitcher
          selectedIndex={selectedExample}
          onChange={(e) => setSelectedExample(e.index ?? 0)}
        >
          <Switch name="carousel" text="Standard Carousel" />
          <Switch name="viewStack" text="ViewStack Navigation" />
        </ContentSwitcher>

        <div style={{ marginTop: '2rem' }}>
          {selectedExample === 0 ? <CarouselExample /> : <ViewStackExample />}
        </div>
      </div>
    </div>
  );
}

export default App;
