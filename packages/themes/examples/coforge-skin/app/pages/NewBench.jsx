/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Column, Grid, Link, Stack } from '../carbon';
import { href } from '../useHashLocation';
import { JobDoor } from '../../new/JobDoor/JobDoor';
import { AccessProtocol } from '../../new/AccessProtocol/AccessProtocol';
import { AirportSequence } from '../../new/AirportSequence/AirportSequence';
import { DocumentPair } from '../../new/DocumentPair/DocumentPair';
import { ItineraryShare } from '../../new/ItineraryShare/ItineraryShare';
import { ResearchGate } from '../../new/ResearchGate/ResearchGate';

const SAMPLE_LISTINGS = [
  {
    id: 'bench-verified',
    kind: 'protocol',
    title: 'Hotel Stare Miasto',
    path: '/hotels/stare-miasto',
    tag: 'Verified protocol',
    tagType: 'gray',
    body: 'Krakow mainstream protocol.',
    facts: [
      { label: 'Door clear width', value: '85 cm' },
      { label: 'Hoist clearance', value: '140 cm' },
    ],
  },
  {
    id: 'bench-unpublished',
    kind: 'unpublished',
    title: 'No published access',
    tag: 'Unpublished',
    tagType: 'outline',
    body: 'Drop this. There is no Book.',
  },
];

export function NewBenchPage() {
  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <Stack gap={9}>
          <div className="luma-masthead">
            <p className="luma-masthead__kicker">Prototype wrappers</p>
            <h1>New component bench</h1>
            <p>
              Carbon only, under new/. Concierge is the chat control in the
              header.
            </p>
            <Link href={href('/')}>Back to Luma</Link>
          </div>
          <Stack gap={5}>
            <h2>JobDoor</h2>
            <JobDoor
              id="bench-job"
              href={href('/hotels')}
              meta="Published access"
              title="Hotels"
              does="Door width on the card."
              doesNot="Does not book a room."
            />
          </Stack>
          <Stack gap={5}>
            <h2>ResearchGate</h2>
            <ResearchGate
              query=""
              listings={SAMPLE_LISTINGS}
              showHeading={false}
            />
          </Stack>
          <Stack gap={5}>
            <h2>AccessProtocol</h2>
            <AccessProtocol
              title="Hotel Stare Miasto"
              variant="mainstream"
              summary="Protocol facts, not a booking funnel."
              facts={[
                { label: 'Door clear width', value: '85 cm' },
                { label: 'Hoist clearance', value: '140 cm' },
              ]}
              showHeading={false}
            />
          </Stack>
          <Stack gap={5}>
            <h2>DocumentPair</h2>
            <DocumentPair
              outbound="18 Sep · MAD → KRK"
              inbound="25 Sep · KRK → MAD"
              showHeading={false}
            />
          </Stack>
          <Stack gap={5}>
            <h2>ItineraryShare</h2>
            <ItineraryShare
              shared={false}
              lines={['Flight MAD → KRK', 'Hotel protocol']}
              showHeading={false}
            />
          </Stack>
          <Stack gap={5}>
            <h2>AirportSequence</h2>
            <AirportSequence
              showHeading={false}
              steps={[
                {
                  label: 'Documents I need',
                  body: <p>Passport and outbound pass.</p>,
                },
                { label: 'TSA', body: <p>Authority site, not a clone.</p> },
              ]}
            />
          </Stack>
        </Stack>
      </Column>
    </Grid>
  );
}
