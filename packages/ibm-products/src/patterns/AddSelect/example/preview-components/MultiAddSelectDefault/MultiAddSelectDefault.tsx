/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { MultiAddSelect } from '../../components/MultiAddSelect/MultiAddSelect';
import { AddSelectItem } from '@carbon/ibm-products';
import './MultiAddSelectDefault.scss';

// Sample data for the default variant
const sampleItems: AddSelectItem[] = [
  {
    id: '1',
    value: '1',
    title: 'item 1',
    subtitle: 'item 1 subtitle',
    itemDetails: {
      id: 'description',
      title: 'Description',
      value: 'Description text for item 1',
    },
  },
  {
    id: '2',
    value: '2',
    title: 'item 2',
    itemDetails: {
      id: 'description',
      title: 'Description',
      value: 'Description text for item 2',
    },
  },
  {
    id: '3',
    value: '3',
    title: 'item 3',
    subtitle: 'item 3 subtitle',
  },
];

export const MultiAddSelectDefault = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (itemIds: string[], values: string[]) => {
    console.log('Submitted:', { itemIds, values });
  };

  return (
    <div className="example-container">
      <h3>Multi Add Select Pattern Example</h3>
      <p>Click the button below to open the multi add select dialog.</p>

      <Button
        kind="primary"
        className="launch-button"
        onClick={() => setOpen(true)}
      >
        Add business terms
      </Button>

      <MultiAddSelect
        open={open}
        setOpen={setOpen}
        items={sampleItems}
        onSubmit={handleSubmit}
        title="Add business terms"
        description="Select business terms from the list below"
        itemsLabel="Business terms"
        globalSearchLabel="Search business terms"
        globalSearchPlaceholder="Find business terms"
        searchResultsTitle="Search results"
        noResultsTitle="No results"
        noResultsDescription="Try again"
        selectionSummaryTitle="Selected business terms"
        noSelectionTitle="No business terms selected"
        noSelectionDescription="Select a term to include the full set of the governance artifacts it contains in the governance scope."
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        successNotificationTitle="Success"
        successNotificationSubtitle="{count} business term{plural} added"
      />
    </div>
  );
};
