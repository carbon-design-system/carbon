/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Updates imports for non-stable components
 *
 * @example
 * Before:
 * import { SearchBar, InlineTip } from '@carbon/ibm-products';
 *
 * After:
 * import { previewCandidate__SearchBar, previewCandidate__InlineTip } from "@carbon/ibm-products";
 */

const nonStableMap = {
  BigNumber: 'previewCandidate__BigNumber',
  BigNumbers: 'previewCandidate__BigNumber',
  Coachmark: 'previewCandidate__Coachmark',
  ConditionBuilder: 'previewCandidate__ConditionBuilder',
  DataSpreadsheet: 'previewCandidate__DataSpreadsheet',
  Decorator: 'previewCandidate__Decorator',
  DelimitedList: 'previewCandidate__DelimitedList',
  GetStartedCard: 'previewCandidate__GetStartedCard',
  GuideBanner: 'previewCandidate__Guidebanner',
  GuidebannerElement: 'previewCandidate__GuidebannerElement',
  GuidebannerElementButton: 'previewCandidate__GuidebannerElementButton',
  GuidebannerElementLink: 'previewCandidate__GuidebannerElementLink',
  InlineTip: 'previewCandidate__InlineTip',
  InlineTipButton: 'previewCandidate__InlineTipButton',
  InlineTipLink: 'previewCandidate__InlineTipLink',
  NonLinearReading: 'previewCandidate__NonLinearReading',
  SearchBar: 'previewCandidate__SearchBar',
  Toolbar: 'previewCandidate__Toolbar',
  ToolbarButton: 'previewCandidate__ToolbarButton',
  ToolbarGroup: 'previewCandidate__ToolbarGroup',
  TruncatedList: 'previewCandidate__TruncatedList',
};
const nonStableComponentKeys = Object.keys(nonStableMap);

function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportDeclaration, {
      source: {
        value: '@carbon/ibm-products',
      },
    })
    .find(j.ImportSpecifier)
    .filter(
      (path) => !!nonStableComponentKeys.includes(path.node.imported.name)
    )
    .replaceWith((path) =>
      j.importSpecifier(j.identifier(nonStableMap[path.node.imported.name]))
    )
    .toSource();
}

module.exports = transformer;
