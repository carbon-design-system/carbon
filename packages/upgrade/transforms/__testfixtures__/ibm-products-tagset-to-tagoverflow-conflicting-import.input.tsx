import React from 'react';
import { TagSet } from '@carbon/ibm-products';
import { TagOverflow } from './my-components';

export function Conflicting() {
  return (
    <>
      <TagOverflow />
      <TagSet tags={[{ type: 'blue', label: 'B' }]} />
    </>
  );
}
