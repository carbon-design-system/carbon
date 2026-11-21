/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { SingleAddSelectDefaultPreview } from './preview-components/SingleAddSelectDefault/SingleAddSelectDefault';
import { SingleAddSelectWithHierarchyPreview } from './preview-components/SingleAddSelectWithHierarchy/SingleAddSelectWithHierarchy';
import { AddSingleItemFromHierarchyPreview } from './preview-components/AddSingleItemFromHierarchy/AddSingleItemFromHierarchy';
import { MultiAddSelectDefault } from './preview-components/MultiAddSelectDefault/MultiAddSelectDefault';
import { MultiAddSelectWithHierarchyPreview } from './preview-components/MultiAddSelectWithHierarchy/MultiAddSelectWithHierarchy';
import { MultiAddSelectWithModifiers } from './preview-components/MultiAddSelectWithModifiers/MultiAddSelectWithModifiers';
import { NonHierarchicalWithPeekInsideItemPreview } from './preview-components/NonHierarchicalWithPeekInsideItem/NonHierarchicalWithPeekInsideItem';
import { MultiAddSelectWithHierarchyNoSelectAllPreview } from './preview-components/MultiAddSelectWithHierarchyNoSelectAll/MultiAddSelectWithHierarchyNoSelectAll';
import { MultiSelectWithBulkActionsPreview } from './preview-components/MultiSelectWithBulkActions/MultiSelectWithBulkActions';
import { MultiAddSelectWithGlobalActionsPreview } from './preview-components/MultiAddSelectWithGlobalActions/MultiAddSelectWithGlobalActions';
import { MultiAddSelectWithColumnActionsPreview } from './preview-components/MultiAddSelectWithColumnActions/MultiAddSelectWithColumnActions';
import { MultiSelectWithScrollPreview } from './preview-components/MultiSelectWithScroll/MultiSelectWithScroll';
import { MultiAddSelectWithDataTablePreview } from './preview-components/MultiAddSelectWithDataTable/MultiAddSelectWithDataTable';

function App() {
  return (
    <div className="example-container" style={{ padding: '2rem' }}>
      <h1>AddSelect pattern examples</h1>
      <p style={{ marginBottom: '2rem' }}>
        Examples demonstrating the AddSelect patterns and their preview
        variants.
      </p>

      <section className="example-section" style={{ marginBottom: '3rem' }}>
        <h2>Single selection patterns</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Examples for selecting one item from a flat list or hierarchy.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '2rem',
          }}
        >
          <SingleAddSelectDefaultPreview />
          <SingleAddSelectWithHierarchyPreview />
          <AddSingleItemFromHierarchyPreview />
        </div>
      </section>

      <section className="example-section">
        <h2>Multi selection patterns</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Examples for selecting multiple items, including hierarchy, modifiers,
          and peek-inside variants.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '2rem',
          }}
        >
          <MultiAddSelectDefault />
          <MultiAddSelectWithHierarchyPreview />
          <MultiAddSelectWithModifiers />
          <NonHierarchicalWithPeekInsideItemPreview />
          <MultiAddSelectWithHierarchyNoSelectAllPreview />
          <MultiSelectWithBulkActionsPreview />
          <MultiAddSelectWithGlobalActionsPreview />
          <MultiAddSelectWithColumnActionsPreview />
          <MultiSelectWithScrollPreview />
          <MultiAddSelectWithDataTablePreview />
        </div>
      </section>
    </div>
  );
}

export default App;
