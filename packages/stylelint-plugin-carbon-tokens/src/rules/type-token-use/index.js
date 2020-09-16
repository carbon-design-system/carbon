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
import { getTypeInfo } from './utils';

export const ruleName = namespace('type-token-use');
export const messages = getMessages(ruleName, 'type');

const isValidAcceptValues = isValidOption;
const isValidIncludeProps = isValidOption;

const defaultOptions = {
  // include standard type properties
  includeProps: ['font', '/^font-*/', 'line-height', 'letterSpacing'],
  acceptValues: ['/inherit|initial|none|unset/'],
  acceptCarbonFontWeightFunction: false, // permit use of carbon font weight function
  acceptCarbonTypeScaleFunction: false, // permit use of carbon type scale function
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
          acceptCarbonFontWeightFunction: (val) =>
            val === undefined || typeof val === 'boolean',
          acceptCarbonTypeScaleFunction: (val) =>
            val === undefined || typeof val === 'boolean',
        },
        optional: true,
      }
    );

    if (!validOptions) {
      /* istanbul ignore next */
      return;
    }

    checkRule(root, result, ruleName, options, messages, getTypeInfo);
  };
}
