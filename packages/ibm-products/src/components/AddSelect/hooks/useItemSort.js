//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { useState } from 'react';

export const useItemSort = () => {
  const [sortDirection, setSortDirection] = useState('');
  const [sortAttribute, setSortAttribute] = useState('');

  return {
    sortDirection,
    setSortDirection,
    sortAttribute,
    setSortAttribute,
  };
};
