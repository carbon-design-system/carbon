import React from 'react';
import { Theme, Layer } from '@carbon/react';

// Nested: g10 wraps white — both map to light.
// Inner <Theme theme="white"> should become <Layer>.
function NestedSameGroup() {
  return (
    (<Theme theme='light'>
      <header>Page header</header>
      <Layer>
        <main>Card content</main>
      </Layer>
    </Theme>)
  );
}

// Nested: g10 wraps g90 — different v12 groups, both rename, neither becomes Layer.
function NestedDifferentGroup() {
  return (
    (<Theme theme='light'>
      <Theme theme='dark'>
        <p>Dark island</p>
      </Theme>
    </Theme>)
  );
}

export { NestedSameGroup, NestedDifferentGroup };
