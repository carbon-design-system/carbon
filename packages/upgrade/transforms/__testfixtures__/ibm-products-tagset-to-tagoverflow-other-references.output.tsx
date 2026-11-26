import React from 'react';
// TODO: TagSet → TagOverflow migration: TagSet is still referenced outside JSX. Migrate those references to TagOverflow, then remove the TagSet import.
import { TagSet, TagOverflow } from '@carbon/ibm-products';

type Props = React.ComponentProps<typeof TagSet>;

const Alias = TagSet;

export function Other(props: Props) {
  return (
    // TODO: TagSet → TagOverflow migration: rename `type` → `tagType` and add a unique `id` field to each item object.
    // TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled.
    <TagOverflow items={props.tags} />
  );
}

export const el = React.createElement(TagSet, { tags: [] });
