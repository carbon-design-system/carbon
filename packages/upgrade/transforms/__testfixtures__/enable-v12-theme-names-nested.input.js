import React from 'react';
import { Theme } from '@carbon/react';

// Nested: g10 wraps white — both map to light.
// Inner <Theme theme="white"> should become <Layer>.
function NestedSameGroup() {
  return (
    <Theme theme="g10">
      <header>Page header</header>
      <Theme theme="white">
        <main>Card content</main>
      </Theme>
    </Theme>
  );
}

// Nested: g10 wraps g90 — different v12 groups, both rename, neither becomes Layer.
function NestedDifferentGroup() {
  return (
    <Theme theme="g10">
      <Theme theme="g90">
        <p>Dark island</p>
      </Theme>
    </Theme>
  );
}

export { NestedSameGroup, NestedDifferentGroup };
