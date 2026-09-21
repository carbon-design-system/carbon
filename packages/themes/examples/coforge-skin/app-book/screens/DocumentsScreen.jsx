/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { DocumentPair } from '../../new/DocumentPair/DocumentPair';
import { CompanionNav } from './CompanionNav';

export function DocumentsScreen({ onOpen }) {
  return (
    <>
      <h1>Document wallet</h1>
      <p>Offline-accessible pair. Colour is not how you tell the legs apart.</p>
      <CompanionNav current="documents" onOpen={onOpen} />
      <DocumentPair
        outbound="FR 4421 · 18 Sep · MAD 09:00 → KRK 12:15 · Seat 14B"
        inbound="FR 4422 · 25 Sep · KRK 13:30 → MAD 16:45 · Seat 12C"
        hideConfirm
        supporting={['European Health Insurance Card (EHIC)']}
        showHeading={false}
      />
    </>
  );
}
