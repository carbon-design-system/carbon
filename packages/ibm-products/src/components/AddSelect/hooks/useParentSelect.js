//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { useState } from 'react';

const useParentSelect = () => {
  const [parentSelected, setParentSelected] = useState(null);

  return {
    parentSelected,
    setParentSelected,
  };
};

export default useParentSelect;
