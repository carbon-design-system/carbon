// @ts-nocheck — preview_Pagination and preview_PageSelector are untyped JS
// components with no TypeScript declarations, so TS would error on every prop.
import React from 'react';
import { Pagination } from '@carbon/react';

// No `pageSizes` — the stable Pagination must render without crashing on
// `sizes[0]` (regression guarded by making `pageSizes` optional).
export const WithoutPageSizes = () => (
  // TODO: manually migrate children to the renderPageSelect prop if necessary.
  <Pagination onChange={() => {}} pageSize={10} totalItems={100} />
);
