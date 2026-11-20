import React from 'react';
import { TagSet } from '@carbon/ibm-products';

// Basic usage – tags prop with inline static array
export function BasicTagSet() {
  return (
    <TagSet
      tags={[
        { type: 'red', label: 'Danger' },
        { type: 'blue', label: 'Info' },
        { type: 'green', label: 'Success' },
      ]}
    />
  );
}

// overflowAutoAlign prop rename
export function AutoAlignTagSet() {
  return (
    <TagSet
      overflowAutoAlign
      tags={[
        { type: 'red', label: 'Error' },
        { type: 'blue', label: 'Warning' },
      ]}
    />
  );
}

// onOverflowClick should be removed (with a TODO comment)
export function OverflowClickTagSet() {
  return (
    <TagSet
      onOverflowClick={() => console.log('overflow clicked')}
      tags={[{ type: 'red', label: 'Tag' }]}
    />
  );
}

// Deprecated props: containingElementRef, measurementOffset, multiline
export function DeprecatedPropsTagSet({ containerRef }) {
  return (
    <TagSet
      containingElementRef={containerRef}
      measurementOffset={20}
      multiline
      tags={[{ type: 'blue', label: 'Item' }]}
    />
  );
}

// Items that already have an id should NOT get a new one injected
export function ItemsWithId() {
  return (
    <TagSet
      tags={[
        { id: 'existing-1', type: 'red', label: 'Already has ID' },
        { type: 'blue', label: 'Needs ID', id: 'existing-2' },
      ]}
    />
  );
}

// Dynamic (non-static) tags reference – transform applies a TODO comment
export function DynamicTagSet({ myTags }) {
  return <TagSet tags={myTags} />;
}
