/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { AssistanceTrack } from '../../new/AssistanceTrack/AssistanceTrack';
import { ASSISTANCE_EVENTS, ASSISTANCE_FLIGHT } from '../data/companion';
import { CompanionNav } from './CompanionNav';

export function AssistanceScreen({ onOpen }) {
  return (
    <>
      <h1>Assistance status</h1>
      <p>Track wheelchair and transit assistance. This is not live GPS.</p>
      <CompanionNav current="assistance" onOpen={onOpen} />
      <AssistanceTrack
        flight={ASSISTANCE_FLIGHT}
        events={ASSISTANCE_EVENTS}
        currentId="gate"
        reassurance="Airport helper meets the group at the MAD T1 check-in entrance two hours before departure."
      />
    </>
  );
}
