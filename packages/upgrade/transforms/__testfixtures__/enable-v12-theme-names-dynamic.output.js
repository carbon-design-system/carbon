import React from 'react';
import { Theme } from '@carbon/react';

const myTheme = 'white';

// Dynamic expression — codemod cannot statically rename.
// Should receive a data-v12-theme-todo attribute.
function DynamicTheme() {
  return (
    (<Theme
      theme={myTheme}
      data-v12-theme-todo='TODO(v12): rename theme value (white/g10→light, g90/g100→dark)'>
      <p>Dynamic theme content</p>
    </Theme>)
  );
}

export default DynamicTheme;
