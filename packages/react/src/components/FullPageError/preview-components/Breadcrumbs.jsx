/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import BreadcrumbItem from '../../Breadcrumb/BreadcrumbItem';

const makeCrumbs = (n) =>
  Array.from(Array(n)).map((i, idx) => ({
    href: '/#',
    id: `id-${idx}`,
    key: `${idx}`,
    label: `Link ${idx}`,
    onClick: () => {},
  }));

// eslint-disable-next-line react/prop-types
export const Breadcrumbs = ({ className }) => {
  const breadcrumbs = makeCrumbs(4);

  return (
    <Breadcrumb className={className}>
      {breadcrumbs.map((crumb) => (
        <BreadcrumbItem key={crumb.key} href={crumb.href}>
          {crumb.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
