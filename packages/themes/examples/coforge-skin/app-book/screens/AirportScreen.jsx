/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { AirportSequence } from '../../new/AirportSequence/AirportSequence';
import { AIRPORT_STEPS } from '../data/companion';
import { CompanionNav } from './CompanionNav';

export function AirportScreen({ currentIndex, onIndexChange, onOpen }) {
  return (
    <>
      <h1>Your airport guide</h1>
      <p>MAD T1 · FR 4421 · physical places in order, not a checkout bar.</p>
      <CompanionNav current="airport" onOpen={onOpen} />
      <AirportSequence
        steps={AIRPORT_STEPS}
        currentIndex={currentIndex}
        onIndexChange={onIndexChange}
        contextLabel={`${Math.round(((currentIndex + 1) / AIRPORT_STEPS.length) * 100)}% completed`}
        showHeading={false}
      />
    </>
  );
}
