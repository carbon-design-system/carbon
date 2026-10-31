import React from 'react';
import { TagOverflow } from '@carbon/ibm-products';

// Basic usage – tags prop with inline static array
export function BasicTagSet() {
  return (
    (<TagOverflow
      items={[
        {
          id: 'danger',
          tagType: 'red',
          label: 'Danger',
        },
        {
          id: 'info',
          tagType: 'blue',
          label: 'Info',
        },
        {
          id: 'success',
          tagType: 'green',
          label: 'Success',
        },
      ]}
    />)
  );
}

// overflowAutoAlign prop rename
export function AutoAlignTagSet() {
  return (
    (<TagOverflow
      autoAlign
      items={[
        {
          id: 'error',
          tagType: 'red',
          label: 'Error',
        },
        {
          id: 'warning',
          tagType: 'blue',
          label: 'Warning',
        },
      ]}
    />)
  );
}

// onOverflowClick should be removed (with a TODO comment)
export function OverflowClickTagSet() {
  return (
    // TODO: TagSet → TagOverflow migration: onOverflowClick has no direct equivalent in TagOverflow. Handle overflow manually or remove this prop.
    (<TagOverflow
      items={[{
        id: 'tag',
        tagType: 'red',
        label: 'Tag',
      }]} />)
  );
}

// Deprecated props: containingElementRef, measurementOffset, multiline
export function DeprecatedPropsTagSet({ containerRef }) {
  return (
    (<TagOverflow
      // @deprecated containingElementRef — safe to remove; see TagOverflow docs
      containingElementRef={containerRef}
      // @deprecated measurementOffset — safe to remove; see TagOverflow docs
      measurementOffset={20}
      // @deprecated multiline — safe to remove; see TagOverflow docs
      multiline
      items={[{
        id: 'item',
        tagType: 'blue',
        label: 'Item',
      }]}
    />)
  );
}

// Items that already have an id should NOT get a new one injected
export function ItemsWithId() {
  return (
    (<TagOverflow
      items={[
        { id: 'existing-1', tagType: 'red', label: 'Already has ID' },
        { tagType: 'blue', label: 'Needs ID', id: 'existing-2' },
      ]}
    />)
  );
}

// Dynamic (non-static) tags reference – transform applies a TODO comment
export function DynamicTagSet({ myTags }) {
  return (
    // TODO: TagSet → TagOverflow migration: rename `type` → `tagType` and add a unique `id` field to each item object.
    <TagOverflow items={myTags} />
  );
}
