/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Column, Grid, Link } from '../carbon';
import { href } from '../useHashLocation';
import { JobDoor } from '../../new/JobDoor/JobDoor';

export function HomePage() {
  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <div className="luma-masthead">
          <p className="luma-masthead__kicker">18–25 Sep · eight people</p>
          <h1>Madrid to Kraków</h1>
          <p>
            Research the door. Keep the outbound pass. Share one URL. Walk the
            airport in order. Nothing here sells a seat or a room.
          </p>
          <p>
            <Link href={href('/new')}>New component bench</Link>
          </p>
        </div>
      </Column>
      <Column lg={8} md={4} sm={4} className="luma-job-col">
        <JobDoor
          id="job-tickets"
          href={href('/tickets')}
          meta="18 Sep · MAD → KRK"
          title="Tickets"
          does="The flight is already on this trip. Stored passes after sign-in."
          doesNot="Does not sell a seat."
        />
      </Column>
      <Column lg={8} md={4} sm={4} className="luma-job-col">
        <JobDoor
          id="job-hotels"
          href={href('/hotels')}
          meta="Published access"
          title="Hotels"
          does="Door width, hoist, photos on the card. Drop unpublished."
          doesNot="Does not book a room."
        />
      </Column>
      <Column lg={8} md={4} sm={4} className="luma-job-col">
        <JobDoor
          id="job-activities"
          href={href('/activities')}
          meta="On the itinerary"
          title="Activities"
          does="Access-gated stops already on the plan."
          doesNot="Does not sell experiences."
        />
      </Column>
      <Column lg={8} md={4} sm={4} className="luma-job-col">
        <JobDoor
          id="job-itinerary"
          href={href('/itinerary')}
          meta="No account for recipients"
          title="Itinerary"
          does="Copy a URL. The other seven can open it."
          doesNot="Does not force a group login."
        />
      </Column>
    </Grid>
  );
}
