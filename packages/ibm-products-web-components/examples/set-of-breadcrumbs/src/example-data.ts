/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface Breadcrumb {
  text: string;
  href: string;
}

const breadcrumbWords = [
  'Home',
  'Dashboard',
  'Projects',
  'Project Details',
  'Settings',
  'Team',
  'Users',
  'Profile',
  'Notifications',
  'Reports',
  'Analytics',
  'Integrations',
  'Billing',
  'Support',
  'Help Center',
];

interface GenerateBreadcrumbsOptions {
  count: number;
}

export function generateBreadcrumbs({
  count,
}: GenerateBreadcrumbsOptions): Breadcrumb[] {
  return Array.from({ length: count }, (_, index) => {
    const text = breadcrumbWords[index % breadcrumbWords.length];
    const href =
      '/' +
      breadcrumbWords
        .slice(0, index + 1)
        .map((w) => w.toLowerCase().replace(/\s+/g, '-'))
        .join('/');

    return {
      text,
      href,
    };
  });
}

export const breadcrumbsData = generateBreadcrumbs({ count: 5 });
