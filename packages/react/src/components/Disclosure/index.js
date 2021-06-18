/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRef, useState } from 'react';
import { useOutsideClick } from '../../internal/useOutsideClick';


function useDisclosure(id) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null); 

  useOutsideClick(ref, () => {
    if (open === true) {
      setOpen(false);
    }
  });

  const buttonProps = {
    'aria-controls': id,
    'aria-expanded': open,
    onClick() {
      setOpen(!open);
    },
  };
  const contentProps = {
    id,
    ref
  };

  return {
    buttonProps,
    contentProps,
    open,
  };
}

export { useDisclosure };
