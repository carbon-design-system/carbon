/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { UserAvatar } from '@carbon/ibm-products';
import { MultiSelectWithScroll } from '../../components/MultiSelectWithScroll/MultiSelectWithScroll';
import { AddSelectItem } from '@carbon/ibm-products';
import './MultiSelectWithScroll.scss';

// ─── Sample dataset ──────────────────────────────────────────────────────────
// 187 simulated user records, cycling through a pool of names so we don't need
// external assets.  A real implementation would fetch pages from an API.
// cspell:disable
const NAME_POOL = [
  'Aiko Tanaka',
  'Anaru Hakopa',
  'Aneta Škodová',
  'Asha Patel',
  'Carlos Mendoza',
  'Chen Wei',
  'Ekaterina Volkov',
  'Fatima Al-Rashid',
  'Hamid Sultani',
  'Hashim Briscam',
  'Ingrid Lindqvist',
  'Jioke Ugoorji',
  'Kwame Asante',
  'Lakshmana Dongerkerry',
  'Leila Nouri',
  'Margarita Torres',
  'Marleah Eagleston',
  'Nadia Kowalski',
  'Obinna Okafor',
  'Priya Krishnamurthy',
  'Rashida Mbeki',
  "Saoirse O'Brien",
  'Tikhon Yaroslavsky',
  'Valentina Cruz',
  'Yui Nakamura',
];
// cspell:enable

const AVATAR_COLORS = [
  'order-1-cyan',
  'order-2-gray',
  'order-3-green',
  'order-4-magenta',
  'order-5-purple',
  'order-6-teal',
  'order-7-cyan',
  'order-8-gray',
  'order-9-green',
  'order-10-magenta',
  'order-11-purple',
  'order-12-teal',
] as const;

const sampleUsers: AddSelectItem[] = Array.from({ length: 187 }, (_, i) => {
  const name = NAME_POOL[i % NAME_POOL.length];
  const id = `user-${i + 1}`;
  const emailPart = name.toLowerCase().replace(/[^a-z]/g, '');
  return {
    id,
    value: id,
    title: name,
    subtitle: `${emailPart}${i + 1}@ibm.com`,
    icon: (
      <UserAvatar
        name={name}
        size="md"
        backgroundColor={AVATAR_COLORS[i % AVATAR_COLORS.length]}
      />
    ),
  };
});

// ─────────────────────────────────────────────────────────────────────────────

export const MultiSelectWithScrollPreview = ({
  initialOpen = false,
}: {
  initialOpen?: boolean;
}) => {
  const [open, setOpen] = useState(initialOpen);

  const handleSubmit = (itemIds: string[], values: string[]) => {
    console.log('MultiSelectWithScroll submitted:', { itemIds, values });
  };

  return (
    <div className="example-container">
      <h3>Multi Select With Scroll</h3>
      <p>
        Large lists load progressively as the user scrolls. The header, search,
        and list heading are fixed while the list content scrolls. Loading is
        indicated by skeleton rows.
      </p>

      <Button
        kind="primary"
        className="launch-button"
        onClick={() => setOpen(true)}
      >
        Add users as collaborators
      </Button>

      <MultiSelectWithScroll
        open={open}
        setOpen={setOpen}
        items={sampleUsers}
        pageSize={20}
        onSubmit={handleSubmit}
        title="Add users as collaborators"
        description="Select users from the list lorem ipsum dolor infotext."
        itemsLabel="Users"
        globalSearchLabel="Find users"
        globalSearchPlaceholder="Find users"
        searchResultsTitle="Search results"
        noResultsTitle="No results found"
        noResultsDescription="Try a different search term"
        selectionSummaryTitle="Selected users"
        noSelectionTitle="No users selected"
        noSelectionDescription="Select users to include the full set of the governance artifacts it contains in the governance scope."
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        successNotificationTitle="Success"
        successNotificationSubtitle="{count} user{plural} added"
      />
    </div>
  );
};
