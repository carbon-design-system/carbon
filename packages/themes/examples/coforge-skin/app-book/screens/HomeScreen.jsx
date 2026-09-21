/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button, Tag, Tile } from '../../app/carbon';
import { TripSearch } from '../../new/TripSearch/TripSearch';

export function HomeScreen({
  searchParams,
  setSearchParams,
  onSearch,
  onOpenConcierge,
}) {
  const [tab, setTab] = React.useState('flights');

  return (
    <>
      <section className="luma-book-hero">
        <Tag type="outline" size="sm">
          trip planner
        </Tag>
        <h1>Where to?</h1>
        <p>
          Flights, stays, and things to do. The concierge fills the form; you
          still confirm Pay.
        </p>
        <TripSearch
          value={searchParams}
          onChange={setSearchParams}
          tab={tab}
          onTabChange={setTab}
          onSearch={onSearch}
        />
      </section>
      <Tile className="luma-offer">
        <h2>Let the concierge plan your trip</h2>
        <p>
          Say “Madrid to Kraków, 18–25 September, eight of us” — I fill search,
          pick best-value flights, and can add Hotel Stary.
        </p>
        <Button kind="tertiary" size="lg" onClick={onOpenConcierge}>
          Open concierge
        </Button>
      </Tile>
    </>
  );
}
