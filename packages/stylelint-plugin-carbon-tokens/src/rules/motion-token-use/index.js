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
import { getMotionInfo } from './utils';

export const ruleName = namespace('motion-token-use');
export const messages = getMessages(ruleName, 'motion');

const isValidAcceptValues = isValidOption;
const isValidIncludeProps = isValidOption;

const defaultOptions = {
  // include standard motion properties
  includeProps: [
    'transition<2>', // only permitted definition order fails otherwise
    'transition-duration',
    'animation<1>', // only permitted definition order fails otherwise
    'animation-duration',
  ],
  //  Accept reset values
  acceptValues: ['/$0s?/', '/inherit|initial|none|unset/'],
  acceptUndefinedVariables: true,
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
        },
        optional: true,
      }
    );

    if (!validOptions) {
      /* istanbul ignore next */
      return;
    }

    checkRule(root, result, ruleName, options, messages, getMotionInfo);
  };
}
