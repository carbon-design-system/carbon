// @ts-nocheck — unstable_Pagination and unstable_PageSelector are untyped JS
// components with no TypeScript declarations, so TS would error on every prop.
import React from 'react';
import { Pagination } from '@carbon/react';

// Basic usage: unstable Pagination with a PageSelector
export const WithPageSelector = () => (
  // TODO: manually migrate children to the renderPageSelect prop if necessary.
  <Pagination
    onChange={() => {}}
    pageSize={10}
    pageSizes={[10, 20, 30]}
    totalItems={350} />
);

