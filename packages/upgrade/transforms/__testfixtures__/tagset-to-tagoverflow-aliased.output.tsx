import React from 'react';
import { TagOverflow as MyTagSet } from '@carbon/ibm-products';

// Aliased import — the alias must be preserved on the new specifier
export function AliasedTagSet() {
  return (
    (<MyTagSet
      items={[
        {
          id: 'critical',
          tagType: 'red',
          label: 'Critical',
        },
        {
          id: 'notice',
          tagType: 'blue',
          label: 'Notice',
        },
      ]}
      autoAlign
    />)
  );
}

// Combined: alias + onOverflowClick removal + deprecated prop
export function AliasedWithExtras({ ref }) {
  return (
    // TODO: TagSet → TagOverflow migration: onOverflowClick has no direct equivalent in TagOverflow. Handle overflow manually or remove this prop.
    (<MyTagSet
      // @deprecated containingElementRef is deprecated in TagOverflow; review before removing
      containingElementRef={ref}
      items={[{
        id: 'ok',
        tagType: 'green',
        label: 'OK',
      }]} />)
  );
}
