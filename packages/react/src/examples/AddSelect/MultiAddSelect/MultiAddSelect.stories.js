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
    layout: 'fullscreen',
    docs: {
      page: DocsPage,
    },
  },
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
