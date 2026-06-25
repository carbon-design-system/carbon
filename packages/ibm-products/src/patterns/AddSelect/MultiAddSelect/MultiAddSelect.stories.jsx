/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from '../_story-styles.scss?inline';
import DocsPage from './MultiAddSelect.mdx';
import { MultiAddSelectDefault } from '../example/preview-components/MultiAddSelectDefault/MultiAddSelectDefault';
import { MultiAddSelectWithHierarchyPreview } from '../example/preview-components/MultiAddSelectWithHierarchy/MultiAddSelectWithHierarchy';
import { MultiAddSelectWithModifiers } from '../example/preview-components/MultiAddSelectWithModifiers/MultiAddSelectWithModifiers';
import { NonHierarchicalWithPeekInsideItemPreview } from '../example/preview-components/NonHierarchicalWithPeekInsideItem/NonHierarchicalWithPeekInsideItem';
import { MultiAddSelectWithHierarchyNoSelectAllPreview } from '../example/preview-components/MultiAddSelectWithHierarchyNoSelectAll/MultiAddSelectWithHierarchyNoSelectAll';

export default {
  title: 'Patterns/Add and select/MultiAddSelect',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: DocsPage,
    },
  },
};

export const Overview = {
  render: () => (
    <div>
      <h1>MultiAddSelect Pattern</h1>
      <p>
        The MultiAddSelect pattern provides a complete, copy-paste ready
        implementation for multi-selection workflows with Tearsheet, selection
        summary, and success notifications.
      </p>
      <h2>When to use</h2>
      <ul>
        <li>Users need to select multiple items from a list</li>
        <li>Selection requires a modal/tearsheet interface</li>
        <li>You need a complete pattern with success feedback</li>
      </ul>
      <h2>Variants</h2>
      <ul>
        <li>
          <strong>Default</strong> - Simple list-based multi-selection
        </li>
        <li>
          <strong>With Hierarchy</strong> - Multi-selection with hierarchical
          navigation and recursive columns
        </li>
        <li>
          <strong>With Modifiers</strong> - Multi-selection with role assignment
          using Dropdown or MultiSelect modifiers
        </li>
        <li>
          <strong>Non-Hierarchical with Peek Inside Item</strong> -
          Multi-selection with the ability to peek inside items to view their
          contents in a middle panel
          <strong>With Hierarchy (No Select All)</strong> - Multi-selection with
          hierarchical navigation but without column-level select-all
          checkboxes. Only individual items can be selected.
        </li>
      </ul>
      <h2>Component structure</h2>
      <p>
        The pattern includes everything you need: Tearsheet, AddSelect
        component, selection summary panel, and toast notifications.
      </p>
    </div>
  ),
};

export const Default = {
  render: () => <MultiAddSelectDefault />,
};

Default.storyName = 'Default';

export const WithHierarchy = {
  render: () => <MultiAddSelectWithHierarchyPreview />,
};

WithHierarchy.storyName = 'With Hierarchy';

export const WithModifiers = {
  render: () => <MultiAddSelectWithModifiers />,
};

WithModifiers.storyName = 'With Modifiers';

export const NonHierarchicalWithPeekInsideItem = {
  render: () => <NonHierarchicalWithPeekInsideItemPreview />,
};

NonHierarchicalWithPeekInsideItem.storyName =
  'Non-Hierarchical with Peek Inside Item';
export const WithHierarchyNoSelectAll = {
  render: () => <MultiAddSelectWithHierarchyNoSelectAllPreview />,
};

WithHierarchyNoSelectAll.storyName = 'With Hierarchy (No Select All)';
