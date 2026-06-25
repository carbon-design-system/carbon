/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { AddSelectItem } from '@carbon/ibm-products';
import { Document } from '@carbon/react/icons';
import { MultiAddSelectWithHierarchyNoSelectAll as MultiAddSelectHierarchyNoSelectAllComponent } from '../../components/MultiAddSelectWithHierarchyNoSelectAll/MultiAddSelectWithHierarchyNoSelectAll';
import './MultiAddSelectWithHierarchyNoSelectAll.scss';

// Hierarchical sample data for demo
const hierarchicalItems: AddSelectItem[] = [
  {
    id: '1',
    value: 'folder 1',
    title: 'folder 1',
    children: {
      entries: [
        {
          id: '1-1',
          value: 'file1.pdf',
          title: 'file1.pdf',
          fileType: 'pdf',
          size: '100',
          icon: (props) => <Document size={16} {...props} />,
          tag: 'business',
          children: {
            entries: [
              {
                id: '9000',
                value: '9000.html',
                title: '9000.html',
                fileType: 'html',
                size: '9000',
                icon: (props) => <Document size={16} {...props} />,
              },
            ],
          },
        },
        {
          id: '1-2',
          value: 'index.js',
          title: 'index.js',
          fileType: 'js',
          size: '200',
          icon: (props) => <Document size={16} {...props} />,
        },
        {
          id: '1-3',
          value: 'sitemap.xml',
          title: 'sitemap.xml',
          fileType: 'xml',
          size: '10',
          icon: (props) => <Document size={16} {...props} />,
        },
      ],
    },
  },
  {
    id: '2',
    value: 'folder 2',
    title: 'folder 2',
    children: {
      entries: [
        {
          id: '7000',
          value: '7000.html',
          title: '7000.html',
          fileType: 'html',
          size: '7000',
          icon: (props) => <Document size={16} {...props} />,
        },
      ],
    },
  },
];

export const MultiAddSelectWithHierarchyNoSelectAllPreview = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (itemIds: string[], values: string[]) => {
    console.log('Submitted:', { itemIds, values });
  };

  return (
    <div className="example-container">
      <h3>Multi Add Select with Hierarchy (No Select All) Pattern Example</h3>
      <p>
        Click the button below to open the multi add select dialog with
        hierarchical navigation. This variant does not include a "select all"
        checkbox at the column level - only individual items can be selected.
        All individually selected items are listed in the sidepanel.
      </p>

      <Button kind="primary" className="launch-button" onClick={handleOpen}>
        Add files
      </Button>

      <MultiAddSelectHierarchyNoSelectAllComponent
        open={open}
        setOpen={setOpen}
        items={hierarchicalItems}
        preSelectedItemIds={['1-2']}
        onSubmit={handleSubmit}
        title="Add files"
        description="Select individual files from the folders below. Click the chevron to navigate into folders. Note: No select-all option is available. The file 'index.js' is pre-selected and cannot be deselected."
        itemsLabel="Files"
        globalSearchLabel="Search files"
        globalSearchPlaceholder="Find files"
        searchResultsTitle="Search results"
        selectionSummaryTitle="Selected files"
        noSelectionTitle="No files selected"
        noSelectionDescription="Select individual files to include them in your selection."
        noResultsTitle="No results"
        noResultsDescription="Try again"
        columnSearchPlaceholder="Find"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        successNotificationTitle="Success"
        successNotificationSubtitle="{count} item{plural} added"
      />
    </div>
  );
};
