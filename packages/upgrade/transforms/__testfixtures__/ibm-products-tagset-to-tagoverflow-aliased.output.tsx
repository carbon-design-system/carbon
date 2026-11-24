import React from 'react';
import { TagOverflow as MyTagSet } from '@carbon/ibm-products';

// Aliased import — the alias must be preserved on the new specifier
export function AliasedTagSet() {
  return (
    // TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled.
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
    // TODO: TagSet → TagOverflow migration: containingElementRef was removed. TagOverflow forwards its ref to the root element; use that ref if you need access to the container.
    // TODO: TagSet → TagOverflow migration: onOverflowClick was removed. TagOverflow has no equivalent and always opens its own "all tags" modal, so reimplement any custom overflow handling manually.
    // TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled.
    (<MyTagSet
      items={[{
        id: 'ok',
        tagType: 'green',
        label: 'OK',
      }]} />)
  );
}
