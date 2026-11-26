/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import {
  MultiSelectWithBulkActions as MultiSelectWithBulkActionsComponent,
  ModifierConfig,
} from '../../components/MultiSelectWithBulkActions/MultiSelectWithBulkActions';
import { AddSelectItem, UserAvatar } from '@carbon/ibm-products';
import './MultiSelectWithBulkActions.scss';

// Sample data for the with modifiers variant
interface ItemWithModifier extends AddSelectItem {
  role?: string[];
}

// cspell:ignore Marleah Eagleston Hashim Briscam Anaru Hakopa Quinten Kortum Chun Dowall Yijun Bonelwa Ngawana Meysam Nassour
const sampleItems: ItemWithModifier[] = [
  {
    id: '1',
    value: '1',
    title: 'Marleah Eagleston',
    subtitle: 'jdoe@ibm.com',
    role: ['editor', 'viewer'],
    icon: (
      <UserAvatar
        size="md"
        name="Marleah Eagleston"
        backgroundColor="order-5-purple"
      />
    ),
  },
  {
    id: '2',
    value: '2',
    title: 'Hashim Briscam',
    subtitle: 'jdoe@ibm.com',
    role: ['editor'],
    icon: (
      <UserAvatar
        size="md"
        name="Hashim Briscam"
        backgroundColor="order-6-teal"
      />
    ),
  },
  {
    id: '3',
    value: '3',
    title: 'Anaru Hakopa',
    subtitle: 'jdoe@ibm.com',
    role: ['admin'],
    icon: (
      <UserAvatar
        size="md"
        name="Anaru Hakopa"
        backgroundColor="order-7-cyan"
      />
    ),
  },
  {
    id: '4',
    value: '4',
    title: 'Quinten Kortum',
    subtitle: 'jdoe@ibm.com',
    role: ['editor'],
    icon: (
      <UserAvatar
        size="md"
        name="Quinten Kortum"
        backgroundColor="order-8-gray"
      />
    ),
  },
  {
    id: '5',
    value: '5',
    title: 'Yi Chun-Hwa',
    subtitle: 'jdoe@ibm.com',
    role: ['editor'],
    icon: (
      <UserAvatar size="md" name="Yi Chun-Hwa" backgroundColor="order-2-gray" />
    ),
  },
  {
    id: '6',
    value: '6',
    title: 'Wilhelm Dowall',
    subtitle: 'jdoe@ibm.com',
    role: ['admin'],
    icon: (
      <UserAvatar
        size="md"
        name="Wilhelm Dowall"
        backgroundColor="order-2-gray"
      />
    ),
  },
  {
    id: '7',
    value: '7',
    title: 'Kong Yijun',
    subtitle: 'jdoe@ibm.com',
    role: ['admin'],
    icon: (
      <UserAvatar
        size="md"
        name="Kong Yijun"
        backgroundColor="order-10-magenta"
      />
    ),
  },
  {
    id: '8',
    value: '8',
    title: 'Bonelwa Ngawana',
    subtitle: 'jdoe@ibm.com',
    role: ['admin'],
    icon: (
      <UserAvatar
        size="md"
        name="Bonelwa Ngawana"
        backgroundColor="order-11-purple"
      />
    ),
  },
  {
    id: '9',
    value: '9',
    title: 'Meysam Nassour',
    subtitle: 'jdoe@ibm.com',
    role: ['admin'],
    icon: (
      <UserAvatar
        size="md"
        name="Meysam Nassour"
        backgroundColor="order-1-cyan"
      />
    ),
  },
];

const modifierConfig: ModifierConfig = {
  id: 'role',
  label: 'Select Roles',
  title: 'Role',
  options: ['editor', 'viewer', 'admin'],
  multiSelect: true,
};

export const MultiSelectWithBulkActionsPreview = ({
  initialOpen = false,
}: {
  initialOpen?: boolean;
}) => {
  const [open, setOpen] = useState(initialOpen);

  const handleSubmit = (
    itemIds: string[],
    values: string[],
    modifiers: Record<string, string | string[]>
  ) => {
    console.log('Submitted:', { itemIds, values, modifiers });
  };

  return (
    <div className="example-container">
      <h3>Multi Add Select with Modifiers and Bulk Actions Pattern Example</h3>
      <p>
        Click the button below to open the multi add select dialog with role
        modifiers. After selecting items, click the edit icon to perform bulk
        actions such as removing multiple items or assigning roles to selected
        items at once.
      </p>

      <Button
        kind="primary"
        className="launch-button"
        onClick={() => setOpen(true)}
      >
        Add items with roles
      </Button>

      <MultiSelectWithBulkActionsComponent
        open={open}
        setOpen={setOpen}
        items={sampleItems}
        modifierConfig={modifierConfig}
        onSubmit={handleSubmit}
        title="Add items with roles"
        description="Select items and assign roles to them"
        itemsLabel="Items"
        globalSearchLabel="Search items"
        globalSearchPlaceholder="Find items"
        searchResultsTitle="Search results"
        noResultsTitle="No results"
        noResultsDescription="Try again"
        selectionSummaryTitle="Selected items"
        noSelectionTitle="No items selected"
        noSelectionDescription="Select items from the list and assign roles"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        successNotificationTitle="Success"
        successNotificationSubtitle="{count} item{plural} added with roles"
      />
    </div>
  );
};
