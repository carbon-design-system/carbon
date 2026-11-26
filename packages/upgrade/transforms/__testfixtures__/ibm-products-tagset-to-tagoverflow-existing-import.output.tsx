import React from 'react';
import { TagOverflow } from '@carbon/ibm-products';

export function Existing() {
  return (<>
    <TagOverflow items={[{ id: 'a', tagType: 'red', label: 'A' }]} />
    {/* TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled. */}<TagOverflow items={[{
      id: 'b',
      tagType: 'blue',
      label: 'B',
    }]} />
  </>);
}
