import React from 'react';
import { TagOverflow } from '@carbon/ibm-products';

// Basic usage – tags prop with inline static array
export function BasicTagSet() {
  return (
    // TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled.
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
    // TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled.
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
    // TODO: TagSet → TagOverflow migration: onOverflowClick was removed. TagOverflow has no equivalent and always opens its own "all tags" modal, so reimplement any custom overflow handling manually.
    // TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled.
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
    // TODO: TagSet → TagOverflow migration: containingElementRef was removed. TagOverflow forwards its ref to the root element; use that ref if you need access to the container.
    // TODO: TagSet → TagOverflow migration: measurementOffset was removed. TagOverflow now calculates the offset automatically.
    // TODO: TagSet → TagOverflow migration: multiline was removed. TagOverflow only hides overflowing items, so the multiline layout is no longer available.
    // TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled.
    (<TagOverflow
      items={[{
        id: 'item',
        tagType: 'blue',
        label: 'Item',
      }]} />)
  );
}

// Items that already have an id should NOT get a new one injected
export function ItemsWithId() {
  return (
    // TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled.
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
    // TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled.
    <TagOverflow items={myTags} />
  );
}

// Duplicate labels and labels that slugify to an empty string get unique ids
export function UniqueIds() {
  return (
    // TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled.
    (<TagOverflow
      items={[
        {
          id: 'info',
          tagType: 'red',
          label: 'Info',
        },
        {
          id: 'info-2',
          tagType: 'blue',
          label: 'Info',
        },
        {
          id: 'tag-2',
          tagType: 'green',
          label: '!!!',
        },
        { tagType: 'gray', label: 'Info', id: 'info-1' },
      ]}
    />)
  );
}

// Arrays with spread elements can't be fully migrated – transform adds a TODO
export function SpreadTagSet({ extraTags }) {
  return (
    // TODO: TagSet → TagOverflow migration: rename `type` → `tagType` and add a unique `id` field to each item object.
    // TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled.
    <TagOverflow items={[{
      id: 'first',
      tagType: 'red',
      label: 'First',
    }, ...extraTags]} />
  );
}

// Nested TagSet inside another element, with all default labels provided
export function NestedTagSet() {
  return (
    (<div>
      <section>
        <TagOverflow
          allTagsModalTitle="All tags"
          allTagsModalSearchLabel="Search all tags"
          allTagsModalSearchPlaceholderText="Search all tags"
          showAllTagsLabel="View all tags"
          items={[{
            id: 'nested',
            tagType: 'red',
            label: 'Nested',
          }]}
        />
      </section>
    </div>)
  );
}
