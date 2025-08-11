/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { definitions } from '../types/index.js';
import { createPrinter } from './printer.js';

export function generate(ast) {
  const printer = createPrinter(definitions);

  printer.print(ast);

  return {
    code: printer.get(),
  };
}
