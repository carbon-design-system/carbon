/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import valueParser from "postcss-value-parser";
import { utils } from 'stylelint';
import {
  isValidOption,
  namespace,
  parseOptions,
  checkRule,
  getMessages,
} from '../../utils';
import { getLayoutInfo } from './utils';

export const ruleName = namespace('layout-token-use');
export const messages = getMessages(ruleName, 'layout');

const isValidAcceptValues = isValidOption;
const isValidIncludeProps = isValidOption;

const defaultOptions = {
  // include standard layout properties
  includeProps: [
    '/^margin$/<1 4>',
    '/^margin-/',
    '/^padding$/<1 4>',
    '/^padding-/',
    'left',
    'top',
    'bottom',
    'right',
    'transform[/^translate/]',
    // the following are not really layout or spacing
    // "height",
    // "width",
    // "/^border$/<1 -2>",
    // "/^border-/",
    // "/^box-shadow$/<1 -2>",
  ],
  // Accept transparent, common reset values, 0, proportioanl values,
  acceptValues: [
    '/inherit|initial|auto|none|unset/',
    '/^0[a-z]*$/',
    '/^[0-9]*(%|vw|vh)$/',
  ],
  acceptUndefinedVariables: true,
  acceptContainerTokens: false,
  acceptIconSizeTokens: false,
  acceptFluidSpacingTokens: false,
  acceptCarbonMiniUnitsFunction: false,
};

export default function rule(primaryOptions, secondaryOptions) {
  const options = parseOptions(secondaryOptions, defaultOptions);

  return (root, result) => {
    const validOptions = utils.validateOptions(
      result,
      ruleName,
      {
        actual: primaryOptions,
      },
      {
        actual: options,
        possible: {
          includeProps: [isValidIncludeProps],
          acceptValues: [isValidAcceptValues],
          acceptUndefinedVariables: (val) =>
            val === undefined || typeof val === 'boolean',
          acceptContainerTokens: (val) =>
            val === undefined || typeof val === 'boolean',
          acceptIconSizeTokens: (val) =>
            val === undefined || typeof val === 'boolean',
          acceptFluidSpacingTokens: (val) =>
            val === undefined || typeof val === 'boolean',
          acceptCarbonMiniUnitsFunction: (val) =>
            val === undefined || typeof val === 'boolean',
        },
        optional: true,
      }
    );

    if (!validOptions) {
      /* istanbul ignore next */
      return;
    }

    checkRule(root, result, ruleName, options, messages, getLayoutInfo);
  };
}
