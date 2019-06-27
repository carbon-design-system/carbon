/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';

let id = 0;

export default function useId() {
  const [value, updateValue] = useState(id);

  useEffect(() => {
    updateValue(++id);
  }, []);

  return value;
}
