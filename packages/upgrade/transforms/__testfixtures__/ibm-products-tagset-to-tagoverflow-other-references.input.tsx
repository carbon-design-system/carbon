import React from 'react';
import { TagSet } from '@carbon/ibm-products';

type Props = React.ComponentProps<typeof TagSet>;

const Alias = TagSet;

export function Other(props: Props) {
  return <TagSet tags={props.tags} />;
}

export const el = React.createElement(TagSet, { tags: [] });
