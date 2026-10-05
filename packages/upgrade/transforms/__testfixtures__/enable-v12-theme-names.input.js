import React from 'react';
import { Theme } from '@carbon/react';

function App() {
  return (
    <div>
      {/* white → light */}
      <Theme theme="white">
        <p>White content</p>
      </Theme>

      {/* g10 → light */}
      <Theme theme="g10">
        <p>G10 content</p>
      </Theme>

      {/* g90 → dark */}
      <Theme theme="g90">
        <p>G90 content</p>
      </Theme>

      {/* g100 → dark */}
      <Theme theme="g100">
        <p>G100 content</p>
      </Theme>
    </div>
  );
}

export default App;
