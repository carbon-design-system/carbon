import React from 'react';
import { preview__Tearsheet as Tearsheet } from '@carbon/ibm-products';

// Test: Already migrated code should not be transformed again (idempotency)
export const AlreadyMigrated = () => {
  return (
    <Tearsheet open={true} onClose={() => {}}>
      <Tearsheet.Header>
        <Tearsheet.HeaderContent title="Already Migrated" />
      </Tearsheet.Header>
      <Tearsheet.Body>
        <Tearsheet.MainContent>
          <div>Body content</div>
        </Tearsheet.MainContent>
      </Tearsheet.Body>
    </Tearsheet>
  );
};
