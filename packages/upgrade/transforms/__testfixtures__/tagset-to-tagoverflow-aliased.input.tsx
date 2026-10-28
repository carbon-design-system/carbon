import React from 'react';
import { TagSet as MyTagSet } from '@carbon/ibm-products';

// Aliased import — the alias must be preserved on the new specifier
export function AliasedTagSet() {
  return (
    <MyTagSet
      tags={[
        { type: 'red', label: 'Critical' },
        { type: 'blue', label: 'Notice' },
      ]}
      overflowAutoAlign
    />
  );
}

// Combined: alias + onOverflowClick removal + deprecated prop
export function AliasedWithExtras({ ref }) {
  return (
    <MyTagSet
      containingElementRef={ref}
      onOverflowClick={() => {}}
      tags={[{ type: 'green', label: 'OK' }]}
    />
  );
}
