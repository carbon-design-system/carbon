/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { MultiAddSelectWithDataTable } from '../../components/MultiAddSelectWithDataTable/MultiAddSelectWithDataTable';
import { AddSelectItem } from '@carbon/ibm-products';
import './MultiAddSelectWithDataTable.scss';

// Sample data for the DataTable variant with extended fields
const sampleItems: AddSelectItem[] = [
  {
    id: '1',
    value: '1',
    title: 'Customer Analytics Dashboard',
    subtitle: 'Real-time customer behavior tracking and insights',
    category: 'Analytics',
    owner: 'Marketing Team',
    status: 'Active',
    itemDetails: [
      {
        label: 'Description',
        value:
          'Comprehensive dashboard for analyzing customer interactions and purchase patterns',
      },
      { label: 'Category', value: 'Analytics' },
      { label: 'Owner', value: 'Marketing Team' },
    ],
  },
  {
    id: '2',
    value: '2',
    title: 'Sales Performance Report',
    subtitle: 'Monthly sales metrics and KPIs',
    category: 'Reports',
    owner: 'Sales Team',
    status: 'Active',
    itemDetails: [
      {
        label: 'Description',
        value:
          'Detailed report showing sales trends, revenue, and team performance',
      },
      { label: 'Category', value: 'Reports' },
      { label: 'Owner', value: 'Sales Team' },
    ],
  },
  {
    id: '3',
    value: '3',
    title: 'Inventory Management System',
    subtitle: 'Track stock levels and supply chain',
    category: 'Operations',
    owner: 'Logistics Team',
    status: 'Active',
    itemDetails: [
      {
        label: 'Description',
        value: 'Tracks stock levels, reorder points, and supply chain status',
      },
      { label: 'Category', value: 'Operations' },
      { label: 'Owner', value: 'Logistics Team' },
    ],
  },
  {
    id: '4',
    value: '4',
    title: 'Marketing Campaign Tracker',
    subtitle: 'Monitor campaign performance and ROI',
    category: 'Marketing',
    owner: 'Marketing Team',
    status: 'Active',
    itemDetails: [
      {
        label: 'Description',
        value:
          'Track marketing campaigns across multiple channels with detailed analytics',
      },
      { label: 'Category', value: 'Marketing' },
      { label: 'Owner', value: 'Marketing Team' },
    ],
  },
  {
    id: '5',
    value: '5',
    title: 'Employee Directory',
    subtitle: 'Company-wide employee information',
    category: 'HR',
    owner: 'HR Team',
    status: 'Active',
    itemDetails: [
      {
        label: 'Description',
        value: 'Company-wide employee profiles and contact information',
      },
      { label: 'Category', value: 'HR' },
      { label: 'Owner', value: 'HR Team' },
    ],
  },
  {
    id: '6',
    value: '6',
    title: 'Project Timeline Viewer',
    subtitle: 'Visualize project schedules and milestones',
    category: 'Project Management',
    owner: 'PMO',
    status: 'Active',
    itemDetails: [
      {
        label: 'Description',
        value:
          'Interactive timeline showing project phases, dependencies, and deadlines',
      },
      { label: 'Category', value: 'Project Management' },
      { label: 'Owner', value: 'PMO' },
    ],
  },
  {
    id: '7',
    value: '7',
    title: 'Financial Statements',
    subtitle: 'Quarterly financial reports and analysis',
    category: 'Finance',
    owner: 'Finance Team',
    status: 'Archived',
    itemDetails: [
      {
        label: 'Description',
        value: 'Quarterly financial reports including P&L and balance sheets',
      },
      { label: 'Category', value: 'Finance' },
      { label: 'Owner', value: 'Finance Team' },
    ],
  },
  {
    id: '8',
    value: '8',
    title: 'Customer Support Tickets',
    subtitle: 'Track and manage support requests',
    category: 'Support',
    owner: 'Support Team',
    status: 'Active',
    itemDetails: [
      {
        label: 'Description',
        value:
          'Centralized system for managing customer support tickets and resolutions',
      },
      { label: 'Category', value: 'Support' },
      { label: 'Owner', value: 'Support Team' },
    ],
  },
];

export const MultiAddSelectWithDataTablePreview = ({
  initialOpen = false,
}: {
  initialOpen?: boolean;
}) => {
  const [open, setOpen] = useState(initialOpen);

  const handleSubmit = (itemIds: string[], values: string[]) => {
    console.log('Submitted:', { itemIds, values });
  };

  return (
    <div className="example-container">
      <h3>Multi Add Select with DataTable</h3>
      <p>
        This variant uses a Carbon DataTable with checkboxes for item selection,
        providing a familiar table interface for selecting multiple items with
        additional columns.
      </p>

      <Button
        kind="primary"
        className="launch-button"
        onClick={() => setOpen(true)}
      >
        Add resources
      </Button>

      <MultiAddSelectWithDataTable
        open={open}
        setOpen={setOpen}
        items={sampleItems}
        onSubmit={handleSubmit}
        title="Add resources"
        description="Select resources from the table below to add to your project"
        itemsLabel="Available resources"
        globalSearchLabel="Search resources"
        globalSearchPlaceholder="Find resources"
        searchResultsTitle="Search results"
        noResultsTitle="No results"
        noResultsDescription="Try adjusting your search"
        selectionSummaryTitle="Selected resources"
        noSelectionTitle="No resources selected"
        noSelectionDescription="Select resources from the table to add them to your project"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        successNotificationTitle="Success"
        successNotificationSubtitle="{count} resource{plural} added"
      />
    </div>
  );
};
