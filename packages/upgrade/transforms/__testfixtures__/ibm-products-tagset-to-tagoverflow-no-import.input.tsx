import React from 'react';
import { Tag } from '@carbon/react';

// A local component that happens to be called TagSet is not migrated
const TagSet = ({ tags }) => <div>{tags.length}</div>;

export function Unrelated() {
  return (
    <TagSet tags={[{ type: 'red', label: 'Local' }]}>
      <Tag>One</Tag>
    </TagSet>
  );
}
