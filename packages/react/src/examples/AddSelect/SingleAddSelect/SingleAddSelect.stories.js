/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import '../_story-styles.scss';
import DocsPage from './SingleAddSelect.mdx';
import { SingleAddSelectDefaultPreview } from '../example/preview-components/SingleAddSelectDefault/SingleAddSelectDefault';
import { SingleAddSelectWithHierarchyPreview } from '../example/preview-components/SingleAddSelectWithHierarchy/SingleAddSelectWithHierarchy';
import { AddSingleItemFromHierarchyPreview } from '../example/preview-components/AddSingleItemFromHierarchy/AddSingleItemFromHierarchy';

export default {
  title: 'Examples/Add and select/SingleAddSelect',
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
    <SingleAddSelectDefaultPreview initialOpen={context.viewMode !== 'docs'} />
  ),
};

Default.storyName = 'Default';

export const WithHierarchy = {
  render: (_args, context) => (
    <SingleAddSelectWithHierarchyPreview
      initialOpen={context.viewMode !== 'docs'}
    />
  ),
};

WithHierarchy.storyName = 'With Hierarchy';

export const WithHierarchyAndSidePanel = {
  render: (_args, context) => (
    <AddSingleItemFromHierarchyPreview
      initialOpen={context.viewMode !== 'docs'}
    />
  ),
};

WithHierarchyAndSidePanel.storyName = 'With Hierarchy and Side Panel';
