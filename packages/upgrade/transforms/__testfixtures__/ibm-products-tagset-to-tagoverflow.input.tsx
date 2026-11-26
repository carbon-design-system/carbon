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

// Duplicate labels and labels that slugify to an empty string get unique ids
export function UniqueIds() {
  return (
    <TagSet
      tags={[
        { type: 'red', label: 'Info' },
        { type: 'blue', label: 'Info' },
        { type: 'green', label: '!!!' },
        { type: 'gray', label: 'Info', id: 'info-1' },
      ]}
    />
  );
}

// Arrays with spread elements can't be fully migrated – transform adds a TODO
export function SpreadTagSet({ extraTags }) {
  return <TagSet tags={[{ type: 'red', label: 'First' }, ...extraTags]} />;
}

// Nested TagSet inside another element, with all default labels provided
export function NestedTagSet() {
  return (
    <div>
      <section>
        <TagSet
          allTagsModalTitle="All tags"
          allTagsModalSearchLabel="Search all tags"
          allTagsModalSearchPlaceholderText="Search all tags"
          showAllTagsLabel="View all tags"
          tags={[{ type: 'red', label: 'Nested' }]}
        />
      </section>
    </div>
  );
}

// Shorthand `type` keeps referencing the variable
export function ShorthandType() {
  const type = 'red';
  return <TagSet tags={[{ type, label: 'Shorthand' }]} />;
}

// Computed `type` keys cannot be renamed safely – transform adds a TODO
export function ComputedType() {
  return <TagSet tags={[{ ['type']: 'blue', label: 'Computed' }]} />;
}

// onOverflowTagChange and allTagsModalTarget changed type – transform adds TODOs
export function ChangedTypes({ onChange, target }) {
  return (
    <TagSet
      onOverflowTagChange={onChange}
      allTagsModalTarget={target}
      tags={[{ type: 'red', label: 'Changed' }]}
    />
  );
}

// Spread props cannot be migrated statically – transform adds a TODO
export function SpreadProps(props) {
  return <TagSet {...props} />;
}
