import React from 'react';
import { Theme } from '@carbon/react';

// g100 → dark migration: should inject a comment about lost contrast.
function G100App() {
  return (
    (<Theme theme='dark'>{/* migrated from g100: v12 dark has no separate high-contrast variant — audit if extra contrast was intentional */}
      <p>High-contrast dark content</p>
    </Theme>)
  );
}

export default G100App;
