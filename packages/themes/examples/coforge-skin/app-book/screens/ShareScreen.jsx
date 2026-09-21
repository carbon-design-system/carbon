/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ItineraryShare } from '../../new/ItineraryShare/ItineraryShare';
import { SHARE_LINES, SHARE_MEMBERS } from '../data/companion';
import { CompanionNav } from './CompanionNav';

export function ShareScreen({ onOpen }) {
  return (
    <>
      <h1>Share plan</h1>
      <p>Give the other seven a read of the itinerary. No account required.</p>
      <CompanionNav current="share" onOpen={onOpen} />
      <ItineraryShare
        showHeading={false}
        sharePath="/companion-share"
        lines={SHARE_LINES}
        members={SHARE_MEMBERS}
      />
    </>
  );
}
