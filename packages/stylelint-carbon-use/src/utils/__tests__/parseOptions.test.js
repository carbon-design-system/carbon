/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseOptions } from '..';

describe('parseOptions', () => {
  const defaults = {
    includeProps: ['1', '3', '4'],
    acceptValues: ['1', '5', '6'],
    acceptCarbonColorTokens: false,
    acceptIBMColorTokens: false,
    acceptUndefinedVariables: true,
  };

  const options1 = undefined;

  it('Uses default options when options undefined', () => {
    expect(parseOptions(options1, defaults)).toEqual(defaults);
  });

  const options2 = {};

  it('Uses default options when options {}', () => {
    expect(parseOptions(options2, defaults)).toEqual(defaults);
  });

  const options3 = { includeProps: [] };

  it('Uses default options when options without acceptValues', () => {
    expect(parseOptions(options3, defaults)).toEqual(defaults);
  });

  const options4 = { acceptValues: [] };

  it('Uses default options when options without includeProps', () => {
    expect(parseOptions(options4, defaults)).toEqual(defaults);
  });

  const options5 = {
    includeProps: ['*'],
    acceptValues: ['*'],
  };

  it('Uses default options when using * only', () => {
    expect(parseOptions(options5, defaults)).toEqual(defaults);
  });

  const options6 = {
    includeProps: ['*', 'banana'],
    acceptValues: ['fish', '*'],
  };

  const combinedOpts1 = {
    includeProps: ['banana'].concat(defaults.includeProps),
    acceptValues: ['fish'].concat(defaults.acceptValues),
    acceptCarbonColorTokens: false,
    acceptIBMColorTokens: false,
    acceptUndefinedVariables: true,
  };

  it('Adds default options when using *', () => {
    expect(parseOptions(options6, defaults)).toEqual(combinedOpts1);
  });

  const options7 = {
    includeProps: ['*', 'cake', '2', '3'],
    acceptValues: ['eagle', '*', '5', '7'],
  };

  const combinedOpts2 = {
    includeProps: ['cake', '2', '3'].concat(
      defaults.includeProps.filter((item) => item !== '3')
    ),
    acceptValues: ['eagle', '5', '7'].concat(
      defaults.acceptValues.filter((item) => item !== '5')
    ),
    acceptCarbonColorTokens: false,
    acceptIBMColorTokens: false,
    acceptUndefinedVariables: true,
  };

  it('Combines default options when using *', () => {
    expect(parseOptions(options7, defaults)).toEqual(combinedOpts2);
  });
});
