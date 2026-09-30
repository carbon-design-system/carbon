import React from 'react';
import { Theme } from '@carbon/react';

// g100 → dark migration: should inject a comment about lost contrast.
function G100App() {
  return (
    <Theme theme="g100">
      <p>High-contrast dark content</p>
    </Theme>
  );
}

export default G100App;
