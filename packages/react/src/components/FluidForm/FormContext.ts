/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from 'react';

export interface FormContextProps {
  isFluid?: boolean;
}
export const FormContext = createContext<FormContextProps>({
  isFluid: false,
});
