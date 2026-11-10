// @ts-nocheck — unstable_Pagination and unstable_PageSelector are untyped JS
// components with no TypeScript declarations, so TS would error on every prop.
import React from 'react';
import {
  unstable_PageSelector as PageSelector,
  unstable_Pagination as Pagination,
} from '@carbon/react';

// Basic usage: unstable Pagination with a PageSelector
export const WithPageSelector = () => (
  <Pagination
    onChange={() => {}}
    pageSize={10}
    pageSizes={[10, 20, 30]}
    totalItems={350}>
    {({ currentPage, onSetPage, totalPages }) => (
      <PageSelector
        currentPage={currentPage}
        id="select-1"
        onChange={(event) => onSetPage(event.target.value)}
        totalPages={totalPages}
      />
    )}
  </Pagination>
);
