/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { ImportAndUpload } from '../components/ImportAndUpload';

export const StandardImportAndUpload = () => {
  const [isOpen, setOpen] = useState(false);

  const handleSubmit = (files: any[]) => {
    console.log('Submitting files:', files);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      {isOpen && (
        <ImportAndUpload
          open={isOpen}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
          accept={['image/png', 'image/jpeg', 'image/gif']}
          maxFileSize={500000}
          description="You can specify a file to import by either dragging it into the drag and drop area or by specifying a URL. (Maximum file size of 500KB)"
          fileDropHeader="Add files using drag and drop"
          urlInputLabel="Add a file by specifying a URL"
          preventCloseOnClickOutside
        />
      )}
    </>
  );
};
