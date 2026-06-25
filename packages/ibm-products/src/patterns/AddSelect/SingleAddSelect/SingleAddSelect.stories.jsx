/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from '../_story-styles.scss?inline';
import DocsPage from './SingleAddSelect.mdx';
import { SingleAddSelectDefaultPreview } from '../example/preview-components/SingleAddSelectDefault/SingleAddSelectDefault';
import { SingleAddSelectWithHierarchyPreview } from '../example/preview-components/SingleAddSelectWithHierarchy/SingleAddSelectWithHierarchy';
import { AddSingleItemFromHierarchyPreview } from '../example/preview-components/AddSingleItemFromHierarchy/AddSingleItemFromHierarchy';

export default {
  title: 'Patterns/Add and select/SingleAddSelect',
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
      <h1>SingleAddSelect Pattern</h1>
      <p>
        The SingleAddSelect pattern provides complete, copy-paste ready
        implementations for single-selection workflows with Tearsheet and
        success notifications.
      </p>
      <h2>Variants</h2>
      <ul>
        <li>
          <strong>Default</strong> - Simple single selection from a flat list
        </li>
        <li>
          <strong>With Hierarchy</strong> - Single selection with hierarchical
          navigation and breadcrumbs
        </li>
        <li>
          <strong>With Hierarchy and Side Panel</strong> - Single selection with
          hierarchical navigation and side panel for item details
        </li>
      </ul>
      <h2>When to use</h2>
      <ul>
        <li>Users need to select exactly one item</li>
        <li>Selection requires a modal/tearsheet interface</li>
        <li>You need a complete pattern with success feedback</li>
      </ul>
    </div>
  ),
};

export const Default = {
  render: () => <SingleAddSelectDefaultPreview />,
};

Default.storyName = 'Default';

export const WithHierarchy = {
  render: () => <SingleAddSelectWithHierarchyPreview />,
};

WithHierarchy.storyName = 'With Hierarchy';

export const WithHierarchyAndSidePanel = {
  render: () => <AddSingleItemFromHierarchyPreview />,
};

WithHierarchyAndSidePanel.storyName = 'With Hierarchy and Side Panel';
