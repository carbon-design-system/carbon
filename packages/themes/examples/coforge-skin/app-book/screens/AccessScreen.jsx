/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { AccessProtocol } from '../../new/AccessProtocol/AccessProtocol';
import { ACCESS_FACTS } from '../data/companion';
import { CompanionNav } from './CompanionNav';

export function AccessScreen({ onOpen }) {
  return (
    <>
      <h1>Kraków access</h1>
      <CompanionNav current="access" onOpen={onOpen} />
      <AccessProtocol
        title="Kraków Old Town + Hotel Stary"
        variant="specialist"
        summary="Measured inventory for eight travellers. Not a live assistance feed."
        facts={ACCESS_FACTS}
        score="9.2 / 10"
        sourceLine="Last verified September 2026. Source: Kraków accessibility register and Luma notes."
        helpHref=""
        backHref=""
        onBack={() => onOpen('itinerary')}
        showHeading={false}
      />
    </>
  );
}
