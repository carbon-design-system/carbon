// @ts-nocheck — preview_Pagination and preview_PageSelector are untyped JS
// components with no TypeScript declarations, so TS would error on every prop.
import React from 'react';
import {
  preview_PageSelector as PageSelector,
  preview_Pagination as Pagination,
} from '@carbon/react';

// No `pageSizes` — the stable Pagination must render without crashing on
// `sizes[0]` (regression guarded by making `pageSizes` optional).
export const WithoutPageSizes = () => (
  <Pagination onChange={() => {}} pageSize={10} totalItems={100}>
    {({ currentPage, onSetPage, totalPages }) => (
      <PageSelector
        currentPage={currentPage}
        onChange={(e) => onSetPage(e.target.value)}
        totalPages={totalPages}
      />
    )}
  </Pagination>
);
