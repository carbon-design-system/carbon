/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import * as CarbonType from '../';

describe('type', () => {
  it('should export type helpers', () => {
    expect(Object.keys(CarbonType)).toMatchInlineSnapshot(`
Array [
  "fontFamilies",
  "fontFamily",
  "fontWeights",
  "fontWeight",
  "print",
  "reset",
  "getTypeSize",
  "scale",
  "fluid",
  "unstable_tokens",
  "styles",
  "caption01",
  "caption02",
  "label01",
  "label02",
  "helperText01",
  "helperText02",
  "bodyShort01",
  "bodyLong01",
  "bodyShort02",
  "bodyLong02",
  "code01",
  "code02",
  "heading01",
  "productiveHeading01",
  "heading02",
  "productiveHeading02",
  "productiveHeading03",
  "productiveHeading04",
  "productiveHeading05",
  "productiveHeading06",
  "productiveHeading07",
  "expressiveHeading01",
  "expressiveHeading02",
  "expressiveHeading03",
  "expressiveHeading04",
  "expressiveHeading05",
  "expressiveHeading06",
  "expressiveParagraph01",
  "quotation01",
  "quotation02",
  "display01",
  "display02",
  "display03",
  "display04",
  "legal01",
  "legal02",
  "bodyCompact01",
  "bodyCompact02",
  "body01",
  "body02",
  "headingCompact01",
  "headingCompact02",
  "heading03",
  "heading04",
  "heading05",
  "heading06",
  "heading07",
  "fluidHeading03",
  "fluidHeading04",
  "fluidHeading05",
  "fluidHeading06",
  "fluidParagraph01",
  "fluidQuotation01",
  "fluidQuotation02",
  "fluidDisplay01",
  "fluidDisplay02",
  "fluidDisplay03",
  "fluidDisplay04",
]
`);
  });
});
