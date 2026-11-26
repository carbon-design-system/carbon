/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Mapping used by `ibm-products-migrate-to-core` to move exports of
 * `@carbon/ibm-products` to `@carbon/react`, `@carbon/utilities` and the
 * Carbon Labs packages.
 *
 * Only names that are listed here are ever touched. In particular, the plain
 * names of components that still have an old API in `@carbon/ibm-products`
 * (`Tearsheet`, `Coachmark`, `PageHeader`, ...) are not mapped, because moving
 * them would silently swap the component for one with a different API.
 */

const PRODUCTS = '@carbon/ibm-products';
const PRODUCTS_UTILITIES = '@carbon/ibm-products-utilities';
const CORE = '@carbon/react';
const UTILITIES = '@carbon/utilities';

const PRODUCTS_SOURCES = [PRODUCTS, PRODUCTS_UTILITIES];
const LIFECYCLE_PREFIXES = ['preview__', 'previewCandidate__'];

/**
 * Members of the `preview__PageHeader` namespace of `@carbon/ibm-products`
 * that need rewriting when the namespace is replaced by the core `PageHeader`.
 * Core exposes the sub-components as static properties (`PageHeader.Root`,
 * `PageHeader.Content`, `PageHeader.TabBar`, ...), so the short names already
 * line up. The long `PageHeader*` names are folded onto them. `null` means
 * "the component itself".
 */
const PAGE_HEADER_MEMBERS = {
  PageHeader: 'Root',
  PageHeaderBreadcrumbBar: 'BreadcrumbBar',
  PageHeaderContent: 'Content',
  PageHeaderContentPageActions: 'ContentPageActions',
  PageHeaderContentText: 'ContentText',
  PageHeaderHeroImage: 'HeroImage',
  PageHeaderTabBar: 'TabBar',
  PageHeaderScrollButton: 'ScrollButton',
  PageHeaderTitleBreadcrumb: 'TitleBreadcrumb',
  PageHeaderBreadcrumbOverflow: 'BreadcrumbOverflow',
  PageHeaderTagOverflow: 'TagOverflow',
  PageHeaderBreadcrumbPageActions: 'BreadcrumbPageActions',
};

/**
 * `@carbon/ibm-products` 2.75.0 to 2.79.x exported NonLinearReading as a
 * namespace, so usage looks like `<NonLinearReading.NonLinearReading>`.
 */
const NON_LINEAR_READING_MEMBERS = {
  NonLinearReading: null,
};

const withPrefixes = (name) => [
  ...LIFECYCLE_PREFIXES.map((prefix) => `${prefix}${name}`),
];

const withPlainAndPrefixes = (name) => [name, ...withPrefixes(name)];

/**
 * @typedef Rule
 * @property {Array<string>} sources - packages the names are imported from
 * @property {string} pkg - package the names are moved to
 * @property {Array<[Array<string>, string]>} names - tuples of
 *   [names to match, name in the new package]
 * @property {object} [memberMap] - namespace members that need rewriting
 */

/** @type {Array<Rule>} */
const rules = [
  {
    sources: [PRODUCTS],
    pkg: CORE,
    names: [
      // AddSelect
      [withPrefixes('AddSelect'), 'AddSelect'],
      [withPrefixes('AddSelectProps'), 'AddSelectProps'],
      [['AddSelectComponentType'], 'AddSelectComponentType'],
      [['AddSelectBodyProps'], 'AddSelectBodyProps'],
      [['AddSelectRowProps'], 'AddSelectRowProps'],
      [['AddSelectContextType'], 'AddSelectContextType'],
      // Coachmark
      [withPrefixes('Coachmark'), 'Coachmark'],
      [withPrefixes('CoachmarkBeacon'), 'CoachmarkBeacon'],
      [withPrefixes('CoachmarkTagline'), 'CoachmarkTagline'],
      [['CoachmarkPropsNext'], 'CoachmarkProps'],
      [['CoachmarkBeaconPropsNext'], 'CoachmarkBeaconProps'],
      [['CoachmarkTaglineProps'], 'CoachmarkTaglineProps'],
      [['CoachmarkComponent'], 'CoachmarkComponent'],
      [['CoachmarkContentProps'], 'CoachmarkContentProps'],
      [['ContentBodyProps'], 'CoachmarkContentBodyProps'],
      [['ContentHeaderProps'], 'CoachmarkContentHeaderProps'],
      // Tearsheet
      [withPrefixes('Tearsheet'), 'Tearsheet'],
      [withPrefixes('TearsheetProps'), 'TearsheetProps'],
      [['StackProvider'], 'StackProvider'],
      [['StackContextType'], 'StackContextType'],
      [['TearsheetComponentType'], 'TearsheetComponentType'],
      [['TearsheetFooterProps'], 'TearsheetFooterProps'],
      [['MainContentProps'], 'MainContentProps'],
      [['SummaryContentProps'], 'SummaryContentProps'],
      [['TearsheetBodyProps'], 'TearsheetBodyProps'],
      [['InfluencerProps'], 'InfluencerProps'],
      [['TearsheetHeaderProps'], 'TearsheetHeaderProps'],
      [['TearsheetNavigationBarProps'], 'TearsheetNavigationBarProps'],
      [['TearsheetScrollButtonProps'], 'TearsheetScrollButtonProps'],
      [['TearsheetHeaderActionItemProps'], 'TearsheetHeaderActionItemProps'],
      [['TearsheetHeaderActionsProps'], 'TearsheetHeaderActionsProps'],
      [['TearsheetHeaderContentProps'], 'TearsheetHeaderContentProps'],
      // ConditionBuilder
      [withPrefixes('ConditionBuilder'), 'ConditionBuilder'],
      [['ConditionBuilderContext'], 'ConditionBuilderContext'],
      [['getEmptyState'], 'getEmptyState'],
      [['ConditionBuilderProps'], 'ConditionBuilderProps'],
    ],
  },
  {
    // `preview__PageHeader` is a namespace in `@carbon/ibm-products`
    sources: [PRODUCTS],
    pkg: CORE,
    names: [[withPrefixes('PageHeader'), 'PageHeader']],
    memberMap: PAGE_HEADER_MEMBERS,
  },
  {
    sources: [PRODUCTS, PRODUCTS_UTILITIES],
    pkg: UTILITIES,
    names: [
      [['AddSelectData'], 'AddSelectData'],
      [['AddSelectItem'], 'AddSelectItem'],
      [['ItemDetailEntry'], 'ItemDetailEntry'],
      [['ItemDetails'], 'ItemDetails'],
      [['ItemStatus'], 'ItemStatus'],
      [['SearchOptions'], 'SearchOptions'],
    ],
  },
  {
    sources: [PRODUCTS],
    pkg: '@carbon-labs/react-cascade',
    names: [
      [withPlainAndPrefixes('Cascade'), 'Cascade'],
      [['CascadeProps'], 'CascadeProps'],
    ],
  },
  {
    sources: [PRODUCTS],
    pkg: '@carbon-labs/react-checklist',
    names: [
      [withPlainAndPrefixes('Checklist'), 'Checklist'],
      [['ChecklistProps'], 'ChecklistProps'],
    ],
  },
  {
    sources: [PRODUCTS],
    pkg: '@carbon-labs/react-non-linear-reading',
    names: [
      [withPlainAndPrefixes('NonLinearReading'), 'NonLinearReading'],
      [['NonLinearReadingProps'], 'NonLinearReadingProps'],
    ],
    memberMap: NON_LINEAR_READING_MEMBERS,
  },
  {
    sources: [PRODUCTS],
    pkg: '@carbon-labs/react-inline-tip',
    names: [
      [withPlainAndPrefixes('InlineTip'), 'InlineTip'],
      [withPlainAndPrefixes('InlineTipButton'), 'InlineTipButton'],
      [withPlainAndPrefixes('InlineTipLink'), 'InlineTipLink'],
      [['InlineTipProps'], 'InlineTipProps'],
      [['InlineTipButtonProps'], 'InlineTipButtonProps'],
      [['InlineTipLinkProps'], 'InlineTipLinkProps'],
    ],
  },
];

const lookup = new Map();
for (const rule of rules) {
  for (const source of rule.sources) {
    for (const [from, to] of rule.names) {
      for (const name of from) {
        lookup.set(`${source}\0${name}`, {
          name: to,
          pkg: rule.pkg,
          memberMap: rule.memberMap,
        });
      }
    }
  }
}

/**
 * @param {string} source - the package the name is imported from
 * @param {string} importedName - the exported name that is being imported
 * @returns {{ name: string, pkg: string, memberMap?: object } | undefined}
 */
function resolveImport(source, importedName) {
  return lookup.get(`${source}\0${importedName}`);
}

const LABS_PACKAGES = Array.from(
  new Set(
    rules
      .map((rule) => rule.pkg)
      .filter((pkg) => pkg.startsWith('@carbon-labs/'))
  )
);

module.exports = {
  PRODUCTS,
  PRODUCTS_SOURCES,
  CORE,
  UTILITIES,
  LABS_PACKAGES,
  resolveImport,
};
