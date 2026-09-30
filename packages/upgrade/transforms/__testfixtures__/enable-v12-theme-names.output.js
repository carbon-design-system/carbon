import React from 'react';
import { Theme } from '@carbon/react';

function App() {
  return (
    (<div>
      {/* white → light */}
      <Theme theme='light'>
        <p>White content</p>
      </Theme>
      {/* g10 → light */}
      <Theme theme='light'>
        <p>G10 content</p>
      </Theme>
      {/* g90 → dark */}
      <Theme theme='dark'>
        <p>G90 content</p>
      </Theme>
      {/* g100 → dark */}
      <Theme theme='dark'>{/* migrated from g100: v12 dark has no separate high-contrast variant — audit if extra contrast was intentional */}
        <p>G100 content</p>
      </Theme>
    </div>)
  );
}

export default App;
