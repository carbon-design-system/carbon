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
import { AutoSaving } from './preview-components/AutoSaving';
import { ManualSaving } from './preview-components/ManualSaving';

type View = 'auto' | 'manual' | null;

function App() {
  const [view, setView] = useState<View>(null);

  return (
    <div className="example-container">
      <h1>Saving Examples</h1>

      <section className="example-section">
        <div className="example-buttons">
          <Button onClick={() => setView('auto')}>Auto save</Button>
          <Button onClick={() => setView('manual')}>Manual save</Button>
        </div>

        {view === 'auto' && <AutoSaving />}
        {view === 'manual' && <ManualSaving />}
      </section>
    </div>
  );
}

export default App;
