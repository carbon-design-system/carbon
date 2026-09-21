/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Column, Grid, Link, ListItem, OrderedList, Stack } from '../carbon';
import { href } from '../useHashLocation';
import { ResearchGate } from '../../new/ResearchGate/ResearchGate';
import { AccessProtocol } from '../../new/AccessProtocol/AccessProtocol';

const MEASURES = [
  { label: 'Door clear width', value: '85 cm' },
  { label: 'Hoist clearance', value: '140 cm' },
  { label: 'Room photos', value: 'Yes' },
];

const LISTINGS = [
  {
    id: 'tile-verified',
    kind: 'protocol',
    title: 'Hotel Stare Miasto',
    path: '/hotels/stare-miasto',
    tag: 'Verified protocol',
    tagType: 'gray',
    body: 'Mainstream listing. Krakow.',
    facts: MEASURES,
  },
  {
    id: 'tile-specialist',
    kind: 'protocol',
    title: 'Specialist measured room',
    path: '/hotels/specialist',
    tag: 'Measured',
    tagType: 'gray',
    body: 'Photographed bathroom, entrance, and turning circle. Krakow.',
    facts: [
      { label: 'Bathroom photos', value: 'Yes' },
      { label: 'Turning circle', value: 'Measured' },
      { label: 'Entrance', value: 'Photographed' },
    ],
  },
  {
    id: 'tile-unpublished',
    kind: 'unpublished',
    title: 'No published access',
    tag: 'Unpublished',
    tagType: 'outline',
    body: 'Treat as inaccessible. There is no Book action.',
  },
];

export function HotelsPage({ pathname, query }) {
  if (pathname === '/hotels/how-verified') {
    return <HowVerified />;
  }
  if (pathname === '/hotels/stare-miasto') {
    return (
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <AccessProtocol
            title="Hotel Stare Miasto"
            variant="mainstream"
            summary="Mainstream listing with structured access facts on the result."
            facts={MEASURES}
          />
        </Column>
      </Grid>
    );
  }
  if (pathname === '/hotels/specialist') {
    return (
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <AccessProtocol
            title="Specialist measured room"
            variant="specialist"
            summary="Specialist inventory: photographed, measured bathroom and entrance."
            facts={MEASURES}
          />
        </Column>
      </Grid>
    );
  }
  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <ResearchGate query={query.get('q') || ''} listings={LISTINGS} />
      </Column>
    </Grid>
  );
}

function HowVerified() {
  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <Stack gap={6}>
          <div className="luma-masthead">
            <p className="luma-masthead__kicker">How we verify</p>
            <h1>How access is verified</h1>
            <p>
              Access Lead, written statement, measurements, then re-confirm with
              the hotel. Not a booking funnel.
            </p>
          </div>
          <OrderedList>
            <ListItem>Ask for the Access Lead</ListItem>
            <ListItem>
              Request the written access statement with measurements
            </ListItem>
            <ListItem>Match photos to the specific room type</ListItem>
          </OrderedList>
          <Link id="back" href={href('/hotels')}>
            Back to hotels
          </Link>
        </Stack>
      </Column>
    </Grid>
  );
}
