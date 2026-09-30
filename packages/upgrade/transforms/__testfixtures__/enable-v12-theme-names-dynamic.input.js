import React from 'react';
import { Theme } from '@carbon/react';

const myTheme = 'white';

// Dynamic expression — codemod cannot statically rename.
// Should receive a data-v12-theme-todo attribute.
function DynamicTheme() {
  return (
    <Theme theme={myTheme}>
      <p>Dynamic theme content</p>
    </Theme>
  );
}

export default DynamicTheme;
