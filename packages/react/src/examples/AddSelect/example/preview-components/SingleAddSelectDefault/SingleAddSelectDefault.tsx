/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { SingleAddSelect } from '../../components/SingleAddSelect/SingleAddSelect';
import { AddSelectItem } from '@carbon/ibm-products';

// Sample hierarchical data (same structure as WithHierarchy, but only first level will be shown)
const sampleItems: AddSelectItem[] = [
  {
    id: '1',
    title: 'Kansas',
    value: 'kansas',
  },
  {
    id: '2',
    title: 'Texas',
    value: 'texas',
  },
  {
    id: '3',
    title: 'Florida',
    value: 'florida',
  },
  {
    id: '4',
    title: 'California',
    value: 'california',
  },
  {
    id: '10',
    title: 'New York',
    value: 'ny',
  },
];

export const SingleAddSelectDefaultPreview = ({
  initialOpen = false,
}: {
  initialOpen?: boolean;
}) => {
  const [open, setOpen] = useState(initialOpen);

  const handleSubmit = (itemId: string, value: string) => {
    console.log('Submitted:', { itemId, value });
  };

  return (
    <div className="example-container">
      <h3>Single Add Select Pattern Example</h3>
      <p>
        Click the button below to open the single add select dialog (first level
        only).
      </p>

      <Button
        kind="primary"
        className="launch-button"
        onClick={() => setOpen(true)}
      >
        Select a category
      </Button>

      <SingleAddSelect
        open={open}
        setOpen={setOpen}
        items={sampleItems}
        onSubmit={handleSubmit}
        title="Select category"
        description="Choose one category from the list below"
        itemsLabel="Categories"
        globalSearchLabel="Search categories"
        globalSearchPlaceholder="Search..."
        searchResultsTitle="Search results"
        noResultsTitle="No results found"
        noResultsDescription="Try adjusting your search or browse categories"
        primaryButtonText="Select"
        secondaryButtonText="Cancel"
        successNotificationTitle="Item Selected"
        successNotificationSubtitle="Selected: {value}"
      />
    </div>
  );
};
