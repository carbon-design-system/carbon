/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import '../_story-styles.scss';
import DocsPage from './MultiAddSelect.mdx';
import { MultiAddSelectDefault } from '../example/preview-components/MultiAddSelectDefault/MultiAddSelectDefault';
import { MultiAddSelectWithHierarchyPreview } from '../example/preview-components/MultiAddSelectWithHierarchy/MultiAddSelectWithHierarchy';
import { MultiAddSelectWithModifiers } from '../example/preview-components/MultiAddSelectWithModifiers/MultiAddSelectWithModifiers';
import { NonHierarchicalWithPeekInsideItemPreview } from '../example/preview-components/NonHierarchicalWithPeekInsideItem/NonHierarchicalWithPeekInsideItem';
import { MultiAddSelectWithHierarchyNoSelectAllPreview } from '../example/preview-components/MultiAddSelectWithHierarchyNoSelectAll/MultiAddSelectWithHierarchyNoSelectAll';
import { MultiSelectWithBulkActionsPreview } from '../example/preview-components/MultiSelectWithBulkActions/MultiSelectWithBulkActions';
import { MultiAddSelectWithGlobalActionsPreview } from '../example/preview-components/MultiAddSelectWithGlobalActions/MultiAddSelectWithGlobalActions';
import { MultiAddSelectWithColumnActionsPreview } from '../example/preview-components/MultiAddSelectWithColumnActions/MultiAddSelectWithColumnActions';
import { MultiSelectWithScrollPreview } from '../example/preview-components/MultiSelectWithScroll/MultiSelectWithScroll';
import { MultiAddSelectWithDataTablePreview } from '../example/preview-components/MultiAddSelectWithDataTable/MultiAddSelectWithDataTable';

export default {
  title: 'Examples/Add and select/MultiAddSelect',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
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
        </li>
        <li>
          <strong>With Hierarchy (No Select All)</strong> - Multi-selection with
          hierarchical navigation but without column-level select-all
          checkboxes. Only individual items can be selected.
        </li>
        <li>
          <strong>With Modifiers and Bulk Actions</strong> - Multi-selection
          with role modifiers and bulk action support for editing or removing
          multiple selected items at once.
        </li>
        <li>
          <strong>With Global Actions</strong> - Multi-selection with
          hierarchical navigation and global search, filter, and sort
          capabilities across all columns.
        </li>
        <li>
          <strong>With Column Actions</strong> - Multi-selection with
          hierarchical navigation and column-level filter and sort capabilities,
          without global actions.
        </li>
        <li>
          <strong>With Scroll (progressive loading)</strong> - Multi-selection
          from large datasets that load progressively as the user scrolls.
          Includes skeleton loading rows and a scroll hint at the bottom.
        </li>
        <li>
          <strong>With DataTable</strong> - Multi-selection using a Carbon
          DataTable with checkboxes, suited for items with multiple attributes
          displayed in columnar form.
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
  render: (_args, context) => (
    <MultiAddSelectDefault initialOpen={context.viewMode !== 'docs'} />
  ),
};

Default.storyName = 'Default';

export const WithHierarchy = {
  render: (_args, context) => (
    <MultiAddSelectWithHierarchyPreview
      initialOpen={context.viewMode !== 'docs'}
    />
  ),
};

WithHierarchy.storyName = 'With Hierarchy';

export const WithModifiers = {
  render: (_args, context) => (
    <MultiAddSelectWithModifiers initialOpen={context.viewMode !== 'docs'} />
  ),
};

WithModifiers.storyName = 'With Modifiers';

export const NonHierarchicalWithPeekInsideItem = {
  render: (_args, context) => (
    <NonHierarchicalWithPeekInsideItemPreview
      initialOpen={context.viewMode !== 'docs'}
    />
  ),
};

NonHierarchicalWithPeekInsideItem.storyName =
  'Non-Hierarchical with Peek Inside Item';

export const WithHierarchyNoSelectAll = {
  render: (_args, context) => (
    <MultiAddSelectWithHierarchyNoSelectAllPreview
      initialOpen={context.viewMode !== 'docs'}
    />
  ),
};

WithHierarchyNoSelectAll.storyName = 'With Hierarchy (No Select All)';

export const WithModifiersAndBulkActions = {
  render: (_args, context) => (
    <MultiSelectWithBulkActionsPreview
      initialOpen={context.viewMode !== 'docs'}
    />
  ),
};

WithModifiersAndBulkActions.storyName = 'With Modifiers and Bulk Actions';

export const WithGlobalActions = {
  render: (_args, context) => (
    <MultiAddSelectWithGlobalActionsPreview
      initialOpen={context.viewMode !== 'docs'}
    />
  ),
};

WithGlobalActions.storyName = 'With Global Actions';

export const WithColumnActions = {
  render: (_args, context) => (
    <MultiAddSelectWithColumnActionsPreview
      initialOpen={context.viewMode !== 'docs'}
    />
  ),
};

WithColumnActions.storyName = 'With Column Actions';

export const WithScroll = {
  render: (_args, context) => (
    <MultiSelectWithScrollPreview initialOpen={context.viewMode !== 'docs'} />
  ),
};

WithScroll.storyName = 'With Scroll (progressive loading)';

export const WithDataTable = {
  render: (_args, context) => (
    <MultiAddSelectWithDataTablePreview
      initialOpen={context.viewMode !== 'docs'}
    />
  ),
};

WithDataTable.storyName = 'With DataTable';
