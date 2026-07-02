/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as definitions from './definitions.js';

const types = Object.keys(definitions).reduce((acc, key) => {
  const { builder, type } = definitions[key];
  return {
    ...acc,
    [type]: builder,
  };
}, {});

export { definitions, types };
