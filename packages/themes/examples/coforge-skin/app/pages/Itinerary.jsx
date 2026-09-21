/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Column, Grid, Link, Stack } from '../carbon';
import { href } from '../useHashLocation';
import { ItineraryShare } from '../../new/ItineraryShare/ItineraryShare';

const LINES = [
  'Flight MAD → KRK · 18 Sep',
  'Hotel Stare Miasto — access protocol on Hotels',
  'Return KRK → MAD · 25 Sep',
];

export function ItineraryPage({ pathname }) {
  const shared = pathname === '/itinerary/share';
  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <Stack gap={6}>
          <ItineraryShare shared={shared} lines={LINES} />
          <Link id="link-airport" href={href('/airport')}>
            Airport sequence
          </Link>
        </Stack>
      </Column>
    </Grid>
  );
}
