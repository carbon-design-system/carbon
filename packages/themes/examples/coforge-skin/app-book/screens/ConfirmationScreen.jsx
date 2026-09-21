/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button, InlineNotification } from '../../app/carbon';
import { euros } from './format';

export function ConfirmationScreen({
  bookingRef,
  grandTotal,
  onItinerary,
  onAirport,
}) {
  return (
    <>
      <h1>Booking confirmed</h1>
      <InlineNotification
        kind="success"
        lowContrast
        hideCloseButton
        title={`Reference ${bookingRef}`}
        subtitle={`Prototype hold · ${euros(grandTotal)}. After-booking diary is next.`}
      />
      <Button kind="primary" size="lg" onClick={onItinerary}>
        Open itinerary
      </Button>
      {onAirport ? (
        <Button kind="ghost" size="lg" onClick={onAirport}>
          Airport guide
        </Button>
      ) : null}
    </>
  );
}
