/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import {
  NonHierarchicalWithPeekInsideItem as NonHierarchicalWithPeekInsideItemComponent,
  ModifierConfig,
} from '../../components/NonHierarchicalWithPeekInsideItem/NonHierarchicalWithPeekInsideItem';
import { AddSelectItem, UserAvatar } from '@carbon/ibm-products';
import './NonHierarchicalWithPeekInsideItem.scss';

// Sample data matching the image - access groups with members
interface ItemWithModifier extends AddSelectItem {
  role?: string;
}

// cspell:ignore Yara Barros Merrile Burgett Erin Gopichand Sana Laquita Elliott Melissa Morillo Izabella Tabakova Meng Alicia Puma Cardarion Hart Ivan Morais Mbah Gvozden

// Sample users that can be reused across groups
const sampleUsers: AddSelectItem[] = [
  {
    id: 'user-1',
    value: 'yara.barros@ibm.com',
    title: 'Yara Barros',
    subtitle: 'yara.barros@ibm.com',
    icon: (
      <UserAvatar size="md" name="Yara Barros" backgroundColor="order-6-teal" />
    ),
  },
  {
    id: 'user-2',
    value: 'merrile.burgett@ibm.com',
    title: 'Merrile Burgett',
    subtitle: 'merrile.burgett@ibm.com',
    icon: (
      <UserAvatar
        size="md"
        name="Merrile Burgett"
        backgroundColor="order-1-cyan"
      />
    ),
  },
  {
    id: 'user-3',
    value: 'erin.green@ibm.com',
    title: 'Erin Green',
    subtitle: 'erin.green@ibm.com',
    icon: (
      <UserAvatar
        size="md"
        name="Erin Green"
        backgroundColor="order-5-purple"
      />
    ),
  },
  {
    id: 'user-4',
    value: 'gopichand.sana@ibm.com',
    title: 'Gopichand Sana',
    subtitle: 'gopichand.sana@ibm.com',
    icon: (
      <UserAvatar
        size="md"
        name="Gopichand Sana"
        backgroundColor="order-6-teal"
      />
    ),
  },
  {
    id: 'user-5',
    value: 'laquita.elliott@ibm.com',
    title: 'Laquita Elliott',
    subtitle: 'laquita.elliott@ibm.com',
    icon: (
      <UserAvatar
        size="md"
        name="Laquita Elliott"
        backgroundColor="order-7-cyan"
      />
    ),
  },
];

const sampleItems: ItemWithModifier[] = [
  {
    id: '1',
    value: 'access-group-1',
    title: 'Access group',
    subtitle: '394 users / 3 services',
    role: 'Editor',
    icon: (
      <UserAvatar
        size="md"
        name="Access group"
        backgroundColor="order-5-purple"
      />
    ),
    users: sampleUsers.slice(0, 3),
  },
  {
    id: '2',
    value: 'access-group-2',
    title: 'Access group',
    subtitle: '394 users / 3 services',
    role: 'Editor',
    icon: (
      <UserAvatar
        size="md"
        name="Access group"
        backgroundColor="order-6-teal"
      />
    ),
    users: sampleUsers.slice(1, 4),
  },
  {
    id: '3',
    value: 'access-group-3',
    title: 'Access group',
    subtitle: '394 users / 3 services',
    role: 'Editor',
    icon: (
      <UserAvatar
        size="md"
        name="Access group"
        backgroundColor="order-7-cyan"
      />
    ),
    users: sampleUsers.slice(0, 5),
  },
  {
    id: '4',
    value: 'access-group-4',
    title: 'Access group',
    subtitle: '394 users / 3 services',
    role: 'Editor',
    icon: (
      <UserAvatar
        size="md"
        name="Access group"
        backgroundColor="order-8-gray"
      />
    ),
    users: sampleUsers.slice(2, 5),
  },
  {
    id: '5',
    value: 'access-group-5',
    title: 'Access group',
    subtitle: '394 users / 3 services',
    role: 'Editor',
    icon: (
      <UserAvatar
        size="md"
        name="Access group"
        backgroundColor="order-2-gray"
      />
    ),
    users: sampleUsers.slice(0, 4),
  },
  {
    id: '6',
    value: 'jobs-regulation-group',
    title: 'Jobs regulation group',
    subtitle: '134 users',
    role: 'Editor',
    icon: (
      <UserAvatar
        size="md"
        name="Jobs regulation group"
        backgroundColor="order-1-cyan"
      />
    ),
    users: [
      {
        id: '6-1',
        value: 'yara.barros@ibm.com',
        title: 'Yara Barros',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Yara Barros"
            backgroundColor="order-6-teal"
          />
        ),
      },
      {
        id: '6-2',
        value: 'merrile.burgett@ibm.com',
        title: 'Merrile Burgett',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Merrile Burgett"
            backgroundColor="order-1-cyan"
          />
        ),
      },
      {
        id: '6-3',
        value: 'erin.green@ibm.com',
        title: 'Erin Green',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Erin Green"
            backgroundColor="order-5-purple"
          />
        ),
      },
      {
        id: '6-4',
        value: 'gopichand.sana@ibm.com',
        title: 'Gopichand Sana',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Gopichand Sana"
            backgroundColor="order-6-teal"
          />
        ),
      },
      {
        id: '6-5',
        value: 'laquita.elliott@ibm.com',
        title: 'Laquita Elliott',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Laquita Elliott"
            backgroundColor="order-7-cyan"
          />
        ),
      },
      {
        id: '6-6',
        value: 'melissa.morillo@ibm.com',
        title: 'Melissa Morillo',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Melissa Morillo"
            backgroundColor="order-8-gray"
          />
        ),
      },
      {
        id: '6-7',
        value: 'izabella.tabakova@ibm.com',
        title: 'Izabella Tabakova',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Izabella Tabakova"
            backgroundColor="order-4-magenta"
          />
        ),
      },
      {
        id: '6-8',
        value: 'meng.ru@ibm.com',
        title: 'Meng Ru',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Meng Ru"
            backgroundColor="order-10-magenta"
          />
        ),
      },
      {
        id: '6-9',
        value: 'alicia.puma@ibm.com',
        title: 'Alicia Puma',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Alicia Puma"
            backgroundColor="order-11-purple"
          />
        ),
      },
      {
        id: '6-10',
        value: 'cardarion.hart@ibm.com',
        title: 'Cardarion Hart',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Cardarion Hart"
            backgroundColor="order-1-cyan"
          />
        ),
      },
      {
        id: '6-11',
        value: 'ivan.morais@ibm.com',
        title: 'Ivan Morais',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Ivan Morais"
            backgroundColor="order-2-gray"
          />
        ),
      },
      {
        id: '6-12',
        value: 'izabella.tabakova2@ibm.com',
        title: 'Izabella Tabakova',
        subtitle: 'jdoe@ibm.com',
        icon: (
          <UserAvatar
            size="md"
            name="Izabella Tabakova"
            backgroundColor="order-6-teal"
          />
        ),
      },
    ],
  },
  {
    id: '7',
    value: 'access-group-7',
    title: 'Access group',
    subtitle: '394 users / 3 services',
    role: 'Editor',
    icon: (
      <UserAvatar
        size="md"
        name="Access group"
        backgroundColor="order-4-magenta"
      />
    ),
    users: sampleUsers.slice(1, 5),
  },
  {
    id: '8',
    value: 'mbah-enow-group',
    title: 'Mbah Enow Group',
    subtitle: '394 users / 3 services',
    role: 'Viewer',
    icon: (
      <UserAvatar
        size="md"
        name="Mbah Enow Group"
        backgroundColor="order-10-magenta"
      />
    ),
    users: sampleUsers.slice(0, 3),
  },
  {
    id: '9',
    value: 'gvozden-group',
    title: 'Gvozden Group',
    subtitle: '394 users / 3 services',
    role: 'Admin',
    icon: (
      <UserAvatar
        size="md"
        name="Gvozden Group"
        backgroundColor="order-11-purple"
      />
    ),
    users: sampleUsers.slice(2, 5),
  },
  {
    id: '10',
    value: 'access-group-10',
    title: 'Access group',
    subtitle: '394 users / 3 services',
    role: 'Editor',
    icon: (
      <UserAvatar
        size="md"
        name="Access group"
        backgroundColor="order-1-cyan"
      />
    ),
    users: sampleUsers.slice(0, 4),
  },
  {
    id: '11',
    value: 'access-group-11',
    title: 'Access group',
    subtitle: '394 users / 3 services',
    role: 'Editor',
    icon: (
      <UserAvatar
        size="md"
        name="Access group"
        backgroundColor="order-2-gray"
      />
    ),
    users: sampleUsers.slice(1, 4),
  },
  {
    id: '12',
    value: 'access-group-12',
    title: 'Access group',
    subtitle: '394 users / 3 services',
    role: 'Editor',
    icon: (
      <UserAvatar
        size="md"
        name="Access group"
        backgroundColor="order-6-teal"
      />
    ),
    users: sampleUsers.slice(0, 5),
  },
];

const modifierConfig: ModifierConfig = {
  id: 'role',
  label: 'Editor',
  title: 'Role',
  options: ['Editor', 'Viewer', 'Admin'],
};

export const NonHierarchicalWithPeekInsideItemPreview = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (
    itemIds: string[],
    values: string[],
    modifiers: Record<string, string | string[]>
  ) => {
    console.log('Submitted:', { itemIds, values, modifiers });
  };

  return (
    <div className="example-container">
      <h3>Non-Hierarchical with Peek Inside Item Pattern Example</h3>
      <p>
        Click the button below to open the multi add select dialog. Click the
        chevron on an access group to peek inside and see its members.
      </p>

      <Button
        kind="primary"
        className="launch-button"
        onClick={() => setOpen(true)}
      >
        Add access groups as collaborators
      </Button>

      <NonHierarchicalWithPeekInsideItemComponent
        open={open}
        setOpen={setOpen}
        items={sampleItems}
        modifierConfig={modifierConfig}
        onSubmit={handleSubmit}
        title="Add access groups as collaborators"
        description="Select access groups from the list lorem ipsum dolor infotext."
        itemsLabel="Access groups"
        globalSearchLabel="Search access groups"
        globalSearchPlaceholder="Find access groups"
        searchResultsTitle="Search results"
        noResultsTitle="No results"
        noResultsDescription="Try again"
        selectionSummaryTitle="Selected access groups"
        noSelectionTitle="No access groups selected"
        noSelectionDescription="Select access groups to add them as collaborators."
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        successNotificationTitle="Success"
        successNotificationSubtitle="{count} access group{plural} added"
        peekInsidePanelLabel="Group members"
      />
    </div>
  );
};
