/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { AboutModal } from '../components/AboutModal';
import exampleLogo from '../assets/example-logo.svg';

export const StandardAboutModal = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <AboutModal
        open={isOpen}
        onClose={() => setOpen(false)}
        title="IBM Product name example that is longer than one line"
        version="Version 0.0.0"
        copyrightText="Copyright © IBM Corp. 2020, 2026"
        closeIconDescription="Close"
        modalAriaLabel="About this product"
        logo={
          <img
            src={exampleLogo}
            alt="Example product or service logo"
            style={{ maxWidth: '6rem' }}
          />
        }
      />
    </>
  );
};
