/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FilterContext } from '../FilterProvider';
import { useContext } from 'react';

const useFilterContext = () => {
  // get the context
  const context = useContext(FilterContext);

  // if empty object, throw an error
  if (Object.entries(context).length === 0) {
    throw new Error('useFilterContext was used outside of its Provider');
  }

  return context;
};

export default useFilterContext;
