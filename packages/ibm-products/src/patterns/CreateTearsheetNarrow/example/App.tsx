/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { Default } from './preview-components/Default';
import { WithValidation } from './preview-components/WithValidation';
import '@carbon/styles/css/styles.css';
import '@carbon/ibm-products/css/index.min.css';

export const App = () => {
  const [openDefault, setOpenDefault] = useState(false);
  const [openValidation, setOpenValidation] = useState(false);

  const createTearsheetProps = {
    title: 'Create partition',
    description: 'Select the number of partitions you want to create',
    submitButtonText: 'Create',
    cancelButtonText: 'Cancel',
    className: 'test-class-name',
    label: 'Test label',
  };

  return (
    <div className="example-container">
      <h1>Create Tearsheet Narrow Examples</h1>

      <section className="example-section">
        <h2>Default</h2>
        <Button onClick={() => setOpenDefault(true)}>
          Open default tearsheet
        </Button>
        <Default
          open={openDefault}
          setOpen={setOpenDefault}
          {...createTearsheetProps}
        />
      </section>

      <section className="example-section">
        <h2>With Validation</h2>
        <Button onClick={() => setOpenValidation(true)}>
          Open tearsheet with validation
        </Button>
        <WithValidation
          open={openValidation}
          setOpen={setOpenValidation}
          {...createTearsheetProps}
        />
      </section>
    </div>
  );
};

export default App;
