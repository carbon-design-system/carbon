/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { StandardCreateModal } from './preview-components/StandardCreateModal';
import { CreateModalWithValidation } from './preview-components/CreateModalWithValidation';

function App() {
  const [openStandard, setOpenStandard] = useState(false);
  const [openValidation, setOpenValidation] = useState(false);

  return (
    <div className="example-container">
      <h1>Create Modal Examples</h1>

      <section className="example-section">
        <h2>Standard Create Modal</h2>
        <Button onClick={() => setOpenStandard(true)}>
          Launch Standard Modal
        </Button>
        <StandardCreateModal open={openStandard} setOpen={setOpenStandard} />
      </section>

      <section className="example-section">
        <h2>Create Modal with Form Validation</h2>
        <Button onClick={() => setOpenValidation(true)}>
          Launch Modal with Validation
        </Button>
        <CreateModalWithValidation
          open={openValidation}
          setOpen={setOpenValidation}
        />
      </section>
    </div>
  );
}

export default App;
