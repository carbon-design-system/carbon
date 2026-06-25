/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import { string } from 'prop-types';
import { BreadcrumbWithOverflow } from '../../BreadcrumbWithOverflow';

const makeCrumbs = (n) =>
  Array.from(Array(n)).map((i, idx) => ({
    href: '/#',
    id: `id-${idx}`,
    key: `${idx}`,
    label: `Link ${idx}`,
    onClick: () => {},
  }));

export const Breadcrumbs = ({ className }) => {
  const breadcrumbs = makeCrumbs(4);

  return (
    <BreadcrumbWithOverflow
      className={className}
      breadcrumbs={breadcrumbs}
      overflowAriaLabel="open breadcrumbs"
      label="Breadcrumbs"
    />
  );
};
// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
Breadcrumbs.propTypes = {
  className: string,
};
