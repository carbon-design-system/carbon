// @ts-nocheck — preview_Pagination and preview_PageSelector are untyped JS
// components with no TypeScript declarations, so TS would error on every prop.
import React from 'react';
import { Pagination } from '@carbon/react';

export const Demo = () => (
  // TODO: manually migrate children to the renderPageSelect prop if necessary.
  <Pagination onChange={() => {}} pageSize={10} pageSizes={[10, 20]} totalItems={100} />
);
