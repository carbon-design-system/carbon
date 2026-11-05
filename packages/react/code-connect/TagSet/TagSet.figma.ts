// url=https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=9322%3A404195
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/TagOverflow/TagOverflow.tsx
// component=TagSet

/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  const hasOverflow = instance.getBoolean('Tag overflow');

  const tagsArray = hasOverflow
    ? figma.code`{[
    { label: 'Tag 1', id: 'tag-1', tagType: 'blue' },
    { label: 'Tag 2', id: 'tag-2', tagType: 'blue' },
    { label: 'Tag 3', id: 'tag-3', tagType: 'blue' },
    { label: 'Tag 4', id: 'tag-4', tagType: 'blue' },
    { label: 'Tag 5', id: 'tag-5', tagType: 'blue' },
    { label: 'Tag 6', id: 'tag-6', tagType: 'blue' },
    { label: 'Tag 7', id: 'tag-7', tagType: 'blue' },
    { label: 'Tag 8', id: 'tag-8', tagType: 'blue' },
    { label: 'Tag 9', id: 'tag-9', tagType: 'blue' },
    { label: 'Tag 10', id: 'tag-10', tagType: 'blue' },
    { label: 'Tag 11', id: 'tag-11', tagType: 'blue' },
    { label: 'Tag 12', id: 'tag-12', tagType: 'blue' },
  ]}`
    : figma.code`{[
    { label: 'Tag 1', id: 'tag-1', tagType: 'blue' },
    { label: 'Tag 2', id: 'tag-2', tagType: 'blue' },
    { label: 'Tag 3', id: 'tag-3', tagType: 'blue' },
  ]}`;

  return {
    id: 'TagSet',
    imports: ["import { TagOverflow } from '@carbon/react';"],
    example: figma.code`<TagOverflow items=${tagsArray} />`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
