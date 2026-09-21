/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Column, Grid, Link, ListItem, OrderedList } from '../carbon';
import { AirportSequence } from '../../new/AirportSequence/AirportSequence';

const STEPS = [
  {
    label: 'Documents I need',
    body: (
      <OrderedList>
        <ListItem>Passport</ListItem>
        <ListItem>Outbound boarding pass only (Tickets after sign-in)</ListItem>
      </OrderedList>
    ),
  },
  {
    label: 'TSA',
    body: (
      <p>
        Checkpoint rules live on the authority site.{' '}
        <Link
          id="tsa"
          href="https://www.tsa.gov/travel/security-screening"
          target="_blank"
          rel="noreferrer">
          TSA security screening
        </Link>
      </p>
    ),
  },
  {
    label: 'Passport vs immigration',
    body: (
      <p>
        Passport control is the border check. It is not the same as the security
        checkpoint MyTSA covers.
      </p>
    ),
  },
  {
    label: 'To the gate',
    body: (
      <p>
        After immigration, follow the gate on the outbound pass — not the return
        flight number.
      </p>
    ),
  },
];

export function AirportPage() {
  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <AirportSequence steps={STEPS} />
      </Column>
    </Grid>
  );
}
