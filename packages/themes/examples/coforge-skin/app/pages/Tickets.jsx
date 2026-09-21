/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Button,
  Column,
  Form,
  Grid,
  InlineNotification,
  Link,
  Stack,
  TextInput,
} from '../carbon';
import { href } from '../useHashLocation';
import { JobDoor } from '../../new/JobDoor/JobDoor';
import { DocumentPair } from '../../new/DocumentPair/DocumentPair';
import { isSignedIn, signIn } from '../session';

export function TicketsPage({ pathname, signedIn, onSessionChange }) {
  if (pathname === '/tickets/documents/recovery') {
    return <Recovery />;
  }
  if (pathname === '/tickets/documents') {
    return <Documents signedIn={signedIn} onSessionChange={onSessionChange} />;
  }
  return <FlightList />;
}

function FlightList() {
  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <Stack gap={6}>
          <div className="luma-masthead">
            <p className="luma-masthead__kicker">Already on this trip</p>
            <h1>Tickets</h1>
            <p>
              Luma does not sell the seat. Open the stored pair after sign-in.
            </p>
          </div>
          <JobDoor
            id="tile-flight"
            href={href('/tickets/documents')}
            meta="Outbound today"
            title="MAD → KRK"
            does="18 Sep. Stored boarding passes need an account."
            doesNot="Does not buy a ticket."
          />
          <Link id="link-airport" href={href('/airport')}>
            Airport sequence
          </Link>
        </Stack>
      </Column>
    </Grid>
  );
}

function Documents({ signedIn, onSessionChange }) {
  const authed = signedIn || isSignedIn();

  if (!authed) {
    return (
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <Stack gap={6}>
            <div className="luma-masthead">
              <p className="luma-masthead__kicker">
                Account only for stored passes
              </p>
              <h1>Stored documents</h1>
              <p>
                Sign in to open outbound versus return. Hotel research and
                shared itineraries stay open without an account.
              </p>
            </div>
            <Form
              aria-label="Sign in for documents"
              onSubmit={(event) => {
                event.preventDefault();
                signIn();
                onSessionChange();
              }}>
              <Stack gap={5}>
                <TextInput
                  id="email"
                  type="email"
                  labelText="Email"
                  autoComplete="username"
                />
                <Button id="sign-in" kind="primary" size="lg" type="submit">
                  Sign in
                </Button>
              </Stack>
            </Form>
          </Stack>
        </Column>
      </Grid>
    );
  }

  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <DocumentPair
          outbound="Outbound · 18 Sep · MAD → KRK · larger card, first in order"
          inbound="Return · 25 Sep · KRK → MAD · second card, different heading"
          recoveryHref="/tickets/documents/recovery"
        />
      </Column>
    </Grid>
  );
}

function Recovery() {
  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <Stack gap={6}>
          <h1>Recovery</h1>
          <InlineNotification
            kind="info"
            lowContrast
            hideCloseButton
            title="ASSUMPTION"
            subtitle="No competitor pattern for the wrong-leg charge. This screen is a stub, not legal advice."
          />
          <Link id="back" href={href('/tickets/documents')}>
            Back to documents
          </Link>
        </Stack>
      </Column>
    </Grid>
  );
}
