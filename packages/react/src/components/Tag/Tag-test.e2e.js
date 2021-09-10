/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/components/tag/_tag.scss';

import React from 'react';
import { mount } from '@cypress/react';
import Tag from './Tag';
import TagSkeleton from './Tag.Skeleton';
import { Tag16 } from '@carbon/icons-react';

describe('Tag', () => {
  beforeEach(() => {
    mount(
      <>
        <Tag>This is a tag</Tag>
        <Tag onClick={() => {}}>This is an interactive tag</Tag>
        <Tag size="sm">This is a small tag</Tag>
        <Tag filter>This is a filter tag</Tag>
        <Tag renderIcon={Tag16}>Custom icon</Tag>
        <Tag filter disabled>
          Disabled filter tag
        </Tag>
        <Tag type="magenta">magenta</Tag>
        <Tag type="red">red</Tag>
        <Tag type="purple">purple</Tag>
        <Tag type="blue">blue</Tag>
        <Tag type="cyan">cyan</Tag>
        <Tag type="teal">teal</Tag>
        <Tag type="green">green</Tag>
        <Tag type="gray">gray</Tag>
        <Tag type="cool-gray">cool-gray</Tag>
        <Tag type="warm-gray">warm-gray</Tag>
        <Tag type="high-contrast">high-contrast</Tag>
        <TagSkeleton />
        <TagSkeleton size="sm" />
      </>
    );
  });

  it('should render', () => {
    cy.findByText(/warm-gray/).should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });
});
