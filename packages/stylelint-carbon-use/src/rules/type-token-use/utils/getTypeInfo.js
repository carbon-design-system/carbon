/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { typeFunctions } from './initTypeTokens';

export default function getTypeInfo(options) {
  return {
    // There are no type tokens that are used directly
    // Types are applied via mixins and functions
    tokens: [
      //   {
      //     source: "Type",
      //     accept: true,
      //     values: typeTokens,
      //   },
    ],
    functions: typeFunctions.map((item) => {
      const result = {
        source: 'Type',
        accept: options[item.accept],
        values: [item.name],
      };

      return result;
    }),
  };
}
