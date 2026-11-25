import React from 'react';
import { TagOverflow as IbmProductsTagOverflow } from '@carbon/ibm-products';
import { TagOverflow } from './my-components';

export function Conflicting() {
  return (<>
    <TagOverflow />
    {/* TODO: TagSet → TagOverflow migration: TagSet defaulted allTagsModalTitle, allTagsModalSearchLabel, allTagsModalSearchPlaceholderText, showAllTagsLabel; TagOverflow has no defaults. Provide translated values to keep the "view all" link, modal title and search field labelled. */}<IbmProductsTagOverflow items={[{
      id: 'b',
      tagType: 'blue',
      label: 'B',
    }]} />
  </>);
}

