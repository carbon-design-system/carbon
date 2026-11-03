/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { EmptyStateWithIsometricIllustration } from './preview-components/EmptyStateWithIsometricIllustration';
import { EmptyStateWithPictogramIllustration } from './preview-components/EmptyStateWithPictogramIllustration';
import { EmptyStateUnit } from './preview-components/EmptyStateUnit';
import './index.scss';

export const App = () => {
  const [placement, setPlacement] = useState<'left' | 'centre'>('left');

  return (
    <div>
      <div style={{ padding: '1rem', background: '#f4f4f4', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Empty State Pattern Examples</h1>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
            Empty State unit with isometric illustration
          </h2>
          <EmptyStateWithIsometricIllustration />
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
            Empty State unit with pictogram illustration
          </h2>
          <EmptyStateWithPictogramIllustration />
        </section>
      </div>

      <section>
        <div style={{ padding: '0.5rem 1rem', background: '#e0e0e0' }}>
          <h2 style={{ fontSize: '1.125rem', margin: '0 0 0.5rem' }}>Empty State unit</h2>
          <label>
            Placement:{' '}
            <select
              value={placement}
              onChange={(e) => setPlacement(e.target.value as 'left' | 'centre')}>
              <option value="left">left</option>
              <option value="centre">centre</option>
            </select>
          </label>
        </div>
        <EmptyStateUnit placement={placement} />
      </section>
    </div>
  );
};

export default App;
