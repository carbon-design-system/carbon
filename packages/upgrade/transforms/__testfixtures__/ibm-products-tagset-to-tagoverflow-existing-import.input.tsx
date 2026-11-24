import React from 'react';
import { TagOverflow, TagSet } from '@carbon/ibm-products';

export function Existing() {
  return (
    <>
      <TagOverflow items={[{ id: 'a', tagType: 'red', label: 'A' }]} />
      <TagSet tags={[{ type: 'blue', label: 'B' }]} />
    </>
  );
}
