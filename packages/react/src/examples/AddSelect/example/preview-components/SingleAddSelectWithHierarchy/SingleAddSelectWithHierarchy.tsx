/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { SingleAddSelectWithHierarchy } from '../../components/SingleAddSelectWithHierarchy/SingleAddSelectWithHierarchy';
import { AddSelectItem } from '@carbon/ibm-products';
import './SingleAddSelectWithHierarchy.scss';

// Sample hierarchical data
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
    children: {
      entries: [
        {
          id: '5',
          title: 'Los Angeles',
          value: 'la',
          children: {
            entries: [
              {
                id: '6',
                title: 'Beverly Hills',
                value: 'bh',
              },
              {
                id: '7',
                title: 'Malibu',
                value: 'malibu',
                children: {
                  entries: [
                    {
                      id: '8',
                      title: 'Malibu Rd',
                      value: 'malibu-rd',
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          id: '9',
          title: 'San Francisco',
          value: 'sf',
        },
      ],
    },
  },
  {
    id: '10',
    title: 'New York',
    value: 'ny',
    children: {
      entries: [
        {
          id: '11',
          title: 'Manhattan',
          value: 'manhattan',
        },
        {
          id: '12',
          title: 'Brooklyn',
          value: 'brooklyn',
        },
      ],
    },
  },
];

export const SingleAddSelectWithHierarchyPreview = ({
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
      <h3>Single Add Select With Hierarchy Pattern Example</h3>
      <p>
        Click the button below to open the single add select dialog with
        hierarchical navigation.
      </p>

      <Button
        kind="primary"
        className="launch-button"
        onClick={() => setOpen(true)}
      >
        Select a category
      </Button>

      <SingleAddSelectWithHierarchy
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
        rootBreadcrumbTitle="Categories"
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
