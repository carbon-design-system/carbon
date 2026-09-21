/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TripTimeline } from '../../new/TripTimeline/TripTimeline';
import { itineraryDays } from '../data/itinerary';
import { CompanionNav } from './CompanionNav';

export function ItineraryScreen({ onOpen }) {
  return (
    <>
      <h1>Your week in Kraków</h1>
      <p>Times are local. This diary does not claim live tracking.</p>
      {onOpen ? <CompanionNav current="itinerary" onOpen={onOpen} /> : null}
      <TripTimeline days={itineraryDays} />
    </>
  );
}
